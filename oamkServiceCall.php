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
			case "GETTEACHERNAMES" : require 'services/GetTeacherNames.php';
			break;		
			case "GETOLDGROUPS" : require 'services/GetOldGroups.php';
			break;
			case "SAVEGROUPS" : require 'services/SaveGroups.php';
			break;
			case "TEACHER_GROUP_ANALYTICS" : require 'services/teacher_group_analytics.php';
			break;	
			case "GETGROUPANDTEACHER" : require 'services/GetGroupandTeacher.php';
			break;	
			case "SAVESTUDENT" : require 'services/SaveStudent.php';
			break;
			case "GETALLSTUDENTS" : require 'services/GetAllStudents.php';
			break;	
            
		}
	    
	} catch (Exception $exception) {
	    echo '<error>An exception occured while calling the service.</error>';
	    exit(1);
	}
?>