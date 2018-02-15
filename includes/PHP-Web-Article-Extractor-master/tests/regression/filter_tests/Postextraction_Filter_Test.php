<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class PostextractionFilterTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		// Test blocks
		private $blockZero;
		private $blockOne;
		private $blockTwo;
		private $blockThree;
		
		private $resultArticle = "This should be the result. ";
		
		public function setUp()
		{
			$this->testDocument = new WebArticleExtractor\Article();
			$this->testDocument->textBlocks = array();
			
			$this->blockZero = new WebArticleExtractor\TextBlock();
			$this->blockZero->text = "This should be";
			$this->blockZero->isContent = true;
			
			$this->blockOne = new WebArticleExtractor\TextBlock();
			$this->blockOne->text = "(but sadly is not)";
			$this->blockOne->isContent = false;
			
			$this->blockTwo = new WebArticleExtractor\TextBlock();
			$this->blockTwo->text = "the";
			$this->blockTwo->isContent = true;
			
			$this->blockThree = new WebArticleExtractor\TextBlock();
			$this->blockThree->text = "result.";
			$this->blockThree->isContent = true;
			
			array_push($this->testDocument->textBlocks,$this->blockZero,$this->blockOne,$this->blockTwo,$this->blockThree);
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testPostextractionFilter()
		{
			WebArticleExtractor\Filters\PostextractionFilter::filter($this->testDocument);
			$this->assertEquals($this->resultArticle, $this->testDocument->text);
		}
	}
?>  