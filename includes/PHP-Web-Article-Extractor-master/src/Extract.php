<?php namespace WebArticleExtractor;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	/**
	*	Extract is the package's main API providing the front extraction methods.
	*/
	class Extract 
	{

		/**
		*	Extracts an article directly from a URL
		*
		*	@param  string  $url the URL to extract an article from
		*	@return Article extraction result
		*/
		public static function extractFromURL($url)
		{
			$html = file_get_contents($url);
			
			if($html === FALSE) 
			{
				return;
			}
			
			return self::extractFromHTML($html, $url);
		}
		
		/**
		*	Extracts an article from HTML
		*
		*	@param  string  $rawHTMLPage the raw HTML from which to extract an article
		*	@return Article extraction result
		*/
		public static function extractFromHTML($rawHTMLPage, $source = "") 
		{
			$parser = new HTMLParser();
			
			// Parse HTML into blocks
			$article = $parser->parse($rawHTMLPage);
			
			// Filter out clean article title
			Filters\TitleFilter::filter($article);
			
			// Discover article 'end' points using syntactic terminators
			Filters\EndBlockFilter::filter($article);
			
			// Filter content using word count and link density using algorithm from Machine learning
			Filters\NumberOfWordsFilter::filter($article);
			
			// Filter blocks that come after content
			Filters\PostcontentFilter::filter($article);
			
			// Merge close blocks
			Mergers\CloseBlockMerger::merge($article);
			
			// Remove blocks that are not content
			Filters\NonContentFilter::filter($article);
			
			// Mark largest block as 'content'
			Filters\LargestBlockFilter::filter($article);
			
			// Mark blocks found between the title and main content as content as well
			Filters\BetweenTitleAndContentFilter::filter($article);
			
			// Post-extraction cleanup removing now irrelevant blocks and sets full title
			Filters\PostextractionFilter::filter($article);
			
			// Scans article line by line removing non-content on a per-line basis
			Filters\LineFilter::filter($article);
			
			// Determine document language
			Filters\LanguageFilter::filter($article);
			
			// Filter keywords from the article document
			Filters\KeywordFilter::filter($article);
			
			$article->source = $source;
			
			return $article; 
		}
	}
?>