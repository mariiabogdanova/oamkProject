<?php
	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );
 
	
	
    $teacher_id= $_POST["uid"];
	

	$ref_id = $_POST["ref_id"];
	$ref_action = $_POST["ref_action"];
	$value = $_POST["value"];
	


 
        
 if($value==true){
	 
	  $tempsql = "UPDATE `teacher_content` SET $ref_action='$ref_id' where teacher_id='$teacher_id'";
	
		$result  = mysql_query($tempsql);
  if (!$result) {
          
            $output = '{"RESULT": "FAILED"}';
        } else {   


            
        $output = '{"RESULT": "SUCCESS"}';       
            }
 
 }else{
	 
	 $output = '{"RESULT": "FAILED"}';
 }

       
	
       
            
				
	print($output);	
?>