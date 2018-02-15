<?php namespace WebArticleExtractor\Filters;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	/*
	 * This filter will scan the article text on a line by line basis
	 * any line specific logic will be in here.
	 */
	class LineFilter
	{
		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			$previousLineKey;
			$articleLines = explode("\n\r", $article->text);
			$scannedArticle = '';
			$firstEntry = true;
			
			foreach($articleLines as $key => $line)
			{
				if($firstEntry)
				{
					$firstEntry = false;
					// remove the 1st line if it is exactly the same as the article title
					if(trim($line) == $article->title)
					{
						unset($articleLines[$key]);
						continue;
					}
				}
			
				// remove lines containing a single character these are very unlikely to be content
				if(strlen(trim($line)) === 1)
				{
					unset($articleLines[$key]);
					continue;
				}
				
				$previousLineKey = $key;
				$scannedArticle .= $line."\n\r";
			}
			
			$article->text = $scannedArticle;
		}
	}
?>  