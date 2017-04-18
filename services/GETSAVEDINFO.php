<?php

	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


$teacher_id=$_POST["uid"];


//check if content avilable

function getteacherinfo($teacher_id){
	$query="select * from teachers where user_id='$teacher_id'";
$resultCheck=mysql_query($query);
	if (!$resultCheck) {
			
			return false;	
		}else{
		$alldata=array();
		while ($row = mysql_fetch_assoc($resultCheck)) {  
			
			
                     array_push($alldata, $row);
            }
return $alldata;
		
	}
		
}

	
$query="SELECT * FROM `teacher_content` where teacher_id='$teacher_id'";
$resultCheck=mysql_query($query);
	if (!$resultCheck) {
			$output['RESULT'] = 'FAILED';
	}else{
		$alldata=array();
		while ($row = mysql_fetch_assoc($resultCheck)) {  
			
			$row["TEACHER"]=getteacherinfo($teacher_id);
                     array_push($alldata, $row);
            }
		$output['RESULT'] = 'SUCCESS';     
		$output['DATA'] =$alldata;     
	}
		

	
	   print_r(json_encode($output));

?>