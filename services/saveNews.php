<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$title=mysql_real_escape_string($_POST["title"]);
$body=mysql_real_escape_string($_POST["body"]);
$image=mysql_real_escape_string($_POST["image"]);
$user_id=($_POST["uid"]);


	$query = "INSERT INTO `admin_content`( `content_title`, `content_description`, `content_photo`, `admin_id`) VALUES ('$title','$body','$image',$user_id)";

$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
			$output['RESULT'] = 'SUCCESS';
		
	}
       
   print_r(json_encode($output));
?>



