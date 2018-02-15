<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class CloseBlockMergerTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		// Test blocks
		private $blockZero;
		private $blockOne;
		private $blockTwo;
		private $blockThree;
		
		private $resultArticle = "This should be\r\n\r\nthe\r\n\r\nresult.";
		
		public function setUp()
		{
			$this->testDocument = new WebArticleExtractor\Article();
			$this->testDocument->textBlocks = array();
			
			$this->blockZero = new WebArticleExtractor\TextBlock();
			$this->blockZero->text = "This should be";
			$this->blockZero->isContent = false;
			
			$this->blockOne = new WebArticleExtractor\TextBlock();
			$this->blockOne->text = "the";
			$this->blockOne->isContent = true;
			
			$this->blockTwo = new WebArticleExtractor\TextBlock();
			$this->blockTwo->text = "result.";
			$this->blockTwo->isContent = true;
			
			array_push($this->testDocument->textBlocks,$this->blockZero,$this->blockOne,$this->blockTwo);
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testMarkingAsContentBetweenExistingContentAndTitle()
		{
			WebArticleExtractor\mergers\CloseBlockMerger::merge($this->testDocument);
			$this->assertEquals($this->resultArticle,$this->testDocument->textBlocks[0]->text);
		}
	}
?>  