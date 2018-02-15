<?php namespace WebArticleExtractor\Filters;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *
	 *	Attempts to extract the article's keywords using an implementation of the 
	 *	Rapid Automatic Keyword Extraction (RAKE) algorithm 
	 *	as described in the book 'Text Mining: Theory and Applications'
	 *	http://www.amazon.com/Text-Mining-Applications-Michael-Berry/dp/0470749822
	 *	Also based on this python RAKE implementation 'https://github.com/aneesha/RAKE'
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	/**
	*	Filters out and identifies keywords from the article's text
	*/
	class KeywordFilter
	{
		const WORD_SCORE_THRESHOLD = 3;
		const WORD_LENGTH_THRESHOLD = 2;

		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			// Can't perform this filter unless language is known
			if(!isset($article->language))
			{
				return;
			}
			
			// Stop words are language dependant so this filter relies on previously detected language
			$stopWordResource = new \WebArticleExtractor\ResourceProvider("stop_words/".$article->language.".lst");
			$article->keywords = array();
			
			// Append article title, its likely keywords will be in here.
			$sentences = KeywordFilter::getSentences(str_replace('\u00a0'," ",str_replace("\r\n",'.',$article->title.". ".$article->text)));
			$phrases = KeywordFilter::getPhrases($sentences, $stopWordResource);
			$wordScores = KeywordFilter::getWordScores($phrases);
			$candidatePhrases = KeywordFilter::getPhraseScores($phrases, $wordScores);
			
			// Clean candidates
			foreach ($candidatePhrases as $key => $value) 
			{
				if($value > self::WORD_SCORE_THRESHOLD)
				{
					$article->keywords[] = trim($key);
				}
			}
			
			//TODO: Weight by candidate phrase's word occurences in other top candidate phrases
		}
		
		private static function getRegexForStopwords($stopWordResource)
		{
			$resultRegex = implode('|', $stopWordResource->resourceContent);
			return '/\b(' . trim($resultRegex) . ')\b/iu'; 
		}
		
		private static function getSentences($articleString) 
		{
			$sentenceDelimiters = '/[.!?,;:\t\"\(\)]/'; 
			return preg_split($sentenceDelimiters, $articleString);
		}
		
		private static function splitPhraseIntoWords($phrase) 
		{
			$results = array();
			$pattern = '/\P{L}+/u';
			$words = preg_split($pattern, $phrase);
			foreach($words as $word)
			{
				$word = trim($word);
				if (strlen($word) > self::WORD_LENGTH_THRESHOLD && $word != "" && ! is_numeric($word)) 
				{
					array_push($results, $word);
				}
			}
			return $results;
		}
		
		private static function getPhrases($sentences, $stopWordResource) 
		{
			$results = array();
			$stopwordRegex = KeywordFilter::getRegexForStopwords($stopWordResource);
			
			foreach($sentences as $sentence) 
			{
				$tmp = preg_replace($stopwordRegex, '|', $sentence);
				$phrases = explode('|', $tmp);
				
				foreach($phrases as $phrase) 
				{
					$phrase = strtolower(trim($phrase));
					if ($phrase != "") 
					{
						array_push($results, $phrase);
					}
				}
			}
			return $results;
		}
		
		private static function getWordScores($phrases) 
		{
			$wordFrequency = array();
			$wordDegree = array();
			
			foreach($phrases as $phrase) 
			{
				$wordList = KeywordFilter::splitPhraseIntoWords($phrase); 
				$wordListLength = count($wordList);
				$wordListDegree = $wordListLength - 1;
				
				foreach ($wordList as $word) 
				{
					if (array_key_exists($word, $wordFrequency)) 
					{
						$wordFrequency[$word]+=1;
					} 
					else 
					{
						$wordFrequency[$word]=1;
					}
					
					if (array_key_exists($word, $wordDegree)) 
					{
						$wordDegree[$word] += $wordListDegree;
					} 
					else
					{
						$wordDegree[$word] = $wordListDegree;
					}
				}
			}
			
			foreach ($wordFrequency as $item => $value) 
			{
				$wordDegree[$item] = $wordDegree[$item] + $wordFrequency[$item];
			}
			
			$word_score = array();
			
			foreach ($wordFrequency as $item => $value) 
			{
				$word_score[$item] = round(floatval($wordDegree[$item]) / floatval($wordFrequency[$item]),2);
			}
			
			return $word_score;
		}
		
		private static function getPhraseScores($phrases, $wordScores) 
		{
			$phrase_scores = array();
			
			foreach ($phrases as $phrase) 
			{
				if (!array_key_exists($phrase, $phrase_scores)) 
				{
					$phrase_scores[$phrase] = 0;
				}
				
				$wordList = KeywordFilter::splitPhraseIntoWords($phrase);
				$total_score = 0;
			
				foreach ($wordList as $word) 
				{
					if(isset($wordScores[$word]))
					{
						$total_score += $wordScores[$word];
					}
				}
				$phrase_scores[$phrase] = $total_score;
			}
			arsort($phrase_scores);
			return $phrase_scores;	
		}
	}
?>  