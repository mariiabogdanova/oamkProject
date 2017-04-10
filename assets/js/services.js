var userLoginJsn = {
	oamk_userid: '',
	oamk_username: '',
	oamk_useraccesstoken: ''
}
var SERVER_URL="../oamkServiceCall.php";

function userLoginFunction(username,password) {
	var username=username;
	var password=password;
	var request = getRequestObject({
		username:username,
		password:password
	}, "USERLOGIN");
	$.post(SERVER_URL, request, function (result) {
		if (result.RESULT == "SUCCESS") {
				setUserToLoggedin(result.UID,result.access_token);

		} else if (result.RESULT == "ACCESSERROR") {
			showPop("INVALID","You donot have sufficient previlage to access this page");
		}else{
			
			
		}
	}, "json");
}

function setUserToLoggedin(uid, un, ac) {
    $('#login-page').hide();
    userLoginJsn.oamk_userid = uid;
    userLoginJsn.oamk_username = un;
    userLoginJsn.oamk_useraccesstoken = ac;

    $.cookie('oamk_admin_userinfo', JSON.stringify(userLoginJsn), {
        expires: 365,
        path: '/'
    });

showLoggedInPage();

}

function setUserToLoggedOut() {

  

    $.removeCookie('oamk_admin_userinfo', {
        path: '/'
    });
    location.reload();

}

function getRequestObject(data, serviceName) {
	data.oamkSERVICE = serviceName;
	data.uid = userLoginJsn.oamk_userid;
	data.atoken = userLoginJsn.oamk_useraccesstoken;
	data.infoid = Math.random() * 10000000000000000 + 1;
	return data;
}
