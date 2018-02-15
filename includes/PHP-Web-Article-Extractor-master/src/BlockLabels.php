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
	*	BlockLabels defines the constants used as descriptors for TextBlocks
	*/
	class BlockLabels
	{
		/**
         * Label assigned to blocks that are detected as
         * marking the 'end' of an article.
         *
         * @var string
         */
		const END_BLOCK_LABEL = 'END BLOCK';
		
		/**
         * Label for blocks that are tentatively detected as article content
         *
         * @var string
         */
		const POSSIBLY_CONTENT_LABEL = 'POSSIBLY CONTENT';
		
		/**
         * Label for blocks that are detected as marking the 'end' of an article.
         *
         * @var string
         */
		const TITLE_LABEL = 'TITLE';
	}
?>