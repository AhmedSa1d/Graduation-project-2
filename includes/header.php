<?php require_once 'session.php'; ?>
<html>
    <head>
         <title>Ads Factory</title>
        <meta charset="UTF-8">
          <!-- normalize file -->
        <link rel="stylesheet" href="View/Assets/style/normlize.css"
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />

        <!-- iconic font font awesome -->
        <link rel="stylesheet" href="View/Assets/Fonts/font-awesome-4.6.3/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="View\Assets\style\bxslider.css"/>
        <link type="text/css" rel="stylesheet" href="View/Assets/style/style.css" />
        <link type="text/css" rel="stylesheet" href="View/Assets/style/css.css"/>




    </head>
    <body>
        <header>
            <div id="top_head">
                <div  id="logo">
                    <p>Ads Factory</p>
                </div>

                <div class="right">
                    <div class="sign" id="up">
                        <a href="signup.php"> <p>SIGN UP</p></a>
                    </div>
                    <div class="sign">
                        <?php if(isset($_SESSION['Name']))
                        {
                             echo "<a href=\"profile.php\"><p>".$_SESSION['Name']."</p></a>".
                             "<a href=\"logout.php\" class=\"sign\"><p> "."log out"."</p></a>";

                        }else{
                            echo "<a href=\"login.php\"><p>"."SIGN IN"."</p></a>";
                        }

                            ?>

                    </div>

                </div>


            </div>

            <ul class="menu">
                <a href="index.php">  <li>Home</li></a>
                <a href="advertiser.php"><li>Advertiser</li></a>
                <a href="siteBenifits.php"><li>Publisher</li></a>
                <a href="GetStart.php"><li>Get start</li></a>
                <a href="about_us.php"><li>About US</li></a>
                <a href="contact.php"><li>Contact US</li></a>
            </ul>

        </header>
