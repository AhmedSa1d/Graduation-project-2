<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class NonContentFilterTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		// Test blocks
		private $blockOne;
		private $blockTwo;
		private $blockThree;
		
		public function setUp()
		{
			$this->testDocument = new WebArticleExtractor\Article();
			$this->testDocument->textBlocks = array();
			
			$this->blockOne = new WebArticleExtractor\TextBlock();
			$this->blockOne->text = "Mangel greenhornism prelimitating";
			$this->blockOne->numWords = 3;
			$this->blockOne->isContent = false;
			
			$this->blockTwo = new WebArticleExtractor\TextBlock();
			$this->blockTwo->text = "Mangel greenhornism prelimitating compassionate addicted.";
			$this->blockTwo->numWords = 5;
			$this->blockTwo->isContent = true;
			
			$this->blockThree = new WebArticleExtractor\TextBlock();
			$this->blockThree->text = "Mangel greenhornism prelimitating compassionate addicted. Choate respicing fine indigotic nonforensically. Dysanagnosia juridical hiller subnutritious concomitance.";
			$this->blockThree->numWords = 15;
			$this->blockThree->isContent = false;
			
			array_push($this->testDocument->textBlocks,$this->blockOne,$this->blockTwo,$this->blockThree);
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testRemovalOfNoncontent()
		{
			WebArticleExtractor\Filters\NonContentFilter::filter($this->testDocument);
			$this->assertEquals(1, sizeof($this->testDocument->textBlocks));
		}
	}
?>  