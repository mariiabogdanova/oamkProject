<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$user_level=USER_ROLE_TEACHER;


	//$query = "SELECT a.*,b.user_name FROM `groups` a ,users b where a.group_tutor=b.id";
	$query = "SELECT b.id,b.id as tutor_id,b.user_name FROM users b where b.access_level=$user_level";
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