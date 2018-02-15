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
  	 * Identifies the language of the article by filtering out stop words
	 * the language that has the most stop words filtered from the article is
	 * the most likely language of the text.
	 */
	class LanguageFilter
	{
		const WORD_MATCH_THRESSHOLD = 200;

		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			$StopWordLanguageMap = new \WebArticleExtractor\ResourceProvider("stop_words");
			
			$topLang = '';
			$topScore = 0;
			foreach ($StopWordLanguageMap->resourceContent as $value) 
			{
				//echo json_encode($value);
				$regex = LanguageFilter::regexForWordList($value[1],self::WORD_MATCH_THRESSHOLD);
				$languageScore = preg_match_all($regex,$article->text);
				
				// Uncomment for debug
				//echo $value[0].'-'.$languageScore;
				//echo '<br/>';
				
				if($languageScore > $topScore)
				{
					$topLang = $value[0];
					$topScore = $languageScore;
				}
				
				$article->language = $topLang;
			}
		}
		
		private static function regexForWordList($WordList,$MaxWordCount)
		{	
			$result = '/(';
			$count = 0;
			foreach ($WordList as $word) 
			{
				$result .= '\b'.preg_quote($word).'\b|'; //Requires unicode support
				$count++;
				if($count >= $MaxWordCount)
				{
					break;
				}
			}
			
			$result = rtrim($result, "|");
			$result .= ')/iu';
			return $result;
		}
	}
?>  