<?php 
	defined( 'parentFile' ) or die( 'You Can Not Access This File' ); 
	function doLog($msg)
	{	
		$query_log = "INSERT INTO logs (message) VALUES ('$msg')";
		$result_log = mysql_query($query_log);		
	}
function validateUser($userid, $client_accesstoken) { 
		$accesslevel = -1;			
		$query = "SELECT access_level FROM users WHERE id='$userid' AND accesstoken='$client_accesstoken'";	
		$result = mysql_query($query);
		if (!$result) {
			doLog("select failed: validateUser ".$userid);
			return (-100);	
		}	
		$number_of_rows = mysql_num_rows($result);	
		if($number_of_rows > 1) {
			doLog("validateUser: MORE THAN 1 USER ID! ".$userid);
			return (-101);	
		}		
		if ($number_of_rows==0) {
			doLog("validateUser: invalid access attempt: ".$userid.' : '.$client_accesstoken);
			return (-1);
		} else {		
			$row = mysql_fetch_array($result);
			if($row) {			
				$accesslevel = $row['access_level'];
				$accesdate="update users set accessdate=now() where id='$userid'";
				$dateresult = mysql_query($accesdate);
				if (!$dateresult) {
			doLog("select failed: setUserAccessDate ".$userid);
		}	
			} else {
				doLog("validateUser error ".$userid);
				return (-110);		
			}
		}
				
		return ($accesslevel);			
	}






	
					
	function getUserAccessToken($userid) 
	{
		$accesstoken = "";			
		$query = "SELECT * FROM users WHERE id='$userid'";	
		$result = mysql_query($query);
		if (!$result) {
			doLog("select failed: getUserAccessToken ".$userid);
		}	
		$number_of_rows = mysql_num_rows($result);	
		if($number_of_rows > 1) {
			doLog("MORE THAN 1 USER ID! ".$userid);	
		}		
		if ($number_of_rows==0) {
			doLog("NORESULTS: getUserAccessToken ".$userid);
		} else {		
			$row = mysql_fetch_array($result);
			if($row) {			
				$accesstoken = $row['accesstoken'];		
				$accesdate="update users set accessdate=now() where id='$userid'";
				$dateresult = mysql_query($accesdate);
				if (!$dateresult) {
			doLog("select failed: setUserAccessDate ".$userid);
		}	
			} else {
				doLog("getUserAccessToken error ".$userid);		
			}
		}
				
		return ($accesstoken);	
	}	
	
	// %% possibly delete this
	function validAccessToken($userid,$accesstoken) {
		$validtoken = 0;
			
		$query = "SELECT * FROM users WHERE id='$userid' && accesstoken='$accesstoken'";	
		$result = mysql_query($query);
		if (!$result) {
			doLog("validAccessToken select failed: $query ".$uname);
		} else {
			$number_of_rows = mysql_num_rows($result);
			if ($number_of_rows==0) {
				doLog("NORESULTS: validAccessToken ".$userid." ".$accesstoken);
				$validtoken = 0;
			} else {
				$validtoken = 1;
			}
		}		
		return( $validtoken );
	}
		
	function validAdminAccessToken($userid,$accesstoken) {
		$validtoken = 0;
			
		$query = "SELECT * FROM adminusers WHERE id='$userid' && accesstoken='$accesstoken'";	
		$result = mysql_query($query);
		if (!$result) {
			doLog("validAdminAccessToken select failed: $query ".$uname);
		} else {
			$number_of_rows = mysql_num_rows($result);
			if ($number_of_rows==0) {
				doLog("NORESULTS: validAdminAccessToken ".$userid." ".$accesstoken);
				$validtoken = 0;
			} else {
				$validtoken = 1;
			}
		}		
		return( $validtoken );
	}
	
    function encrypt($string, $key='%5key984872923825&') {
        $result = '';
        for($i=0; $i<strlen($string); $i++) {
            $char = substr($string, $i, 1);
            $keychar = substr($key, ($i % strlen($key))-1, 1);
            $ordChar = ord($char);
            $ordKeychar = ord($keychar);
            $sum = $ordChar + $ordKeychar;
            $char = chr($sum);
            $result.=$char;
        }
        return base64_encode($result);
    }
		function idToText($tablename,$fieldname,$id)
	{
		$returnString = "Unknown";
				
		$query_common = "SELECT * FROM $tablename WHERE id='$id'";	
		$result_common = mysql_query($query_common);			

		if (!$result_common) {
			doLog("$tablename: select failed: ".$id);
		}	
		
		$number_of_rows = mysql_num_rows($result_common);	
		if($number_of_rows > 1) {
			doLog("$tablename: MORE THAN 1 RESULT! ".$id);	
		}		
		
		if ($number_of_rows==0) {
			doLog("NORESULTS: $tablename ".$id);
		} else {		
			$row = mysql_fetch_array($result_common);
			if($row) {			
				$returnString = $row[$fieldname];		
			} else {
				doLog("$tablename error ".$id);		
			}
		}
				
		return ($returnString);		
	}
		function textToId($tablename,$fieldname,$text)
	{
		$returnString = "Unknown";
				
		$query_common = "SELECT * FROM $tablename WHERE $fieldname='$text'";	
		$result_common = mysql_query($query_common);			

		if (!$result_common) {
			doLog("$tablename: select failed: ".$fieldname);
		}	
		
		$number_of_rows = mysql_num_rows($result_common);	
		if($number_of_rows > 1) {
			doLog("$tablename: MORE THAN 1 RESULT! ".$fieldname);	
		}		
		
		if ($number_of_rows==0) {
			doLog("NORESULTS: $tablename ".$fieldname);
		} else {		
			$row = mysql_fetch_array($result_common);
			if($row) {			
				$returnId = $row["id"];		
			} else {
				doLog("$tablename error ".$fieldname);		
			}
		}
				
		return ($returnId);		
	}
function refIDToUserID($ref_code){
	return( textToId('users','referer_code',$ref_code) );	
	
}
	function userIDToName($id) {
		return( idToText('users','username',$id) );			
	}
function usernameToTwToken($id) {
		return( idToText('users','twitch_token',$id) );			
	}	
function userIDToEmail($id) {
		return( idToText('users','email',$id) );			
	}
function usernameToId($usename) {
		return( textToId('users','username',$usename) );			
	}	
function client_idToToken($usename) {
		return( textToId('users','username',$usename) );			
	}	

function getTargetFolder($type){
    
    if($type=='background_image_client' || $type=='background_image'){
        return('background_images');
        
    }
    else if($type=='clientlogotype'){
        
        return('logo_images');
    }else{
        return('article_images');
        
    }
}

	
?>