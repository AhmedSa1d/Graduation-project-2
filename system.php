<?php

include('includes/php-nlp-tools-master/php-nlp-tools-master/autoloader.php');
include 'includes/PHP-Web-Article-Extractor-master/src/autoloader.php';
use \NlpTools\Tokenizers\WhitespaceTokenizer;
use \NlpTools\Similarity\JaccardIndex;
use \NlpTools\Similarity\CosineSimilarity;



if( $_POST['url'] )
{


  echo json_encode ( products($_POST['url']) );

}

function get_all_products(){


   }


function products($url) {
    // $url="http://localhost/Articales/viewArticle.php?article=17";


    $link = mysql_connect('localhost', 'root', '');
    if (!$link) {
        die('Not connected : ' . mysql_error());
    }

    $db_selected = mysql_select_db('ads_factory', $link);
    if (!$db_selected) {
        die('Can\'t use ads_factory : ' . mysql_error());
    }


    $query1 = "SELECT product_Name,description ,product_image FROM ads_factory.products";
    $products_set = mysql_query($query1, $link);



    $extractionResult = WebArticleExtractor\Extract::extractFromURL($url);
    $keywords = implode(" ", $extractionResult->keywords);
    $tok = new WhitespaceTokenizer();
        $cos = new CosineSimilarity();
        $jac =new JaccardIndex();

        $num=0;
        while ($products = mysql_fetch_array($products_set)) {
                 $setA = $tok->tokenize($keywords);
                      $setB = $tok->tokenize($products['description']);
                      $sim = $jac->similarity($setA, $setB);
                      $sim=  round($sim,3);
                      //echo "<br/>".$sim;
                      if($sim >=0.1)
                      {
                          $result[]=array(array($sim,$products['product_Name'],$products['product_image'] ,$products['description'] ));
                          $num++;

                      }

                }
                if (!isset($result)|| empty($result))
                    {
                        echo "not found";
                        exit();
                    }

                    function compareMid($a, $b)
                    {
                        if ($a[0] == $b[0]) {
                            return 0;
                        }
                        return ($a[0] < $b[0]) ? 1 : -1;
                    }
                    usort($result, 'compareMid');


                    $final = array();
                    for($i = 0 ; $i < count($result) ; $i++ )
                    {
                        if($i == 2)
                          break;

                          array_push($final ,$result[$i] );
                    }


                   return $final;



}
