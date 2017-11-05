/**
 * Created by A on 2016/11/28.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    //findMenus();
    //findMenusTer();
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
                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">鏂板瀹樻柟璐﹀彿</a></li>';
                    }else {
                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">淇敼瀹樻柟璐﹀彿</a></li>';
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
    $.cookie('accountId');
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
                $('#username').attr({value:response.data.username});
                $('#password').attr({value:response.data.password});
                $('input[name="status"]').each(function(){
                    if($(this).attr('value') == response.data.state){
                        $(this).prop( "checked", true);
                    }
                })
                //alert($('input[name="status"]').attr({value:response.data.state}).clone().html());/*.prop( "checked", true)*/;

                $('#nick').attr({value:response.data.nick});
                /*$.each(response.data.qhMenuIds,function(i,key){
                    $(".checkbox").each(function(){
                        if($(this).attr('value') == key){
                            $(this).prop('checked',true)
                        }

                    })
                })*/

                //});
            }
        },
        error: function(text) {

        }
    })
}

function confirm(){
    $('.confirm').on('click',function(){
        /*var details = '';
        $(".checkbox").each(function (index) {
            if($(this).is(":checked")){
                details += $(this).attr('value')+',';
                //alert(details);
            }
        });
        details = details.substring(0,details.length-1);*/
        var status = $('input[name="status"]:checked').val();
        var _data = {}
        if($('#username').val() !== ''& $('#password').val() !== '' & $('#nick').val() !== ''){
            if($.cookie('accountCode') == 0){
                _data = {
                    token: $.cookie('token'),
                    username:$('#username').val(),
                    password:$('#password').val(),
                    state: status,
                    nick:$('#nick').val(),
                    //menuId: details,
                    id:$.cookie('accountId')
                }
            }else if($.cookie('accountCode') == 1){
                    _data = {
                        token: $.cookie('token'),
                        username:$('#username').val(),
                        password:$('#password').val(),
                        state: status,
                        nick:$('#nick').val(),
                        //menuId: details,
                        //id:$.cookie('accountId')
                    }
            }
            $.ajax({
                url: commUrl+'/user/save ',
                type: 'POST',
                data:_data,
                success: function(response){
                    //console.log(response);
                    response = JSON.parse(response);
                    if(response.code == 1){
                        alert('成功！');
                        loadList();
                    }else {
                        alert(response.msg);
                    }
                },
                error: function(text){
                    console.log(text.readyState);
                    console.log(text.status);
                }
            })
        }else {
            alert('请参考错误')
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
    var email = $('#username').val();
    if(email == ''){
        $('.tip1').css({color:'red'}).html('用户名不能为空');
    }/*else {
     var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;;
     if(filter.test(email)){
     $('.tip1').css({color:'green'}).html('姝ｇ‘');
     }else {
     $('.tip1').css({color:'red'}).html('鏍煎紡涓嶆纭�,姝ｇ‘鏍煎紡涓猴細xxx@xxx.com|cn');
     }
     }*/
})
$('#password').on('blur',function(){
    checkOther(this,'密码不能为空');
});
$('#nick').on('blur',function(){
    checkOther(this,'商家名不能为空');
})
/*$('#username').on('blur',function(){
 checkOther(this,'鐢ㄦ埛鍚�');
 })
 $('#industry').on('blur',function(){
 checkOther(this,'鎵€灞炶涓�');
 })*/
function checkOther(element,tips){
    var text = $(element).val();
    if(text == ''){
        $(element).next('span').css({color:'red'}).html(tips);
    }else {
        $(element).next('span').css({color:'green'}).html('')
    }
}
