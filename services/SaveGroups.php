<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$group_name=$_POST["group_name"];
$group_teacher=$_POST["group_teacher"];





	$query = "INSERT INTO groups(group_name,group_teacher) VALUES ('$group_name','$group_teacher')";
$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
			$output['RESULT'] = 'SUCCESS';
		
	}
       
   print_r(json_encode($output));
?>



