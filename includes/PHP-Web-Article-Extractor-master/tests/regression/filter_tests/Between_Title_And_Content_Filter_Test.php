<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class BetweenTitleAndContentFilterTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		public function setUp()
		{
			$this->testDocument = new WebArticleExtractor\Article();
			
			// This block is not content but has the title label
			$titleBlock = new WebArticleExtractor\TextBlock();
			$titleBlock->labels[] = WebArticleExtractor\BlockLabels::TITLE_LABEL;
			
			$betweenBlock = new WebArticleExtractor\TextBlock();
			
			//At the beginning of the test this block is explicitly not content
			$betweenBlock->isContent = false;
			$betweenBlock->text = "This block is between content and title";
			
			//This block is content closest to the title
			$contentBlock = new WebArticleExtractor\TextBlock();
			$contentBlock->isContent = true;
			$contentBlock->text = "This is the content block";
			
			
			$noncontentBlock = new WebArticleExtractor\TextBlock();
			$this->testDocument->textBlocks = array();
			
			array_push($this->testDocument->textBlocks,$titleBlock,$betweenBlock,$contentBlock,$noncontentBlock);
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testMarkingAsContentBetweenExistingContentAndTitle()
		{
			WebArticleExtractor\Filters\BetweenTitleAndContentFilter::filter($this->testDocument);
			$this->assertTrue($this->testDocument->textBlocks[1]->isContent);
		}
	}
?>  