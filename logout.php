<?php require_once 'includes/functions.php'; ?>
<?php 
    //for steps for closing a session 
    //I.E logging out
    
    //1.find a sessing
    session_start();
    
    //2.Unset all session variables
    $_SESSION=array();
    
    //3. Destroy a session cookie
    if(isset($_COOKIE[session_name()])){
        setcookie(session_name(),'',  time()-42000,'/');
    }
    
    //4. Destroy the sessoin
    session_destroy();
    
    redirect_to("login.php?logout=1");

?>

