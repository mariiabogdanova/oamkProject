<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	

$group=$_POST["group"];


	$query = "SELECT a.*,b.group_name,c.user_name FROM `students` a, users c, groups b where a.group_id='$group' and a.group_id=b.id and b.group_tutor=c.id";
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