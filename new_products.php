<?php require_once 'includes/session.php'; ?>
<?php require_once("includes/connection.php"); ?>
<?php require_once("includes/functions.php"); ?>
<?php include_once("includes/form_functions.php"); ?>
<?php confirm_loggin(); ?>
<?php
//start form processing
if (isset($_POST['submit'])) {//form submitted
    $errors = array();
    $required_fields = array('product_Name', 'price', 'country', 'description', 'product_image','product_video');
    $errors = array_merge($errors, check_required_fields($required_fields, $_POST));

    $product_Name = trim(mysql_prep($_POST['product_Name']));
    $price = trim(mysql_prep($_POST['price']));
    $country = trim(mysql_prep($_POST['country']));
    $description = trim(mysql_prep($_POST['description']));
    $product_image = trim(mysql_prep($_POST['product_image']));
    $product_video = trim(mysql_prep($_POST['product_video']));
    
    if (empty($errors)) {
        $query = "INSERT INTO products "
                . "(product_Name, price, country, company_Name, description,product_image,product_video)"
                . " VALUES('{$product_Name}','{$price}','{$country}','{$_SESSION['userID']}','{$description}','{$product_image}','{$product_video}')";
        echo $query;
        $result = mysql_query($query, $connection);

        //confirm_query($result);

        if ($result) {
            $message = "the ads is inserted ";
            redirect_to("profile.php");
        } else {
            $message = "the user coudn't be created";
            $message = "<br/>" . mysql_error();
        }
    } elseif (count($errors) == 1) {
        $message = "there is 1 error in the form  ";
    } else {
        $message = "there are " . count($errors) . "  in the form";
    }
} else {
    $product_Name= "";
    $price = "";
    $description = "";
    $product_image = "";
    $product_video = "";
}
?>

<?php if (!empty($message)) {
            echo "<p class=\"message\">" . $message . "</p>";
        } ?>
        <?php if (!empty($errors)) {
            display_errors($errors);
        } ?>
<form action="new_products.php"  method='post' >


    <input type="text" name="product_Name" value="<?php htmlentities($product_Name)?>" class="signupinput" placeholder="Product Name"  /><br/>
    <input type="text" name="price" value="<?php htmlentities($price)?>"  class="signupinput" placeholder="Product Price" /><br/>
    <?php
    countries();
    ?>
    <br/><textarea type="text" name="description" value="<?php htmlentities($description)?>"  id="prod_description" placeholder="Description" ></textarea><br/>
    <input  type="text"  name="product_image" value="<?php htmlentities($product_image)?>" class="signupinput" placeholder="product Image" /><br/>
    <input type="text" name="product_video" value="<?php htmlentities($product_video)?>" value="" class="signupinput" placeholder="Video Link"  /><br/>
    <input type="submit" name="submit" value="Submit"  id="add_product" /> <br/>


</form>
<?php mysql_close($connection); ?>
