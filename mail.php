
<?php
include './includes/functions.php';
 
if($_SERVER["REQUEST_METHOD"] == "POST"){
    //echo "ahmed said ";
    $to = "ahmedsaid5556@hotmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $name = $_POST['name'];
    
    $subject = "Form submission";
    $subject2 = "Copy of your form submission";
    $message = $first_name . " " . $last_name . " wrote the following:" . "\n\n" . $_POST['message'];
    $message2 = "Here is a copy of your message " . $first_name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
   mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
    redirect_to("contact.php?sent=1");
    //echo "Mail Sent. Thank you " . $first_name . ", we will contact you shortly.";
    
    // You can also use header('Location: thank_you.php'); to redirect to another page.
    // You cannot use header and echo together. It's one or the other.
    }

    
    
    
  
?>

