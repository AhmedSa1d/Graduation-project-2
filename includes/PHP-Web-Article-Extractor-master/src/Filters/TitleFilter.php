<?php namespace WebArticleExtractor\Filters;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */

	/**
	*	Filters out the most likely title of the article
	*/
	class TitleFilter
	{
		private $possibleTitles = array();

		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			$title = trim($article->title);
			$possibleTitles[] = $title;
			$result = '';
			
			// For linkedin page titles
			$linkedInIdent = "| linkedin";
			if(TitleFilter::stringEndsWith($title,$linkedInIdent))
			{
				$linkedinTitle = explode("-",str_replace($linkedInIdent,'',$title));
				
				if(count($linkedinTitle))
				{
					$title = $linkedinTitle[0];
				}
			}
			
			$result = TitleFilter::getLongestComponenet($title,'/[ ]*[\\|»|-][ ]*/');
			if(strlen($result))
			{
				if (!in_array($result, $possibleTitles))
				{
					$possibleTitles[] = $result;
				}
			}
			
			$result = TitleFilter::getLongestComponenet($title,'/[ ]*[\\|»|:][ ]*/');
			if(strlen($result))
			{
				if (!in_array($result, $possibleTitles))
				{
					$possibleTitles[] = $result;
				}
			}
			
			$result = TitleFilter::getLongestComponenet($title,'/[ ]*[\\|»|•][ ]*/');
			if(strlen($result))
			{
				if (!in_array($result, $possibleTitles))
				{
					$possibleTitles[] = $result;
				}
			}
			
			$result = TitleFilter::getLongestComponenet($title,'/[ ]*[\\|»|:\\(\\)][ ]*/');
			if(strlen($result))
			{
				if (!in_array($result, $possibleTitles))
				{
					$possibleTitles[] = $result;
				}
			}
			
			$result = TitleFilter::getLongestComponenet($title,'/[ ]*[\\|»|:\\(\\)\\-][ ]*/');
			if(strlen($result))
			{
				if (!in_array($result, $possibleTitles))
				{
					$possibleTitles[] = $result;
				}
			}
			
			// Article has more than one hyphen delimiter
			$multipleDelimiters = false;
			if(mb_substr_count($title, '-') > 1)
			{
				$title =  preg_replace('/-/', '&#45;', $title, 1);
				$multipleDelimiters = true;
			}
			
			$result = urldecode(TitleFilter::getLongestComponenet($title,'/[ ]*[\\|»|,|:\\(\\)\\-][ ]*/'));
			if(strlen($result))
			{
				if (!in_array($result, $possibleTitles))
				{
					if($multipleDelimiters)
					{
						$possibleTitles[] = str_replace('&#45;','-',$result);
					}
					else
					{
						$possibleTitles[] = $result;
					}
				}
			}
	
			// Uncomment for debug
			//echo json_encode(array_map('strtolower', $possibleTitles));
			
			// Loop through article to find matching title
			foreach ($article->textBlocks as $textBlock) 
			{
				if(in_array(strtolower($textBlock->text), array_map('strtolower', $possibleTitles)))
				{
					$textBlock->labels[] = \WebArticleExtractor\BlockLabels::TITLE_LABEL;
					$article->title = $textBlock->text;
				}
			}

			return $title;
		}
		
		private static function stringEndsWith($haystack, $needle) 
		{
			return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
		}
		
		private static function getLongestComponenet($title, $regex)
		{
			$parts = preg_split($regex,$title);

			if(count($parts) == 1)
			{
				return '';
			}
			
			$longestNumberofWords = 0;
			
			$longestPart = '';
			
			for ($i = 0; $i < count($parts); $i++)
			{
				$p = $parts[$i];
				if (strpos($p, '.com') !== FALSE) // TODO: Possible inclusion of other domains
				{
					continue;
				}
    			
				$numberOfWords = count(preg_split('/[\b]+/',$p));
    			
				if($numberOfWords > $longestNumberofWords  || strlen($p) > strlen($longestPart))
				{
					$longestNumberofWords = $numberOfWords;
					$longestPart = $p;
				}
			}
			return trim($longestPart);
		}
	}
?>  