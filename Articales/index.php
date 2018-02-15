<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<?php include './includes/header.php'; ?>
<?php include './includes/functions.php'; ?>

        <div id="content">
            <div id="cont_head">
                <div id="cont_head_left">
                    <div class="cont_head_photo" >
                        <img src="images/js_03.png"/>
                    </div>
                    <div class="cont_head_title">
                        <p>Build Your Next Web App in javascript</p>
                    </div>
                    
                </div>
                <div id="cont_head_right">
                    <div class="cont_head_photo" >
                        <img src="images/anj_03.png"/>
                    </div>
                    <div class="cont_head_title">
                        <p>Build Your Next Web App in javascript</p>
                    </div>
                </div>
                
            </div>
            <div id="cont_body">
          
                <?php
                 articles();
                ?> 
            </div>
            
        </div>
      <?php include './includes/footer.php';
