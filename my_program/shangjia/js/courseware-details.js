/**
 * Created by A on 2017/5/31.
 */
$(document).ready(function(){

    $(".breadcrumb").empty();
    var breadcrumb = '<li><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="courseware-list.html" id="59312f490b82ad25721593a0">课件管理</a></li><li class="selected"><a href="javascript:void(0);"   title="courseware-details.html" id="">新增/查看课件</a></li>';
    $(".breadcrumb").html(breadcrumb);
    loadTid();
    chooseMultimedia();
    if($.cookie('sports-id') == ''){
        $('.edit').hide();
        $('.add').show();
        $('.confirm').show();
    }else {
        $('.edit').show();
        $('.add').hide();
        $('.confirm').hide();
        loadPage();
    }
    confirm();
    sellerChange();
    cancel();
});
function loadPage(){
    var obj={
        token:$.cookie("token"),
        id: $.cookie('sports-id')
        /*page:page,
        row:'10',
        sortId:'updateTime',
        sortType:'DESC'*/
    };
    $.ajax({
        url:commUrl+'/courseware',//替换
        data:obj,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".grid-body").empty();
            var html = '';
            var sort = 0;
            var page = '';
            if(data.code == '1'){
                $('#sellerName').val(data.data.name);
                var _type = data.data.type;
                switch (_type){
                    case "audio":
                        $('#audio').attr({src: data.data.url}).show();
                        $('#videoId').hide();
                        $('#pptId').hide();
                        break;
                    case "video":
                        $('#videoId').attr({src: data.data.url}).show();
                        $('#pptId').hide();
                        $('#audio').hide();
                        break;
                    case "ppt":
                        $('#pptId').text('下载ppt课件').attr({href: data.data.url}).show();
                        $('#videoId').hide();
                        $('#audio').hide();
                }
            }else{
                alert(data.msg);
            }

        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
};
function cancel(){
    $('.cancel').on('click',function(){
        newPage();
    })
}
function confirm(){
    $('.confirm').on('click',function(){
        var _public = $('#seller').find("option:selected").attr("value");
        var _tid = $('#tid').find("option:selected").attr("id");
        var _processId = $('#tid').find("option:selected").attr("value");
        var _username = $('#tid').find("option:selected").attr("data-username");
        var _value = [];
        var _rewrite = $('input[name="rewrite"]:checked').val();
        $('.tagsContent').each(function(){
           var _obj = {};
            _obj.id = $(this).text();
            _obj.value = $(this).attr('data-url');
            if(_processId !== undefined){
                _obj.processId = _processId;
            }
            _value.push(_obj);
        });
        if(_public == 'persinal'){
            if(_tid == undefined){
                alert('请选择老师!');
                return;
            }else{
                var _url = commUrl + '/courseware/batch?token='+ $.cookie('token')+'&rewrite='+_rewrite+'&tid='+_tid+'&username='+_username;
            }

        }else{
            var _url = commUrl + '/courseware/batch?token='+ $.cookie('token')+'&rewrite='+_rewrite
        }
        _value = JSON.stringify(_value)
        $.ajax({
            url: _url,//替换接口
            cache:false,
            type:'POST',
            data: _value,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                data = eval('('+data+')');
                if(data.code == '1'){
                    var flg = true;
                    $.each(data.data,function(i,key){
                        if(key.code !==  2){
                            if(key.code !== 1){
                                flg = false;
                            }
                        }
                    })
                    if(flg == true){
                        newPage();
                    }else{
                        $.each(data.data,function(i,key){
                           if(key.code == 0 ){
                               $('.tagsBox').each(function(){
                                   var text = $(this).find('.tagsContent').text();
                                   if(text == key.name){
                                       $(this).find('.tagsContent').css({'border-color': 'red'});
                                   }else{
                                       $(this).remove();
                                   }
                               })
                           }
                        });
                        alert('有同名课件~~！');
                    }
                }
                else {
                    alert(data.msg);
                }
            },
            error: function(status){
                console.log(status.readyState);
                console.log(status.state);
                alert('出错啦~！！')
            }
        })

    })
}
function newPage(){
    $.ajax({
        url:menuUrl+'courseware-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
};
function sellerChange(){
    $('#seller').on('change',function(){
        var chooseValue = $(this).find("option:selected").attr("value");
        if(chooseValue == 'persinal'){
            $('#tid').show();
        }else{
            $('#tid').hide();
        }
    })
}
function chooseMultimedia(){
    var client = new OSS.Wrapper({
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAIoFk711AQZpyR',
        accessKeySecret: 'fMtm3FMFl3FgdJi5VQYIaIZixqTC4B',
        bucket: 'sanbot-upload'
    });
    $('#file_upload').on('change', function () {
        if (this.files.length == 0) {
            alert('请选择文件');
            return
        }
        var leth = this.files.length;
        $('.overall').show();
        var $this = this.files
        var showCount = function(){

            for (var i = 0; i < leth; i++) {
                //var files = $this[i]
                    var num = i;
                    var file = $this[i];//this.files[i];
                    var _name = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
                    var fileName = file.name;
                    var size = file.size;
                    if (_name == "rmvb" || _name == "avi" || _name == "wmv" || _name == "mpg" || _name == "mp4" || _name == "wav" || _name == "mp3" || _name == "WMA" || _name == "ppt" || _name == "pptx") {
                        if (size / 1024 > 30000) {
                            alert(_name + '文件大于20M，建议优化后再上传');
                        } else {
                            client.multipartUpload(fileName, file).then(function (result) {
                                var html = '<li class="tagsBox"><span class="deletTagsBox" style="display: inline-block">x</span>' +
                                    '<span class="tagsContent" data-url="' + result.res.requestUrls[0] + '" style="display:inline-block;">' + result.name + '</span> </li>'
                                $('.imageBox').append(html);
                                deletTagsBox();
                            }).catch(function (err) {
                                console.log(err);
                            });
                        }

                    } else {
                        alert(_name + '文件格式不正确');
                    }






                    /*setTimeout(function () {
                        html = html + 1;
                        console.log(html, num)

                    }, 100);*/






            }
        }

        setTimeout(function(){
            showCount();
            $('.overall').hide();
        },3000)




    })

    /*$(".file_upload").change(function() {

        var paths = this.files
        if(this.files.length == 0){
            alert('请选择文件');
            return
        }
        var html = '';


        var num = paths.length - 1;
        //var t = setTimeout(setTimeoutFor(),10000);
        $('.overall').show();
        var t = setTimeout(setTimeoutFor,100)
        function setTimeoutFor(){
            for(var i = 0; i < paths.length; i++){
            forEach(paths,i,num);
            //setTimeout(setTimeoutFor,10000)
            //debugger;
        }}

    });*/

}

/*function forEach(obj,i,num){
    var _name = obj[i].name.substring(obj[i].name.lastIndexOf(".") + 1).toLowerCase()
    if(_name == "rmvb" || _name == "avi" || _name == "wmv" || _name == "mpg" || _name == "mp4" ||  _name == "wav" || _name == "mp3" || _name == "WMA" || _name == "ppt" || _name == "pptx"){///[^\s]+\.(rmvb|avi|wmv|mpg|mp4|wav|mp3|WMA|ppt|pptx)/i

        if(obj[i].size / 1024 > 20000){
            alert(obj[i].name + '文件大于20M，建议优化后再上传')
        }else {
            //$('.overall').show();
            //debugger;
            var formData = new FormData();
            formData.append('file1', obj[i]);
            $.ajax({
                type: "POST", //必须用post
                url: multiMediaUrl,
                crossDomain: true,
                cache: false,
                async: false,
                jsonp: "jsoncallback",
                data: formData,
                contentType: false, //必须
                processData: false,
                complete: function(data) {
                    var json = JSON.parse(data.responseText);
                    //console.log(json);
                    var html = '<li class="tagsBox"><span class="deletTagsBox" style="display: inline-block">x</span>'+
                        '<span class="tagsContent" data-url="'+json.imgurl.url+'" style="display:inline-block;">'+json.imgurl.name+'</span> </li>'
                    $('.imageBox').append(html);
                    deletTagsBox();

                }
            });
            console.log(i);
            console.log(num)
            if(i == num){
                $('.overall').hide();
                //console.log(i);
                //debugger;
                //return;
            }





               /!* console.log(file.name + ' => '+storeAs);
                client.multipartUpload(_name, file).then(function (result) {
                    var html = '<li class="tagsBox"><span class="deletTagsBox" style="display: inline-block">x</span>'+
                        '<span class="tagsContent" data-url="'+result.res.requestUrls[0]+'" style="display:inline-block;">'+result.name+'</span> </li>'
                    $('.imageBox').append(html);
                    deletTagsBox();
                    console.log(result);
                }).catch(function (err) {
                    console.log(err);
                });*!/
            });

        }
    }else{
        alert(obj[i].name + '文件格式不对')
        if(i == num){
            $('.overall').hide();
            //console.log(i);
            //debugger;
            //return;
        }
    }
}*/



function deletTagsBox(){
    $('.deletTagsBox').on('click',function(){
        $(this).parent('.tagsBox').remove();
    })
}
function loadTid(){
    $.ajax({
        url:commUrl+'/teacher/teacherList',
        type:'GET',
        cach:false,
        aysn: false,
        data:{
            token:$.cookie("token"),
            page:1,
            row: 100,
            sortId:'createTime',
            sortType:'DESC'
        },
        success: function(response){
            var html = '';
            var page = '';
            response = JSON.parse(response);
            if(response.code == 1){
                if(response.data.datas.length == 0){
                    html = '<option>暂无老师</option>';
                }else {
                    //数据循环
                    html +='<option>请选择</option>';
                    $.each(response.data.datas,function(i,key){
                        html += '<option value="'+key.name+'" id="'+key.id+'" data-username="'+key.username+'">'+key.name+'</option>' ;
                    });
                    $("#tid").empty().html(html);
                    //$(".pages ul").html(page);
                }
            }

        },
        error: function( text){
            alert(text.readyState);
            alert(text.status);
            alert("出错啦");
        }
    })
}