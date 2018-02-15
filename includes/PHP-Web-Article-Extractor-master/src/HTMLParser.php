<?php namespace WebArticleExtractor;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	Parts of this class are based on 'Boilerpipe' By Christian Kohlschuetter
	 *
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	/**
	*	HTMLParser parses raw HTML into a Article
	*/
	class HTMLParser
	{
		private $textElementId = 0;
		private $flush = false;
		private $inIgnorableElement = 0;
		private $sbLastWasWhitespace = false;
		private $text = '';
		private $token = '';
		private $tagLevel = 0;
		private $blockTagLevel = -1;
		private $currentContainedTextElements = array();
		private $labelStacks = array();
		private $lastStartTag = '';
		private $lastEndTag = '';
		private $linkCount = 0;
		private $inBody = 0;
		private $ANCHOR_TEXT_START = '$\ue00a';
		private $ANCHOR_TEXT_END = '\ue00a$';
		private $inAnchorText = false;
		private $offsetBlocks = 0;
		private $textBlocks = array();
		
		/**
		 *	Holds last event while traversing
		 *	Start tag = 0
		 *	End tag = 1
		 *	Characters = 2
		 *	Whitespace = 3
		 *	@var int
		 */
		private $lastEvent = -1;
		
		// Resource stores
		private $ignoreElements;
		private $linkElements;
		private $bodyElements;
		private $inlineElements;
		
		/**
		*	Returns the applicable action for a given HTML tag
		*
		*	@param  string  $url the URL to extract an article from
		*	@return int action enumeration
		*	0 = Element should be ignored
		*	1 = Element should be treated as a link
		*	2 = Element should be treated as HTML body
		*	3 = Element should be treated as inline text
		*/
		function getActionForTag($tag)
		{
			$tag = strtoupper($tag);
			
			// Ignorable elements
			foreach($this->ignoreElements->resourceContent as $ignoreElement) 
			{
				if ($ignoreElement === $tag)
				{
					return 0;
				}
			}
			
			// Link elements
			foreach($this->linkElements->resourceContent as $linkElement) 
			{
				if ($linkElement === $tag)
				{
					return 1;
				}
			}

			// Body elements
			foreach($this->bodyElements->resourceContent as $bodyElement) 
			{
				if ($bodyElement === $tag)
				{
					return 2;
				}
			}
			
			// Inline elements
			foreach($this->inlineElements->resourceContent as $inlineElement) 
			{
				if ($inlineElement === $tag)
				{
					return 3;
				}
			}
			
			return -1;
		}

		/**
		*	Begins traversal of the HTML document
		*
		*	@param  string  $url the raw HTML to extract an article from
		*	@return Article parsed HTML now in Article form
		*/
		function parse($html)
		{
			$dom = new \DOMDocument();
			libxml_use_internal_errors(true);
			$dom->loadHTML($html);
			$xpath = new \DOMXPath($dom);
			
			// Load resources for tag actions
			$this->ignoreElements = new ResourceProvider("html_tag_actions/ignore.lst");
			$this->linkElements = new ResourceProvider("html_tag_actions/link.lst");
			$this->bodyElements = new ResourceProvider("html_tag_actions/body.lst");
			$this->inlineElements = new ResourceProvider("html_tag_actions/inline.lst");
			
			/*	
			 *  1st retrieve page title
			 *  With this technique: only process the entire document here 
			 *  as meta is excluded as 'content' and only required for initial title.
			 */

			// Extract title from DOM
			$body = $xpath->query('/')->item(0);
			$titleItem = $xpath->query('//title')->item(0);
			
			if(isset($titleItem))
			{
				$title = $titleItem->textContent;
			}
			$body = $xpath->query('//body')->item(0);
			
			// Try to extract title from OG meta
			foreach ($xpath->query("//meta[@property='og:title']") as $el) 
			{
				$title = $el->getAttribute("content");
			}
			
			$this->recurse($body);
			$Article = new Article();
			if(isset($title))
			{
				$Article->title = $title;
			}
			$Article->textBlocks = $this->textBlocks;
			return $Article;
		}

		function recurse($node)
		{
			if ($node->nodeType == XML_ELEMENT_NODE)
			{
				$this->startElement($node);
			}
			else if ($node->nodeType == XML_TEXT_NODE) 
			{
				$this->handleText($node);
			}
			
			if (is_array($node->childNodes) || is_object($node->childNodes))
			{
				foreach ($node->childNodes as $childNode)
				{
					$this->recurse($childNode);
				}
			}
			
			if ($node->nodeType == XML_ELEMENT_NODE)
			{
				$this->endElement($node);
			}
		}
		
		function startElement($node)
		{			
			array_push($this->labelStacks, null);
			$ta = $this->getActionForTag($node->tagName);
			
			if($ta > 0)
			{
				$this->flush = false;
				return;
			} 
			else if ($ta == 0)
			{
				// Ignorable element
			}
			
			$this->blockTagLevel++;
			$this->flush = true;
			$this->lastEvent = 0;
			$this->lastStartTag = trim(strtoupper($node->tagName));
		}
		
		function endElement($node)
		{
			$ta = $this->getActionForTag($node->tagName);
			
			if($ta > 0)
			{
				// Count the length of the anchor text
				if($ta == 1)
				{	
					$tokens = explode(' ', $node->nodeValue);
					
					foreach ($tokens as $xToken) 
					{
						if ($this->isWord($xToken))
						{
							$this->linkCount++;
						}
					}
				}
				$this->flush = false;
				return;
			} 
			else if ($ta == 0)
			{
				// Ignorable element
			}
			
			$this->blockTagLevel--;
			$this->flush = true;
			$this->flushBlock();
			$this->lastEvent = 1;
			$this->lastEndTag = strtoupper($node->tagName);
			array_pop($this->labelStacks);
		}
		
		function handleText($node)
		{
			if ($this->isTag($node->nodeValue))
			{
				$node->nodeValue = '';
			}
			
			$decodedNodeString = html_entity_decode($node->nodeValue);
			$nodeCharArr = str_split($decodedNodeString);
			
			$start = 0;
			$length = sizeof($nodeCharArr);
			$this->textElementId++;
			
			if ($this->flush) 
			{
				$this->flushBlock();
				$this->flush = false;
			}
			
			if ($this->inIgnorableElement != 0) 
			{
				return;
			}
			
			$currentChar;
			$startWhiteSpace = false;
			$endWhiteSpace = false;
			
			if ($length === 0)
			{
				return;
			}
			
			$end = $start + $length;

			for ($i = $start; $i < $end; $i++) 
			{
				if ($this->isWhiteSpace ($nodeCharArr[$i])) 
				{
					$nodeCharArr[$i] = ' ';
				}
			}
			
			while ($start < $end)
			{
				$currentChar = $nodeCharArr[$start];
				if($currentChar == ' ')
				{
					$startWhiteSpace = true;
					$start++;
					$length--;
				}
				else
				{
					break;
				}
			}
			
			while ($length > 0)
			{
				$currentChar = $nodeCharArr[$start + $length -1];
				if($currentChar == ' ')
				{
					$endWhiteSpace = true;
					$length--;
				}
				else
				{
					break;
				}
			}
			
			if ($length == 0)
			{
				if ($startWhiteSpace || $endWhiteSpace)
				{
					if(!$this->sbLastWasWhitespace)
					{
						$this->text .= ' ';
						$this->token .= ' ';
					}
					$this->sbLastWasWhitespace = true;
				}
				else
				{
					$this->sbLastWasWhitespace = false;
				}
				$this->lastEvent = 3;
				return;
			}
			
			if($startWhiteSpace)
			{
				if(!$this->sbLastWasWhitespace)
				{
					$this->text .= ' ';
					$this->token .= ' ';
				}
			}
			
			if ($this->blockTagLevel === -1) 
			{
				$this->blockTagLevel = $this->tagLevel;
			}
			
			$this->text .= substr($decodedNodeString, $start, $length);
			$this->token .= substr($decodedNodeString, $start, $length);
			
			if ($endWhiteSpace) 
			{
				$this->text .= ' ';
				$this->token .= ' ';
			}
			
			$this->sbLastWasWhitespace = $endWhiteSpace;
			$this->lastEvent = 2;
			$this->currentContainedTextElements[] = $this->textElementId;

			//echo $node->nodeValue;
		}
		
		function flushBlock()
		{
			if ($this->inBody === 0)
			{
				if($this->lastStartTag === 'TITLE')
				{
					$this->text = '';
					$this->token = '';
					return;
				}
			}
			
			$length = strlen($this->token);
			if($length === 0)
			{
				return;
			}
			else if ($length === 1)
			{
				if($this->sbLastWasWhitespace)
				{
					$this->text = '';
					$this->token = '';
					return;
				}
			}
			
			$tokens = explode(' ', $this->token);
			$numWords = 0;
			$numLinkedWords = 0;
			$numWrappedLines = 0;
			$currentLineLength = -1; // don't count the first space
			$maxLineLength = 80;
			$numTokens = 0;
			$numWordsCurrentLine = 0;
			
			foreach ($tokens as $xToken) 
			{
				if($xToken === $this->ANCHOR_TEXT_START)
				{
					$this->inAnchorText = true;
				}
				else
				{
					if($xToken === $this->ANCHOR_TEXT_END)
					{
						$this->inAnchorText = false;
					}
					else
					{
						if ($this->isWord($xToken))
						{
							$numTokens++;
							$numWords++;
							$numWordsCurrentLine++;
							
							if($this->inAnchorText)
							{
								$numLinkedWords++;
							}
							
							$tokenLength =  strlen($xToken);
							$currentLineLength += $tokenLength + 1;
							if($currentLineLength > $maxLineLength)
							{
								$numWrappedLines++;
								$currentLineLength = $tokenLength;
								$numWordsCurrentLine = 1;
							}
						}
						else
						{
							$numTokens++;
						}
					}
				}
			}
			
			if($numTokens === 0 || $numWords ===0)
			{
				return;
			}
			
			$numWordsInWrappedLines = 0;
			if($numWrappedLines == 0)
			{
				$numWordsInWrappedLines = $numWords;
				$numWrappedLines = 1;
			}
			else
			{
				$numWordsInWrappedLines = $numWords - $numWordsCurrentLine;
			}
			
			$tb = new TextBlock();
			
			if($this->linkCount > 0)
			{
				$tb->numWordsInAnchorText = $this->linkCount;
			}
			else
			{
				$tb->numWordsInAnchorText = 0;
			}
			
			$tb->text = $this->text;
			$tb->currentContainedTextElements = $this->currentContainedTextElements;
			$tb->numWords = $numWords;
			$tb->numWordsInWrappedLines = $numWordsInWrappedLines;
			$tb->numWrappedLines = $numWrappedLines;
			$tb->offsetBlocksStart = $this->offsetBlocks;
			$tb->offsetBlocksEnd = $this->offsetBlocks;
			$this->currentContainedTextElements = array();
			$this->offsetBlocks++;
			$this->text = '';
			$this->token = '';
			$tb->tagLevel = $this->blockTagLevel;
			$tb->calculateDensities();
			$this->textBlocks[] = $tb;
			$this->blockTagLevel = -1;
			$this->linkCount = 0;
		}
		
		// String comparisons
		
		function isWord($text)
		{
			if(preg_match('/[\p{L}\p{Nd}\p{Nl}\p{No}]/', $text) > 0) 
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		
		function isTag($text)
		{
			if(preg_match('/<\/?[a-z][a-z0-9]*[^<>]*>/', $text) > 0) 
			{
				return true;
			}
			else
			{
				return false;
			}
		}
		
		function isWhiteSpace($character)
		{
			if ($character == '\u00A0')
			{
				return false;
			}
			
			if (ctype_space($character) || $character == '') 
			{
				return true;
			}
			
			return false;
		}
	}
?>  