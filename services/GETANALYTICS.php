<?php
define( 'parentFile' , 1 ); 
require_once( 'db_include.php' );



$query = "select count(a.id) as TOTAL,a.click_type,a.click_client, c.group_name as group_id,a.click_by,b.first_name,b.last_name,b.student_code from client_analytics a,students b,groups c where b.id=a.click_by and c.id=b.group_id group by a.click_type,a.click_by ";


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