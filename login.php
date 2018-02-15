<?php require_once("includes/session.php"); ?>
<?php require_once("includes/connection.php"); ?>
<?php require_once("includes/functions.php"); ?>
<?php
    if(logged_in()){
        redirect_to("index.php");
    }
?>
<?php
include_once("includes/form_functions.php");

// START FORM PROCESSING
if (isset($_POST['submit'])) { // Form has been submitted.
    $errors=array();
    //perform Validation on the form data

    $required_fields=array('username','password');
    $errors=  array_merge($errors,  check_required_fields($required_fields,$_POST));

    $username=  trim(mysql_prep($_POST['username']));
    $password=  trim(mysql_prep($_POST['password']));

    if(empty($errors)){
        $query="SELECT * FROM 	ads_owner "
                . "WHERE email= '{$username}'"
                . " AND password='{$password}'"
                . " LIMIT 1";

        $result_set=  mysql_query($query);
        confirm_query($result_set);
        if(mysql_num_rows($result_set)==1){
            //success login
            $found_user=  mysql_fetch_array($result_set);
            $_SESSION['userID']=$found_user['id'];
            $_SESSION['Name']=$found_user['name'];
            $_SESSION['userName']=$found_user['email'];
            $_SESSION['type']=$found_user['userType_id'];
            redirect_to("index.php");
        }
        else {
            $message="the password or email incorrect";
        }
    }
    elseif (count($errors)==1) {
         $message="there was  1 error in the form";
    }
    else {
        $message="there were".count($errors)."errors in the form";
    }



} else { // Form has not been submitted.
    if(isset($_GET['logout'])&&$_GET['logout']==1){
        $message="You Are Now Logged Out. ";
    }
    $username = "";
    $password = "";
}
?>
<?php include("includes/header.php"); ?>
<div id="loginContain">

        <h1>Login</h1>
        <?php if (!empty($message)) {
            echo "<p class=\"message\">" . $message . "</p>";
        } ?>
        <?php if (!empty($errors)) {
            display_errors($errors);
        } ?>
        <form action="login.php" method="post">


            <input type="text" name="username"  value="<?php echo htmlentities($username);?>" placeholder="User Name" class="logininput" /> <br/>
            <input type="password" name="password"  value="<?php echo  htmlentities($password);?>" placeholder="Password" class="logininput" /> <br/>

            <input type="submit" name="submit" value="Login" />


        </form>

</div>
<?php include("includes/footer.php"); ?>
