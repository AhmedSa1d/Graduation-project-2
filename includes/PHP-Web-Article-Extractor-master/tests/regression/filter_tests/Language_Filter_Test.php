<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class LanguageFilterTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		// Plain text article to test extraction
		private $englishTestArticle = <<<EOL
By Alex Osborn 
Valve boss Gabe Newell recently shared his thoughts on the future of the Half-Life franchise, and how the company he co-founded many years ago has evolved into a service platform as it shifts away from game development.
During an interview with Geoff Keighley in a one-off podcast called GameSlice (via Polygon), Newell was asked whether or not fans will ever see a proper Half-Life 3. Newell replied: "The only reason we'd go back and do like a super classic kind of product is if a whole bunch of people just internally at Valve said they wanted to do it and had a reasonable explanation for why [they did]." 01:24
"But you know if you want to do another Half-Life game and you want to ignore everything we've learned in shipping Portal 2 and in shipping all the updates on the multiplayer side, that seems like a bad choice," Newell continued. "So we'll keep moving forward. But that doesn't necessarily always mean what people are worried that it might mean."
Make of that what you will, but it appears Newell isn't willing to commit to either confirming the existence of Half-Life 3 or squashing the hopes of fans once and for all.
Valve just recently unveiled the Source 2 engine and a VR headset it's creating with HTC to bring to market. Putting those two together sounds like a fantastic way to create a new experience for Half-Life fans.
Alex Osborn is a freelance writer for IGN. You can follow him on Twitter @alexcosborn and chat with him about how awesome it would be to experience Half-Life 3 in VR. 
EOL;
		
		public function setUp()
		{
			$this->testDocument = new WebArticleExtractor\Article();
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testLanguageDetection()
		{
			$DetectionSuccess = false;
    		
			//English
			$this->testDocument->text = $this->englishTestArticle;
			WebArticleExtractor\Filters\LanguageFilter::filter($this->testDocument);
			$DetectionSuccess = $this->testDocument->language === "en";
			
			$this->assertEquals(true, $DetectionSuccess);
		}
	}
?>  