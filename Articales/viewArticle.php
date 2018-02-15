
<?php include './includes/header.php'; ?>
<?php require_once("includes/connection.php");?>
<?php require_once("includes/functions.php"); ?>
<?php view_article();
 view_user($sel_article['userID']);
?>
<div id="content">
            <article>
                <div id="title">
                    <div id="t_photo">
                       <?php echo"<img src=\"images/1458346005_male3.png\" />";

                       ?>
                    </div>
                    <div id="t_title">
                        <?php echo"<p>".$sel_article['articleTitle']."</p>";
                        ?>
                    </div>
               </div>
                <div id="user">
                    <?php user($sel_article['articleID']);
                    echo $sel_user['userID'];

                    ?>

                    <div id="time_photo">
                        <img src="images/1458345080_Simple_clock.png"  />
                    </div>
                    <div id="time_text">
                       <?php echo"<p>".$sel_article['articleDate']."</p>"; ?>
                    </div>
            </div>
            <div id="article_body">
                <div id="ar_body">
                    <?php echo $sel_article['articleBody'] ?>
                </div>
                <div id="ar_photo">


                      <?php echo "<img src=\"images/" .$sel_article['articlePhoto']. "\"/>"; ?>

            </div>
            </article>
           <div id="sidebar">
                <div id="s_title">
                    <p>The Most Reading Articale This Weak</p>
                </div>
                <?php
                    sid_articales();
                ?>
            </div>



        </div>

<?php include './includes/footer.php'; ?>
