$(document).ready(function(){
    $(".breadcrumb").empty();
    findMenus();
    if($.cookie('accountCode') == 0){
        loadDetails();
    }
    confirm();
    cancel();
})
function findMenus(){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            parentId:'58cb94c03c9e9c3c425683b5'
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                var breadcrumb = '';
                $.each(data.data, function(i,key) {
                    if($.cookie('accountCode') == 1){
                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">新增官方账号</a></li>';
                    }else {
                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">修改官方账号</a></li>';
                    }
                })
                $(".breadcrumb").append(breadcrumb);
                changeBreadcrumb();
            }
        }
    })
}

function loadDetails(){
    $.cookie('accountId',$(this).attr('data-id'),{ path: '/' });
    $.ajax({
        url: commUrl+'/user/findById',
        data:{
            token: $.cookie('token'),
            id:$.cookie('accountId')
        },
        success: function(response){
            response = JSON.parse(response);
            console.log(response);
            if(response.code == 1){
                $('#email').attr({value:response.data.username});
                $('#password').attr({value:response.data.password});
                $('input[name="status"]').each(function(){
                    if($(this).attr('value') == response.data.state){
                        $(this).prop( "checked", true);
                    }
                })
                $('#user').attr({value:response.data.nick});
            }
        },
        error: function(text) {

        }
    })
}

function confirm(){
    $('.confirm').on('click',function(){
        var details = '';
        $(".checkbox").each(function (index) {
            if($(this).is(":checked")){
                details += $(this).attr('value')+',';
            }
        });
        details = details.substring(0,details.length-1);
        var status = $('input[name="status"]:checked').val();
        if($('#email').val() !== ''& $('#password').val() !== '' & $('#user').val() !== ''){
            if($.cookie('accountCode') == 0){
                $.ajax({
                    url: commUrl+'/user/save',
                    type: 'POST',
                    data:{
                        token: $.cookie('token'),
                        username:$('#email').val(),
                        password:$('#password').val(),
                        state: status,
                        nick:$('#user').val(),
                        menuId: details,
                        id:$.cookie('accountId')
                    },
                    success: function(response){
                        response = JSON.parse(response);
                        console.log(response)
                        if(response.code == 1){
                            alert('修改成功');
                            loadList();
                        }else{
                        	$('.tip1').css({color:'red'}).html(response.msg);
                        }
                    },
                    error: function(text){
                        console.log(text.readyState);
                        console.log(text.status);
                    }
                })
            }else if($.cookie('accountCode') == 1){
                $.ajax({
                    url: commUrl+'/user/save',
                    type: 'POST',
                    data:{
                        token: $.cookie('token'),
                        username:$('#email').val(),
                        password:$('#password').val(),
                        state: status,
                        nick:$('#user').val(),
                        menuId: details
                        //id:$.cookie('accountId')
                    },
                    success: function(response){
                        response = JSON.parse(response);
                        console.log(response)
                        if(response.code == 1){
                            alert('提交成功');
                            loadList();
                        }else{
                        	$('.tip1').css({color:'red'}).html(response.msg);
                        }
                    },
                    error: function(text){
                        console.log(text.readyState);
                        console.log(text.status);
                    }
                })
            }

        }else {
            alert('用户名,密码,使用者不能为空')
        }

    })
}
function loadList(){
    $.ajax({
        url:menuUrl+'terraceAccount-list.html',
        success: function(data){
            $('.main').empty().html(data);
        }
    })
}
function cancel(){
    $('.cancel').on('click',function(){
        loadList();
    })

}
$('#email').on('blur',function checkEmail(){
    var email = $('#email').val();
    if(email == ''){
        $('.tip1').css({color:'red'}).html('用户名不能为空');
    }
})
$('#password').on('blur',function(){
    checkOther(this,'密码');
});
$('#user').on('blur',function(){
    checkOther(this,'使用者');
})

function checkOther(element,tips){
    var text = $(element).val();
    if(text == ''){
        $(element).next('span').css({color:'red'}).html(tips+'不能为空');
    }else {
        $(element).next('span').css({color:'green'}).html('正确')
    }
}

