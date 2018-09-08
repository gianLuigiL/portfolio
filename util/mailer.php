<?php 
$result = array();

if(isset($_POST['name'])){
	$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
}
if(isset($_POST['email'])){
	$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
}
if(isset($_POST['subject'])){
	$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
}
if(isset($_POST['message'])){
	$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
}

if(!$name){
	$result['ok'] = false;
	$result['error'] = 'The email could not be sent. There\'s a mistake in the "name" field.';
} else if (!$email){
	$result['ok'] = false;
	$result['error'] = 'The email could not be sent. There\'s a mistake in the "email" field.';
} else if (!$subject){
	$result['ok'] = false;
	$result['error'] = 'The email could not be sent. There\'s a mistake in the "subject" field.';
} else if (!$message){
	$result['ok'] = false;
	$result['error'] = 'The email could not be sent. There\'s a mistake in the "message" field.';
}
if(!empty($result['fieldError'])) {
	echo json_encode($result);
	return;
}
$date = new DateTime();

$body = "<div style='padding: 10px; background: linear-gradient(to bottom, #d9e5f9, #f7f9fc); height: 100%;'>
<div class='logo' style='max-width: 300px; margin: 0px auto'><img src='http://gianluigilamera.com/images/logo.svg' alt='logo' style='width: 100%;'>
  <h4 style='text-align: center; font-family: arial, helvetica, sans-serif;'>Web design by Gian Luigi Lamera</h4> 
</div>
<div class='body' style='font-family: arial, helvetica, sans-serif;'>
	<p style=''>Hello there Gigi, you received a message from ".ucwords($name)." in date ". $date->format("Y/m/d H:i:s") ." that says:</p>
	<p style=''>$message</p>
 	 <p>The user has left these contact details:</p>
	<p style=''>Email: $email</p>
	<p>Have a nice day! </p>
</div>
</div>";

$body = wordwrap($body, 70);

$to      = 'gianluigilamera@gianluigilamera.com';
$subject = $subject;
$message = $body;
$headers = "From: gianluigi@gianluigilamera.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

if(mail($to, $subject, $message, $headers)){
	$result['ok'] = true;
	$result['success'] = 'Thank you for getting in touch. I\'ll be in contact with you as soon as possible.';
	echo json_encode($result);
} else {
	$result['ok'] = false;
	$result['error'] = 'Something went wrong while sending the email. Please try again or get in touch via another channel. Thank you for understanding.';
	echo json_encode($result);
}
?>