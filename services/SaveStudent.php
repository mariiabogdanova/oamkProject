<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$fname=$_POST["fname"];
$lname=$_POST["lname"];
$code=$_POST["code"];
$email=$_POST["email"];
$group=$_POST["group"];

 $access_code= md5( (String)rand().$code.(String)rand() );
	$query = "INSERT INTO students(`student_code`, `email_id`, `group_id`, `first_name`, `last_name`, `access_code`) VALUES ('$code','$email','$group','$fname','$lname','$access_code')";

$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
			$output['RESULT'] = 'SUCCESS';
		
	}
       
   print_r(json_encode($output));
?>



