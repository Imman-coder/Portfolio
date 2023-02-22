
$(document).ready(function () {
    
    var $select = $('#cmbInstitute').selectize();
    //$('#myModal').modal('show');
    $("#username").focus();
    $("#lnkHelp").click(function(){
        $('#myModal').modal('show');
    });
    $('#myCarousel2').slick({
        dots: true,
        infinite: true,
        speed: 4000,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        prevArrow: true,
        nextArrow: true
    });
    
    
    //get_online_user();
    //get_todays_count();
    $("#lnkForgotPassword").click(function(){
        swal("Forgot Password", "Please Contact Information Cell.", "info");
    });
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "progressBar": true,
        "positionClass": "toast-top-full-width",//top-right,bottom-left,top-left,top-full-width,bottom-full-width,top-center,bottom-center
        "onclick": null,
        "showDuration": "20000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    
});
function get_online_user()
{
    /*$.ajax({	
        url:"common/db_index_page.php?item=ONLINE_USERS&institute_code="+$("#hidInstituteCode").val(),		
        type:"get",
        success:function(responsedata){  
            var result = jQuery.parseJSON(responsedata);
            $("#online_total").html(result.TOTAL);
            $("#online_student").html(result.STUDENT);
            $("#online_employee").html(result.EMPLOYEE);
        },
        error:function(){
            console.log("We are unable to Process.Please contact Support");
        }
    });*/
}
function get_todays_count()
{
    $.ajax({	
        url:"common/db_index_page.php?item=TODAYS_COUNT&institute_code="+$("#hidInstituteCode").val(),		
        type:"get",
        success:function(responsedata){  
            var result = jQuery.parseJSON(responsedata);
            $("#classes_conducted").html(result.CLASSESCONDUCTED);
            $("#student_present").html(result.STUDENTPRESENT);
            $("#employee_present").html(result.EMPLOYEEPRESENT);
        },
        error:function(){
            console.log("We are unable to Process.Please contact Support");
        }
    });
}
function do_submit(md5KeyValue)
{
    if($("#username").val() == '' )
    {
        //toastr.error("Please enter username and password and select the institute");
        $("#showerror").html("Please enter username !!!");
        return false;
    }
    else if($("#password").val() == '' )
    {
        $("#showerror").html("Please enter password !!!");
        return false;
    }
    else if($("#cmbInstitute").val() == '')
    {
        $("#showerror").html("Please Select institute");
        return false;
    }
    
    //added for CR 5034 - begin.
    var username ="";
    username = document.loginform.username.value;		

    //added for CR 5034 - end.
    var password = document.loginform.password.value;
    var regexp = new RegExp("\\d{19}");
    
    if( password.length>20){
        alert("Password length should not be more than 20 characters");
        document.loginform.password.value = "";
        document.loginform.password.focus();
        var password ="";
        return false;
    }

    document.getElementById("btnLogIn").disabled=true;
    var md5keystring = md5KeyValue;//document.quickLookForm.md5key.value ;
    // var md5keystring = document.quickLookForm.md5key.value ;
    var encSaltPass = encryptLoginPassword(md5keystring,username,password);
    var encSaltSHAPass = encryptSha2LoginPassword(md5keystring,username,password);
    document.loginform.password.value = encSaltPass; //changed
    document.loginform.shapassword.value = encSaltSHAPass; //changed
    document.loginform.key.value = md5keystring; //changed
    
    console.log(encSaltSHAPass);
    console.log(md5keystring);
    document.loginform.submit();
    var password ="";
    return true;
    
}

setInterval(function(){
    //get_online_user();
    //get_todays_count();
    
}, 600000); 
