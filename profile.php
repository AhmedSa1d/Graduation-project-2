<?php require_once("includes/session.php"); ?>
<?php require_once("includes/connection.php"); ?>
<?php require_once("includes/functions.php"); ?>
<?php confirm_loggin(); ?>
<?php include("includes/header.php"); ?>
<div id="profile" >
    <div id="profHead">
        <?php
        echo "<h2>welcome  " . $_SESSION['Name'] . "  this is your profile </h2>";

    $query = "SELECT * FROM ads_owner "
            . "WHERE email= '{$_SESSION['userName']}'";

    $result_set = mysql_query($query);
    confirm_query($result_set);
    $found_user = mysql_fetch_array($result_set);
    $_SESSION['userID'] = $found_user['id'];
    $_SESSION['type'] = $found_user['userType_id'];
    echo "<ul id=\"info\">";

        echo "<li>" ."Name:   ". $found_user['name'] . "</li>";
        echo "<li>" ."Email:  ". $found_user['email'] . "</li>";
        echo "<li>" ."Phone:  ". $found_user['phone'] . "</li";   
    echo "</ul>"; ?>
    </div>
    <div id="profCont">
        
        
        <?php

     if (isset($_SESSION['type'])) {
        if ($_SESSION['type'] == 1) {
            echo "<h3>"."Your Ads Information"."</h3>";
            $query = "SELECT * FROM products "
                    . "WHERE company_Name= '{$found_user['id']}'";

            $ads_set = mysql_query($query);
            confirm_query($ads_set);
            
            echo "<table>";
            echo "<tr>"
            . "<th>" . "count" . "</th>"
            . "<th>" . "Product Name" . "</th>"
            . "<th>" . "Product Image" . "</th>"
            . "<th>" . "# Views" . "</th>"
            . "<th>" . "# Clicks" . "</th>"
            . "</tr>";
            
            $count = 0;
            while ($found_ads = mysql_fetch_array($ads_set)) {

                $count++;
                echo "<tr>";
                echo "<td>" . $count . "</td>";
                echo "<td >" . $found_ads['product_Name'] . "</td>";
                echo "<td>" . "<img src=\"" . $found_ads['product_image'] . "\" class=\"photo\" /></td> ";
                echo "<td >" . ViewNum($found_ads['Product_ID']) . "</td>";
                echo "<td >" . ClickNum($found_ads['Product_ID']) . "</td>";
                echo"</tr>";
            }

            echo "</table>";
        } else {
            echo "<h3>"."Your Sites Information"."</h3>";

            $query = "SELECT * FROM site "
                    . "WHERE site_owner_id= '{$found_user['id']}'";

            $ads_set = mysql_query($query);
            confirm_query($ads_set);

            echo "<table>";
            echo "<tr>"
            . "<th>" . "count" . "</th>"
            . "<th>" . "Product Name" . "</th>"
            . "<th>" . "Product Image" . "</th>"
            . "</tr>";
            $count = 0;
            while ($found_ads = mysql_fetch_array($ads_set)) {

                $count++;
                echo "<tr>";
                echo "<td>" . $count . "</td>";
                echo "<td >" . $found_ads['name'] . "</td>";
                echo "<td>" . "<a href=\"" . $found_ads['link'] . "\">" . $found_ads['link'] . "</a></td>";
                echo"</tr>";
            }

            echo "</table>";
        }
    } else {
        echo 'login first';
    }
    ?> 
        
    </div>
</div>


<?php include("includes/footer.php"); ?>
