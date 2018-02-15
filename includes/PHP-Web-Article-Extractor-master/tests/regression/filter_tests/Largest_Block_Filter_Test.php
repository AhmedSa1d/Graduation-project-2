<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class LargestBlockFilterTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		// Test blocks
		private $smallBlock;
		private $mediumBlock;
		private $largeBlock;
		
		public function setUp()
		{
			$this->testDocument = new WebArticleExtractor\Article();
			$this->testDocument->textBlocks = array();
			
			$this->smallBlock = new WebArticleExtractor\TextBlock();
			$this->smallBlock->text = "Mangel greenhornism prelimitating";
			$this->smallBlock->numWords = 3;
			$this->smallBlock->isContent = true;
			
			$this->mediumBlock = new WebArticleExtractor\TextBlock();
			$this->mediumBlock->text = "Mangel greenhornism prelimitating compassionate addicted.";
			$this->mediumBlock->numWords = 5;
			$this->mediumBlock->isContent = true;
			
			$this->largeBlock = new WebArticleExtractor\TextBlock();
			$this->largeBlock->text = "Mangel greenhornism prelimitating compassionate addicted. Choate respicing fine indigotic nonforensically. Dysanagnosia juridical hiller subnutritious concomitance.";
			$this->largeBlock->numWords = 15;
			$this->largeBlock->isContent = true;
			
			array_push($this->testDocument->textBlocks,$this->smallBlock,$this->largeBlock,$this->mediumBlock);
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testFilteringOfLargestBlock()
		{
			WebArticleExtractor\Filters\LargestBlockFilter::filter($this->testDocument);
			$filteredLargestBlock;
			
			foreach($this->testDocument->textBlocks as $block)
			{
				if($block->isContent)
				{
					$filteredLargestBlock = $block;
					break;
				}
			}
			
			$this->assertEquals($this->largeBlock, $filteredLargestBlock);
		}
	}
?>  