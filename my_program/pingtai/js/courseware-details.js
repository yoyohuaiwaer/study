/**
 * Created by A on 2017/4/18.
 */
$(document).ready(function(){
    loadTags();
    loadColumn();
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data:{
            token:$.cookie("token"),
            parentId:'58f461763c9e9c3c425683c8'
        },
        success: function(data){
            data = eval('('+data+')');
            if(data.code == '1'){
                $(".breadcrumb").empty();
                var breadcrumb = '<li><a alt="courseware-list.html" id="58f461763c9e9c3c425683c8">课件管理</a></li><li class = "selected" ><a alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });

    selectList();
    imgUpLoad();
    vedioUpLoad('.changeAudio input','#audioId','.audioTips');
    vedioUpLoad('.changeVedio input','#videoId','.vedioTips');
    confirm();
    cancel();
    strLength();
    if($.cookie('data-id') !==''){
        loadDetails();
    }
})
function cancel(){
    $('.cancel').on('click',function(){
        newPage();
    })
}
function strLength(){
    $('#desc').keyup(function(){
        var str = $(this).val()

        if(str.length <= 200 ){
            var _surplus = 200 - str.length;
            $('.already').empty().text(str.length).css({color:'#333'});
            $('.surplus').empty().text(_surplus).css({color:'#333'});
        }else{
            var NewStr = $(this).val();
            NewStr = NewStr.substring(0,200);
            $('.surplus').empty().text('0').css({color:'red'});
            $('.already').empty().text('200').css({color:'red'});
            $(this).val(NewStr);
         }
    })
}
function loadDetails(){
    $.ajax({
        url: commUrl + '/courseware',
        data:{
            token: $.cookie('token'),
            id: $.cookie('data-id')
        },
        asyn: false,
        success: function(data){
            data = JSON.parse(data);
            //debugger;
            if(data.code == 1){
                data = data.data.datas[0]
                $('#coursewareName').val(data.coursewareName);
                $("#column").children('option[value="'+data.columnId+'"]').attr({selected:"selected"});

                //loadColumnTags(data.columnId);
                var _wakeWords = toArr(data.wakeWords)
                var _switchVideoWords = toArr(data.switchVideoWords);
                var _switchImgWords = toArr(data.switchImgWords);
                var _switchAudioWords = toArr(data.switchAudioWords);
                $('#wakeWords').val(_wakeWords);
                $('#switchImgWords').val(_switchImgWords);
                $('#switchAudioWords').val(_switchAudioWords);
                $('#switchVedioWords').val(_switchVideoWords);
                $('#action').children(('option[value="'+data.action+'"]')).attr({selected:"selected"});
                if(data.imgs)
                {
                    for(var i = 0; i < data.imgs.length; i++) {
                        var curID = "imageStr" + (i);
                        var layerId = "layer"+ i;
                        document.getElementById(curID).src = data.imgs[i];
                        document.getElementById(curID).style.display = 'inline-block';
                        document.getElementById(layerId).style.display = 'inline-block';
                    }
                }
                    /*var html = '';
                    $.each(data.imgs,function(i,key){
                        $('.imgList').empty();
                        if(i ==1){
                        html += '<img src="'+key+'" id="imageId" class="imageId">'
                        }else{
                            html +='<img src="'+key+'" class="imageId">'
                        }
                        $('.imgList').html(html);
                    })*/
                $('#videoId').attr({src:data.videos[0]});
                $('#audioId').attr({src:data.audios[0]});
                $('#desc').val(data.desc);
                $('input[name="isRecommend"]').each(function(){
                    if($(this).attr('value') == data.isRecommend){
                        $(this).prop( "checked", true);
                    }
                })
                $('input[name="isTop"]').each(function(){
                    if($(this).attr('value') == data.isTop){
                        $(this).prop( "checked", true);
                    }
                })
                if(data.labels.length > 0){
                    var arr = data.labels
                    $.each(arr,function(i,key){
                        $('.selectOption input[type="checkbox"]').each(function(){
                            if($(this).attr('value') == key.id){
                                $(this).prop( "checked", true );
                            }
                        })
                    })
                }
            }else {
                alert(data.msg)
            }
        },
        error: function(text){
            alert('出错啦~！')
        }

    })
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
function toArr(Arr){
    var b= '';
    $.each(Arr,function(i,key){
        b += key +';';
    })
    b = b.substr(0, b.length - 1);
    return b
}
function confirm(){
    $('.confirm').on('click',function(){
        var obj = {};
        var imgArr = [];
        var _videos = [],_audios = [];
        var _videosSrc = $('#videoId').attr('src');
        var _audiosSrc = $('#audioId').attr('src');
        _videos[0] = _videosSrc;
        _audios[0] = _audiosSrc;
        obj.videos = _videos;
        obj.audios = _audios;
        var adId = [];
        $('.selectOption input[type="checkbox"]').each(function(){
            if($(this).is(':checked')){
                var colDetail = {};
                colDetail.labelName = $(this).attr('data-name');
                colDetail.id = $(this).attr('value');
                colDetail.createTime = $(this).attr('data-time');
                adId.push(colDetail);
            }
        });
        obj.labels = adId;
        obj.switchAudioWords = addObj('#switchAudioWords');//
        obj.switchImgWords = addObj('#switchImgWords');//
        obj.switchVideoWords = addObj('#switchVedioWords');//
        obj.wakeWords = addObj('#wakeWords');//
        obj.coursewareName = $('#coursewareName').val();
        obj.columnId = $('#column').children('option:selected').attr('value');
        obj.columnName = $('#column').children('option:selected').attr('data-name');
        obj.desc = $('#desc').val();
        obj.isRecommend = $('input[name="isRecommend"]:checked').attr('value');
        obj.isTop = $('input[name="isTop"]:checked').attr('value');
        obj.action = $('#action').children('option:selected').attr('value');
        $('.imageBox .photo').each(function() {
            var src = $(this).attr('src');
            if(src != ""&& src!=" ") {
                imgArr.push(src)
            }
        })
        obj.imgs = imgArr;

        if($('#coursewareName').val()!==''){
            if($('#videoId').attr('src')!== undefined || $('#audioId').attr('src')!==undefined || imgArr[0] !==undefined ){
                if($.cookie('data-id') !== ''){
                 obj.id = $.cookie('data-id')
                };
                obj = JSON.stringify(obj)
                //var commUrl ='http://10.10.23.65:8080/manage/'
                $.ajax({
                    url: commUrl + '/courseware?token='+ $.cookie('token'),//替换接口
                    cache:false,
                    type:'POST',
                    data: obj,
                    dataType: 'json',
                    contentType: 'application/json; charset=UTF-8',
                    success: function(data){
                        data = eval('('+data+')');
                        if(data.code == '1'){
                            newPage();
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
            }
        }else{
            alert('课件名不能为空')
        }
    })

};
function newPage(){
    $.ajax({
        url:menuUrl+'courseware-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
};
function addObj(str){
    var _str = $(str).val();
    while(_str.indexOf("；")!=-1)//寻找每一个中文逗号，并替换
    {
        _str=_str.replace("；",";");
    }
    if(_str.charAt(_str.length - 1) == ';'){
        _str = _str.remove(_str.length - 1);
    }
    var arr = _str.split(';');
    return arr;
}
function imgUpLoad(){
    $(".file_upload").change(function() {
        var imgList = checkImgLength();
        var filesList = this.files;
        if(filesList.length > 5) {
            $(".imgTips").empty().css({
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
            $(".imgTips").empty().css({
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
                if(file.size / 1024 < 1000) {
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
                    }).html("图片大小不能大于1M");
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







    /*$(".file_upload").change(function() {
        var file = this.files[0];
        if(file ==undefined)
        {
            return;
        }
        var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
            if(file.size / 1024 < 1000) {
                showOverall();
                var formData = new FormData();
                formData.append('file1', file);
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
                        clearOverall();
                        var json = eval('(' + data.responseText + ')');
                        console.log(json);
                        debugger;
                        $('#imageId').attr('src', json.imgurl);
                        var img = $("#imageId"); //获取img元素
                        var picRealWidth, picRealHeight;
                        $("<img>") // 在内存中创建一个img标记
                            .attr("src", $(img).attr("src"))
                            .load(function() {
                                picRealWidth = this.width;
                                picRealHeight = this.height;
                                $(".imgTips").empty().css({color: "green"}).html("");
                                $('#imageId').show().attr('src', json.imgurl);
                                $('#imageId').css('display', 'inline-block');
                            });
                    }
                });
            } else {
                clearOverall();
                $('#imageId').attr('src', '');
                $('#imageId').css('display', 'none');
                $(".imgTips").empty().css({
                    color: "red"
                }).html("图片大小不能大于1M");
            }
        } else {
            $('#imageId').attr('src', '');
            $('#imageId').css('display', 'none');
            $(".imgTips").empty().css({
                color: "red"
            }).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
        }
    })*/
}
function vedioUpLoad(control,container,tips){
    $(control).change(function() {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('file', file);
        var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        if(control == '.changeVedio input'){
            var _choose = 'fileName == "rmvb" || fileName == "avi" || fileName == "wmv" || fileName == "mpg" || fileName == "mp4"';
            var _size = 20000;
            var _tips = "视频格式不正确，格式应为：rmvb|avi|wmv|mpg|mp且小于20M";
            var _videoUrl = videoUrl
        }else{
            var _choose = 'fileName == "wav" || fileName == "mp3" || fileName == "WMA" ;'//|| fileName == "mpg" || fileName == "mp4"
            var _size = 10000;
            var _tips = "音频格式不正确，格式应为：wav|mp3|wma 且小于10M";
            var _videoUrl = audioUrl
        }
        if(_choose) {
            if(file.size / 1024 < _size) {
                showOverall();
                $.ajax({
                    type: "POST", //必须用post
                    url: _videoUrl,
                    crossDomain: true,
                    jsonp: "jsoncallback",
                    data: formData,
                    contentType: false, //必须
                    processData: false,
                    //不能用success，否则不执行
                    complete: function(data) {
                        clearOverall();
                        $(tips).empty().css({color: "green"}).html("");
                        $(container).css('display', 'inline-block');
                        var json = eval('(' + data.responseText + ')');

                        if(json.videourl !== undefined & json.videourl !== ''){
                            $(container).attr('src', json.videourl);
                        }else{
                            $(container).attr('src', json.audiourl);
                        }

                    },
                    error: function(data) {
                        clearOverall();
                        $(container).attr('src', '');
                        $(container).css('display', 'none');
                    }
                });
            }else {
                $(container).attr('src', '');
                $(container).css('display', 'none');
                $(tips).empty().css({
                    color: "red"
                }).html(_tips);
            }
        }else
        {
            $(tips).empty().css({
                color: "red"
            }).html(_tips);
        }

    });
};
function clearOverall() {
    $(".overall").hide();
}
function showOverall() {
    $(".overall").show();
}
function loadColumn() {
    var _data={};
    _data = {
        token: $.cookie('token'),
        page:1,
        row:'100',
        sortId:'updateTime',
        sortType:'DESC',
    }
    $.ajax({
        url: commUrl + '/coursewareColumn',//替换
        data: _data,
        cache: false,
        asyn:false,
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            if(data.code == 1){
                var html = ''
                $.each(data.data.datas,function(i,key){
                    html += '<option value="'+key.id+'" data-name="'+key.columnName+'">'+key.columnName+'</option>'
                })
                //console.log(html);
                $('#column').html(html);
                if($.cookie('data-id') == ''){
                    var _columnId = $('#column').children('option:selected').val();
                    loadColumnTags(_columnId);
                }
                changeColumn();
            }
        },
        error: function (text) {
            alert(text.readyState);
            alert(text.state);
        }
    });
}
function changeColumn(){
    $('#column').on('change',function(){
        var _columnId = $(this).children('option:selected').attr('value');
        loadColumnTags(_columnId);
    })
};
function loadColumnTags(columnId){
    $.ajax({
        url:commUrl+'/coursewareLabel',//替换接口
        type:'GET',

        data:{
            token: $.cookie('token'),
            columnId: columnId
        },
        cache:false,
        success: function(data){
            data = JSON.parse(data);
            if(data.code == '1'){
                data = data.data
                $('.selectOption input[type="checkbox"]').prop('checked',false);
                $.each(data.labels,function(i,key){
                    $('.selectOption input[type="checkbox"]').each(function(){
                        if($(this).attr('value') == key.id){
                            $(this).prop( "checked", true );
                        }
                    })
                })
            }


        },
        error: function(text){
            console.log(text.readyState);
            console.log(text.state);
        }
    })
};
function loadTags(){
    var _data={token: $.cookie('token')};
    $.ajax({
        url: commUrl+'/coursewareLabel',
        data: _data,
        asyn:false,
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            //debugger;
            if(data.code == '1'){
                $(".selectOption").empty();
                var html = '';
                if(data.code == '1'){
                    $.each(data.data,function(i,key){
                        html += '<li><input type="checkbox" value="'+key.id+'" data-name="'+key.labelName+'" data-time="'+key.createTime+'"/>'+key.labelName+'</li>';
                        //debugger;
                    })
                    $(".selectOption").html(html);

                }
            }
        },
        error: function(text){
            alert('出错啦~！');
        }

    })
}
function selectList(){
    $('.optionSelected').click(function(){
        if($('.suport-icon').attr('class') == 'suport-icon icon-drop_down'){
            $(this).addClass('radius');
            $('.selectOption').slideDown();
            $('.suport-icon').removeClass('icon-drop_down').addClass('icon-drop_up');
        }else {

            $('.selectOption').slideUp();
            $(this).removeClass('radius');
            $('.suport-icon').removeClass('icon-drop_up').addClass('icon-drop_down');
        }
    })
};


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