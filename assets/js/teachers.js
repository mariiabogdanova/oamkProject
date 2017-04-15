var oamk_teacher_userinfo = {
	oamk_userid: '',
	oamk_username: '',
	oamk_useraccesstoken: ''
}
var SERVER_URL = "../oamkServiceCall.php";

function bodyLoaded() {
	var bug_Test = false;
	if (bug_Test == true) {
		showLoggedInPage()
	} else {
		showLogin();
	}
}

function userLoginFunction(username, password) {
	var username = username;
	var password = password;
	var request = getRequestObject({
		username: username,
		password: password
	}, "TEACHERLOGIN");
	$.post(SERVER_URL, request, function (result) {
		if (result.RESULT == "SUCCESS") {
			setUserToLoggedin(result.UID, result.access_token);
		} else if (result.RESULT == "ACCESSERROR") {
			showPop("INVALID", "You donot have sufficient previlage to access this page");
		} else {}
	}, "json");
}

function setUserToLoggedin(uid, un, ac) {
	$('#login-page').hide();
	oamk_teacher_userinfo.oamk_userid = uid;
	oamk_teacher_userinfo.oamk_username = un;
	oamk_teacher_userinfo.oamk_useraccesstoken = ac;
	$.cookie('oamk_teacher_userinfo', JSON.stringify(oamk_teacher_userinfo), {
		expires: 365,
		path: '/'
	});
	showLoggedInPage();
}

function showLoggedInPage() {
	$('#logedin-page').show();
}

function setUserToLoggedOut() {
	$.removeCookie('oamk_teacher_userinfo', {
		path: '/'
	});
	location.reload();
}

function getRequestObject(data, serviceName) {
	data.oamkSERVICE = serviceName;
	data.uid = oamk_teacher_userinfo.oamk_userid;
	data.atoken = oamk_teacher_userinfo.oamk_useraccesstoken;
	data.infoid = Math.random() * 10000000000000000 + 1;
	return data;
}

function showLogin() {
	if (($.cookie('oamk_teacher_userinfo') != null)) {
		userLoginJsn = JSON.parse($.cookie('oamk_admin_userinfo'));
		setUserToLoggedin(oamk_teacher_userinfo.oamk_userid, oamk_teacher_userinfo.oamk_username, oamk_teacher_userinfo.oamk_useraccesstoken);
	} else {
		$('#login-page').show();
		$('#logged-in-page').hide();
		//adminFunctions();
	}
}
$(document).on("click", "#sign_in", function () {
	doLogin();
});
$(document).on("click", "#editYourInfo", function () {
	showEditInfo();
});
$(document).on("click", "#edit_newsletter", function () {
	showEditNewsletter();
});
$(document).on("click", ".close_top_display", function () {
	$("#contact_info_here").slideUp("fast");
	$("#future_articles").slideUp("fast");
});
//featured and contact btn
$(document).on("click", "#future_features_btn", function () {
	if ($("#future_articles").is(':visible')) {
		$("#future_articles").slideUp("fast");
	} else {
		showfuturefeature("Test", "ttstttsttf asdf asfd asdf sd");
	}
});
$(document).on("click", "#countact_us_btn", function () {
	if ($("#contact_info_here").is(':visible')) {
		$("#contact_info_here").slideUp("fast");
	} else {
		showcontactinfo();
	}
});

function showfuturefeature(title, intro) {
	var content = "";
	var content_title = title;
	var content_intro = intro;
	content += '<div class="col-xs-12">' + content_title + '</div><div style="color:#6B6969;font-size:10px;margin-left:15px">' + content_intro + '</div>';
	$('#upcoming_articles').html(content);
	$("#contact_info_here").slideUp("fast");
	$("#future_articles").slideDown("slow");
}

function showcontactinfo() {
	$("#future_articles").slideUp("fast");
	$("#contact_info_here").slideDown("slow");
}

function showEditInfo() {
	$("#contentmanager").slideDown("slow");
	teacherInfoManager();
}

function showEditNewsletter() {
	$("#contentmanager").slideUp("fast");
}
//switch between news and note
$(document).on("click", "#note_btn", function () {
	$("#news_btn").removeClass('active');
	$("#note_btn").addClass('active');
	$("#allnotearea").show();
	$("#allnewsarea").hide();
});
$(document).on("click", "#news_btn", function () {
	$("#note_btn").removeClass('active');
	$("#news_btn").addClass('active');
	$("#allnotearea").hide();
	$("#allnewsarea").show();
});
//end here

//teachers info
$(document).on("click", "#save_current_teacher", function () {
	trySavingTeacherInfo();
});
function trySavingTeacherInfo(){
	var tutor_message_title=$('#tutor_message_title').val();
var tutor_message_body=$('#tutor_message_body').val();
var tutor_note=$('#tutor_note').val();
var in_the_news=$('#in_the_news').val();
var featured_poll=$('#featured_poll').val();
var poll_result=$('#poll_result').val();
var first_name=$('#first_name').val();
var last_name=$('#last_name').val();
var email_id=$('#email_id').val();
var phone_number=$('#phone_number').val();
var room_number=$('#room_number').val();
var title_message=$('#title_message').val();
var subtitle_message=$('#subtitle_message').val();
	
if(tutor_message_title==""||
tutor_message_body==""||
first_name==""||
last_name==""||
email_id==""||
phone_number==""||
room_number==""||
title_message==""||
subtitle_message==""){
	showPop("Incomplete","Please fill all the necessary fields");
}else{
	
		var request = getRequestObject({
		tutor_message_title:tutor_message_title,
tutor_message_body:tutor_message_body,
tutor_note:tutor_note,
in_the_news:in_the_news,
featured_poll:featured_poll,
poll_result:poll_result,
first_name:first_name,
last_name:last_name,
email_id:email_id,
phone_number:phone_number,
room_number:room_number,
title_message:title_message,
subtitle_message:subtitle_message
	}, "SAVETEACHERINFO");
	$.post(SERVER_URL, request, function (result) {
		if (result.RESULT == "SUCCESS") {
			
		} 
	}, "json");
	
}	
	
}
function teacherInfoManager(){
	
var tutor_message_title=$('#tutor_message_title').val();
var tutor_message_body=$('#tutor_message_body').val();
var tutor_note=$('#tutor_note').val();
var in_the_news=$('#in_the_news').val();
var featured_poll=$('#featured_poll').val();
var poll_result=$('#poll_result').val();
var first_name=$('#first_name').val();
var last_name=$('#last_name').val();
var email_id=$('#email_id').val();
var phone_number=$('#phone_number').val();
var room_number=$('#room_number').val();
var title_message=$('#title_message').val();
var subtitle_message=$('#subtitle_message').val();

}

//end teacher info
function doLogin() {
	var username = $('#user_name').val();
	var password = $('#password').val();
	if (username != "" && password != "") {
		userLoginFunction(username, password);
	} else {
		showPop("Invalid", "Enter proper username/password.");
	}
}

function showPop(title, body) {
	$('#alert_popup_title').html(title);
	$('#alert_popup_content').html(body);
	$('#alert_popup').modal();
}
