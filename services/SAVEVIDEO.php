<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$teacher_id=$_POST["uid"];
$video_title=mysql_real_escape_string($_POST["video_title"]);
$video_details=mysql_real_escape_string($_POST["video_details"]);
$video_code=mysql_real_escape_string($_POST["video_code"]);


	$query = "INSERT INTO videos (teacher_id,video_title, video_desc, video_code) VALUES('$teacher_id', '$video_title', '$video_details','$video_code') ON DUPLICATE KEY UPDATE    
video_title='$video_title',
video_desc='$video_details',
video_code='$video_code'";
//echo($query);
$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
		
		$output['RESULT'] = 'SUCCESS';     
	 
	}
       
   print_r(json_encode($output));
?>



