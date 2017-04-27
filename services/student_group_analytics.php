<?php
	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	
	$user_level=USER_ROLE_TEACHER;


$query = "select count(A.student_code) as STUDENTS,B.group_name as GROUPNAME from students A, groups B where B.id=A.group_id group by A.group_id";

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