<?php
define('parentFile', 1);
require_once('db_include.php');

$adminid = $_POST["uid"];

$msg=array();
$root = "/home/otek/06/t6mani00/public_html/ouasNews/assets/news_images/";
    //echo($root);
      		$files="";
      		$pics=array();
      		$path = null;
			if (isset($_GET['file'])) {
  				  $path = $_GET['file'];
      			  $path = '/'.$path;
    
			}
			if (is_file($root.$path)) {
    			readfile($root.$path);
   				 return;
			}
		foreach (glob($root.$path.'/*') as $file) {
 			   $pics["path"]='./assets/news_images/'.urlencode(substr($file, strlen($root) + 1));
 			    $pics["name"]= substr($file, strlen($root) + 1);
            
            
  			 
  			array_push($msg,$pics);			  
			} 
    

        $output = '{"RESULT": "SUCCESS","MSG":'.json_encode($msg).'}';
        
 
   		  
     print($output);
?>