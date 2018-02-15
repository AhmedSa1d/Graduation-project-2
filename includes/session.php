<?php
    session_start();
    function logged_in(){
        return isset($_SESSION['userID']);
    }
    function  confirm_loggin(){
        if(!logged_in()){
            
            redirect_to("login.php");
        }
    }
?>