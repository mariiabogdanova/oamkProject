var adminMenuArray = [{
	group: "Manage Teachers",
	items: ["Add Teacher", "Remove Teacher", "Manage Groups", "Analytics"],
	fnct: ["Add Teacher", "Remove Teacher", "Manage Groups", "Analytics"]
}, {
	group: "Manage Students",
	items: ["Add Students", "Assign Groups", "Analytics"],
	fnct: ["Add Students", "Assign Groups", "Analytics"]
}, {
	group: "Manage News",
	items: ["Add News", "Analytics"],
	fnct: ["Add News", "Analytics"],
}, {
	group: "Analytics",
	items: ["Newsletter Anaytics", "Stuents Analytics", "Teachers Analytics"],
	fnct: ["Newsletter Anaytics", "Stuents Analytics", "Teachers Analytics"]
}];
function bodyLoaded() {
	var bug_Test = false;
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
	$('.form-login input').val('');
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
	showLoading();
	$('.contentArea').html(ref_id + " content goes here");
	stopLoading();
}
function showLoading() {
	$('.loading').show();
}
function stopLoading() {
	$('.loading').fadeOut("slow");
}