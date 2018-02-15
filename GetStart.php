<?php include 'includes/header.php'; ?>
<?php include 'includes/functions.php'; ?>


<div id="GetStartContain">
    <div id="startHead">

        <?php
        if (isset($_SESSION['type'])) {
            if ($_SESSION['type'] == 1) {
                echo "<p>"."here you can add your product ads and you will wait until we accept or reject your ads if we accept your product ads and design we will send to you aknowledge and how to paiy for your ads and the how to calculate and control your paiyment "."</p>";
                echo "<h3>" . "Add your Ads" . "</h3>";

                include 'new_products.php';
            } else {
                echo "<p>"."here you can add your site information  and you will wait until we accept or reject your site  if we accept  your site we will send a file or a code  you will add it to your site files  and the way of instlation  to enable us to can contact with your site and show the ads image or video on the article photo  "."</p>";
                echo "<h3>" . "Add your Site" . "</h3>";

                include 'new_site.php';
            }
        } else {
            redirect_to("login.php");
        }
        ?>
    </div>
    <div id="startCont">

    </div>

</div>

<?php include 'includes/footer.php'; ?>

