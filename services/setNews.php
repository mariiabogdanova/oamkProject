<?php
	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );
 
	
	
    $teacher_id= $_POST["uid"];
	

	
	$news = $_POST["ref_news"];
	
$news=implode(",",$news);


 
 	 
	  $tempsql = "UPDATE `teacher_content` SET news_selection='$news' where teacher_id='$teacher_id'";
	
		$result  = mysql_query($tempsql);
  if (!$result) {
          
            $output = '{"RESULT": "FAILED"}';
        } else {   


            
        $output = '{"RESULT": "SUCCESS"}';       
            }
 
 
       
	
       
            
				
	print($output);	
?>