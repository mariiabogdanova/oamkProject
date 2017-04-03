function setUserToLoggedin(un, uid, ac, al) {
    $('#login-page').hide();

    lmAccessToken = ac;
    userLoginJsn.lm_userid = uid;
    userLoginJsn.lm_username = un;
    userLoginJsn.lm_useraccesstoken = ac;
    userLoginJsn.lm_accesslevel = al;

    $.cookie('tm_admin_userinfo', JSON.stringify(userLoginJsn), {
        expires: 365,
        path: '/'
    });


    doafterlogin();

}

function setUserToLoggedOut() {

    lmAccessToken = "";

    $.removeCookie('tm_admin_userinfo', {
        path: '/'
    });
    location.reload();

}

function showLogin() {
    $('#login-page').show();
    $('#logedin-page').hide();

    $('.form-login input').val('');

}

function logincall() {
    var uname = $('#user_name').val();
    var pword = $('#password').val();
    epword = MD5("d2fdSfk3jf" + pword + "LLfeo29f81ii");

    if (uname == "" || pword == "") {

        showPop("Login Error", "Please provide Username and Password.");
    } else {

        var username = uname;
        var password = epword;
        var valid = MD5("9234jkKsl34" + uname + epword + "ff20gnwmwsJf")
        var request = getRequestObject({
            UNAME: username,
            PWORD: password,
            VALIDATOR: valid
        }, "adminLogin");
        $.post(SERVER_URL, request, function (result) {
            $('#loading').fadeOut(500);
            if (result.RESULT == "SUCCESS") {
                setUserToLoggedin(uname, result.USERID, result.ACCESSTOKEN, result.ACCESSLEVEL);


            } else {
                showError("Username/ Password entered are not correct, please try again.", "Sorry!")
            }
        }, "json");


    }
}

 var SERVER_URL = "../lmbootstrap.php";
 var lmAccessToken;
var winners= new Array();
 var tempContestDATA = new Array();
 var userLoginJsn = {
     lm_userid: '',
     lm_username: '',
     lm_useraccesstoken: '',
     lm_accesslevel: '',
 }

 function bodyLoaded() {
     if (($.cookie('tm_admin_userinfo') != null)) {
         userLoginJsn = JSON.parse($.cookie('tm_admin_userinfo'));
         setUserToLoggedin(userLoginJsn.lm_username, userLoginJsn.lm_userid, userLoginJsn.lm_useraccesstoken, userLoginJsn.lm_useraccesstoken);
     } else {

         enterLogin();
     }

     $('body').show();

 }

 function enterLogin() {
     $('#login-page').show();
     $(document).on('click', '#sign_in', function () {
         logincall();

     });


 }

 function doafterlogin() {
     $('#loggedin-page').show();
     hidealltabs();
     $(document).on("click", '.menu li a', function () {
         var target = $(this).attr("ref_tab");
         displaytab(target);

     })

 }

 function hidealltabs() {

     $('#view_contest_summary').hide();;
     $('#export_result').hide();
     $('#view_contest_details').hide();
     $('#view_shortlisted').hide();
     $('#showWINNERS').hide();
     $('#export_winners').hide();
     
 }

 function displaytab(tab) {
     hidealltabs();
     $('#' + tab).show();;
     if (tab == 'view_contest_summary') {

         getcontestEntries();

     }
     if (tab == 'view_contest_details') {
         getcontestDetails();

     }
 }

 function getcontestEntries() {
     //var table = $('#contest_entries').dataTable().fnClearTable();
     var request = getRequestObject({

     }, "getContestEnteries");
     $.post(SERVER_URL, request, function (result) {
         if (result.RESULT == "SUCCESS") {


             var appElement = document.querySelector('[ng-app=tmApp]');
             var $scope = angular.element(appElement).scope();
             $scope.$apply(function () {
                 $scope.entry = null;
                 $scope.entry = result.ENTRIES;
             });




             oTable = $("#contest_entries").dataTable({
                 "bSort": true,
                 "bRetrieve": true,
                 "bProcessing": true,
                 "bDestroy": true
             });
             $("#contest_entries_wrapper").show();
             $("#contest_entries").show();
         } else {
             $("#contest_entries").hide();
             $("#contest_entries_wrapper").hide();
             showPop("No entries currently.", "Sorry!")
         }
     }, "json");

 }

 function toggleBTN(toshow) {

     $('#SAVECONTEST').hide();
     $('#EDITSELECT').hide();
     $('#editContest').hide();
     $('#' + toshow + 'CONTEST').show();
 }

 function showContestTable(contest_list) {
     toggleBTN('ADD');

     //$('#contest_list').dataTable().fnClearTable();
     $('#contest_list_lines').empty()
     for (counter = 0; counter < contest_list.length; counter++) {
         tempContestDATA[contest_list[counter]["id"]] = contest_list[counter];
         var newRow = $('<tr style="font-size:11px">');
         var cols = "";
         cols += '<td>' + contest_list[counter]["id"] + '</td>';
         cols += '<td>' + contest_list[counter]["question1"] + '</td>';
         cols += '<td>' + contest_list[counter]["question2"] + '</td>';
         cols += '<td>' + contest_list[counter]["createdon"] + '</td>';
         if (contest_list[counter]["is_selected"] == 1) {
             cols += '<td><div class="btn btn-xs btn-danger disabled ">SELECTED</div><br><div class="btn btn-xs btn-danger EDITSELECT" ref_id="' + contest_list[counter]["id"] + '">EDIT</div></td>';

         } else {
             cols += '<td><div class="btn btn-xs btn-success SELECTNEW" ref_id="' + contest_list[counter]["id"] + '">SELECT</div><br><div class="btn btn-xs btn-danger EDITSELECT" ref_id="' + contest_list[counter]["id"] + '">EDIT</div></td>';

         }


         newRow.append(cols);
         $('#contest_list_lines').append(newRow);
     }

     oTable = $("#contest_list").dataTable({
         "bSort": false,
         "bRetrieve": true,
         "bProcessing": true,
         "bDestroy": true
     });
      $('.dataTables_filter').hide();
       $('#contest_list_length').hide();

 }
 $(document).on("click", ".SELECTNEW", function () {

     var ref_id = $(this).attr('ref_id');
     $('#contest_ref').val(ref_id);
     SAVECURRENT('SELECT');

 });
 $(document).on("click", "#EDITSELECT", function () {

     var ref_id = $(this).attr('ref_id');
     $('#editContest').show();
     $('#SAVECONTEST').show();
     $('#EDITSELECT').hide();


 });



 $(document).on("click", "#ADDCONTEST", function () {


     toggleBTN('SAVE');
     $('#editContest').show();
     $('#question_1').val('');
     $('#question_2').val('');
     $('#contest_ref').val('NEW');
 });

 $(document).on("click", "#SAVECONTEST", function () {

     $('#editContest').hide();
     $('#SAVECONTEST').hide();
     $('#EDITSELECT').show();

     SAVECURRENT('SAVE');
 });

 $(document).on("click", "#DELETE_ENTRIES", function () {

     $('#confirmpopop').modal();
 });
 $(document).on("click", "#confirm_delete", function () {

     deleteData();
 });
 $(document).on("click", "#EXPORT_ENTRIES", function () {

     exportDATA();
 }); $(document).on("click", "#export_winners", function () {

     exportWinnerDATA();
 });
 $(document).on("click", "#WINNERS", function () {

     WINNERS();
 });

 function SAVECURRENT(action) {

     var ques_1 = $('#question_1').val();
     var ques_2 = $('#question_2').val();
     var ref = $('#contest_ref').val();

     var request = getRequestObject({
         ques_1: ques_1,
         ques_2: ques_2,
         action: action,
         ref: ref
     }, "saveContest");
     $.post(SERVER_URL, request, function (result) {
         if (result.RESULT == "SUCCESS") {

             getcontestDetails();
         } else {
             showPop("No entries currently.", "Sorry!")
         }
     }, "json");
 } 
function exportDATA() {
window.location.href = "../servicecalls/getContestEnteries_export.php";
    /*
     var request = getRequestObject({
       
     }, "Export");
     $.post(SERVER_URL, request, function (result) {}, "json");
 */
 }

function exportWinnerDATA() {
	

	
	
	
window.location.href = "../servicecalls/getContestWinners_export.php?winners="+JSON.stringify(winners);
  
 }
 function deleteData() {



     var request = getRequestObject({

     }, "deleteEntries");
     $.post(SERVER_URL, request, function (result) {
         if (result.RESULT == "SUCCESS") {
             $('#confirmpopop').modal('hide');
             showPop("Data Cleared.", "Data Cleared");
         } else {

         }
     }, "json");
 }function WINNERS() {

 $('#export_winners').hide();

     var request = getRequestObject({

     }, "Winners");
     $.post(SERVER_URL, request, function (result) {
         if (result.RESULT == "SUCCESS") {
           var appElement = document.querySelector('[ng-app=tmApp]');
             var $scope = angular.element(appElement).scope();
             $scope.$apply(function () {
                 $scope.winner = null;
                 $scope.winner = result.WINNERS;
             });

             $('#export_winners').show();
             winners=result.PRINTDATA;
             
           $('#showWINNERS').show();
         } else {
             $('#alertpopupcornifm').modal();
         }
     }, "json");
 }

 function editSelected(ref_id) {

     toggleBTN('SAVE');
     $('#editContest').show();
     $('#question_1').val('');
     $('#question_2').val('');

     $('#question_1').val(tempContestDATA[ref_id]["question1"]);
     $('#question_2').val(tempContestDATA[ref_id]["question2"]);
     $('#contest_ref').val(ref_id);
 }

 function getcontestDetails() {

     var request = getRequestObject({

     }, "getContestQuestions");
     $.post(SERVER_URL, request, function (result) {
         if (result.RESULT == "SUCCESS") {
             var appElement = document.querySelector('[ng-app=tmApp]');
             var $scope = angular.element(appElement).scope();
             $scope.$apply(function () {
                 $scope.publish_date = result.CONTEST[0]["createdon"];
                 $scope.question_1 = result.CONTEST[0]["question1"];
                 $scope.question_2 = result.CONTEST[0]["question2"];

             });
             showContestTable(result.CONTEST_LIST);

         } else {
             showPop("No entries currently.", "Sorry!")
         }
     }, "json");
 }

 function getcontestDetails() {

     var request = getRequestObject({

     }, "getContestQuestions");
     $.post(SERVER_URL, request, function (result) {
         if (result.RESULT == "SUCCESS") {
             var appElement = document.querySelector('[ng-app=tmApp]');
             var $scope = angular.element(appElement).scope();
             $scope.$apply(function () {
                 $scope.publish_date = result.CONTEST[0]["createdon"];
                 $scope.question_1 = result.CONTEST[0]["question1"];
                 $scope.question_2 = result.CONTEST[0]["question2"];
                 $('#SAVECONTEST').hide();
                 $('#EDITSELECT').show();
             });
             // showContestTable(result.CONTEST_LIST);

         } else {
             showPop("No entries currently.", "Sorry!")
         }
     }, "json");
 }

 function showPop(message, title) {

     showError(title, message);
 }

 function showError(message, title) {

     $('#alert_header').html(title);
     $('#alert_msg').html(message);
     $('#alertpopup').modal();



 }

 function getRequestObject(data, serviceName) {
     data.LMServices = serviceName;
     data.uid = userLoginJsn.lm_userid;
     data.atoken = userLoginJsn.lm_useraccesstoken;
     data.infoid = Math.random() * 10000000000000000 + 1;
     return data;
 }
