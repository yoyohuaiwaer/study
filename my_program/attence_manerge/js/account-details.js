/**
 * Created by A on 2016/10/12.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    //var breadcrumb = '<li><a class="" alt="account-list.html" id="57ff30880a263655e986ccf5">商家账号管理</a></li>';
    //$(".breadcrumb").html(breadcrumb);
    //changeBreadcrumb();
    findMenus();
    confirm();
    cancel();
    //拉取行业列表

    $.ajax({
        url:commUrl+'/qa/allindusandscene',
        cache:false,
        data: {
            token:$.cookie('token'),
            //id:$.cookie('accountId')
        },
        async: false,
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            if(data.code == 1) {
                //console.log(data.data);
                $('#industry').empty;
                $('.industrys').empty();
                var html = '';
                var option = '';

                $.each(data.data,function(i,key){
                    //console.log(key);
                    option += '<option value="'+key.industryName+'" name="'+key.industryId+'">'+key.industryName+'</option>'
                    var dom = '';
                    if(key.scenes == ''){
                        var dom = '<p>该行业暂无场景</p>';
                    }else {
                        //console.log(key);
                        $.each(key.scenes, function(num,value){
                            dom += '<label for="'+value.id+'"><input type="checkbox" name="industrys" class="checkbox" id="'+value.id+'" value="'+value.name+'"/>'+value.name+'</label>';
                        })
                    }
                    html += '<div class="industrys-box" id="'+key.industryId+'"><div class="industrys-input">'+dom+'</div></div>';
                })
            }
            $('#industry').html(option);
            $('.industrys').html(html);
            $('#industry').children('option:first-child').attr({selected:true});
            $('.industrys-box').hide();
            $('.industrys-box').eq($('#industry').children('option:selected').index()).show();
            choseScene();
        }
    });
    if($.cookie('accountCode') == 1) {

        //确认绑定事件
    }else if($.cookie('accountCode') == 0){
        //导出对应数据
        $.ajax({
            url:commUrl+'/user/findbyid',
            cache:false,
            data: {
                token:$.cookie('token'),
                id:$.cookie('accountId')
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data.data);
                if(data.code == 1) {
                    $('#username').attr({value:data.data.username,readonly:'readonly'})
                    $('#email').attr({value:data.data.email});
                    $('#password').attr({value:data.data.password});
                    $('#nick').attr({value:data.data.nick});
                    $('#industry').children('option').attr({selected:false});
                    $('#industry').children('option[value="'+data.data.industry+'"]').attr({selected:true});
                    $('.industrys-box .checkbox').attr({checked:false});
                    $('.industrys-box').hide();
                    $('.industrys-box').eq($('#industry').children('option:selected').index()).show();
                    var id = '#'+data.data.industryId;
                    $.each(data.data.scenes,function(i,key){
                        $(id ).find('.industrys-input').find('label').each(function(){
                            if($(this).find('input').attr('value')== key.name){
                                $(this).find('input').prop( "checked", true );
                            }

                        })
                    })
                   }
                }
        });
    }
})
function choseScene(){
    $('#industry').on('change',function(){
        //alert($(this).children('option:selected').index());
        $('.industrys-box .checkbox').attr({checked:false});
        $('.industrys-box').hide();
        $('.industrys-box').eq($(this).children('option:selected').index()).show();
    })
}

function turnPage(){
    $.ajax({
        url:'account-list.html',
        success: function(data){
            $('.main').empty().html(data);
        }
    });
}

function findMenus(){
    //alert($('.main-title').attr('title'));
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            cache:false,
            parentId:'5850bd1eb2a99afa74c513a3'

        },
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            if(data.code == 1) {
                //$(".breadcrumb").empty();
                var breadcrumb = '';
                $.each(data.data, function(i,key) {
                    if($.cookie('accountCode') == 1){
                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">创建商家账号</a></li>';
                    }else if($.cookie('accountCode') == 0) {
                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">修改商家账号</a></li>';
                    }
                })
                $(".breadcrumb").append(breadcrumb);
                //$(".breadcrumb li:first-child").addClass('selected');
                changeBreadcrumb();
            }
        }
    })
}

function confirm() {
    $('.confirm').on('click',function(){
        var details = '';
        var a = $('#industry').children('option:selected').attr('value');
        var b = $('#industry').children('option:selected').attr('id');

        $(".checkbox").each(function (index) {
            if($(this).is(":checked")){
                details += $(this).attr('value')+',';
                //alert(details);
            }
        });
        details = details.substring(0,details.length-1);
        //alert(details);
       if($.cookie('accountCode') == 1) {
           $.ajax({
               url:commUrl+'/user/save',
               type:'POST',
               cache:false,
               data:{
                   token:$.cookie('token'),
                   username:$('#username').val(),
                   email:$('#email').val(),
                   password:$('#password').val(),
                   nick:$('#nick').val(),
                   //sceneStr:details,
                   //industryId: $('#industry').children('option:selected').attr('name'),
                   //industry:$('#industry').children('option:selected').attr('value')
               },
               success: function(data){
                   data = JSON.parse(data);
                   console.log(data);
                   if(data.code == 1){
                       turnPage();
                   }else if(data.code == -101){
                       alert(data.msg);
                   }else if(data.code == -1) {
                       alert(data.msg);
                   }
               },
               error:function(text){
                   alert(text.readyState);
                   alert(text.status);
               }
           });
       }else if($.cookie('accountCode') == 0){
           $.ajax({
               url:commUrl+'/user/save',
               type:'POST',
               cache:false,
               data:{
                   token:$.cookie('token'),
                   username:$('#username').val(),
                   email:$('#email').val(),
                   id:$.cookie('accountId'),
                   password:$('#password').val(),
                   nick:$('#nick').val(),
                   //sceneStr:details,
                   //industryId: $('#industry').children('option:selected').attr('name'),
                   //industry:$('#industry').children('option:selected').attr('value')
               },
               success: function(data){
                   data = JSON.parse(data);
                   console.log(data);
                   if(data.code == 1){
                       turnPage();
                   }else if(data.code == -101){
                        alert(data.msg);
                   }else if(data.code == -1) {
                       alert(data.msg);
                   }
               },
               error:function(text){
                   alert(text.readyState);
                   alert(text.status);
               }
           });
       }

    })
}
$('#email').on('blur',function checkEmail(){
    var email = $('#email').val();
    if(email == ''){
        $('.tip1').css({color:'red'}).html('邮箱不能为空');
    }else {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;;
        if(filter.test(email)){
            $('.tip1').css({color:'green'}).html('正确');
        }else {
            $('.tip1').css({color:'red'}).html('格式不正确,正确格式为：xxx@xxx.com|cn');
        }
    }
})
$('#password').on('blur',function(){
     checkOther(this,'密码');
});
$('#nick').on('blur',function(){
    checkOther(this,'企业名');
})
$('#username').on('blur',function(){
    checkOther(this,'用户名');
})
$('#industry').on('blur',function(){
    checkOther(this,'所属行业');
})
function checkOther(element,tips){
    var text = $(element).val();
    if(text == ''){
        $(element).next('span').css({color:'red'}).html(tips+'不能为空');
    }else {
       $(element).next('span').css({color:'green'}).html('正确')
    }
}

function cancel(){
    $('.cancel').on('click',function(){
        turnPage();
    })
}