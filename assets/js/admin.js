var adminMenuArray = [{
	group: "Manage Teachers",
	items: ["Add Teacher", "Manage Groups", "Analytics"], //, "Remove Teacher"
	fnct: ["add_teacher", "manage_groups", "Analytics_teacher_group"] //, "Remove Teacher"
}, {
	group: "Manage Students",
	items: ["Manage Students", "Analytics"], //"Assign Groups",
	fnct: ["manage_students", "Analytics_student"] //, "Assign Groups"
}, {
	group: "Manage News/Polls",
	items: ["Manange News", "Manage Polls"],
	fnct: ["Add_News", "Add_polls"],
}, {
	group: "Analytics",
	items: ["Newsletter Anaytics"],
	fnct: ["Newsletter_Anaytics"]
}];
var student_links = new Array();
var imageSelected="";
function bodyLoaded() {
	var bug_Test = false;
	if (bug_Test == true) {
		showLoggedInPage()
	} else {
		showLogin();
	}
}

function showLogin() {
	if (($.cookie('oamk_admin_userinfo') != null)) {
		userLoginJsn = JSON.parse($.cookie('oamk_admin_userinfo'));
		setUserToLoggedin(userLoginJsn.oamk_userid, userLoginJsn.oamk_username, userLoginJsn.oamk_useraccesstoken);
	} else {
		$('#login-page').show();
		$('#logged-in-page').hide();
		adminFunctions();
	}
}

function adminFunctions() {
	
	$(document).on("click", "#sign_in", function () {
		doLogin();
	});
	$(document).on("click", "#log_out", function () {
		doLogOut();
	});
}

function doLogin() {
	var username = $('#user_name').val();
	var password = $('#password').val();
	if (username != "" && password != "") {
		userLoginFunction(username, password);
	} else {
		showPop("Invalid", "Enter proper username/password.");
	}
}

function doLogOut() {
	setUserToLoggedOut();
	//showLogin();
}

function showLoggedInPage() {
	$('#login-page').hide();
	$('#logged-in-page').show();
	var content = "";
	for (var count = 0; count < adminMenuArray.length; count++) {
		content += '<div class="MainMenu">' + adminMenuArray[count]["group"] + '</div>';
		$.each(adminMenuArray[count]["items"], function (key, value) {
			content += '<div class="SubMenu"><span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span><a ref_id="' + adminMenuArray[count]["fnct"][key] + '" >' + value + '</a></div>';
		});
	}
	$("#menu_content").html(content);
	$(document).on("click", ".SubMenu a", function () {
		$(".SubMenu a").removeClass("active");
		$(this).addClass("active");
		showContent($(this).attr("ref_id"));
	});
}

function showContent(ref_id) {
	$('.contentArea .container').hide();
	//if(ref_id='add_teacher'){
	$('#' + ref_id).show();
	switch (ref_id) {
		case "manage_groups":
			manage_groups();
			break;
		case "add_teacher":
			manager_teachers();
			break;
		case "Analytics_teacher_group":
			showAnalytics();
			break;
		case "manage_students":
			manangeStudents();
			break;
		case "Analytics_student":
			studentAnalytics();
			break;

		case "Analytics_student":
			studentAnalytics();
			break;

		case "Add_News":
			manageNews();
			break;
		case "Add_polls":
			managePolls();
			break;
			
			
		case "Newsletter_Anaytics":
			GETANALYTICS();
			break;
		default:
	}
}


/// analytics


function GETANALYTICS(){
	showLoading();
	var request = getRequestObject({}, "GETANALYTICS");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
				var ALLDATA=result.DATA;
			var student="";
			var content="";
			var clickarea="";
			var clickcount="";
			var group ="";
				for(var i=0;i<ALLDATA.length;i++){
					student=ALLDATA[i]["first_name"];
					clickarea=ALLDATA[i]["click_type"];
					clickcount=ALLDATA[i]["TOTAL"];
					group=ALLDATA[i]["group_id"];
					content+='<tr><td>'+(i+1)+'</td><td>'+student+'</td><td>'+clickarea+'</td><td>'+clickcount+'</td><td>'+group+'</td></tr>';
				
				}
			//$('#newsAnalytics').html(student);
			$('#analytics_table').html(content);
				var oTable = $("#mariia_is_cool").dataTable({
		"bSort": true,
		"bRetrieve": true,
		"bProcessing": true,
		"bDestroy": true
	});
		} else {}
	}, "json");
	
}


//end analytics
//manage news here

function manageNews() {
getOldNews();
	$('#manage_news').show();
	$('#old_news').show();
	$('#add_news_form').hide();
	$('#add_news_form input').val('');


}

$(document).on("click", "#create_new_news", function () {
	createNewNews();
});

$(document).on("click", "#image_Selector", function () {
	getImageGallery();
});

function createNewNews() {

	$('#add_news_form').show();
	$('#add_news_form input').val('');
}
function getImageGallery(){
	getImages();
	$('#imageUploader').modal();
}
function getImages(){
	showLoading();
	var request = getRequestObject({}, "getImages");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			
			showimages(result.MSG);
		} else {}
	}, "json");
}

function showimages(data) {
     
    $('#existingImages').empty();
    for (i = 0; i < data.length; i++) {
        var newRow = $("<tr>");
        var cols = "";
        var delbtn = data[i]["name"].replace(".", "_");
        cols += '<td style="padding: 4px;border: 0px none;"><div class="col-xs-3"><a class="featuredimages" fname="' + data[i]["name"] + '"><img src=".' + data[i]["path"] + '" width="80px" height="48px" style="border:1px solid #000;padding:1px"></a></div><div class="col-xs-6" style="padding-top: 10px;"> ' + data[i]["name"] + '</div></td>';
        
        newRow.append(cols);
        $('#existingImages').append(newRow);
    }
    $('.featuredimages').click(function () {

        var filename = $(this).attr("fname");
        $('.featuredimages img').css("border", "0px solid red");
        $(this).find("img").css("border", "3px solid red");
		
        imageSelected = filename;

    });
  
    
}






$(document).on("click", "#uploader_apply", function () {
	$('#selected_image').html('<img src="../assets/news_images/' + imageSelected + '" style="width:100px;height:100px"/>');
$('#news_image').val(imageSelected);
	$('#imageUploader').modal('hide');

});

$(document).on("click", "#uploader_closer", function () {
	$('#selected_image').html('');
$('#news_image').val();

});


$(document).on("click", "#saveCurrentNews", function () {
	
	
var title=$('#news_title').val();
var body=$('#news_body').val();
var image=$('#news_image').val();
	
	if(title.length==0 || body.length==0 || image.length==0)
		{
			showPop("News Error","Please provide title, body and image for the news.");
			
		}
	else{
		var request = getRequestObject({
			title:title,
			body:body,
			image:image
		}, "saveNews");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			
				showPop("Content Saved!","News has been added.");
			$('#news_title').val('');
			$('#news_body').val('');
			$('#news_image').val('');
			getOldNews();
		} 
	}, "json");
		
	}
	
});

function getOldNews(){
	
	$('#add_news_form').hide();
	$('#add_news_form input').val('');
	
		showLoading();
	var request = getRequestObject({}, "getNews");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			
			showOldNews(result.DATA);
		} else {}
	}, "json");
}
function showOldNews(data){

	$('#old_news_line').empty()
	for (counter = 0; counter < data.length; counter++) {
		var newRow = $('<tr style="font-size:11px">');
		var cols = "";
		cols += '<td>' + (counter + 1) + '</td>';
		cols += '<td>' + data[counter]["content_title"] + '</td>';
		cols += '<td><img src="../assets/news_images/' + data[counter]["content_photo"] + '" style="width:100px;height:100px"/></td>';
		cols += '<td>' + data[counter]["content_description"] + '</td>';
		cols += '<td>' + data[counter]["date"] + '</td>';
	
		cols += '</tr>';
		newRow.append(cols);
		$('#old_news_line').append(newRow);
	}
	var oTable = $("#old_news_table").dataTable({
		"bSort": true,
		"bRetrieve": true,
		"bProcessing": true,
		"bDestroy": true
	});
	$('#old_news_table').show();
	
}
var _validLogoExtensions = [".jpg",".jpeg",".png"];
var locationforimage = "";
function ImageValidate(input_Form) {
    $('.loading').show();
    var arrInputs = document.getElementsByClassName("uploadLogo");
    for (var i = 0; i < arrInputs.length; i++) {
        var oInput = arrInputs[i];
        if (oInput.type == "file") {
            var sFileName = oInput.value;
            if (sFileName.length > 0) {
                var Validity = false;
                for (var j = 0; j < _validLogoExtensions.length; j++) {
                    var sCurExtension = _validLogoExtensions[j];
                    if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                        Validity = true;

                        $("#uid_simple").val(userLoginJsn.oamk_userid);
                        $("#atoken_simple").val(userLoginJsn.oamk_useraccesstoken);
                        $("#infoid_simple").val(Math.random() * 10000000000000000 + 1);
                        $("#typehere_simple").val(locationforimage);
                        $("#uploadLogo_simple").submit();
						
                        break;
                    }
                }
                if (!Validity) {
                    $('.loading').hide();
                    loadedlogos("Error", "You are submitting a file type that is not allowed.  The permitted file types are: .jpg,.jpeg,.png");
                    return false;
                }
            }
        }
    }
    return true;
}

function loadedlogos(title, msg) {
    $('.loading').hide();
    showPop(title, msg);

getImages();
    

}


function afterLogoUpload(name, location) //filename to show after upload
{
    $('.loading').hide();
   getImages();
}


//manage news ends
function showAnalytics() {
	var request = getRequestObject({}, "TEACHER_GROUP_ANALYTICS");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			$('#total_teachers').html(result.DATA[0]["TOTAL_USER"]);
			$('#total_groups').html(result.DATA[0]["TOTAL_GROUPS"]);
			$('#total_vaccant').html(result.DATA[0]["VACANT_TEACHERS"].length);
			var listofteacher = "";
			if (result.DATA[0]["VACANT_TEACHERS"].length == 0) {
				listofteacher = "None";
			}
			for (var count = 0; count < result.DATA[0]["VACANT_TEACHERS"].length; count++) {
				listofteacher += result.DATA[0]["VACANT_TEACHERS"][count]["user_name"];
			}
			$('#vaccant_teachers').html(listofteacher);
		} else {}
	}, "json");
}

function showLoading() {
	$('.loading').show();
}

function stopLoading() {
	$('.loading').fadeOut("slow");
}
//managing teacher begins here
function getOldTeachers() {
	showLoading();
	var request = getRequestObject({}, "GETTEACHERS");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			$('#old_teachers').show();
			fillTeacherTable(result.DATA);
		} else {}
	}, "json");
}

function fillTeacherTable(data) {
	$('#old_teachers_line').empty()
	for (counter = 0; counter < data.length; counter++) {
		var newRow = $('<tr style="font-size:11px">');
		var cols = "";
		cols += '<td>' + (counter + 1) + '</td>';
		cols += '<td>' + data[counter]["user_name"] + '</td>';
		cols += '<td>' + data[counter]["created_on"] + '</td>';
		cols += '<td></td>';
		cols += '</tr>';
		newRow.append(cols);
		$('#old_teachers_line').append(newRow);
	}
	var oTable = $("#old_teachers_table").dataTable({
		"bSort": true,
		"bRetrieve": true,
		"bProcessing": true,
		"bDestroy": true
	});
	$('#old_teachers').show();
}

function manager_teachers() {
	$('#create_new_teacher').show();;
	$('#old_teachers').hide();
	$('#add_techer_form').hide();
	getOldTeachers();
	$(document).on("click", "#create_new_teacher", function () {
		$('#teacher_username').val('');
		$('#teacher_password').val('');
		$('#add_techer_form').show();
	});

}
$(document).on("click", "#create_new_teacher_save", function () {
	createNewTeacher();
});

function createNewTeacher() {
	var teacher_username = $('#teacher_username').val();
	var teacher_password = $('#teacher_password').val();
	if (teacher_password.length < 3 && teacher_username.length < 3) {
		showPop("Failed", "Please provide proper username and password.");
	} else {
		showLoading();
		var request = getRequestObject({
			teacher_username: teacher_username,
			teacher_password: teacher_password
		}, "CREATENEWUSER");
		$.post(SERVER_URL, request, function (result) {
			stopLoading();
			if (result.RESULT == "SUCCESS") {
				getOldTeachers();
				showPop("New Teacher Created", "A new teacher with username" + teacher_username + " has been created.");
			} else {
				showPop("Failed", "A user with username: " + teacher_username + " already exists, please try another.");
			}
		}, "json");
	}
}
// managing teacher ends here
//manage group begins here
$(document).on("click", "#create_new_group_save", function () {
	saveNewGroup();
});

function manage_groups() {
	$('#old_groups').show();
	$('#old_group_table').hide();
	$('#create_new_group').show();
	$('#add_group_form').hide();
	getOldGroups();
	$(document).on("click", "#create_new_group", function () {
		getListofTeachers();
	});
}

function getOldGroups() {
	showLoading();
	var request = getRequestObject({}, "GETOLDGROUPS");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			$('#old_groups').show();
			$('#old_group_table').show();
			fillGroupTable(result.DATA);
		} else {}
	}, "json");
}

function fillGroupTable(data) {
	$('#old_group_line').empty()
	for (counter = 0; counter < data.length; counter++) {
		var newRow = $('<tr style="font-size:11px">');
		var cols = "";
		cols += '<td>' + (counter + 1) + '</td>';
		cols += '<td>' + data[counter]["group_name"] + '</td>';
		cols += '<td>' + data[counter]["user_name"] + '</td>';
		cols += '</tr>';
		newRow.append(cols);
		$('#old_group_line').append(newRow);
	}
	var oTable = $("#old_group_table").dataTable({
		"bSort": true,
		"bRetrieve": true,
		"bProcessing": true,
		"bDestroy": true
	});
	$('#old_group_table').show();
}

function getListofTeachers() {
	var request = getRequestObject({}, "GETTEACHERNAMES");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			$('#group_name').val();
			$('#group_teacher')
				.find('option')
				.remove();
			$('#group_teacher')
				.append('<option value="0">Please Select</option>');
			for (var i = 0; i < result.DATA.length; i++) {
				$('#group_teacher')
					.append('<option value="' + result.DATA[i]["tutor_id"] + '">' + result.DATA[i]["user_name"] + '</option>');
			}
			$('#add_group_form').show();
		}
	}, "json");
}

function saveNewGroup() {
	var group_name = $('#group_name').val();
	var group_teacher = $('#group_teacher').val();
	if (group_name.length < 3 && group_teacher < 1) {
		showPop("Failed", "Please provide correct group name and Tutor Teacher.");
	} else {
		showLoading();
		var request = getRequestObject({
			group_name: group_name,
			group_teacher: group_teacher
		}, "SAVEGROUPS");
		$.post(SERVER_URL, request, function (result) {
			stopLoading();
			if (result.RESULT == "SUCCESS") {
				getOldGroups();
				showPop("New Group Created", "A new group with name " + group_name + " has been created.");
			} else {
				showPop("Failed", "Please try again!");
			}
		}, "json");
	}
}
//group code ends here
//manage students starts here
function showGroupError() {
	showPop("Group Error!", "Group is not selected, please select the group.")
}
$(document).on("click", "#view_students", function () {
	if ($('#student_group_teacher').val() != 0) {
		$('#create_new_students').hide();
		$('#show_old_students').show();
		getStudents();
	} else {
		showGroupError();
	}
});
$(document).on("click", "#saveCurrentStudent", function () {
	saveCurrentStudent();
});

function checkFields(fname, lname, code, email, group) {
	var missing = new Array;
	if (fname.length == 0) {
		missing.push("First Name");
	}
	if (lname.length == 0) {
		missing.push("Last Name");
	}
	if (code.length == 0) {
		missing.push("Student Code");
	}
	if (email.length == 0) {
		missing.push("Email");
	}
	return missing;
}

function validateEmail(email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function saveCurrentStudent() {
	var fname = $('#student_first_name').val();
	var lname = $('#student_last_name').val();
	var code = $('#student_code').val();
	var email = $('#student_email').val();
	var group = $('#student_group_teacher').val();
	var checkCount = checkFields(fname, lname, code, email, group);
	if (checkCount.length != 0) {
		showPop("Incomplete!", "Please fill all the following,<br>" + checkCount.toString());
	} else {
		if (!validateEmail(email)) {
			showPop("Invalid Email", "The provided email address is invalid.");
		} else {
			showLoading();
			var request = getRequestObject({
				fname: fname,
				lname: lname,
				code: code,
				email: email,
				group: group
			}, "SAVESTUDENT");
			$.post(SERVER_URL, request, function (result) {
				stopLoading();
				if (result.RESULT == "SUCCESS") {
					showPop("New Student Added", "A new student with name " + fname + " has been added.");
					$('#create_new_students').hide();
				} else {
					showPop("Failed", "Please try again!");
				}
			}, "json");
		}
	}
}

function getStudents() {
	showLoading();
	var request = getRequestObject({
		group: $('#student_group_teacher').val()
	}, "GETALLSTUDENTS");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			$('#old_groups').show();
			$('#old_students_table').show();
			fillStudentsTable(result.DATA);
		} else {}
	}, "json");
}

function fillStudentsTable(data) {
	$('#old_students_line').empty();
	for (counter = 0; counter < data.length; counter++) {
		var newRow = $('<tr style="font-size:11px">');
		var cols = "";
		cols += '<td>' + (counter + 1) + '</td>';
		cols += '<td>' + data[counter]["first_name"] + ' ' + data[counter]["last_name"] + '</td>';
		cols += '<td>' + data[counter]["student_code"] + '</td>';
		cols += '<td>' + data[counter]["group_name"] + '</td>';
		cols += '<td>' + data[counter]["user_name"] + '</td>';
		cols += '<td>' + data[counter]["email_id"] + '</td>';
		cols += '<td>' + data[counter]["created_on"] + '</td>';
		student_links[data[counter]["id"]] = data[counter];
		cols += '<td><div class="btn btn-xs btn-warning" onclick="showlink(' + data[counter]["id"] + ');">Link</div></td>';
		cols += '</tr>';
		newRow.append(cols);
		$('#old_students_line').append(newRow);
	}
	var oTable = $("#old_students_table").dataTable({
		"bSort": true,
		"bRetrieve": true,
		"bProcessing": true,
		"bDestroy": true
	});
	$('#old_group_table').show();
}

function showlink(ref) {
	var title = "Students Specific Linker";
	var body = '<a href="../newsletter/index.html?access_token=' + student_links[ref]["access_code"] + '" class="btn btn-xs btn-info" target="_blank">Link</a>';
	showPop(title, body);
}
$(document).on("click", "#add_students", function () {
	if ($('#student_group_teacher').val() != 0) {
		$('#show_old_students').hide();
		$('#create_new_students input').val('');
		$('#student_group').val($('#student_group_teacher').val());
		$('#create_new_students').show();
	} else {
		showGroupError();
	}
});

function manangeStudents() {
	getGroupTeachers();
	$('#show_old_students').hide();
	$('#create_new_students').hide();
	//old_students
	//student_group
	//view_students
	//add_students
}

function getGroupTeachers() {
	var request = getRequestObject({}, "GETGROUPANDTEACHER");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			$('#group_name').val();
			$('#student_group_teacher')
				.find('option')
				.remove();
			$('#student_group_teacher')
				.append('<option value="0">Please Select</option>');
			for (var i = 0; i < result.DATA.length; i++) {
				$('#student_group_teacher')
					.append('<option value="' + result.DATA[i]["group_id"] + '">' + result.DATA[i]["group_name"] + ' managed by: ' + result.DATA[i]["group_teacher"] + '</option>');
			}
			$('#add_group_form').show();
		}
	}, "json");
}
//manage students ends here
function showPop(title, body) {
	$('#alert_popup_title').html(title);
	$('#alert_popup_content').html(body);
	$('#alert_popup').modal();
}

function create_groups() {
	$('#create_group_form').show();
}

function remove_group() {
	$('#remove_group_form').show();
}

function edit_groups() {
	$('#edit_groups_form').show();
}

function studentAnalytics() {



	showLoading();
	var request = getRequestObject({}, "STUDENTANALYTICS");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {

			drawChart(result.DATA);

		} else {}
	}, "json");





}

function drawChart(DATA) {

	var GROUPS = [];
	var STUDENTS = [];
	for (counter = 0; counter < DATA.length; counter++) {
		STUDENTS.push(Number(DATA[counter]["STUDENTS"]));
		GROUPS.push((DATA[counter]["GROUPNAME"]));
	}


	$(function () {
		$('#myPieChart').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Students / Group Analytics'
			},
			subtitle: {
				text: 'Total students in a group'
			},
			xAxis: {
				categories: GROUPS,
				labels: {
					rotation: -45,
					style: {
						fontSize: '13px',
						fontFamily: 'Verdana, sans-serif'
					}
				}
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Total Number of Students'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.x}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
					'<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				name: 'Number of Students',
				data: STUDENTS
            }]
		});
	});
}
// adding polls
function managePolls(){
	getpolls();
$('#old_polls').show();
$('#add_poll_form').hide();


}
var numerofoptions = 0;

$(document).on("click", "#create_new_poll", function () {
	
	
$('#poll_title_input').val('');
    $('#poll_ref_id').val('NEW');
    var inputs = $('#option_inputs').empty();
    inputs.append('<input  class="form-control" placeholder="Option 1" type="text" name="options[' + 0 + ']" value="" /><br> ');
    inputs.append('<input  class="form-control"  placeholder="Option 2" type="text" name="options[' + 1 + ']" value="" /><br> ');
    numerofoptions = 3;
	$('#add_poll_form').show();
});
$('#addoptions').click(function () {

    if (numerofoptions > 5) {
        showPop("Option Limit Exceeded", "A poll can have up to 5 options.");

    } else {
        var inputs = $('#option_inputs');
        current_numer = numerofoptions - 1;

        inputs.append('<input  class="form-control"  placeholder="Option ' + numerofoptions + '" type="text" name="options[' + current_numer + ']" value="" /><br> ');
        numerofoptions++;

    }


});

$('#savepollsettings').click(function () {
    var poll_title = $('#poll_title_input').val();
    var ref_id = $('#poll_ref_id').val();
    var options = new Array();
    $("[name^='options']").each(function () {

        options.push($(this).val());
    });
  
    var request = getRequestObject({
        poll_title: poll_title,
        ref_id: ref_id,
        options: options,

    }, "SAVE_POLL_SETTINGS");
    $.post(SERVER_URL, request, function (result) {
        if (result.RESULT == "SUCCESS") {
			showPop("Poll Added","Poll has been added.");
			$('#add_poll_form').hide();

           getpolls();

        } 
    }, "json");
});

function getpolls(){
	var request = getRequestObject({
    }, "GETPOLLS");
    $.post(SERVER_URL, request, function (result) {
        if (result.RESULT == "SUCCESS") {
			
				showPolls(result.DATA);
          // getpolls();

        } 
    }, "json");
	
}
function showPolls(data){
	

	$('#old_poll_line').empty();
	for (counter = 0; counter < data.length; counter++) {
		var newRow = $('<tr style="font-size:11px">');
		var cols = "";
		cols += '<td>' + (counter + 1) + '</td>';
		cols += '<td>' + data[counter]["poll_title"] + '</td>';
		cols += '<td>';
		for(count=0;count<data[counter]["options"].length;count++){
			cols+='<div>'+(count + 1)+'. '+data[counter]["options"][count]["option_title"]+'</div>';
			
		}
		cols+='</td>';
		cols += '<td>' + data[counter]["date"] + '</td>';
	
	
		cols += '</tr>';
		newRow.append(cols);
		$('#old_poll_line').append(newRow);
	}
	var oTable = $("#old_poll_table").dataTable({
		"bSort": true,
		"bRetrieve": true,
		"bProcessing": true,
		"bDestroy": true
	});
	$('#old_poll_table').show();
	
	
}
// polls end here