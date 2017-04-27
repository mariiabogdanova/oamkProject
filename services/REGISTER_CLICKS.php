<?php
	define( 'parentFile' , 1 );
	require_once( 'db_include.php' );
    $link_type= $_POST["link_type"];
	$click_client = $_POST["group_id"];
	$ref = $_POST["ref"];
    $user_ip = getUserIP();
    $user_ip = mysql_real_escape_string($user_ip);
    $user_detail=$_POST["student_id"];
    $output=array();
    $tempsql = "INSERT INTO client_analytics( click_type,click_ip,click_by,click_client,ref) VALUES ('$link_type','$user_ip','$user_detail','$click_client','$ref')";	
   $result  = mysql_query($tempsql);
        if (!$result) {
            doLog("Click not registered!-Client_id:".$click_client.", Link Type:".$link_type);
            $output["RESULT"]="ERROR";
            $output["MESSAGE"]="Click not registered!-Client_id:".$click_client.", Link Type:".$link_type;
            
        } else {
            
              $output["RESULT"]="SUCCESS";
            $output["MESSAGE"]="Click registered!-Client_id:".$click_client.", Link Type:".$link_type;
            }
            
	print(json_encode($output));

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
?>
