#!/bin/bash
#
# Command line interface for PHP Web Article Extractor 
# https://github.com/zackslash/PHP-Web-Article-Extractor
#

echo "" | php -R 'include("example.php");' -B 'parse_str($argv[1], $_GET);' "article=$1"