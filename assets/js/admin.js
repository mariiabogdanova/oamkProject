var adminMenuArray = [{
	group: "Manage Teachers",
	items: ["Add Teacher", "Manage Groups", "Analytics"], //, "Remove Teacher"
	fnct: ["add_teacher", "manage_groups", "Analytics_teacher_group"] //, "Remove Teacher"
}, {
	group: "Manage Students",
	items: ["Manage Students",  "Analytics"],//"Assign Groups",
	fnct: ["manage_students", "Analytics"]//, "Assign Groups"
}, {
	group: "Manage News",
	items: ["Add News", "Analytics"],
	fnct: ["Add News", "Analytics"],
}, {
	group: "Analytics",
	items: ["Newsletter Anaytics", "Stuents Analytics", "Teachers Analytics"],
	fnct: ["Newsletter Anaytics", "Stuents Analytics", "Teachers Analytics"]
}];
var student_links=new Array();
function bodyLoaded() {
	var bug_Test = true;
	if (bug_Test == true) {
		showLoggedInPage()
	} else {
		showLogin();
		adminFunctions();
	}
}

function showLogin() {
	$('#login-page').show();
	$('#logged-in-page').hide();
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
	if (username == "test" && password == "test") {
		alert("CORRECT");
		showLoggedInPage();
	} else {
		alert("INCORRECT");
	}
}

function doLogOut() {
	showLogin();
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
		default:

	}

}

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
	$(document).on("click", "#create_new_teacher_save", function () {
		createNewTeacher();
	});
}

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

function saveCurrentStudent() {
	var fname = $('#student_first_name').val();
	var lname = $('#student_last_name').val();
	var code = $('#student_code').val();
	var email = $('#student_email').val();
	var group = $('#student_group_teacher').val();
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
		cols += '<td>' + data[counter]["group_id"] + '</td>';
		cols += '<td>' + data[counter]["group_id"] + '</td>';
		cols += '<td>' + data[counter]["email_id"] + '</td>';
		cols += '<td>' + data[counter]["created_on"] + '</td>';
		student_links[ data[counter]["id"]]=data[counter];
		cols += '<td><div class="btn btn-xs btn-warning" onclick="showlink('+ data[counter]["id"]+');">Link</div></td>';
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
function showlink(ref){
	var title="Students Specific Linker";
	var body='<a href="../students/student_view.html?access_token='+student_links[ref]["access_code"]+'" class="btn btn-xs btn-info" target="_blank">Link</a>';
	showPop(title,body);
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
