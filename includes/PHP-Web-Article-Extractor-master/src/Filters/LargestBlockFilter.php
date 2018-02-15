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
	 * Filters all blocks asside from the largest.
	 * Largest is determined by number of words.
	 * If there is more than one 'largest' block only the 1st is kept.
	 * non largest blocks are marked as 'possibly content'
	 */
	class LargestBlockFilter
	{
		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			if(count($article->textBlocks) < 2)
			{
				return;
			}
			
			$largestCount = -1;
			$largestCountKey = NULL;
			
			foreach ($article->textBlocks as $key => $textBlock) 
			{
				if($textBlock->numWords > $largestCount)
				{
					$largestCountKey = $key;
					$largestCount = $textBlock->numWords;
				}
			}
			
			foreach ($article->textBlocks as $key => $textBlock) 
			{
				if($key != $largestCountKey)
				{
					$textBlock->isContent = false;
					$textBlock->labels[] = Labels::POSSIBLY_CONTENT_LABEL;
				}
			}
		}
	}
?>  