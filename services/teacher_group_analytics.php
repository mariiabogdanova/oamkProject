<?php
	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	
	$user_level=USER_ROLE_TEACHER;
	


	$query = "SELECT count(b.id) as total_users ,count(a.id) as total_groups from users b, groups a where b.access_level=$user_level";
	$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
		
		$alldata=array();
		while ($row = mysql_fetch_assoc($result)) {        	
		
			
			$row1["TOTAL_USER"]=$row["total_users"];
			$row1["TOTAL_GROUPS"]=$row["total_groups"];
			$row1["VACANT_TEACHERS"]=getVaccant();
				   array_push($alldata, $row1);
		
             
            }
		$output['RESULT'] = 'SUCCESS';     
		$output['DATA'] =$alldata;     
	}
       





function getVaccant(){
	global $user_level;
	$query = "SELECT b.id,b.id as tutor_id,b.user_name FROM users b where b.access_level=$user_level";
$result = mysql_query($query);	
	if(!$result){
		
	}else{	
		
		$alldata=array();
		while ($row = mysql_fetch_assoc($result)) {        	
			//checking
			if(!isAlreadyatutor($row["tutor_id"])){
				   array_push($alldata, $row);
			}
             
            }
	 
	}
return $alldata;
}
function isAlreadyatutor($tutor_id){
	
	$query = "SELECT * from groups where group_tutor=$tutor_id";
$result = mysql_query($query);	
	
		$number_of_rows = mysql_num_rows($result);	
	
	if($number_of_rows==0){
		return false;
		
	}else{
		return true;
		
	}
	
	
	
}
   print_r(json_encode($output));
?>