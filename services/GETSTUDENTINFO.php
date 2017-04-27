<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$acc = $_POST["access_token"];

	
	$query = "SELECT a.id as student_id,a.group_id,b.group_tutor FROM `students` a,groups b where access_code='$acc' and a.group_id=b.id";
$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
		
		$alldata=array();
		while ($row = mysql_fetch_assoc($result)) {
               
                     array_push($alldata, $row);
                    
             
            }
		$output['RESULT'] = 'SUCCESS';     
		$output['DATA'] =$alldata;     
	}
       
   print_r(json_encode($output));
?>