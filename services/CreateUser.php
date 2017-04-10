<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	
$username=$_POST["teacher_username"];
$password=$_POST["teacher_password"];
$password=md5($password);
$user_level=USER_ROLE_TEACHER;
	$query = "INSERT INTO users(user_name, password, access_level,created_on) VALUES ('$username','$password','$user_level',now())";
$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
			$output['RESULT'] = 'SUCCESS';
		
	}
       
   print_r(json_encode($output));
?>



