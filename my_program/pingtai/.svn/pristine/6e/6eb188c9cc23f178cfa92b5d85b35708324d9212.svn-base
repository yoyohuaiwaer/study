/**
 * Created by A on 2017/5/19.
 */
$(document).ready(function(){
    //newDireObj = [];
    newDireObj = [];
    $(".breadcrumb").empty();
    var breadcrumb = '<li><a class="" alt="sports-list.html" id="592537bc1da52d71d9836baa">动作管理</a></li><li class="selected"><a class="" alt="sports-details.html" id="">新增/修改动作包</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    /*console.log(newDireObj);
    debugger;*/
    if($.cookie('sports-id') !== ''){
        loadPage();
    }

    overshow();//弹出遮罩
    addDirection();//保存舞蹈动作
    cancelAdd();//取消
    randomDirection();//随机
    deleDirection();//删除某个动作
    uploadImg();
    confirm();
    cancelConfirm();
});
function cancelConfirm(){
    $('.cancelConfirm').on('click',function(){
        newPage();
    })
}

function toArr(Arr){
    var b= '';
    $.each(Arr,function(i,key){
        b += key +';';
    })
    b = b.substr(0, b.length - 1);
    console.log(b);
    return b
}

function loadPage(){
    $.ajax({
        url: commUrl + '/moves',//替换接口
        cache:false,
        type:'GET',
        data: {
            token: $.cookie('token'),
            id: $.cookie('sports-id')
        },
        success: function(data){
            data = eval('('+data+')');
            var key = data.data;
            var _movePack = key.movePack.operation;
            //var _trigers = ;

            /*console.log(_movePack);*/
            if(data.code == '1'){
                var _trigers = toArr(key.trigers);
                $('#name').val(key.name);
                $('#trigers').val(_trigers);
                var background = key.background.split(',');

                //if(background)
                //{
                for(var i = 0; i < background.length; i++) {
                    var curID = "imageStr" + (i);
                    var layerId = "layer"+ i;
                    document.getElementById(curID).src = background[i];
                    document.getElementById(curID).style.display = 'inline-block';
                    document.getElementById(layerId).style.display = 'inline-block';
                }
                //}

                //$('#imageId').attr({'src':key.background}).show();
                $.each(key.tips,function(i,val){
                    $('.tips:eq('+i+')').val(val)
                })
                $('input[name="interval"]').each(function(){
                    if($(this).attr('value') == key.interval){
                        $(this).prop( "checked", true);
                    }
                })
                $('input[name="mode"]').each(function(){
                    if($(this).attr('value') == key.mode){
                        $(this).prop( "checked", true);
                    }
                })
                var newArr = [];
                $.each(_movePack,function(i,key){
                    newArr.push(key);
                    if(key.sleep){
                        newDireObj.push(newArr);
                        newArr = [];
                    }
                })
                loadDirecEle(newDireObj);
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
};


function addObj(str){//
    //$(str).on('blur',function(){
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
   // })

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
function confirm(){
    $('.confirm').on('click',function(){//提交后台确认按钮
        var objBox = {};
        var _name,_tips,_interval,_mode,_background,_movePack,_id,_trigers;

        _movePack = {};
        //_name = $('#name').val();
        var _pack = []
        $.each(newDireObj,function(i,key){
            $.each(key,function(num,val){
                _pack.push(val);
            })
        })


        _movePack.operation = _pack;
        _movePack.repeat = '-1';
        _trigers = addObj('#trigers');

        _name = $('#name').val();
        _tips = [];
        $('.tips').each(function(){
           var _val = $(this).val();
            if( _val !== ''){
                _tips.push(_val);
            }
        })
        _interval = $('input[name="interval"]:checked').val();
        _mode = $('input[name="mode"]:checked').val();;
        _background = '';//$('#imageId').attr('src');

        $('.imageBox .photo').each(function() {
            var src = $(this).attr('src');
            if(src != ""&& src!=" ") {
                _background += src+',';
                //imgArr.push(src)
            }
        })

        _background = _background.substr(0,_background.length-1);
        objBox.name = _name;//名称
        objBox.tips = _tips;//互动语
        objBox.interval = _interval;//播放时间
        objBox.mode = _mode;//播放模式
        objBox.background = _background;//背景
        objBox.movePack = _movePack;//动作包
        objBox.trigers = _trigers//触发词
        if($.cookie('sports-id') !== ''){
            _id = $.cookie('sports-id');
            objBox.id = _id;
        }
        objBox = JSON.stringify(objBox);
        console.log(objBox);
        debugger;
        if(_name !== ''){
            if(_pack.length !== 0){
                //if(_tips.length !== 0){
                    if(_trigers.length !== 0){
                        if(_background == ''){
                            alert('最少添加一张背景图片');
                            return false;
                        }
                        $.ajax({
                            url: commUrl + '/moves?token='+ $.cookie('token'),//替换接口
                            cache:false,
                            type:'POST',
                            data: objBox,
                            dataType: 'json',
                            contentType: 'application/json; charset=UTF-8',
                            success: function(data){
                                data = eval('('+data+')');
                                if(data.code == '1'){
                                    alert('成功');
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
                    }else {
                        alert('至少有一个触发词~！')
                    }

                //}else{
                    //alert('至少有一句互动语~！')
                //}
            }else{
                alert('动作不能为为空')
            }
        }else{
            alert('动作名不能为为空')
        }




    });
}
function newPage(){
    $.ajax({
        url:menuUrl+'sports-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
};
function uploadImg(){//上传图片


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
                if(file.size / 1024 < 1000) {
                    $('.overall1').show();
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
                                    $('.overall1').hide();
                                });

                        }
                    });
                } else {
                    $('.overall1').hide();
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



/*    $(".file_upload").change(function() {
        var file = this.files[0];
        var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
        if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
            if(file.size / 1024 < 800) {
                var formData = new FormData();
                formData.append('file1', file);
                $('.overall1').show();
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
                        $('#imageId').attr('src', json.imgurl);
                        var img = $("#imageId"); //获取img元素
                        var picRealWidth, picRealHeight;
                        $("<img>") // 在内存中创建一个img标记
                            .attr("src", $(img).attr("src"))
                            .load(function() {
                                picRealWidth = this.width;
                                picRealHeight = this.height;
                                $(".imgTips").empty().css({
                                    color: "green"
                                }).html("");
                                $('.overall1').hide();
                                $('#imageId').attr('src', json.imgurl).css('display', 'inline-block');
                                //$('#imageId');
                            });
                        //$('#imageId').show().attr('src', json.imgurl);
                    }
                });
            } else {
                $('#imageId').attr('src', '');
                $('#imageId').css('display', 'none');
                $(".imgTips").empty().css({
                    color: "red"
                }).html("图片大小不能大于800k");
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
function deleDirection(){//删除动作
    $('.deleDirection').on('click',function(){
        deleDirection()
        var index = $(this).attr('data-id');
        newDireObj = $.grep(newDireObj,function(n,i){
            return i != index;
        })
        loadDirecEle(newDireObj);
        $('.overall').hide();
    });
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
function randomDirection(){//随机动作
    $('.randomDirection').on('click',function(){
        $('.popap input[type="radio"]').each(function(){
            $(this).attr("checked",false);
        })
        var arry = $('.inputBox').length;
        //console.log(arry);
        var arr = [];
        for(var i=0;i< 3;i++){
            getx(arr);
        }
        function getx(arr){
            for(var i=0;i>-1;i++){
                var flag = true;
                var num = Math.floor(Math.random()*arry);
                for(var i in arr){
                    if(arr[i] == num){
                        flag= false;
                        break;
                    }
                }
                if(flag == true){
                    //console.log(num);
                    arr.push(num);
                    return;
                }
            }
        }
        $.each(arr,function(i,key){
            //key = key - 1
            var inputLenght = $('.inputBox:eq('+key+')').find('input').length;
            var inputIndex = Math.floor(Math.random()*inputLenght);
            $('.inputBox:eq('+key+')').find('input:eq('+inputIndex+')').prop('checked',true);
        })
        var sleepLeth = $('.sleep').length;
        var handLLeth = $('input[name="handLDirection"]').length;
        var handRLeth = $('input[name="handRDirection"]').length;
        var footLeth = $('input[name="footDirection"]').length;//[nam="footDirection"]
        var sleepIndex =  Math.floor(Math.random()*sleepLeth);
        var handLDirection = Math.floor(Math.random()*handLLeth);
        var handRDirection = Math.floor(Math.random()*handRLeth);
        var footDirection = Math.floor(Math.random()*footLeth);
        $('.sleep:eq('+sleepIndex+')').prop('checked',true);
        //$('.left:eq('+handLDirection+')').prop('checked',true);
        //$('.right:eq('+handRDirection+')').prop('checked',true);
        $('.left').find('input:eq('+handLDirection+')').prop('checked',true);
        $('.right').find('input:eq('+handRDirection+')').prop('checked',true);
        $('.foot').find('input:eq('+footDirection+')').prop('checked',true);
        //$('.foot:eq('+footDirection+')').prop('checked',true);
    })
}
function cancelAdd(){//弹出框隐藏
    $('.cancelAdd').on('click',function(){
        $('.overall').hide();
    })
}
function loadDirecEle(newDireObj,Arr){
    if(Arr){
        newDireObj.push(Arr);
    }
    /*console.log(newDireObj);
    debugger;*/
    var html = ''
    $.each(newDireObj,function(i,key){
        html += '<a class="editDirection" data-id="id'+(i+1)+'">舞蹈动作'+(i+1)+'</a>'
    })
    $('.sportsText').empty().html(html);
    editDirection();//注册修改动作事件
}
function reset(eleName,value,direction){
    var direction = direction
    $('input[name="'+eleName+'"]').each(function(){
        if($(this).attr(value) == direction){
            $(this).prop('checked',true)
        }
    })
}
function footReset(eleNameBox,eleName,value,direction){
    $('input[name="'+eleNameBox+'"]').each(function(){
        $('input[data-direction="'+eleName+'"]').each(function(){
            if($(this).attr(value) == direction){
                $(this).prop('checked',true)
            }
        })
    })

}
function editDirection() {//修改动作
    $('.editDirection').on('click', function () {
        var index = $('.editDirection').index(this);
        $('.addDirection').attr({'data-id':index});
        $('.deleDirection').show().attr({'data-id':index});
        $('.popap input[type="radio"]').each(function () {
            $(this).attr("checked", false);
        });
        var arr = newDireObj[index];
        $('.overall').show();
        $.each(arr, function (i, key) {
            if (key.part == undefined) {
                var sleep = key.sleep;
                $('.sleep').each(function () {
                    if($(this).attr('value') == sleep){
                        $(this).prop('checked',true);
                    }
                });
            } else {
                var Part = (key.part).toString();
                switch (Part) {
                    case '111':
                        if(key.direction == '9'){
                            //footReset(eleNameBox,eleName,value,direction)
                            footReset('footDirection','9','data-angle',key.angle);
                        }else if(key.direction == '10'){
                            footReset('footDirection','10','data-angle',key.angle);
                        }else{
                            reset('footDirection','data-direction',key.direction);
                        }

                        break;
                    case '222':
                        (key.direction == '2')? reset('handRDirection','data-angle',key.angle) : reset('handLDirection','data-angle',key.angle);
                        break;
                    case '333':
                        reset('headDirection','data-angle',key.angle);
                        break;
                    case '22222':
                        reset('handLLight','data-LedMode',key.ledMode);
                        break;
                    case '33333':
                        reset('handRLight','data-ledmode',key.ledMode);
                        break;
                    case '44444':
                        reset('headLLight','data-ledmode',key.ledMode);
                        break;
                    case '55555':
                        reset('headRLight','data-ledmode',key.ledMode);
                        break;
                }
            }
            //$('.addDirection').attr({'data-id': index});

        })

    })
}
function overshow(){//添加动作
    $('.overshow').on('click',function(){
        $('.popap input[type="radio"]').each(function(){
            $(this).attr("checked",false);
        })
        $('.sleep:eq(1)').prop("checked",true);
        $('.addDirection').attr({'data-id':''});
        $('.deleDirection').hide();
        $('.overall').show();
    })
}
function checked(judge){
    var newArry = []
    $('.popap input[type="radio"]:checked').each(function(){
        var obj = {};
        var type = $(this).attr('class');
        switch (type){
            case 'direction':
                obj.part = $(this).attr('data-part');
                obj.direction = $(this).attr('data-direction');
                obj.speed = $(this).attr('data-speed');
                obj.angle = $(this).attr('data-angle');
                break;
            case 'light':
                obj.part = $(this).attr('data-part');
                obj.ledMode = $(this).attr('data-ledmode');
                if($(this).attr('data-leddelay') !== ''){
                    obj.ledDelay = $(this).attr('data-leddelay')
                }
                if($(this).attr('data-lednumber') !== ''){
                    obj.ledNumber = $(this).attr('data-lednumber');
                }
                break;
            case 'sleep':
                obj.sleep = $(this).val();
        }
        newArry.push(obj);

    })
    var Arr =  newArry;
    if(judge == ''){
        loadDirecEle(newDireObj,Arr);
    }else{
        newDireObj[judge] = newArry
    }
    $('.overall').hide();
}
function addDirection(){//新增动作提交
    $('.addDirection').on('click',function(){
        var judge = $(this).attr('data-id');
        checked(judge);
    })
}