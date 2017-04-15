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
			case "STUDENTANALYTICS" : require 'services/student_group_analytics.php';
			break;
			case "uploadLogo_simple" : require 'services/upload_image.php';
			break; 
			case "getImages" : require 'services/get_images.php';
			break; 
			case "saveNews" : require 'services/saveNews.php';
			break; 	
			case "getNews" : require 'services/GetAllNews.php';
			break; 
			//teacherCalls begins here
			case "TEACHERLOGIN" : require 'services/TEACHERLOGIN.php';
			break;
			case "SAVETEACHERINFO" : require 'services/TEACHERLOGIN.php';
			break;
		}
	} catch (Exception $exception) {
	    echo '<error>An exception occured while calling the service.</error>';
	    exit(1);
	}
?>