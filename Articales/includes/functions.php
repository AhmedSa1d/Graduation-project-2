<?php

include 'includes/connection.php';

function mysql_prep($value) {
    $magic_quotes_active = get_magic_quotes_gpc();
    $new_enough_php = function_exists("mysql_real_escape_string");
    //i.e php >= v4.3.0
    if ($new_enough_php) {
        //php v4.3.0 or higher undo any magic quote effects 
        //so mysql_real_escape_string can do the work
        if ($magic_quotes_active) {
            $value = stripslashes($value);
        }
        $value = mysql_real_escape_string($value);
    } else {
        //before php V4.3.0
        //if magic quotes aren't already on add slashes manually
        if (!$magic_quotes_active) {
            $value = addcslashes($value);
        }
        //if magic quotes are active, then the then the slashes already exist
    }
    return $value;
}

function confirm_query($result_set) {
    if (!$result_set) {
        die("Database query failed: " . mysql_error());
    }
}

function get_all_articles() {
    global $connection;
    $query = "SELECT * 
		FROM article 
		ORDER BY  articleID ASC ";
    $articles_set = mysql_query($query, $connection);
    confirm_query($articles_set);
    //echo $articles_set;
    return $articles_set;
}

function sel_user_byID($ID) {
    global $connection;
    $query = "SELECT userName ,UserPhoto
             FROM user 
             WHERE userID =$ID ";
    // echo $query;
    $user_set = mysql_query($query, $connection);
    confirm_query($user_set);
    return $user_set;
}

function user($ID) {
    $user_set = sel_user_byID($ID);
    while ($user = mysql_fetch_array($user_set)) {
        echo "<div id=\"u_photo\">";
        echo "<img src=\"images/" . $user[1] . "\"/>";
        echo "</div>";
        echo "<div id=\"u_name\">";
        echo "<p>" . $user[0] . "</p>";
        echo "</div>";
    }
}
function view_user($id){
    global $sel_user;
    if(isset($_GET['article']))
    {
        $sel_user=  sel_user_byID($id);
    }    
}

function articles() {
    
    $articles_set = get_all_articles();
    while ($artilce = mysql_fetch_array($articles_set)) {
        echo "<div class=\"Articles\">";
            echo "<div id=\"A_photo\">";
            echo "<img src=\"images/" . $artilce['articlePhoto'] . "\"/>";
            echo "</div>";
            echo "<div id=\"A_title\">";
            echo "<a href=\"viewArticle.php?article=".urlencode($artilce['articleID'])."\"><p>" 
                    . $artilce['articleTitle'] . "</p></a>";
            echo "</div>";
            echo "<div id=\"user1\">";
            user($artilce['userID']);
            echo "</div>";
            echo "<div id=\"tags\">";

            echo "<p>" . $artilce['articleTags'] . "</p>";
            echo "</div>";
        echo "</div>";
    }
    
}

function get_article_byID($article_id) {
    global $connection;
    $query = "SELECT * ";
    $query .="FROM article ";
    $query .="WHERE articleID=" . $article_id;
    $query . " LIMIT 1";
    $result_set = mysql_query($query, $connection);
    confirm_query($result_set);
    if ($article = mysql_fetch_array($result_set)) {
        return $article;
    } else {
        return null;
    }
}
function view_article(){
    global $sel_article;
    if(isset($_GET['article']))
    {
        $sel_article=  get_article_byID($_GET['article']);
    }    
}
function sid_articales(){
    
    $articles_set = get_all_articles();
    while ($artilce = mysql_fetch_array($articles_set)) {
        echo "<div class=\"s_content\">";
        echo "<div id=\"s_photo\">";
            echo "<img src=\"images/" . $artilce['articlePhoto'] . "\"/>";
        echo "</div>";
        echo "<div id=\"s_text\">";
            echo "<a href=\"viewArticle.php?article=".urlencode($artilce['articleID'])."\"><p>" 
                    . $artilce['articleTitle'] . "</p></a>";
        echo "</div>";
        echo "</div>";
    }
    
}
                    
                    
                