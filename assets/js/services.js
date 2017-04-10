var userLoginJsn = {
	oamk_userid: '',
	oamk_username: '',
	oamk_useraccesstoken: '',
	oamk_accesslevel: '',
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
			
		} else {
			
		}
	}, "json");
}


function getRequestObject(data, serviceName) {
	data.oamkSERVICE = serviceName;
	data.uid = userLoginJsn.oamk_userid;
	data.atoken = userLoginJsn.oamk_useraccesstoken;
	data.infoid = Math.random() * 10000000000000000 + 1;
	return data;
}
