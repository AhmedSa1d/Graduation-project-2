<?php namespace WebArticleExtractor\Mergers;
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
	
	/*
	*	Merges blocks in close proximity 
	*	TODO: currently this does not take into account link densities
	*/
	class CloseBlockMerger
	{
		const BLOCK_DISTANCE = 1;
		
		/**
		*	Executes this merger
		*
		*	@param  article  $article reference directly to the article object to merge
		*/
		public static function merge(&$article)
		{
			if(sizeof($article->textBlocks) < 2)
			{
				return;
			}
			
			$previousBlock = null;
			
			foreach ($article->textBlocks as $key => $textBlock) 
			{
				if(!isset($previousBlock))
				{
					$previousBlock = $textBlock;
					continue;
				}
			
				if(!$textBlock->isContent)
				{
					$previousBlock = $textBlock;
					continue;
				}
				
				$blockDiff = $textBlock->offsetBlocksStart - $previousBlock->offsetBlocksEnd - 1;
				if($blockDiff <= SELF::BLOCK_DISTANCE)
				{
					// Merge of this block into the previous block
					$previousBlock->text .= "\r\n\r\n";
					$previousBlock->text .= $textBlock->text;
					$previousBlock->numWords += $textBlock->numWords;
					$previousBlock->numWordsInAnchorText += $textBlock->numWordsInAnchorText;
					$previousBlock->numWordsInWrappedLines += $textBlock->numWordsInWrappedLines;
					$previousBlock->numFullTextWords += $textBlock->numFullTextWords;
					$previousBlock->offsetBlocksStart = min($previousBlock->offsetBlocksStart,$textBlock->offsetBlocksStart);
					$previousBlock->offsetBlocksEnd = max($previousBlock->offsetBlocksEnd,$textBlock->offsetBlocksEnd);
					$previousBlock->tagLevel = min($previousBlock->tagLevel,$textBlock->tagLevel);
					$previousBlock->isContent = ($previousBlock->isContent || $textBlock->isContent);
					$previousBlock->currentContainedTextElements = array_merge($previousBlock->currentContainedTextElements,$textBlock->currentContainedTextElements);
					$previousBlock->labels = array_merge($previousBlock->labels,$textBlock->labels);
					$previousBlock->calculateDensities();
					unset($article->textBlocks[$key]); // Safe as per PHP 'foreach' specification
				}
				else
				{
					$previousBlock = $textBlock;
				}
			}
			$article->textBlocks = array_values($article->textBlocks);
		}
	}
?>  