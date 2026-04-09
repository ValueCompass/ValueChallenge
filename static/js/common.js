
function check_email(email) {
    var isVaild = true;
    if (email.trim().length === 0) {
        $("#email").siblings('.error-tip').html('Please enter your email address');
        isVaild = false;
    } else {
        $("#email").siblings('.error-tip').html('');
    }
    // var emailRegex = /^[^\s@]+@[^\s@]+\.edu$/;
    //    if(emailRegex.test(email)){
    //        $("#email").siblings('.error-tip').html('Only academic email addresses (.edu) are accepted for registration. Non-academic emails will not be eligible.');
    //        isVaild = false;
    //    }else{
    //        $("#email").siblings('.error-tip').html('');
    //    }
    return isVaild;
}
function check_password(pass) {
    var isVaild = true;
    if (pass.trim().length === 0) {
        $("#password").siblings('.error-tip').html('Please enter your password');
        isVaild = false;
    } else {
        $("#password").siblings('.error-tip').html('');
    }
    // 检查密码长度是否至少为8个字符
    // if (pass.length < 8) {
    //     $("#password").siblings('.error-tip').html('Password must be at least 8 characters.');
    //     isVaild = false;
    // } else {
    //     // 定义正则表达式来检查密码的复杂度
    //     var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/; 
    //     if (regex.test(pass)) {
    //         $("#password").siblings('.error-tip').html('Password must contain uppercase, lowercase, and numbers.');
    //         isVaild = false;
    //     } else{
    //         $("#password").siblings('.error-tip').html('');
    //     }
    // }
    return isVaild;
}

// 验证表单是否已填写（至少姓名和邮箱非空，邮箱简单校验）
function isFormValid() {
    const question_title = $('#question_title').val().trim();
    const answer_content = $('#answer_content').val().trim();;
    const answer_justification = $('#answer_justification').val().trim();
    const theme_id = $('#theme_id').val();
    const legal_full_name = $('#legal_full_name').val().trim();
    var isVaild = true;
    if (theme_id == '') {
        $("#theme_id").siblings('.error-tip').html('Please select theme');
        isVaild = false;
    } else {
        $("#theme_id").siblings('.error-tip').html('');
    }
    if (question_title.trim().length === 0) {
        $("#question_title").siblings('.error-tip').html('Please enter question');
        isVaild = false;
    } else {
        $("#question_title").siblings('.error-tip').html('');
    }
    if (answer_content.trim().length === 0) {
        $("#answer_content").siblings('.error-tip').html('Please enter answer');
        isVaild = false;
    } else {
        $("#answer_content").siblings('.error-tip').html('');
    }
    if (answer_justification.trim().length === 0) {
        $("#answer_justification").siblings('.error-tip').html('Please enter justification');
        isVaild = false;
    } else {
        $("#answer_justification").siblings('.error-tip').html('');
    }
    if (legal_full_name.trim().length === 0) {
        $("#legal_full_name").siblings('.error-tip').html('Please enter name');
        isVaild = false;
    } else {
        $("#legal_full_name").siblings('.error-tip').html('');
    }
    return isVaild;
}


$(function () {
    $(".navbar-toggler-icon").click(function () {
        $("#navbarNav").toggle();
    });
    $(".no-login-click").click(function () {
        lk.alert.info("Please register first to continue browsing other pages.");
    });
    //绑定弹窗关闭
    $("body").on("click", ".modal-close", function () {
        $(this).closest(".modal-wrapper").hide();
    });
});


(function () {
    "use strict";
    var root = this;

    var lk = function () { }
    lk.alert = {
        info: function (msg,callback) {
            Swal.fire({
                confirmButtonColor: '#006FFE',
                title: msg,
                icon: "none"
            }).then((result) => {
                if (callback) {
                    callback();
                }
            });
        },
        confirm: function (msg, callback) {
            Swal.fire({
                confirmButtonColor: '#006FFE',
                title: msg,
                icon: "none",
                showCancelButton: true,
                confirmButtonText: "Yes",
                cancelButtonText: "No"
            }).then((result) => {
                if (callback) {
                    callback(result.isConfirmed);
                }
            });
        }
    }
    lk.http = {
        postForm: function (url, formID, settings) {
            settings = $.extend(true, {
                data: {},
                onSuccess: null,
                onFail: null,
                onError: null,
                onComplete: null
            }, settings);

            var formData = new FormData(document.getElementById(formID));
            fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify(Object.fromEntries(formData))
            })
                .then(response => response.json())
                .then(result => {
                    if (result.code === 200) {
                        if (settings.onSuccess) { settings.onSuccess(result); }
                    } else {
                        if (result.field && $("#" + formID + " [name='" + result.field + "']").length > 0) {
                            const validator = $("#" + formID).validate();
                            validator.showErrors({
                                [result.field]: result.msg
                            });
                        } else {
                            lk.alert.info(result.msg);
                        }
                        if (settings.onFail) { settings.onFail(result); }
                        return false;
                    }
                })
                .catch(error => {
                    if (settings.onError) { settings.onError(); }
                    else { lk.alert.info("Network error, please try again."); }
                    if (settings.onComplete) { settings.onComplete(); }
                    return false;
                })
                .finally(() => {
                    if (settings.onComplete) { settings.onComplete(); }
                });
        }
    }

    root.lk = lk;
}).call(this);