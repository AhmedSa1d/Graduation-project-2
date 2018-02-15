<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	class EndBlockFilterTest extends PHPUnit_Framework_TestCase  
	{
		// Test document instance
		private $testDocument;
		
		// Expected result
		private $expectedTitle = 'GABE NEWELL DISCUSSES POSSIBILITY OF HALF-LIFE 3';
		
		// HTML page for text extraction
		private $testHTMLPage = <<<EOL
<!DOCTYPE html>
<html>
<head>
<title>GABE NEWELL DISCUSSES POSSIBILITY OF HALF-LIFE 3</title>
</head>
<body>
<h1>GABE NEWELL DISCUSSES POSSIBILITY OF HALF-LIFE 3</h1>
<div>
Valve boss Gabe Newell recently shared his thoughts on the future of the Half-Life franchise, and 
how the company he co-founded many years ago has evolved into a service 
platform as it shifts away from game development.
</div>

<div>
During an interview with Geoff Keighley in a one-off podcast called GameSlice (via Polygon), 
Newell was asked whether or not fans will ever see a proper Half-Life 3. Newell replied: "The only 
reason we'd go back and do like a super classic kind of product is if a whole bunch of people just 
internally at Valve said they wanted to do it and had a reasonable explanation for why [they did]."
</div>

<!--- This is the end block --->
<div>comments<div/>

<div>
This is not content This is not content This is not content This is not content This is not content 
This is not content This is not content This is not content This is not content This is not content 
This is not content This is not content This is not content This is not content This is not content 
</div>

</body>
</html>
EOL;
		
		public function setUp()
		{
			$parser = new WebArticleExtractor\HTMLParser();
			$this->testDocument = $parser->parse($this->testHTMLPage);
		}
		
		public function tearDown()
		{
			$testDocument = null;
		}
	
		public function testRemovingContentAfterEndBlock()
		{
			WebArticleExtractor\Filters\EndBlockFilter::filter($this->testDocument);
			
			$endBlockDetected = false;
			foreach($this->testDocument->textBlocks as $block)
			{
				if(in_array(WebArticleExtractor\BlockLabels::END_BLOCK_LABEL,$block->labels))
				{
					if($block->text === "comments")
					{
						$endBlockDetected = true;
						break;
					}
				}
			}
			
			$this->assertTrue($endBlockDetected);
		}
	}
?>  