<?php require_once 'includes/session.php'; ?>
<?php require_once("includes/connection.php"); ?>
<?php require_once("includes/functions.php"); ?>
<?php include_once("includes/form_functions.php"); ?>
<?php confirm_loggin(); ?>
<?php
//start form processing
if (isset($_POST['submit'])) {//form submitted
    $errors = array();
    $required_fields = array('name', 'link');
    $errors = array_merge($errors, check_required_fields($required_fields, $_POST));

    $name = trim(mysql_prep($_POST['name']));
    $link = trim(mysql_prep($_POST['link']));
    
    
    
    if (empty($errors)) {
        $query = "INSERT INTO site "
                . "(id, name, link, site_owner_id)"
                . " VALUES('{$id}','{$name}','{$link}','{$_SESSION['userID']}')";
        
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
    $name = "";
    $link = "";
}
?>

<?php if (!empty($message)) {
            echo "<p class=\"message\">" . $message . "</p>";
        } ?>
        <?php if (!empty($errors)) {
            display_errors($errors);
        } ?>
<form action="new_site.php"  method='post' >


    <input type="text" name="name" value="<?php htmlentities($name)?>" class="signupinput" placeholder="site Name"  /><br/>
    <input type="text" name="link" value="<?php htmlentities($link)?>"  class="signupinput" placeholder="site link" /><br/>
    <input type="submit" name="submit" value="Submit"   /> <br/>


</form>

