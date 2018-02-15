<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class NumberOfWordsFilterTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		// Test blocks
		private $blockOne;
		private $blockTwo;
		private $blockThree;
		
		private $successText = "This is content";
		
		public function setUp()
		{
			$this->testDocument = new WebArticleExtractor\Article();
			$this->testDocument->textBlocks = array();
			
			$this->blockOne = new WebArticleExtractor\TextBlock();
			$this->blockOne->text = "Should be marked as Not Content";
			$this->blockOne->numWords = 12;
			$this->blockOne->linkDensity = 0.4;
			$this->blockOne->isContent = false;
			
			$this->blockTwo = new WebArticleExtractor\TextBlock();
			$this->blockTwo->text = $successText;
			$this->blockTwo->numWords = 17;
			$this->blockTwo->linkDensity = 0.2;
			$this->blockTwo->isContent = false;
			
			$this->blockThree = new WebArticleExtractor\TextBlock();
			$this->blockThree->text = "Should be marked as Not Content";
			$this->blockThree->numWords = 5;
			$this->blockThree->linkDensity = 1.0;
			$this->blockThree->isContent = false;
			
			array_push($this->testDocument->textBlocks,$this->blockOne,$this->blockTwo,$this->blockThree);
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testFilteringByNumberOfWords()
		{
			WebArticleExtractor\Filters\NumberOfWordsFilter::filter($this->testDocument);
			$this->assertFalse($this->blockOne->isContent);
			$this->assertTrue($this->blockTwo->isContent);
			$this->assertFalse($this->blockThree->isContent);
		}
	}
?>  