<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->

<?php

    if(isset($_GET['data'])){
        
        $myfile = fopen("in.txt", "w") ;
        fwrite($myfile, $_GET['data']);
    }

?>
