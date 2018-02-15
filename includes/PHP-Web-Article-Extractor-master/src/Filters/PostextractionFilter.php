<?php namespace WebArticleExtractor\Filters;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */

	use \WebArticleExtractor\BlockLabels as Labels;

	/**
	 * Removes now irrelevant 'non-content' blocks.
	 * Sets 'full title' to title block text, if no text is found falls back to standard title.
	 */
	class PostextractionFilter
	{
		/**
		*	Executes this filter
		*
		*	@param  article  $article reference directly to the article object to filter
		*/
		public static function filter(&$article)
		{
			$pastTitle = false;
			$article->text = '';
			foreach ($article->textBlocks as $key => $textBlock)
			{
				if(in_array(Labels::TITLE_LABEL,$textBlock->labels))
				{
					// Mark the title block as the documents 'full title'
					$article->fullTitle = $textBlock->text;
				}

				if(!$textBlock->isContent)
				{
					// Blocks marked 'possibly content' are stored.
				}
				else
				{
					$article->text .= $textBlock->text;
					$article->text .= ' ';
				}
			}

			// Treat &nbsp as a space in all filters beyond here
			$article->text = htmlentities($article->text, null, 'utf-8');
            $article->text = str_replace("&nbsp;", " ", $article->text);
			$article->text = html_entity_decode($article->text, null, 'utf-8');
		}
	}
?>