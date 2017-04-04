var adminMenuArray = [{
	group: "Manage Teachers",
	items: ["Add Teacher", "Remove Teacher", "Manage Groups", "Analytics"],
	fnct: ["add_teacher", "Remove Teacher", "manage_groups", "Analytics"]
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
	$('.contentArea .container').hide();
	showLoading();
	
	//if(ref_id='add_teacher'){
			$('#'+ref_id).show();
	//}
	if(ref_id=='manage_groups'){
		manage_groups();
	}
	stopLoading();
}
function showLoading() {
	$('.loading').show();
}
function stopLoading() {
	$('.loading').fadeOut("slow");
}

function addTeacher(){
	var form='<div><form><input type="text"></from></div>';
	$('.contentArea').html(form);
	
}


function manage_groups()
{
$('#create_group_form').hide();
$('#remove_group_form').hide();
$('#edit_groups_form').hide();
$(document).on("click", "#create_group", function () {

create_group();
});

$(document).on("click", "#remove_group", function () {

remove_group();
});

$(document).on("click", "#edit_groups", function () {

edit_groups();
});

}


function create_groups()
{
$('#create_group_form').show();
}

function remove_group()
{
$('#remove_group_form').show();	
}

function edit_groups()
{
$('#edit_groups_form').show();
}