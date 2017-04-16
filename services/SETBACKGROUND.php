<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$teacher_id=$_POST["uid"];
$background=$_POST["background"];

$query="update teacher_content set background_image='$background' where teacher_id='$teacher_id'";

$resultCheck=mysql_query($query);
	if (!$resultCheck) {
			$output['RESULT'] = 'FAILED';
	}else{
		
		$output['RESULT'] = 'SUCCESS';     
		
	}
		

	
	   print_r(json_encode($output));

?>