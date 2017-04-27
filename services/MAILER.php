<?php
	require_once 'swiftmailer/lib/swift_required.php';
require_once( 'db_include.php' );	


$query = "SELECT first_name,last_name,access_code,email_id FROM `students` where group_id=1 ";
$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
		
		$alldata=array();
		while ($row = mysql_fetch_assoc($result)) {
               
                    // array_push($alldata, $row);
					$name=$row["first_name"].' '.$row["last_name"];
                    $link="http://www.students.oamk.fi/~t6mani00/ouasNews/newsletter/index.html?access_token=".$row["access_code"];
            		$email=$row["email_id"]; 
			//sendMail($name,$link,$email);
			//echo($email.'    '.$name.' '.$link);
            }
		$output['RESULT'] = 'SUCCESS';     
		$output['DATA'] =$alldata;     
	}

sendMail('Maite Alaez-Guergue','http://www.students.oamk.fi/~t6mani00/ouasNews/newsletter/index.html?access_token=b0e36fe09ca1d800cf8258636160cc4f','t6alma01@students.oamk.fi');

function sendMail($name,$link,$email){
	$message='Hey '.$name.',';
	
$message.='<br><br><br>Here is <a href="'.$link.'" target="_blank" style="color:red;font-weight:bold">your personal link </a>, Please view and participate in the poll, there will be prizes for lucky winner(not really, but try anyway). <br><br>We proudly present our project ouasNews to you guys and we hope you could kindly click the link provided and browse your personal newsletter, so that we could have some data for our presentation.';


$message.='<br><br>Sorry for spamming and have a great Thrusday!!!';

$message.='<br><br>Team1 a.k.a. Niran, Mariia and Heli';
	$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
	  ->setUsername('nice.mood84@gmail.com')
	  ->setPassword('Emm15aari');

	$mailer = Swift_Mailer::newInstance($transport);

	$message = Swift_Message::newInstance('[ouasNews]')
	  ->setFrom(array('nice.mood84@gmail.com' => 'ouasNews Project'))
	  ->setTo(array($email))
	  ->setBody($message,'text/html');

	$result = $mailer->send($message);
	
}
	
?>