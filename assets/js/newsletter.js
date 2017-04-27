var oamk_teacher_userinfo = {
	oamk_userid: '', //teacher_id
	oamk_username: '',
	oamk_useraccesstoken: ''
}
var SERVER_URL = "../oamkServiceCall.php";
var G_teacher_id = 0;
var G_student_id = 0;
var G_group_id = 0;

function bodyLoaded() {
	
	var myParam = location.search.split('access_token=')[1];
	var request = getRequestObject({
		access_token: myParam
	}, "GETSTUDENTINFO");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {

			G_teacher_id = result.DATA[0]["group_tutor"];
			G_student_id = result.DATA[0]["student_id"];
			G_group_id = result.DATA[0]["group_id"];

 register_click("PAGEVIEWED","0");

			showLoggedInPage();
		}
	}, "json");

	//showLoggedInPage();	

}



$('#countact_us_btn').click(function(){
   register_click("CONTACT_TUTOR","0");
});
$('#future_features_btn').click(function(){
   register_click("FUTURE_FEATURED","0");
});
$('#note_btn').click(function(){
   register_click("NOTE_TAB","0");
});
$('#news_btn').click(function(){
   register_click("NEWS_TAB","0");
});



function register_click(link,ref) {
    var request = getRequestObject({
        link_type: link,
        ref: ref
    }, "REGISTER_CLICKS");
    $.post(SERVER_URL, request, function (result) {
        if (result.RESULT == "SUCCESS") {
       //registered
        } else {
        //notregistered  
        }
    }, "json");
}
function showLoading() {
	$('.loading').show();
}

function stopLoading() {
	$('.loading').fadeOut("slow");
}



function showLoggedInPage() {
	$('#logedin-page').show();
	teacherInfoManager();
	getSelectedPollandResult();
	getCurrentVideo("show");
	displaySelectedNews();
}

$(document).on("click", ".close_top_display", function () {
	$("#contact_info_here").slideUp("fast");
	$("#future_articles").slideUp("fast");
});

function getRequestObject(data, serviceName) {




	data.oamkSERVICE = serviceName;
	data.uid = G_teacher_id;
	data.student_id = G_student_id;
	data.group_id = G_group_id;
	data.atoken = oamk_teacher_userinfo.oamk_useraccesstoken;
	data.infoid = Math.random() * 10000000000000000 + 1;
	return data;
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


//featured and contact btn
$(document).on("click", "#future_features_btn", function () {
	if ($("#future_articles").is(':visible')) {
		$("#future_articles").slideUp("fast");
	} else {
		showfuturefeature("Heavy Drinking and Sunshine!", "School is over lets celebrate!");
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



//end teacher info




function showPop(title, body) {
	$('#alert_popup_title').html(title);
	$('#alert_popup_content').html(body);
	$('#alert_popup').modal();
}



/// poll settings begins here




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
		var votedata = data[c]["voted"];
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

		var pollopt = '<div class="col-xs-12" style="margin-bottom:15px;margin-left:-15px"><div class="marker hvr-radial-in" ref_id="' + data[0]["POLL"][0]["OPTIONS"][opts]["id"] + '" ref_poll="' + data[0]["POLL"][0]["id"] + '"></div><div class="poll">' + data[0]["POLL"][0]["OPTIONS"][opts]["option_title"] + '</div></div>';
		pollcontent += pollopt;
	}
	pollcontent += '</div>';
	$("#active_poll").html(pollcontent);
	$("#poll_title_here").html('This month’s question');

 $('.marker').click(function (ev) {
        ev.stopPropagation();
        var opt_id = $(this).attr("ref_id");
        var poll_id = $(this).attr("ref_poll");
         register_click("POLL_CLICKS",poll_id);
        registeruserpoll(opt_id, poll_id);
    });
}
function registeruserpoll(opt_id, poll_id) {
    var request = getRequestObject({
        opt_id: opt_id,
        poll_id: poll_id
    }, "REGISTER_POLL");
    $.post(SERVER_URL, request, function (result) {
         if (result.RESULT == "SUCCESS") {
            showPop("Thankyou", "We have received your vote. Results will appear in the next newsletter.");
			 getSelectedPollandResult();
        }else if (result.RESULT == "DUPLICATE") {
            showPop("Oops!", "You have already submitted your vote.");
        } else {   
        }
    }, "json");
}

//poll here
//video here








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





function displaySelectedNews() {
	var request = getRequestObject({}, "getnews");
	$.post(SERVER_URL, request, function (result) {
		stopLoading();
		if (result.RESULT == "SUCCESS") {
			displayNews(result.DATA, result.SELECTED);
		}
	}, "json");
}


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




//new manage ends here
