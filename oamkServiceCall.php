<?php
	$appservice = $_POST["oamkSERVICE"];
	try {
		switch( $appservice ) {			
			case "USERLOGIN" : require 'services/UserLogin.php';
			break;	
            case "CREATENEWUSER" : require 'services/CreateUser.php';
			break; 
			case "GETTEACHERS" : require 'services/GetTeachers.php';
			break;	
            
		}
	    
	} catch (Exception $exception) {
	    echo '<error>An exception occured while calling the service.</error>';
	    exit(1);
	}
?>