

function bodyLoaded() {
	
	var bug_Test=true;
if(bug_Test==true){
	
	showLoggedInPage()
}else{
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

function showLoggedInPage(){
	
	$('#login-page').hide();
	$('#logged-in-page').show();
}