<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$teacher_id=$_POST["uid"];

	$query = "select * from videos where teacher_id='$teacher_id'";

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



