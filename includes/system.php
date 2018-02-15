<?php

$link = mysql_connect('localhost', 'ahmed', 'ABDalmotleb');
if (!$link) {
    die('Not connected : ' . mysql_error());
}

$db_selected = mysql_select_db('ads_factory', $link);
if (!$db_selected) {
    die ('Can\'t use ads_factory : ' . mysql_error());
}



      
       
    function confirm_query($result_set){
            if (!$result_set) {
                    die("Database query failed: " . mysql_error());
                }
    }
        
    function get_all_products(){
        
            global $link;
            $query = "SELECT 	description ,product_image 
            FROM ads_factory.products 
             ";

            $products_set = mysql_query($query, $link);
            confirm_query($products_set);
            
            return $products_set;
            
    }
    include('php-nlp-tools-master/php-nlp-tools-master/autoloader.php');
    include 'php-sentence-master/classes/autoloader.php';
    include 'PHP-Web-Article-Extractor-master/src/autoloader.php';
    include 'summarizer-master/summarizer-master/summarizer.class.php';
    include 'php-teaser-master/src/PhpTeaser/Teaser.php';
    use \NlpTools\Tokenizers\WhitespaceTokenizer;
    use \NlpTools\Similarity\JaccardIndex;
    use \NlpTools\Similarity\CosineSimilarity;
    use NlpTools\Stemmers\PorterStemmer;
    use NlpTools\Utils\StopWords;
    
    
    function products($searchItem)
    {
        $url="http://localhost/Articales/viewArticle.php?article=17";
        $stopwords = array("a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the");
        $extractionResult = WebArticleExtractor\Extract::extractFromURL($url);
        $articleTextForDisplay = str_replace("\r\n",'<br />',$extractionResult->text);
		
		//echo sprintf('<b>Extracted Title:</b><br />%s<br /><br /><b>Extracted Article content:</b><br />%s<br /><br /><b>Detected Language:</b><br />%s<br /><br /><b>Source:</b><br />%s<br /><br /><b>Extracted Keywords:</b><br />',
		//$extractionResult->title,$articleTextForDisplay,$extractionResult->language,$extractionResult->source);
		$keywords=  implode(" ", $extractionResult->keywords);
		foreach($extractionResult->keywords as $keyword)
		{
			echo $keyword."<br/>";
		}
              // $text implode(" ", $keywords);

        
        // $st = new Summarizer();
       // $summary = $st->get_summary($searchItem);
	//echo $summary;
	
       

//$rake = new Rake('includes/stoplist_smart.txt');
//$text = "Criteria of compatibility of a system of linear Diophantine equations, strict inequations, and nonstrict inequations are considered. Upper bounds for components of a minimal set of solutions and algorithms of construction of minimal generating sets of solutions for all types of systems are given.";
//$phrases = $rake->extract($searchItem);
//$phrases=implode(" ", $phrases);

//print_r($phrases);

        
        
        
        $tok = new WhitespaceTokenizer();
        $cos = new CosineSimilarity();
        $jac =new JaccardIndex();
        $stem =new PorterStemmer();
        $RemStopWord=new StopWords($stopwords);
        $sentence=new Sentence;
        $products_set= get_all_products();
        $num=0;
        while ($products = mysql_fetch_array($products_set)) {
                  $count= count($products);
                
                 $setA = $tok->tokenize($keywords);
               
                  for($i=1;$i<$count/2;$i++)
                    {
                      $setB = $tok->tokenize($products[$i-1]);
                    
                      
                     
                      $sim = $jac->similarity($setA, $setB);
                      $sim=  round($sim,3);
                      if($sim >=0.1)
                      {
                          $result[]=array(array($sim,$products[$i]));
                          $num++;
                        //  echo "$sim <br>";
                         // echo "<img src=\"".$products[$i]."\" class=\"photo\"/> <br>";
                          
                      }
                        
                    }   
                }
                if (!isset($result)|| empty($result))
                    {
                        
                       // redirect_to(index.php);
                     //  echo $phrases;
                        echo "not found";
                        exit();
                    }
               // print_r($result);
                function compareMid($a, $b)
                    {
                        if ($a[0] == $b[0]) {
                            return 0;
                        }
                        return ($a[0] < $b[0]) ? 1 : -1;
                    }
                    usort($result, 'compareMid');
                
                    
               // print_r($result);
                 echo "<table>";
                 echo "<tr>"
                    ."<th>"."count"."</th>"
                    ."<th>"."similarity ratio"."</th>"		
                    ."<th>"."Product Image"."</th>"
                 ."</tr>";
                 for ($row=0; $row<$num; $row++) {

                    for ($col=0; $col<1; $col++) { 
                        echo "<tr>";
                        echo "<td>".$row."</td>";
                        echo "<td >".$result[$row][0][$col];
                        echo "<progress value=\"{$result[$row][0][$col]}\" max=\"0\"  >"."</progress> </td>" ;
                        echo "<td>"."<img src=\"".$result[$row][0][$col+1]."\" class=\"photo\" /></td> ";
                        echo"</tr>";
                        
                        
                    }
                }
                echo "</table>";
               
              
               
        
    }
     
    
            
           

