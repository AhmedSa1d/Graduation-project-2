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
	 *	Removes blocks where 'isContent' is false
	 */
	class NonContentFilter
	{
		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			foreach ($article->textBlocks as $key => $textBlock) 
			{
				if(!$textBlock->isContent)
				{
					unset($article->textBlocks[$key]);	
				}
			}
		}
	}
?>  