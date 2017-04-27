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

function showLoading() {
	$('.loading').show();
}

function stopLoading() {
	$('.loading').fadeOut("slow");
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
	teacherInfoManager();
	getSelectedPollandResult();
	getCurrentVideo("show");
	displaySelectedNews();
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
		userLoginJsn = JSON.parse($.cookie('oamk_teacher_userinfo'));
		setUserToLoggedin(userLoginJsn.oamk_userid, userLoginJsn.oamk_username, userLoginJsn.oamk_useraccesstoken);
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

function trySavingTeacherInfo() {
	var tutor_message_title = $('#tutor_message_title').val();
	var tutor_message_body = $('#tutor_message_body').val();
	var tutor_note = 0;
	var in_the_news = 0;
	var featured_poll = 0;
	var poll_result = 0;
	if ($('#tutor_note').is(":checked")) {
		tutor_note = 1;
	}
	if ($('#in_the_news').is(":checked")) {
		in_the_news = 1;
	}
	if ($('#featured_poll').is(":checked")) {
		featured_poll = 1;
	}
	if ($('#poll_result').is(":checked")) {
		poll_result = 1;
	}
	var first_name = $('#first_name').val();
	var last_name = $('#last_name').val();
	var email_id = $('#email_id').val();
	var phone_number = $('#phone_number').val();
	var room_number = $('#room_number').val();
	var title_message = $('#title_message').val();
	var subtitle_message = $('#subtitle_message').val();
	if (tutor_message_title == "" || tutor_message_body == "" || first_name == "" || last_name == "" || email_id == "" || phone_number == "" || room_number == "" || title_message == "" || subtitle_message == "") {
		showPop("Incomplete", "Please fill all the necessary fields");
	} else {
		var request = getRequestObject({
			tutor_message_title: tutor_message_title,
			tutor_message_body: tutor_message_body,
			tutor_note: tutor_note,
			in_the_news: in_the_news,
			featured_poll: featured_poll,
			poll_result: poll_result,
			first_name: first_name,
			last_name: last_name,
			email_id: email_id,
			phone_number: phone_number,
			room_number: room_number,
			title_message: title_message,
			subtitle_message: subtitle_message
		}, "SAVETEACHERINFO");
		$.post(SERVER_URL, request, function (result) {
			if (result.RESULT == "SUCCESS") {
				showPop("Content Saved!", "Content has been Saved!");
				teacherInfoManager();
			}
		}, "json");
	}
}

function teacherInfoManager() {
	showLoading();
	$('#tutor_message_title').val('');
	$('#tutor_message_body').val('');
	$('#tutor_note').prop('checked', true);
	$('#in_the_news').prop('checked', true);
	$('#featured_poll').prop('checked', true);
	$('#poll_result').prop('checked', true);
	$('.featured_poll').show();
	$('.poll_result').show();
	$('#note_btn').show();
	$('#news_btn').show();
	$('#allnotearea').show();
	$('#allnewsarea').show();
	$("#note_btn").click();
	$('#first_name').val('');
	$('#last_name').val('');
	$('#email_id').val('');
	$('#phone_number').val('');
	$('#room_number').val('');
	$('#title_message').val('');
	$('#subtitle_message').val('');
	var request = getRequestObject({}, "GETSAVEDINFO");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			if (result.DATA[0].length != 0) {
				var CONTENT = result.DATA[0];
				$('#tutor_message_title').val(CONTENT["tutor_message_title"]);
				$('#tutor_message_title_here').html(CONTENT["tutor_message_title"]);
				$('#tutor_message_body_here').html(CONTENT["tutor_message_body"]);
				$('#tutor_message_body').val(CONTENT["tutor_message_body"]);
				if (CONTENT["tutor_message_body"] == 0) {
					$('#tutor_note').prop('checked', false);
					$('#note_btn').hide();
					$('#allnotearea').hide();
				}
				if (CONTENT["in_the_news"] == 0) {
					$('#in_the_news').prop('checked', false);
					$('#allnewsarea').hide();
					$('#news_btn').hide();
				}
				if (CONTENT["featured_poll"] == 0) {
					$('#featured_poll').prop('checked', false);
					$('.featured_poll').hide();
				}
				if (CONTENT["poll_result"] == 0) {
					$('#poll_result').prop('checked', false);
					$('.poll_result').hide();
				}
				$('#title_message').val(CONTENT["title_message"]);
				$('#subtitle_message').val(CONTENT["subtitle_message"]);
				$('#header_title').html(CONTENT["title_message"]);
				$('#header_sub').html(CONTENT["subtitle_message"]);
				$('.ramro').html('<img src="../assets/news_images/' + CONTENT["background_image"] + '" style="width:100%"/>');
				if (result.DATA[0]["TEACHER"].length != 0) {
					var TEACHERDATA = result.DATA[0]["TEACHER"][0];
					$('#first_name').val(TEACHERDATA["first_name"]);
					$('#last_name').val(TEACHERDATA["last_name"]);
					$('#email_id').val(TEACHERDATA["email_id"]);
					$('#phone_number').val(TEACHERDATA["phone_number"]);
					$('#room_number').val(TEACHERDATA["room_number"]);
					var contact_info = '<span class="contactTitle">Teacher: </span><span class="contactInfo">' + TEACHERDATA["first_name"] + ' ' + TEACHERDATA["last_name"] + ' </span>';
					contact_info += '<br><span class="contactTitle">Phone number: </span><span class="contactInfo">' + TEACHERDATA["phone_number"] + ' </span>';
					contact_info += '<br><span class="contactTitle">Room number: </span><span class="contactInfo">' + TEACHERDATA["room_number"] + ' </span>';
					contact_info += '<br><span class="contactTitle">Email: </span><span class="contactInfo"><a href="mailto:' + TEACHERDATA["email_id"] + '" target="_blank">' + TEACHERDATA["email_id"] + ' </a></span>';
					$('#contact_information_here').html(contact_info);
				}
			}
		}
	}, "json");
}
//end teacher info
$("#title_message").on("input propertychange", function () {
	$('#header_title').html($("#title_message").val());
});
$("#subtitle_message").on("input propertychange", function () {
	$('#header_sub').html($("#subtitle_message").val());
});
$("#tutor_message_title").on("input propertychange", function () {
	$('#tutor_message_title_here').html($("#tutor_message_title").val());
});
$("#tutor_message_body").on("input propertychange", function () {
	$('#tutor_message_body_here').html($("#tutor_message_body").val());
});
$("#poll_result").change(function () {
	if ($('#poll_result').is(":checked")) {
		$('.poll_result').show();
	} else {
		$('.poll_result').hide();
	}
});
$("#tutor_note").change(function () {
	if ($('#tutor_note').is(":checked")) {
		$('#note_btn').show();
		$("#note_btn").click();
		$('#allnotearea').show();
	} else {
		$('#note_btn').hide();
		$('#allnotearea').hide();
	}
});
$("#in_the_news").change(function () {
	if ($('#in_the_news').is(":checked")) {
		$('#allnewsarea').show();
		$('#news_btn').show();
		$("#news_btn").click();
	} else {
		$('#allnewsarea').hide();
		$('#news_btn').hide();
	}
});
$("#featured_poll").change(function () {
	if ($('#featured_poll').is(":checked")) {
		$('.featured_poll').show();
	} else {
		$('.featured_poll').hide();
	}
});

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
//background
$(document).on("click", "#background-setter", function () {
	getImageGallery();
});

function getImageGallery() {
	getImages();
	$('#imageUploader').modal();
}

function getImages() {
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
var _validLogoExtensions = [".jpg", ".jpeg", ".png"];
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
$(document).on("click", "#uploader_apply", function () {
	showLoading();
	var request = getRequestObject({
		background: imageSelected
	}, "setBackground");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			$('.ramro').html('<img src="../assets/news_images/' + imageSelected + '" style="width:100%"/>');
		}
	}, "json");
	$('#imageUploader').modal('hide');
});
/// poll settings begins here
$(document).on("click", "#poll_setter", function () {
	getExistingPolls();
});

function getExistingPolls() {
	showLoading();
	var request = getRequestObject({}, "GETSELECTEDPOLLS");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			showallpolls(result.DATA, result.SELECTED);
		}
	}, "json");
}

function showallpolls(totaldata, selected) {
	$('#poll_list_lines').empty();
	for (counter = 0; counter < totaldata.length; counter++) {
		var newRow = $('<tr style="font-size:11px" >');
		var cols = "";
		var ref = totaldata[counter]["id"];
		cols += '<td>' + ref + '</td>';
		cols += '<td style="font-size:12pt">' + totaldata[counter]["poll_title"] + '</td><td width="100px">';

		if (selected.length > 0) {
			if (selected[0]["poll_id"] == ref) {
				cols += '<input ref_id="' + ref + '" ref_action="poll_id"  class="polltitleact" type="checkbox" checked>';
			} else {

				cols += '<input ref_id="' + ref + '" ref_action="poll_id"  class="polltitleact" type="checkbox" >';
			}

		} else {
			cols += '<input ref_id="' + ref + '" ref_action="poll_id" class="polltitleact" type="checkbox">';
		}
		cols += '</td><td>';
		if (selected.length > 0) {
			if (selected[0]["result_id"] == ref) {
				cols += '<input ref_id="' + ref + '" ref_action="result_id"  class="polltitleact" type="checkbox" checked>';
			} else {

				cols += '<input ref_id="' + ref + '" ref_action="result_id"  class="polltitleact" type="checkbox" >';
			}
		} else {
			cols += '<input ref_id="' + ref + '"  ref_action="result_id"  class="polltitleact" type="checkbox">';
		}
		cols += '</td>';

		newRow.append(cols);
		$('#poll_list_lines').append(newRow);
	}
	oTable = $("#poll_list").dataTable({
		"bSort": false,
		"bRetrieve": true,
		"bProcessing": true,
		"bDestroy": true,
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
	});
	$('#polladdedit_menu').hide();

	$('#pollsettingsmodal').modal();
	$("#poll_list").css("width", "100%");
	$('#poll_list').show();
}
$(document).on("click", ".polltitleact", function () {
	var ref_id = $(this).attr("ref_id");
	var ref_action = $(this).attr("ref_action");
	var value = $(this).is(":checked");
	if (value) {
		actiononpoll(ref_id, ref_action, value);
	}

});

function actiononpoll(ref_id, ref_action, value) {


	showLoading();
	var request = getRequestObject({
		ref_id: ref_id,
		ref_action: ref_action,
		value: value
	}, "SETSELECTEDPOLL");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			getExistingPolls();
			getSelectedPollandResult();
		}
	}, "json");
}

function getSelectedPollandResult() {
	showLoading();
	var request = getRequestObject({}, "GETSELECTEDPOLLANDRESULT");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			showPolls(result.DATA);
			showpollresult(result.DATA[0]["RESULT"]);
		}
	}, "json");

}

function showpollresult(data) {
    var total_Votes = 0;
    var registerd_Votes = new Object();
    for (var c = 0; c < data.length; c++) {
      //  var votedata = data["OPTIONS"][votes];
       var votedata =data[c]["voted"];
       total_Votes += Number(votedata);
      
        registerd_Votes[data[c]["option_title"]] = Number(votedata);
    }
    $('#total_voters').html(total_Votes);


    var allvotes = "";
    for (var votes = 0; votes < data.length; votes++) {
        var per = ((Number(data[votes]["voted"]) / total_Votes) * 100).toFixed(0);
        var indvote = '<div ><div style="text-align:left;    line-height: 19px;" class="row">' + data[votes]["option_title"] + '<span style="text-align:right;float:right">' + per + '%</span></div><div class=" row progress" style="height:15px">  <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="' + per + '"  aria-valuemin="0" aria-valuemax="100" style="width:' + per + '%"> </div></div></div>'
        allvotes += indvote;
    }
    $('#votedarea').html(allvotes);
    $('#votedareatitle').html(data[0]["TITLE"]);


}
function showPolls(data) {
    $("#active_poll").empty();
    var pollcontent = "";
    var polltitle = data[0]["POLL"][0]["poll_title"];
    pollcontent += '<div class="poll_title">' + polltitle + '</div>';
    pollcontent += '<div class="poll_options">';
    for (var opts = 0; opts < data[0]["POLL"][0]["OPTIONS"].length; opts++) {

        var pollopt = '<div class="col-xs-12" style="margin-bottom:15px;margin-left:-15px"><div class="marker hvr-radial-in" ref_id="' +  data[0]["POLL"][0]["OPTIONS"][opts]["id"] + '" ref_poll="' +  data[0]["POLL"][0]["id"] + '"></div><div class="poll">' +  data[0]["POLL"][0]["OPTIONS"][opts]["option_title"] + '</div></div>';
        pollcontent += pollopt;
    }
    pollcontent += '</div>';
    $("#active_poll").html(pollcontent);
    $("#poll_title_here").html('This month’s question');
 

}


//poll here
//video here


$(document).on("click", "#video_Setter", function () {



	openVideoSettings();

});

$(document).on("click", "#save_Video", function () {
	showLoading();
	var video_title = $('#tutor_video_title').val();
	var video_details = $('#video_details').val();
	var video_code = $('#video_code').val();
	var request = getRequestObject({
		video_title: video_title,
		video_details: video_details,
		video_code: video_code
	}, "SAVEVIDEO");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			getCurrentVideo("show");
		}
	}, "json");





});

function openVideoSettings() {

	$('#tutor_video_title').val('');
	$('#video_details').val('');
	$('#video_code').val('');

	getCurrentVideo("GET");

}

function getCurrentVideo(type) {

	var request = getRequestObject({

	}, "GETVIDEO");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			if (type == "GET") {

				$('#tutor_video_title').val('');
				$('#video_details').val('');
				$('#video_code').val('');

				if (result.DATA.length > 0) {
					$('#tutor_video_title').val(result.DATA[0]["video_title"]);
					$('#video_details').val(result.DATA[0]["video_desc"]);
					$('#video_code').val(result.DATA[0]["video_code"]);


				}

				$('#videoSettings').modal();
			}
			var video_code = '<div class="col-xs-6"><div></div><div></div></div><div class="col-xs-6"><div></div></div>';
			if (result.DATA.length > 0) {
				var video_code = '<div class="col-xs-6"><div class="video_title">' + result.DATA[0]["video_title"] + '</div><div class="video_desc">' + result.DATA[0]["video_desc"] + '</div></div><div class="col-xs-6">' + result.DATA[0]["video_code"] + '</div>';
			}
			$('#video_here').html(video_code);

		}
	}, "json");
}


//video ends here


//news manage


$(document).on("click", "#editNews", function () {
	getSelectedNews();

});

function getSelectedNews() {
	var request = getRequestObject({}, "getnews");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			showNews(result.DATA, result.SELECTED);
		}
	}, "json");
}
function displaySelectedNews() {
	var request = getRequestObject({}, "getnews");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			displayNews(result.DATA, result.SELECTED);
		}
	}, "json");
}
function saveNewsSetings() {
	var request = getRequestObject({
		ref_news: selected_news
	}, "setNews");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			getSelectedNews();
		}
	}, "json");


}
$(document).on("click", ".checkboxes_for_news", function () {


	var ref_id = $(this).attr("id");
	var ischecked = $(this).is(":checked");



	if (ischecked == true) {
		if (selected_news.length < 3) {
			selected_news.push(ref_id);
			saveNewsSetings();
		} else {
			showPop("Error", "You can only select three news topics");
			getSelectedNews();
		}

	} else {


		var index = selected_news.indexOf(ref_id);
		if (index > -1) {
			selected_news.splice(index, 1);
		}
		saveNewsSetings();
	}

	/*
	if (howmanyselected == 1) {
		$('#news_box_1 .title').html(allnews[ref_id]["content_title"]);
		$('#news_box_1 .body').html(allnews[ref_id]["content_description"]);
		$('#news_image_1').attr('src', '../assets/news_images/' + allnews[ref_id]["content_photo"]);



	}

	if (howmanyselected == 2) {
		$('#news_box_2 .title').html(allnews[ref_id]["content_title"]);
		$('#news_box_2 .body').html(allnews[ref_id]["content_description"]);
		$('#news_image_2').attr('src', '../assets/news_images/' + allnews[ref_id]["content_photo"]);
	}

	if (howmanyselected == 3) {
		$('#news_box_3 .title').html(allnews[ref_id]["content_title"]);
		$('#news_box_3 .body').html(allnews[ref_id]["content_description"]);
		$('#news_image_3').attr('src', '../assets/news_images/' + allnews[ref_id]["content_photo"]);

	}
*/



});
var allnews = new Array();
var selected_news = new Array();

function displayNews(DATA, SELECTED) {
	var content = "";
	var sel = new Array();
	var seledcount = 1;
	var seled = SELECTED[0]["news_selection"];
	sel = seled.split(",");

	$('#news_box_1 .title').html('');
	$('#news_box_1 .body').html('');
	$('#news_image_1').attr('src', '../assets/news_images/');
	$('#news_box_2 .title').html('');
	$('#news_box_2 .body').html('');
	$('#news_image_2').attr('src', '../assets/news_images/');
	$('#news_box_3 .title').html('');
	$('#news_box_3 .body').html('');
	$('#news_image_3').attr('src', '../assets/news_images/');
	for (count = 0; count < DATA.length; count++) {
	var now = DATA[count]["id"];
		if (sel.indexOf(now) > -1) {
			$('#news_box_' + seledcount + ' .title').html(DATA[count]["content_title"]);
			$('#news_box_' + seledcount + ' .body').html(DATA[count]["content_description"]);
			$('#news_image_' + seledcount).attr('src', '../assets/news_images/' + DATA[count]["content_photo"]);
			seledcount++;
		}
	}






	/*
	for(var count=0;count<DATA.length;count++){
		
			allnews[DATA[count]["id"]]=DATA[count];
		content+='<div class="col-xs-12" ><div class="col-xs-6">'+(count+1)+'. ';
		content+=DATA[count]["content_title"];
		content+='</div><div class="col-xs-6"><input type="checkbox" class="checkboxes_for_news" id="'+DATA[count]["id"]+'"/></div></div>';
		
		
	}$('#news_content').html(content);
	*/


}
function showNews(DATA, SELECTED) {
	var content = "";
	var sel = new Array();
	var seledcount = 1;
	var seled = SELECTED[0]["news_selection"];
	sel = seled.split(",");

	$('#news_box_1 .title').html('');
	$('#news_box_1 .body').html('');
	$('#news_image_1').attr('src', '../assets/news_images/');
	$('#news_box_2 .title').html('');
	$('#news_box_2 .body').html('');
	$('#news_image_2').attr('src', '../assets/news_images/');
	$('#news_box_3 .title').html('');
	$('#news_box_3 .body').html('');
	$('#news_image_3').attr('src', '../assets/news_images/');
	selected_news = [];
	$('#news_list_lines').empty()
	for (count = 0; count < DATA.length; count++) {
		var newRow = $('<tr style="font-size:11px">');

		var cols = "";
		cols += '<td>' + (count + 1) + '</td>';
		cols += '<td>' + DATA[count]["content_title"] + '</td>';
		var now = DATA[count]["id"];
		if (sel.indexOf(now) > -1) {


			selected_news.push(DATA[count]["id"]);
			cols += '<td><input type="checkbox" class="checkboxes_for_news" id="' + DATA[count]["id"] + '" checked/></td>';

			$('#news_box_' + seledcount + ' .title').html(DATA[count]["content_title"]);
			$('#news_box_' + seledcount + ' .body').html(DATA[count]["content_description"]);
			$('#news_image_' + seledcount).attr('src', '../assets/news_images/' + DATA[count]["content_photo"]);
			seledcount++;

		} else {
			cols += '<td><input type="checkbox" class="checkboxes_for_news" id="' + DATA[count]["id"] + '"/></td>';

		}

		cols += '</tr>';
		newRow.append(cols);
		$('#news_list_lines').append(newRow);
	}
	var oTable = $("#news_list").dataTable({
		"bSort": true,
		"bRetrieve": true,
		"bProcessing": true,
		"bDestroy": true
	});
	$('#news_list').show();





	/*
	for(var count=0;count<DATA.length;count++){
		
			allnews[DATA[count]["id"]]=DATA[count];
		content+='<div class="col-xs-12" ><div class="col-xs-6">'+(count+1)+'. ';
		content+=DATA[count]["content_title"];
		content+='</div><div class="col-xs-6"><input type="checkbox" class="checkboxes_for_news" id="'+DATA[count]["id"]+'"/></div></div>';
		
		
	}$('#news_content').html(content);
	*/

	$('#newsPopup').modal();

}



//new manage ends here
