<?php namespace WebArticleExtractor;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *  This class is based on the whitepaper 'Boilerplate detection using Shallow Text Features'
	 *  By Christian Kohlschuetter, Peter Fankhauser, Wolfgang Nejdl
	 *
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class TextBlock
	{
		// Constants
		const TEXT_DENSITY_THRESHOLD = 9; 
		
		// TextBlock public variables
		public $isContent = false;
		public $text;
		public $labels = array();
		public $numWords;
		public $numWordsInAnchorText;
		public $numWordsInWrappedLines;
		public $numWrappedLines;
		public $textDensity;
		public $linkDensity;
		public $numFullTextWords = 0;
		public $tagLevel;
		public $currentContainedTextElements = array();
		public $offsetBlocksStart;
		public $offsetBlocksEnd;
		
		/**
		*	Calculates the text and link densities for this block
		*/
		public function calculateDensities()
		{
			if ($this->numWordsInWrappedLines == 0)
			{
				$this->numWordsInWrappedLines = $this->numWords;
				$this->numWrappedLines = 1;
			}
			$this->textDensity = $this->numWordsInWrappedLines / $this->numWrappedLines;
			$this->linkDensity = $this->numWords == 0 ? 0 : $this->numWordsInAnchorText / $this->numWords;
			
			// Set full text words only if this block is past the threshold
			if($this->textDensity >= self::TEXT_DENSITY_THRESHOLD)
			{
				$this->numFullTextWords = $this->numWords;
			}
		}
	}
?>  