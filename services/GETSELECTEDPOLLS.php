<?php
	define( 'parentFile' , 1 ); 
	require_once( 'db_include.php' );
    $teacher_id = $_POST["uid"];
function getoptions($poll_id){
                $alldata       = array();
    $tempsql = "SELECT * from poll_options where poll_id='$poll_id' order by id asc";			
		$result  = mysql_query($tempsql);
        if (!$result) {
           
     
        } else {   

			while ($row = mysql_fetch_assoc($result)) {
				array_push($alldata, $row);           
            }
        }
    return $alldata;
}
function getSelected($teacher_id){
     $alldata       = array();
    $tempsql = "SELECT poll_id,result_id FROM `teacher_content` where teacher_id='$teacher_id'";	
	
		$result  = mysql_query($tempsql);
        if (!$result) {
           
     
        } else {   

			while ($row = mysql_fetch_assoc($result)) {
				array_push($alldata, $row);           
            }
        }
    return $alldata;
}
   $tempsql = "SELECT poll_title,id,date from poll";		
	
		$result  = mysql_query($tempsql);

        if (!$result) {
            
            $output["RESULT"] = "FAILED";
        } else {   
            $alldata       = array();
			while ($row = mysql_fetch_assoc($result)) {
                
                
				$row["options"]=getoptions($row["id"]);
				
                array_push($alldata, $row);           
            }
            $output["SELECTED"]=getSelected($teacher_id);
            $output["RESULT"] = "SUCCESS";
            $output["DATA"] = $alldata;
        }
	print(json_encode($output));	
?>