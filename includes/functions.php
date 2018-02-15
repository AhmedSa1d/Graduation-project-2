<?php

function mysql_prep($value){
        $magic_quotes_active= get_magic_quotes_gpc();
        $new_enough_php = function_exists("mysql_real_escape_string");
        //i.e php >= v4.3.0
        if($new_enough_php){
                //php v4.3.0 or higher undo any magic quote effects 
                //so mysql_real_escape_string can do the work
                if($magic_quotes_active){
                        $value = stripslashes($value);
                }
                $value = mysql_real_escape_string($value);
        }

        else {
                //before php V4.3.0
                //if magic quotes aren't already on add slashes manually
                if(!$magic_quotes_active){$value = addcslashes($value);}
                //if magic quotes are active, then the then the slashes already exist
        }
        return $value;
        }
function confirm_query($result_set)
	{
		if (!$result_set) {
				die("Database query failed: " . mysql_error());
			}
	}
	
	
        function redirect_to($location=NULL)
	{
		if($location !=NULL){
			header("Location: {$location}");
			exit;
		}
	}
        
            function get_all_countries()
            {
                    global $connection;
                    $query = "SELECT * 
                    FROM country
                    ORDER BY  id ASC ";

                    $countries_set = mysql_query($query, $connection);
                    confirm_query($countries_set);
                    return $countries_set;
       
            }
            function countries()
            {
                $countries_set= get_all_countries();
                echo "<select name=\"country\" class=\"signupinput\">";
                
               
                while ($country = mysql_fetch_array($countries_set)) {

                        echo "<option value=".$country['id'].">".$country['name']."</option>";
                   
                }
                echo "</select>";
            }
            function ViewNum($product_id){
                    global $connection;
                    $query = "SELECT * 
                    FROM view
                    WHERE Ads_ID={$product_id} ";
                    
                    $view_set = mysql_query($query, $connection);
                    confirm_query($view_set);
                    $found_view= mysql_fetch_array($view_set);
                    return $found_view['view_number'] ;
                
            }
            function ClickNum($product_id){
                    global $connection;
                    $query = "SELECT * 
                    FROM click
                    WHERE ads_id={$product_id} ";
                    
                    $click_set = mysql_query($query, $connection);
                    confirm_query($click_set);
                    $found_click= mysql_fetch_array($click_set);
                    return $found_click['click_number'] ;
                
            }










        function test_input($data) {
            $data = trim($data);
            $data = stripslashes($data);
            $data = htmlspecialchars($data);
            return $data;
          }
   
        

?>