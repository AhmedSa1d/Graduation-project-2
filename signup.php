<?php require_once 'includes/session.php'; ?>
<?php require_once("includes/connection.php"); ?>
<?php require_once("includes/functions.php"); ?>
<?php include_once("includes/form_functions.php"); ?>
<?php
    //start form processing
    if(isset($_POST['submit'])){//form submitted
        $errors =array();
        $required_fields=array('type','name','email','password','phone') ;
        $errors=  array_merge($errors,  check_required_fields($required_fields,$_POST));
        
        $type= trim(mysql_prep($_POST['type']));
        $name=  trim(mysql_prep($_POST['name']));
        $email=  trim(mysql_prep($_POST['email']));
        $password=  trim(mysql_prep($_POST['password']));
        $phone=  trim(mysql_prep($_POST['phone']));
       
        if(empty($errors)){
            $query="INSERT INTO ads_owner "
                    . "(name, email, phone, password, userType_id)"
                    . " VALUES('{$name}','{$email}','{$phone}','{$password}','{$type}')";
                  
            $result=  mysql_query($query,$connection);
            
            //confirm_query($result);
            
            if($result){
                $message="the user successfully created"; 
                
            $_SESSION['Name']=$name;
            $_SESSION['userName']=$email;
            logged_in();
            redirect_to("index.php");
            }
            else{
                $message="the user coudn't be created";
                $message="<br/>".mysql_error();
            }
        }
        elseif (count($errors)==1) {
            $message="there is 1 error in the form  ";
        }
        else{
            $message="there are ".count($errors)."  in the form";
        }
        
                
    }
    else {
        $name="";
        $email="";
        $password="";
        $phone="";
    }


?>
<?php include("includes/header.php"); ?>
<div id="signupContain">
    <h1>SIGN UP</h1>
    <?php if (!empty($message)) {
            echo "<p class=\"message\">" . $message . "</p>";
        } ?>
        <?php if (!empty($errors)) {
            display_errors($errors);
        } ?>
    <form action="signup.php" method="post">
        <p>First Choose User Type</p>
        <select name="type" class="signupinput">
            <option value="1">Ads Owner</option>
            <option value="2">Web Site Owner</option>
        </select><br/>
        <input type="text" name="name"  value="<?php htmlentities($name);?>" placeholder="Full name" class="signupinput"/><br/>
        <input type="text" name="email" value="<?php htmlentities($email);?>"   placeholder="Email address" class="signupinput"/><br/>
        <input type="password" name="password" value="<?php htmlentities($password);?>"   placeholder="Password" class="signupinput"/><br/>
        <input type="number" name="phone" value="<?php htmlentities($phone);?>"   placeholder="phone number" class="signupinput"/><br/>
        <input type="submit" name="submit" value="Sign Up" />
        
    </form>
</div>

<?php include("includes/footer.php"); ?>