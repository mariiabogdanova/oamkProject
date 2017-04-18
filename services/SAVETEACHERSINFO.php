<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$tutor_message_title=mysql_real_escape_string($_POST["tutor_message_title"]);
$tutor_message_body=mysql_real_escape_string($_POST["tutor_message_body"]);
$tutor_note=mysql_real_escape_string($_POST["tutor_note"]);
$in_the_news=mysql_real_escape_string($_POST["in_the_news"]);
$featured_poll=mysql_real_escape_string($_POST["featured_poll"]);
$poll_result=mysql_real_escape_string($_POST["poll_result"]);
$first_name=mysql_real_escape_string($_POST["first_name"]);
$last_name=mysql_real_escape_string($_POST["last_name"]);
$email_id=mysql_real_escape_string($_POST["email_id"]);
$phone_number=mysql_real_escape_string($_POST["phone_number"]);
$room_number=mysql_real_escape_string($_POST["room_number"]);
$title_message=mysql_real_escape_string($_POST["title_message"]);
$subtitle_message=mysql_real_escape_string($_POST["subtitle_message"]);
$teacher_id=$_POST["uid"];


//check if content avilable

function checkforteacherinfo($teacher_id){
	
	
$query="select id from teachers where user_id='$teacher_id'";
$resultCheck=mysql_query($query);
	if (!$resultCheck) {
			
			return false;	
		}else{
		$number_of_rows = mysql_num_rows($resultCheck);	
		if($number_of_rows>0){
			return true;	
		}else{
			
			return false;	
		}
	}
		
}
function checkforContent($teacher_id){
	
$query="SELECT * FROM `teacher_content` where teacher_id='$teacher_id'";
$resultCheck=mysql_query($query);
	if (!$resultCheck) {
			
			return false;	
		}else{
		$number_of_rows = mysql_num_rows($resultCheck);	
		if($number_of_rows>0){
			return true;	
		}else{
			
			return false;	
		}
	}
		
}	
	
	
if(checkforteacherinfo($teacher_id)){
	$query = "update teachers set first_name='$first_name',last_name='$last_name',email_id='$email_id',room_number='$room_number',phone_number='$phone_number' where user_id='$teacher_id'";
	$result = mysql_query($query);	
	
}else{
	$query = "INSERT INTO `teachers`(`first_name`, `last_name`, `email_id`, `room_number`, `phone_number`, `user_id`) VALUES ('$first_name','$last_name','$phone_number','$email_id','$room_number',$teacher_id)";
	$result = mysql_query($query);

	
}

if(checkforContent($teacher_id)){
	$query = "update teacher_content set tutor_message_title='$tutor_message_title',tutor_message_body='$tutor_message_body',tutor_note='$tutor_note',in_the_news='$in_the_news',featured_poll='$featured_poll',poll_result='$poll_result',title_message='$title_message',subtitle_message='$subtitle_message' where taecher_id='$teacher_id'";
	$result = mysql_query($query);	

	
}else{
	$query = "INSERT INTO `teacher_content`(`teacher_id`, `tutor_message_title`, `tutor_message_body`, `tutor_note`, `in_the_news`, `featured_poll`, `poll_result`,title_message,
subtitle_message) VALUES ($teacher_id,'$tutor_message_title',
'$tutor_message_body',
'$tutor_note',
'$in_the_news',
'$featured_poll',
'$poll_result','$title_message','$subtitle_message')";
	$result = mysql_query($query);

	
}

	
$output['RESULT'] = 'SUCCESS';
	
	   print_r(json_encode($output));

?>