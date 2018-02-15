<?php namespace WebArticleExtractor;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	/*
	*	Primary object returned by this library
	*	this object is operated on and eventually contains the
	*	'clean' data.
	*/
	class Article
	{
		/**
		*	The title of the article
		*
		*	@var string
		*/
		public $title;
		
		/**
		*	The article's text (Actual result article body)
		*
		*	@var string
		*/
		public $text;
		
		/**
		*	The raw text blocks of article
		*
		*	@var array
		*/
		public $textBlocks;
		
		/**
		*	ISO 639-1 code for the detected language of the article
		*	example: If the detected language is english 
		*	then this variable will contain 'en'
		*
		*	@var string
		*/
		public $language;
		
		/**
		*	The detected keywords of the article
		*
		*	@var array
		*/
		public $keywords;
		
		/**
		*	A reference to the origional article source
		*	For reference only; remains unmodified from origional input.
		*
		*	@var array
		*/
		public $source;
	}
?>  