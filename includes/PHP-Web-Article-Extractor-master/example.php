<?php
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	require_once '../../autoload.php';
	
	if(isset($_GET['article']))
	{
		$extractionResult = WebArticleExtractor\Extract::extractFromURL($_GET['article']);
		
		if(!isset($extractionResult)) 
		{
			return;
		}
		
		// Replace newlines with breaks for demonstration
		$articleTextForDisplay = str_replace("\r\n",'<br />',$extractionResult->text);
		
		echo sprintf('<b>Extracted Title:</b><br />%s<br /><br /><b>Extracted Article content:</b><br />%s<br /><br /><b>Detected Language:</b><br />%s<br /><br /><b>Source:</b><br />%s<br /><br /><b>Extracted Keywords:</b><br />',
		$extractionResult->title,$articleTextForDisplay,$extractionResult->language,$extractionResult->source);
		
		foreach($extractionResult->keywords as $keyword)
		{
			echo $keyword."<br/>";
		}
		
		//Uncomment this line for raw result
		//echo json_encode($extractionResult);
	}
	else
	{
		echo "Specify a URL as 'article' parameter e.g.: example.php?article=http://techcrunch.com/2015/09/02/more-shots-of-frankenblackberry/";
	}
?>
    