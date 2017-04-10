<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$user_level=USER_ROLE_TEACHER;
	$query = "select id,user_name,created_on from users where access_level=$user_level";
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