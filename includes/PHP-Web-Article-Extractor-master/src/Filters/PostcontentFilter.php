<?php namespace WebArticleExtractor\Filters;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	This class is based on the whitepaper 'Boilerplate detection using Shallow Text Features'
	 *	By Christian Kohlschuetter, Peter Fankhauser, Wolfgang Nejdl
	 *
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	 
	use \WebArticleExtractor\BlockLabels as Labels;
	
	/**
	*	Marks all blocks after 'end' label as not content
	*/
	class PostcontentFilter
	{
		const WORD_COUNT_THRESHOLD = 60; 

		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			$numberOfWords = 0;
			$foundEndOfText = false;
			
			foreach ($article->textBlocks as $textBlock) 
			{
				$endBlock = in_array(Labels::END_BLOCK_LABEL, $textBlock->labels);

				if($textBlock->isContent)
				{
					$numberOfWords += $textBlock->numFullTextWords;
				}
				
				if($endBlock && $numberOfWords >= self::WORD_COUNT_THRESHOLD)
				{
					$foundEndOfText = true;
				}
				
				if($foundEndOfText)
				{
					$textBlock->isContent = false;
				}
			}
		}
	}
?>  