<?php
	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );
 
	
	
   // $adminid = $_POST["uid"];
//	$atoken = $_POST["atoken"];

	$opt_id= $_POST["opt_id"];
	$poll_id = $_POST["poll_id"];
	$user_id = $_POST["student_id"];
	

$user_ip = getUserIP();
$user_ip = mysql_real_escape_string($user_ip);

//if(checkDuplication($user_ip)==false){
if(1!=1){
    $output = '{"RESULT": "DUPLICATE"}';
    
}else{
    $tempsql = "INSERT INTO `poll_answers`( `poll_id`, `option_id`,user,user_ip) VALUES ('$poll_id','$opt_id','$user_id','$user_ip')";
   
        
  
        
     
		
		$result  = mysql_query($tempsql);
        if (!$result) {
            doLog("No poll click registered!");
            $output = '{"RESULT": "FAILED"}';
        } else {   
        $output = '{"RESULT": "SUCCESS"}';       
            }
            
		}
		

	print($output);	


function getUserIP()
{
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
    $forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
    $remote  = $_SERVER['REMOTE_ADDR'];

    if(filter_var($client, FILTER_VALIDATE_IP))
    {
        $ip = $client;
    }
    elseif(filter_var($forward, FILTER_VALIDATE_IP))
    {
        $ip = $forward;
    }
    else
    {
        $ip = $remote;
    }

    return $ip;
}
function checkDuplication($userip){
    	
		$valid = true;
			
		$query = "SELECT * FROM poll_answers a WHERE a.user_ip='$userip'";
  
		$result = mysql_query($query);
		if (!$result) {
		  $valid = true;
		} else {
			$number_of_rows = mysql_num_rows($result);
            
			if ($number_of_rows==0) {
				
				$valid = true;
			} else {
				$valid= false;
			}
		}	
    
    
   
		return( $valid );

    
}
?>