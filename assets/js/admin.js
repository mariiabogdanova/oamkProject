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
  
}

function adminFunctions() {
    $(document).on("click", "#sign_in", function() {
        doLogin();
    });
    $(document).on("click", "#log_out", function() {
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
        $.each(adminMenuArray[count]["items"], function(key, value) {
            content += '<div class="SubMenu"><span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span><a ref_id="' + adminMenuArray[count]["fnct"][key] + '" >' + value + '</a></div>';
        });
    }
    $("#menu_content").html(content);
    $(document).on("click", ".SubMenu a", function() {
        $(".SubMenu a").removeClass("active");
        $(this).addClass("active");
        showContent($(this).attr("ref_id"));
    });
}

function showContent(ref_id) {
    $('.contentArea .container').hide();
   

    //if(ref_id='add_teacher'){
    $('#' + ref_id).show();
    //}
    if (ref_id == 'manage_groups') {
        manage_groups();
    }
    if (ref_id == 'add_teacher') {
        manager_teachers();
    }

   
}

function showLoading() {
    $('.loading').show();
}

function stopLoading() {
    $('.loading').fadeOut("slow");
}

function addTeacher() {
    var form = '<div><form><input type="text"></from></div>';
    $('.contentArea').html(form);

}


function manage_groups() {
    $('#create_group_form').hide();
    $('#remove_group_form').hide();
    $('#edit_groups_form').hide();
    $(document).on("click", "#create_group", function() {

        create_group();
    });

    $(document).on("click", "#remove_group", function() {

        remove_group();
    });

    $(document).on("click", "#edit_groups", function() {

        edit_groups();
    });

}
function getOldTeachers(){
	 showLoading();

	 var request = getRequestObject({
           
        }, "GETTEACHERS");
        $.post(SERVER_URL, request, function(result) {
			stopLoading();
            if (result.RESULT == "SUCCESS") {
				
				
				 $('#old_teachers').show();
				fillTeacherTable(result.DATA);
                
            } else {
 				
            }
        }, "json");
}


function fillTeacherTable(data){
	
	

	 $('#old_teachers_line').empty()
     for (counter = 0; counter < data.length; counter++) {
         
         var newRow = $('<tr style="font-size:11px">');
         var cols = "";
         cols += '<td>' + data[counter]["id"] + '</td>';
         cols += '<td>' + data[counter]["user_name"] + '</td>';
         cols += '<td>' + data[counter]["created_on"] + '</td>';
         cols += '<td></td>';
		 cols+='</tr>';
       


         newRow.append(cols);
         $('#old_teachers_line').append(newRow);
     }

    var oTable = $("#old_teachers_table").dataTable({
         "bSort": false,
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
	
	
	
	
	

    $(document).on("click", "#create_new_teacher", function() {
  $('.form-login input').val('');
        $('#add_techer_form').show();
    });

    $(document).on("click", "#create_new_teacher_save", function() {
     		createNewTeacher();
    });



}


function createNewTeacher(){
	 showLoading();
	   var teacher_username = $('#teacher_username').val();
        var teacher_password = $('#teacher_password').val();
        var request = getRequestObject({
            teacher_username: teacher_username,
            teacher_password: teacher_password
        }, "CREATENEWUSER");
        $.post(SERVER_URL, request, function(result) {stopLoading();
            if (result.RESULT == "SUCCESS") {
				
				
				getOldTeachers();
				
                showPop("New Teacher Created", "A new teacher with username" + teacher_username + " has been created.");
            } else {
 				showPop("Failed", "A user with username: " + teacher_username + " already exists, please try another.");
            }
        }, "json");
}
function showPop(title, password) {
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