<?php
	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );
 
	
	
    $adminid = $_POST["uid"];
	

	$title = $_POST["poll_title"];
	$ref_id = $_POST["ref_id"];
	$options = $_POST["options"];
	


function saveoptions($options,$poll){
    for($count=0;$count<count($options);$count++){
        $title=$options[$count];
        $tempsql = "INSERT INTO `poll_options`( `poll_id`, `option_title`) VALUES ($poll,'$title')";	
        	$result  = mysql_query($tempsql);
		
    }
    
    
}

 
        
 
        $tempsql = "INSERT INTO `poll`(`poll_title`) VALUES ('$title')";
		$result  = mysql_query($tempsql);
	
        if (!$result) {
          
            $output = '{"RESULT": "FAILED"}';
        } else {   

                 $poll_id= mysql_insert_id();

              saveoptions($options,$poll_id);
            
        $output = '{"RESULT": "SUCCESS"}';       
            }
            
				
	print($output);	
?>