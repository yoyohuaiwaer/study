/**
 * Created by A on 2016/11/28.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    findMenus();
    findMenusTer();
    if($.cookie('accountCode') == 0){
        loadDetails();
    }
    confirm();
    cancel();
    checkOther;
})
function findMenus(){
    //alert($('.main-title').attr('title'));
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            parentId:'5850bd9cb2a99afa74c513a5'

        },
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            if(data.code == 1) {
                //$(".breadcrumb").empty();
                var breadcrumb = '';
                $.each(data.data, function(i,key) {
                    if($.cookie('accountCode') == 1){
                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">新增官方账号</a></li>';
                    }else {
                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">修改官方账号</a></li>';
                    }
                    //breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">'+key.name+'</a></li>';

                })
                $(".breadcrumb").append(breadcrumb);
                //$(".breadcrumb li:first-child").addClass('selected');
                changeBreadcrumb();
            }
        }
    })
}
function findMenusTer(){
    $.ajax({
        url: commUrl+'/menu/find',
        async: false,
        data: {
            token: $.cookie('token')
        },
        success: function(response){
            response = JSON.parse(response);
            //console.log(response);
            if(response.code == 1){
                var html = '';
                $.each(response.data, function(i,key){
                    html += '<label><input type="checkbox" class="checkbox" name="" value="'+key.qhMenu.id+'"/>'+key.qhMenu.name+'</label>'
                })
                $('.authorization').append(html);
            }
        },
        error: function(text){
            console.log(text.readyState);
            console.log(text.status);
        }
    })
}
function loadDetails(){
    //$.cookie('accountCode',$(this).attr('rel'),{ path: '/' })
    $.cookie('accountId',$(this).attr('data-id'),{ path: '/' });
    $.ajax({
        url: commUrl+'/admin/findbyid',
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
                //alert($('input[name="status"]').attr({value:response.data.state}).clone().html());/*.prop( "checked", true)*/;

                $('#user').attr({value:response.data.owner});
                $.each(response.data.qhMenuIds,function(i,key){
                    $(".checkbox").each(function(){
                        if($(this).attr('value') == key){
                            $(this).prop('checked',true)
                        }

                    })
                })

                //});
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
                //alert(details);
            }
        });
        details = details.substring(0,details.length-1);
        var status = $('input[name="status"]:checked').val();
        if($('#email').val() !== ''& $('#password').val() !== '' & $('#user').val() !== ''){
            if($.cookie('accountCode') == 0){
                $.ajax({
                    url: commUrl+'/admin/save',
                    type: 'POST',
                    data:{
                        token: $.cookie('token'),
                        username:$('#email').val(),
                        password:$('#password').val(),
                        state: status,
                        owner:$('#user').val(),
                        menuId: details,
                        id:$.cookie('accountId')
                    },
                    success: function(response){
                        //console.log(response);
                        response = JSON.parse(response);
                        if(response.code == 1){
                            alert('修改成功');
                            loadList();
                        }
                    },
                    error: function(text){
                        console.log(text.readyState);
                        console.log(text.status);
                    }
                })
            }else if($.cookie('accountCode') == 1){
                $.ajax({
                    url: commUrl+'/admin/save',
                    type: 'POST',
                    data:{
                        token: $.cookie('token'),
                        username:$('#email').val(),
                        password:$('#password').val(),
                        state: status,
                        owner:$('#user').val(),
                        menuId: details,
                        //id:$.cookie('accountId')
                    },
                    success: function(response){
                        //console.log(response);
                        response = JSON.parse(response);
                        if(response.code == 1){
                            alert('提交成功');
                            loadList();
                        }
                    },
                    error: function(text){
                        console.log(text.readyState);
                        console.log(text.status);
                    }
                })
            }

        }else {
            alert('邮箱、密码或者')
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
    }/*else {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;;
        if(filter.test(email)){
            $('.tip1').css({color:'green'}).html('正确');
        }else {
            $('.tip1').css({color:'red'}).html('格式不正确,正确格式为：xxx@xxx.com|cn');
        }
    }*/
})
$('#password').on('blur',function(){
    checkOther(this,'密码');
});
$('#user').on('blur',function(){
    checkOther(this,'使用者');
})
/*$('#username').on('blur',function(){
    checkOther(this,'用户名');
})
$('#industry').on('blur',function(){
    checkOther(this,'所属行业');
})*/
function checkOther(element,tips){
    var text = $(element).val();
    if(text == ''){
        $(element).next('span').css({color:'red'}).html(tips+'不能为空');
    }else {
        $(element).next('span').css({color:'green'}).html('正确')
    }
}

