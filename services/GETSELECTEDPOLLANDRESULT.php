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

function getpollresult($poll_id){
                $alldata       = array();
    $tempsql = "SELECT count(a.id) as voted,(b.option_title),c.poll_title as TITLE FROM `poll_answers` a, poll_options b,poll c where a.poll_id='$poll_id' and a.option_id=b.id and c.id='$poll_id'group by option_id order by voted desc";			
		$result  = mysql_query($tempsql);
        if (!$result) {
            doLog("No poll options Avilable!!!");
     
        } else {   

			while ($row = mysql_fetch_assoc($result)) {
				array_push($alldata, $row);           
            }
        }
    return $alldata;
}

function getSelectedPoll($poll_id){
     $alldata       = array();
    $tempsql = "SELECT * FROM `poll` where id='$poll_id'";	
	
		$result  = mysql_query($tempsql);
        if (!$result) {
           
     
        } else {   

			while ($row = mysql_fetch_assoc($result)) {
				$row["OPTIONS"]=getoptions($row["id"]);
				array_push($alldata, $row);           
            }
        }
    return $alldata;
}
    $tempsql = "SELECT poll_id,result_id,date from teacher_content where teacher_id='$teacher_id'";		
	
		$result  = mysql_query($tempsql);

        if (!$result) {
            
            $output["RESULT"] = "FAILED";
        } else {   
            $alldata       = array();
			while ($row = mysql_fetch_assoc($result)) {
                if($row["poll_id"]!=0){
					$row["POLL"]=getSelectedPoll($row["poll_id"]);	
				}
                if($row["result_id"]!=0){
					$row["RESULT"]=getpollresult($row["result_id"]);		
				}
				
			
				
                array_push($alldata, $row);           
            }
          
            $output["RESULT"] = "SUCCESS";
            $output["DATA"] = $alldata;
        }
	print(json_encode($output));	
?>