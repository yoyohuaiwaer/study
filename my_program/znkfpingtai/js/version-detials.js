/**
 * Created by A on 2017/1/12.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li ><a class="" alt="version-list.html" id="587743929dc1b9775255889e">版本管理</a></li>';
    $(".breadcrumb").html(breadcrumb);
    var id = '587743929dc1b9775255889e';
    findMenus(id);
    if($.cookie('judgement') == 0){
        loadPage();
    }
    addAPK();
    confirm();
    cancel();
})
function loadPage(){
    $.ajax({
        url:commUrl+'/version/find',
        async:false,
        data: {
            token: $.cookie('token'),
            id: $.cookie('versionId'),
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                $("#cate").children('option[value="'+response.data.cate+'"]').attr({selected:"selected"});
                $("#cate").attr({disabled:'disabled'});
                $("#type").children('option[value="'+response.data.type+'"]').attr({selected:"selected"});
                $("#type").attr({disabled:'disabled'});
                $('#apkSrc').attr({'src': './images/apk.png','data-url':response.data.apk}).show();
                $("#number").attr({value:response.data.number});
                $("#desc").html(response.data.desc);
                var value = '';
                response.data.necessary = true ? value = 1:value = 0;
                $('input[name="necessary"]').each(function(){
                    if($(this).attr('data-value') == value){
                        $(this).prop( "checked", true);
                    }
                });
            }
        },
        error: function(text){
            alert("出错啦~！")
        }
    });

}

function findMenus(parentId){

    $.ajax({
        url:commUrl+'/menu/findbyid',
        async: false,
        data: {
            token:$.cookie("token"),
            parentId:parentId
        },
        success: function(data){
            data = JSON.parse(data);
            //alert(data);
            if(data.code == 1) {
                //alert($('.main-title').attr('title'));
                //console.log(data.data[0])
                var bred = '';
                bred += '<li class="selected"><a alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">' ;
                $.cookie('judgement') == 0 ? bred += '修改版本</a></li>':bred += ''+data.data[0].name+'</a></li>';
                //console.log(bred);
                $(".breadcrumb").append(bred);
                changeBreadcrumb();
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(status);
        }
    })
}

function addAPK() {
    $(".choseimg input").change(function() {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('file', file);
        var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        if(fileName == "apk") {
            if(file.size / 1024 < 100000) {
                showOverall();
                $.ajax({
                    type: "POST", //必须用post
                    url: videoUrl,
                    crossDomain: true,
                    jsonp: "jsoncallback",
                    data: formData,
                    contentType: false, //必须
                    processData: false,
                    //不能用success，否则不执行
                    complete: function(data) {
                        clearOverall();
                        $("#tip3").empty().css({color: "green"}).html("");
                        $('#apkSrc').css('display', 'inline-block');
                        var json = eval('(' + data.responseText + ')');
                        $('#apkSrc').attr({'src': './images/apk.png','data-url':json.videourl}).show();
                    },
                    error: function(data) {
                        clearOverall();
                        $('#apkSrc').attr({'src': '','data-url':''}).hide();
                    }
                });
            }else {
                $('#apkSrc').attr({'src': '','data-url':''}).hide();
                //$('#videoId').css('display', 'none');
                $("#tip3").empty().css({
                    color: "red"
                }).html("文件大小不能大于100m");
            }
        }else
        {
            $("#tip3").empty().css({
                color: "red"
            }).html("文件格式不正确，格式应为：apk");
        }

    });
}
$("#number").on('blur',function(){
    var number = $(this).val();
    var re = /^\d([\d.]*\d)?$/;  ///^(-|\+) \d+(\.\d+) $/;
    if( re.test(number)){
        $('#tip4').css({color:'#333'}).html('');
    }else {
        $('#tip4').css({color: 'red'}).html('版本号只能为数字和小数点')
    }
})
function confirm(){
    $(".confirm").click(function(){
        var status = $('input[name="necessary"]:checked').val()
        var _cate = $("#cate").children("option:selected").attr("value");
        var _type = $("#type").children("option:selected").attr("value");
        if($.cookie('judgement') == 1){
            obj = {
                token:$.cookie("token"),
                cate: _cate,
                type:_type,
                number:$("#number").val(),
                desc:$("#desc").val(),
                apk: $("#apkSrc").attr('data-url'),
                necessary:status
            };
        }else if($.cookie('judgement') == 0){
            obj = {
                token:$.cookie("token"),
                id: $.cookie('versionId'),
                cate: _cate,
                type: _type,
                number:$("#number").val(),
                desc:$("#desc").val(),
                apk: $("#apkSrc").attr('data-url'),
                necessary:status
            };
        };
        //console.log(obj);
        //debugger;
        //if($("#url").val().substr(0,7) == "http://"||$("#url").val() == ""){
        $.ajax({
            url:commUrl+'/version/save',
            type:'POST',
            async:false,
            data:obj,
            success: function(data){
                data = eval('(' + data + ')')
                if(data.code == '1'){
                    newPage();
                }else {
                    alert(data.msg)
                }

            },
            error: function(text){
                alert('出错啦~！');
            }
        })
       // }
        //else {
        //    $("#tip4").show().text("输入地址有误，地址必须是以http://开头的url");
        //}
    })
}
function newPage(){
    $.ajax({
        url: menuUrl+'version-list.html',
        success: function(response){
            $('.main').empty().html(response);
        }
    })
};
function cancel(){
    $(".cancel").on('click',function(){
        newPage();
    })
}
function clearOverall() {
    $(".overall").hide();
}

function showOverall() {
    $(".overall").show();
}