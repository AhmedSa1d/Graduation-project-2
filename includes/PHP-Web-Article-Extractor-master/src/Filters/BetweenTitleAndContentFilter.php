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
	 * Marks blocks between the 'title' and 'largest block' as content. Will not mark title itself as content
	 */
	class BetweenTitleAndContentFilter
	{
		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			$pastTitle = false;
			foreach ($article->textBlocks as $key => $textBlock) 
			{
				if(in_array(Labels::TITLE_LABEL,$textBlock->labels))
				{
					// Start when hitting title
					$pastTitle = true;
					continue;
				}
				
				if($pastTitle)
				{
					$textBlock->isContent = true;
				}
				
				if($textBlock->isContent)
				{
					// End once hit content
					return;
				}
			}
		}
	}
?>  