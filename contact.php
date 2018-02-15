<?php include './includes/header.php'; ?>
<?php include 'mail.php'; ?>

<div class="conactUS">

    <div class="contactinfo">
        <h1>+Contact info</h1>
        <h4>You can call us on </h4>
        <ul>
            <li>01120390253</li>
            <li>01149605097</li>
            <li>01122658298</li>
            <li>01207089603</li>
        </ul>
        <h4>Or send an email on </h4>
        <ul>
        <li>ahmedsaid5556@hotmail.com</li>
        <li>mohammedkhalil25@outlook.com</li>
        <li>muhammeda578@gmail.com</li>
        <li>ahmed.gaber774@yahoo.com</li>
        </ul>
        
    </div>
    <div class="send">
            
            <?php
            if(isset($_GET['sent'])&&$_GET['sent']==1){
        $message="your message have been sent ";
    }?>
        <?php if (!empty($message)) {
            echo "<p class=\"message\">" . $message . "</p>";
        } ?>
        <h4>You can use this form to send an email </h4>
        <form method='post' action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <input type="text" name="name"    class="name" placeholder=" Type your name"/>
            <input type="text" name="email" class="name" placeholder=" Type your email"/>
            <textarea name="message" id="message" placeholder=" Type your message here!"></textarea>
            <input type="submit"    class="msgbtn" value=" send" name="send_message"  />
        </form>
    </div>
</div>
<?php include './includes/footer.php'; ?>

