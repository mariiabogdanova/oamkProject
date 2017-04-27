<?php


	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	


   $teacher_id= $_POST["uid"];


function getSelectedNews($teacher_id){
	
$query="SELECT news_selection FROM `teacher_content` where teacher_id='$teacher_id'";
$resultCheck=mysql_query($query);
	if (!$resultCheck) {
			
			return false;	
		}else{
		
		$alldata=array();
		while ($row = mysql_fetch_assoc($resultCheck)) {
               
                     array_push($alldata, $row);
                    
             
            }
		
	}
	return $alldata;	
}	
	
	$query = "SELECT * FROM `admin_content`";
$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
		
		$alldata=array();
		while ($row = mysql_fetch_assoc($result)) {
               
                     array_push($alldata, $row);
                    
             
            }
		$output['RESULT'] = 'SUCCESS';
		$output['SELECTED']=getSelectedNews($teacher_id);
		$output['DATA'] =$alldata;     
	}
       
   print_r(json_encode($output));



?>