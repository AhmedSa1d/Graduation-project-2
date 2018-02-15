<?php namespace WebArticleExtractor;
	/**
	 *	PHP Web Article Extractor
	 *	A PHP library to extract the primary article content of a web page.
	 *	
	 *	@author Luke Hines
	 *	@link https://github.com/zackslash/PHP-Web-Article-Extractor
	 *	@licence: PHP Web Article Extractor is made available under the MIT License.
	 */
	
	/**
	*	ResourceProvider loads resources from disk into memory
	*	all resources come from this libraries 'res' directory/
	*/
	class ResourceProvider
	{
	
		/**
		*	The usable content of this resource instance
		*
		*	@var array
		*/
		public $resourceContent;
		
		/*
		*	Instance constructor
		*
		*	@param  string  $resourceLocation the disk path to the resource file or folder
		*	input of a file will load the single resource, a folder will load all resources in that directory
		*/
		function __construct($resourceLocation) 
		{
			 // Attempting to load resource file
			if((($temp = strlen($resourceLocation) - strlen(".lst")) >= 0 && strpos($resourceLocation, ".lst", $temp) !== FALSE))
			{
				$this->loadResource($resourceLocation);
			}
			else // Attempting to load resource directory
			{
				$this->loadResourceDirectory($resourceLocation);
			}
		}
	
		/**
		*	Flattens a multidimentional array
		*
		*	@param  array  $array the multidimensional array to flatten
		*	@return array Flattened version of the array
		*/
		private function flatten(array $array) 
		{
			$return = array();
			array_walk_recursive($array, function($a) use (&$return) { $return[] = $a; });
			return $return;
		}
		
		/**
		*	Parses a resource file (.lst) to an array of strings
		*
		*	@param  string  $resourceLocation the disk path to the resource
		*	@return array resource as array of string
		*/
		private function readResourceToArray($resourceLocation)
		{
			$resource = array_map('str_getcsv', file($resourceLocation));
			return $this->flatten($resource);
		}
		
		/**
		*	Loads resource into memory by name only into this instance's resourceContent
		*
		*	@param  string  $resourceName name of the resource to load.
		*/
		public function loadResource($resourceName)
		{
			$resourceLocation = dirname(__FILE__).DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."res".DIRECTORY_SEPARATOR.$resourceName;
			$this->resourceContent = $this->readResourceToArray($resourceLocation);
		}
		
		/**
		*	Loads all resources found in a directory into memory by name only into this instance's resourceContent
		*
		*	@param  string  $resourceName name of the directory to load
		*/
		public function loadResourceDirectory($directoryName)
		{
			$resourceLocation = dirname(__FILE__).DIRECTORY_SEPARATOR."..".DIRECTORY_SEPARATOR."res".DIRECTORY_SEPARATOR.$directoryName;
			$results = array();
			
			foreach (scandir($resourceLocation) as $file) 
			{
    			//Only load file if it has a .lst extention (list)
				if((($temp = strlen($file) - strlen(".lst")) >= 0 && strpos($file, ".lst", $temp) !== FALSE))
				{
					$fileEntry = array();
					$fileKey = str_replace(".lst","",$file);
					$fileEntry[0] = $fileKey;
					$fileEntry[1] = $this->readResourceToArray($resourceLocation.DIRECTORY_SEPARATOR.$file);
					$results[] = $fileEntry;
				}
			}
			$this->resourceContent = $results;
		}
	}
?>  