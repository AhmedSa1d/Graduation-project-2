<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class PostcontentFilterTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		// Test blocks
		private $blockZero;
		private $blockOne;
		private $blockTwo;
		private $blockThree;
		
		public function setUp()
		{
			$this->testDocument = new WebArticleExtractor\Article();
			$this->testDocument->textBlocks = array();
			
			$this->blockZero = new WebArticleExtractor\TextBlock();
			$this->blockZero->isContent = true;
			
			$this->blockOne = new WebArticleExtractor\TextBlock();
			$this->blockOne->numFullTextWords = WebArticleExtractor\Filters\PostcontentFilter::WORD_COUNT_THRESHOLD;
			$this->blockOne->labels[] = WebArticleExtractor\BlockLabels::END_BLOCK_LABEL;
			$this->blockOne->isContent = true;
			
			$this->blockTwo = new WebArticleExtractor\TextBlock();
			$this->blockTwo->isContent = true;
			
			$this->blockThree = new WebArticleExtractor\TextBlock();
			$this->blockThree->isContent = true;
			
			array_push($this->testDocument->textBlocks,$this->blockZero,$this->blockOne,$this->blockTwo,$this->blockThree);
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testPostcontentFiltering()
    	{
			WebArticleExtractor\Filters\PostcontentFilter::filter($this->testDocument);
			$this->assertTrue($this->blockZero->isContent);
			$this->assertFalse($this->blockOne->isContent);
			$this->assertFalse($this->blockTwo->isContent);
			$this->assertFalse($this->blockThree->isContent);
		}
	}
?>  