/**
 * Created by A on 2016/11/28.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="terraceAccount-list.html" id="58cb95033c9e9c3c425683b6">子账号列表</a></li><li class="selected"><a href="javascript:void(0);" class="" alt="terraceAccount-details.html" id="">新建/修改子账号</a></li>';
    $(".breadcrumb").html(breadcrumb);
    //findMenus('58cb95033c9e9c3c425683b6');
    classId();
    if($.cookie('accountCode') == 0){
        loadDetails();
    }
    addImg();
    confirm();
    cancel();
    checkOther;
    //addImg();
})
function classId(){
    $.ajax({
        url: commUrl + '/teacher/classGroupList',
        //type: 'POST',
        cache: false,
        data: {
            token: $.cookie("token")
        },
        success: function(data) {
            data = eval('(' + data + ')');
            console.log(data);
            if(data.code == '1') {
                var str = ''
                $.each(data.data,function(i,key){
                    str +='<option value="'+key.id+'">'+key.className+'</option>'
                });
                $('#classId').html(str);
            }
        },
        error: function(text){

        }
    })
}
//function findMenus(id){
//    //alert($('.main-title').attr('title'));
//    alert(id);
//    $.ajax({
//        url:commUrl+'/menu/findbyid',
//        cache: false,
//        async: false,
//        data: {
//            token:$.cookie("token"),
//            parentId:'id'
//
//        },
//        success: function(data){
//            data = JSON.parse(data);
//            //console.log(data);
//            if(data.code == 1) {
//                //$(".breadcrumb").empty();
//                var breadcrumb = '';
//                $.each(data.data, function(i,key) {
//                    if($.cookie('accountCode') == 1){
//                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">新增子账号</a></li>';
//                    }else {
//                        breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">修改子账号</a></li>';
//                    }
//                    //breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">'+key.name+'</a></li>';
//
//                })
//                $(".breadcrumb").append(breadcrumb);
//                //$(".breadcrumb li:first-child").addClass('selected');
//                changeBreadcrumb();
//            }
//        }
//    })
//}
function loadDetails(){
    //$.cookie('accountCode',$(this).attr('rel'),{ path: '/' })
    $.cookie('accountId',$(this).attr('data-id'),{ path: '/' });
    $.ajax({
        url: commUrl+'/teacher/findTeacherById',
        data:{
            token: $.cookie('token'),
            id:$.cookie('accountId')
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                $('#email').attr({value:response.data.name});
                $('#phone').attr({value:response.data.phone});
                $('#username').attr({value:response.data.username});
                $('#password').attr({value:response.data.password});
                $("#classId").find("option[value='" + response.data.classId + "']").attr({
                    selected: "selected"
                });
                $('input[name="sex"]').each(function(){
                    if($(this).attr('value') == response.data.sex){
                        $(this).prop( "checked", true);
                    }
                })
                $.each(response.data.faceUrls,function(i,key){
                    var ele = '#imageStr'+i;
                    var layer = '#layer'+i;
                    $(ele).attr({'src': key}).show();
                    $(layer).show();
                });
                //alert($('input[name="status"]').attr({value:response.data.state}).clone().html());/*.prop( "checked", true)*/;
                //$('#user').attr({value:response.data.owner});
                //$.each(response.data.qhMenuIds,function(i,key){
                //    $(".checkbox").each(function(){
                //        if($(this).attr('value') == key){
                //            $(this).prop('checked',true)
                //        }
                //
                //    })
                //})

                //});
            }
        },
        error: function(text) {

        }
    })
}

function confirm(){
    $('.confirm').on('click',function(){
        if($('#email').val() !== ''& $('#password').val() !== '' & $('#username').val() !== ''){
            var sex = $('input[name="sex"]:checked').val();
            var obj = {
                name:$('#email').val(),
                username:$('#username').val(),
                password:$('#password').val(),
                phone:$('#phone').val(),
                sex:sex,
                classId:$('#classId option:selected').attr('value'),
                className:$('#classId option:selected').html(),
                vprUrls:[]
            };
            var imgArr = [];
            $('.imageBox .photo').each(function() {
                var src = $(this).attr('src');
                if(src != ""&& src!=" ") {
                    imgArr.push(src)
                }
            })
            if($.cookie('accountCode') == 0){
                obj.id = $.cookie('accountId');
                if(imgArr.length <= 0){
                    //$(".tip").empty().css({
                    //    color: "red"
                    //}).html("请添加教师相片");
                    //return false;
                    obj.faceUrls = [];
                }else {
                    obj.faceUrls = imgArr;
                }
            }else if($.cookie('accountCode') == 1){
                if(imgArr.length <= 0){
                    //$(".tip").empty().css({
                    //    color: "red"
                    //}).html("请添加教师相片");
                    //return false;
                    obj.faceUrls = [];
                }else {
                    obj.faceUrls = imgArr
                }
            }
            //console.log(JSON.stringify(obj));
            //debugger;

            $.ajax({
                url: commUrl+'/teacher/updateTeacher?token='+$.cookie('token'),
                type: 'POST',
                data: JSON.stringify(obj),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    data = JSON.parse(data);
                    /*console.log(data);
                    debugger;*/
                    if(data.code == 1){
                        alert('保存成功');
                        loadList();
                    }else{
                        alert(data.msg);
                    }
                },
                error: function(text){
                    /*console.log(text.readyState);
                    console.log(text.status);*/
                }
            })
        }else {
            alert('姓名、密码或者用户名不能为空')
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
        $('.tip1').css({color:'red'}).html('姓名不能为空');
    }else{
        $('.tip1').css({color:'green'}).html('正确');
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
    checkOther(this,'密码不能为空');
});
$('#username').on('blur',function(){
    checkOther(this,'账号');
    var username = $(this).val();
    if(!(/^[a-zA-Z][0-9a-zA-Z]{6,18}$/.test(username))){
        $(this).next('span').css({color:'red'}).html('账号由6-18位的数字或字母组成')
    }else{
        $(this).next('span').css({color:'green'}).html('正确')
    }

})
$('#phone').on('blur',function(){
    checkOther(this,'手机');
    var phone = $(this).val();
    if(!(/^1[34578]\d{9}$/.test(phone))){
        $(this).next('span').css({color:'red'}).html('手机号码格式不正确')

    }else{
        $(this).next('span').css({color:'green'}).html('正确')
    }
})

function checkOther(element,tips){
    var text = $(element).val();
    if(text == ''){
        $(element).next('span').css({color:'red'}).html(tips+'不能为空');
    }else {
        $(element).next('span').css({color:'green'}).html('正确')
    }
}
//照片删除
function delcfm(e){
    var list = checkImgLength();
    var curImg = $(e).parent().find("img")
    curImg.css("display","none")
    $('.imageBox .photo').each(function(i,key) {
        if(i ==$(e).attr('title') )
        {
            var src = $(this).attr('src');
        }
    })

    curImg.attr('src', " ");
    list = checkImgLength();
}
function checkImgLength() {
    var imgList = [];
    $('.imageBox .photo').each(function() {
        var src = $(this).attr('src');
        if(src != "") {
            imgList.push(src)
        }
    })
    return imgList;
}
//添加照片
function addImg(){
    $(".changeImg input").change(function() {
        var imgList = checkImgLength();
        var filesList = this.files;
        if(filesList.length > 5) {
            $(".tip").empty().css({
                color: "red"
            }).html("最多可以上传5张图片");
            return false;
        }
        var curIndex = 0;
        var isHasDel =false;
        var realList = [];
        for(var imgI = 0;imgI<imgList.length;imgI++)
        {
            if(imgList[imgI]==" ")
            {
                isHasDel = true;
                curIndex = imgI;
            }else{
                realList.push(imgList[imgI])
            }
        }
        if(realList.length >= 5) {
            $(".tip").empty().css({
                color: "red"
            }).html("最多可以上传5张图片");
            return false;
        }
        if (curIndex==0 && !isHasDel) {
            curIndex = imgList.length;
        }
        for(var i = 0; i < filesList.length; i++) {
            loadImg(filesList[i])
        }
        function loadImg(file) {
            var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
            if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
                if(file.size / 1024 < 2000) {
                    showOverall();
                    var formData = new FormData();
                    formData.append('file1', file);
                    var curID = "imageStr" + curIndex;
                    var layerId = "layer"+ curIndex;
                    $.ajax({
                        type: "POST", //必须用post
                        url: imgUrl,
                        crossDomain: true,
                        cache: false,
                        jsonp: "jsoncallback",
                        data: formData,
                        contentType: false, //必须
                        processData: false,
                        complete: function(data) {
                            var json = eval('(' + data.responseText + ')');
                            document.getElementById(curID).src = json.imgurl;
                            document.getElementById(layerId).src = "images/delected.png";
                            //$('imageStr'+curID).attr('src', json.imgurl);
                            var img = document.getElementById(curID); //获取img元素
                            var picRealWidth, picRealHeight;
                            $("<img>") // 在内存中创建一个img标记
                                .attr("src", $(img).attr("src"))
                                .load(function() {
                                    picRealWidth = this.width;
                                    picRealHeight = this.height;
                                    $(".imgTips").empty().css({
                                        color: "green"
                                    }).html("");
                                    document.getElementById(curID).src = json.imgurl;
                                    document.getElementById(curID).style.display = 'inline-block';
                                    document.getElementById(layerId).style.display = 'inline-block';
                                    clearOverall();
                                });

                        }
                    });
                } else {
                    clearOverall();
                    if(document.getElementById(curID))
                    {
                        document.getElementById(curID).src = "";
                        document.getElementById(curID).style.display = 'none';
                        document.getElementById(layerId).style.display = 'none';
                    }
                    $(".imgTips").empty().css({
                        color: "red"
                    }).html("图片大小不能大于2M");
                }
            } else {
                if(document.getElementById(curID)) {
                    document.getElementById(curID).src = "";
                    document.getElementById(curID).style.display = 'none';
                    document.getElementById(layerId).style.display = 'none';
                }
                $(".imgTips").empty().css({
                    color: "red"
                }).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
            }
        }

    });
}
function clearOverall() {
    $(".overall").hide();
}
function showOverall() {
    $(".overall").show();
}