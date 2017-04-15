<?php
	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );	
	$uname = $_POST["username"];
	$pword = $_POST["password"];
$pword=md5($pword);
	$query = "SELECT access_level,id FROM users where user_name='$uname' and password='$pword'";

$result = mysql_query($query);	
	if(!$result){
		$output['RESULT'] = 'FAILED';     
	}else{	
		
		$alldata=array();
		while ($row = mysql_fetch_assoc($result)) {
               	if($row["access_level"]!=5){
					$output['RESULT'] = 'ACCESSERROR';     
					
					
				}else{
					$output['RESULT'] = 'SUCCESS';     
					$output['UID'] = $row["id"];     
					$output['access_level'] = $row["access_level"];     
					
					$id=$row["id"];
				$accesstoken = md5( (String)rand()."jd30Fke0fe02l".(String)rand() );
			$query_update = "UPDATE users SET access_token='$accesstoken' WHERE id='$id'";				
			$result_update = mysql_query($query_update);
					
					$output['access_token'] = $accesstoken;     
				}
                    
                    
             
            }
		}
       
   print_r(json_encode($output));


?>