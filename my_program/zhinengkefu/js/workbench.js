/**
 * Created by A on 2017/8/9.
 */
$(document).ready(function() {
    //$('.main-title').hide();
    $('.breadcrumb').empty();
    var afterWidth = $('.voiceBox input[type="range"]').val();
    var _Width = (25 * afterWidth) + 'px';
    $('.rangeSelect').css("width", _Width)
    $('.nick').html($.cookie('IMusername') + '工作台');

    //var localData = [];
    statusAll();//各种初始状态设置
    onbeforeLoad();//浏览器刷新前进后退监听
    connRtc();
    sports('.top');//动作前
    sports('.right');//动作右
    sports('.left');//动作左
    sports('.bottom');//动作后
    movement();//推送素材
    endVedio();//结束通话
    sendMessage();//类似对话框推送
    voiceFun();//声音加减
    recommend(); //客服答案助手
    /*closeveiw()//心理医生关闭窗口*/
    searchRecommend();//客服帮手搜索
    changeViocePlay();
})
function changeViocePlay(){
    $('#changeVoice').on('change',function(){
        var index = $(this).children('option:selected').index();
        var voiceValue = $(this).children('option:selected').attr('value');
        $.cookie('voiceCookie',voiceValue,{path:'/'});

        //$("#changeVoice").children('option[value="'+voiceValue+'"]').attr("selected", true);
        console.log($.cookie('voiceCookie'));
        //debugger;
         for(var i = 0; i < $('.audioPlay').length; i++){
             if(!($('.audioPlay')[i].paused)){
                 $('.audioPlay')[i].pause();
             }
             $('.audioPlay')[i].currentTime = 0;
         }
        $('.audioPlay')[index].play();
    })
}
function searchRecommend(){
    $('.filter').on('click',function(){
        var commend = $('#search').val();
        if(commend == ''){
            alert('请输入问题~！')
            return;
        }
        var obj = {
            token: $.cookie('token'),
            question: commend
        }
        $.ajax({
            url: commUrl+'/qa/simqa',
            data:obj,
            type:'POST',
            success: function(data){
                data= JSON.parse(data);
                //console.log(data);
                var html = ''
                var datas = data.data
                console.log(datas);
                if(data.code == 1){
                    if(datas.length !== 0){
                        //console.log(data.data);
                        $.each(datas,function(i,key){
                            //console.log(key);
                            html += '<div class="answerBox"><div class="answer">'+key.answer+'</div> <div class="toolbar vpush"> <input type="button" class="button" data-type="'+key.type+'" data-id="'+key.id+'" value="推送"/> </div> </div>'
                        })
                    }else {
                        html += '<p style="font-size: 16px; text-align: center">无查询结果</p>'
                        //debugger;
                    }
                    $('.filterAnswer').empty().html(html);
                    answerPush();
                }else{
                    alert(data.msg);
                }

            },
            error: function(){
                alert('出错啦~~！');
            }

        })
    })
}
function answerPush(){
    $('.vpush input').on('click',function(){
        //alert('123');
        var _type = $(this).attr('data-type');
       var _id = $(this).attr('data-id')
        if( pushTime < 5  ){
            // clearInterval(failedPushTimer);
            alert('请5秒后不能推送过于频繁');
            return;

        }
        if(flag == 'false'){
            alert('客服暂未连接，请连接后使用该功能。')
            return false;
        }
        var obj = {
            token: $.cookie('token'),
            imUserId: oncaller,
            class:_type,
            qaid: _id
        }
        console.log()
        $.ajax({
            url: commUrl+'/qa/simqa/push',
            type:'POST',
            data: obj,
            cache:false,
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1){
                    alert('推送成功');
                    pushTime = 5;
                    if(failedPushTimer) {
                        clearInterval(failedPushTimer);
                    }
                    failedPushTimer = window.setInterval(pushTimer,1000)
                }else{
                    alert(data.msg);
                }
            },
            error: function(state){

            }
        })
    })
};
function recommend(){
    $('.recommendTitle').on('click',function(){
        if( $('.filterRecommended').is(':hidden')){
            $('.filterRecommended').show();
        }else {
            $('.filterRecommended').hide();
        }
    })
}
function statusAll(){
    if($.cookie('accountType') == 'service'){
        $('.call').hide();
        $('.voiceBox').hide();
        /*$('.Status span').hide();
        $('#changeVoice').hide();*/
    }else{
    }
    if($.cookie('line') == undefined){
        $.cookie('line', 'on', {
            path: '/'
        });
    }
    if($.cookie('state') == undefined){
        $.cookie('state', "free", {path: '/'});
    }
    if($.cookie('line') == 'on'){
        $("#onlineStstus").children('option').attr("selected", false)
        $("#onlineStstus").children('option[value="on"]').attr("selected", true);
        $.cookie('line', "on", {path: '/'});
    }else{
        $("#onlineStstus").children('option').attr("selected", false)
        $("#onlineStstus").children('option[value="off"]').attr("selected", true);
        $.cookie('line', "off", {path: '/'});
    }
    if($.cookie("state") =='free')
    {
        $("#workStatus").children('option').attr("selected", false)
        $("#workStatus").children('option[value="free"]').attr("selected", true);
        $.cookie('state', "free", {path: '/'});
    }else{
        $("#workStatus").children('option').attr("selected", false);
        $("#workStatus").children('option[value="busyness"]').attr("selected", true);
        $.cookie('state', "busyness", {path: '/'});
    }
    console.log('+++++++++++++++++++++++++++++++'+ $.cookie('voiceCookie'))
    if($.cookie('voiceCookie') == ''){//检测变声值
        $("#changeVoice").children('option').attr("selected", false)
        $("#changeVoice").children('option[value="15"]').attr("selected", true);
        //debugger;
    }else{
        var voiceValue = $.cookie('voiceCookie')
        $("#changeVoice").children('option[value="'+voiceValue+'"]').attr("selected", true);
        //debugger;
    }
}
function voiceFun(){
    //if(flag=='true'){
        $('.leftbtn').on('click',function(){
            if(flag=='false'){
                alert("请确定有无连接机器人");
                return;
            }
            var widthValue = $('.voiceBox input[type="range"]').val();
            if(widthValue > 0){
                widthValue--;
                var _Width = (25*widthValue)+'px';
                $('.rangeSelect').css({width:_Width});
                $('input[type="range"]').val(widthValue);
                $.ajax({
                    url: commUrl+'/mac/controlVolume',
                    data:{
                        token: $.cookie('token'),
                        imUserId: oncaller,
                        op:'minus',
                        value:'1'
                    },
                    type:'POST',
                    success: function(data){
                        data= JSON.parse(data);
                        //console.log(data);
                        //debugger;
                        var html = ''
                        if(data.code == 1){

                        }else{
                            alert(data.msg);
                        }

                    },
                    error: function(){
                        alert('出错啦~~！');
                    }

                })
            }else{
                alert('已经是最小声了！')
                return;
            }

            //widthValue = $('input[type="range"]').val()

        })
        $('.rightbtn').on('click',function(){
            var widthValue = $('.voiceBox input[type="range"]').val();
            if(flag=='false'){
                alert("请确定有无连接机器人");
                return;
            }
            if(widthValue<4){
                widthValue++;
                var _Width = (25*widthValue)+'px';
                $('.rangeSelect').css({width:_Width});
                $('input[type="range"]').val(widthValue);

                $.ajax({
                    url: commUrl+'/mac/controlVolume',
                    data:{
                        token: $.cookie('token'),
                        imUserId: oncaller,
                        op:'plus',
                        value:'1'
                    },
                    type:'POST',
                    success: function(data){
                        data= JSON.parse(data);
                        //console.log(data);
                        //debugger;
                        var html = ''
                        if(data.code == 1){
                        }else{
                            alert(data.msg);
                        }

                    },
                    error: function(){
                        alert('出错啦~~！');
                    }

                })
            }else{
                alert('已经是最大声了！');
                return;
            }
        })
    //}

}
function showBox(){
    $('.showBig').on('click',function(){
        $('.videoBox').css({width:'540px',height:'410px',left:'-270px'});
        $('.showSmall').show();
        $(this).hide();
    });
    $('.showSmall').on('click',function(){
        $('.videoBox').css({width:'270px',height:'205px',left:0,top:0})
        $('.showBig').show();
        $(this).hide();
    });
}
function callApp(id){
    console.log('---------------------------');
    rtcCall.caller = id;
    rtcCall.makeVideoCall(id);
    judge = true;
    console.log('+++++++++++++++++++++++++++');
    //debugger;
}
function callAllStatus(caller){
    $('.onCallImg').hide();
    $('.showcall').hide();
    $('.offCallImg').show();
    reportIMState("on", "busyness");
    $('#onlineStstus').attr('disabled', true);
    $("#workStatus").attr('disabled', true);
    $("#workStatus").children('option[value="busyness"]').attr("selected", true);
    $.cookie('state', "busyness", {path: '/'});
    $.cookie('UserState', caller, {path: '/'});
}
function chooseAppId(){
    $('.showcall li').on('click',function(){
        oncaller = $(this).attr('data-imuser');

        callOut();
    })
}
function callOut(){
    if( pushTime < 5 ){
        alert('您太着急了，请稍等5秒再拨');
        failedNum = 0;
        if(failedTimer) {
            clearInterval(failedTimer);
        }
        $('.onCallImg').show();
        $('.offCallImg').hide();
        $('.showcall').hide();
        oncaller = '';
        return;
    }
    monitoringflag = true;
    $('.showcall').empty().hide();
    sendPrivateText(oncaller);
    console.log(changeVoice);
    if(changeVoice == 500){
        alert('机器人端变声出现异常，请稍后再拨~！');
        endTheCall();
        return;
    }
    satusConnect = 1;
    pushTime = 5;
    failedPushTimer = window.setInterval(pushTimer,1000);

    callApp(oncaller);
    callAllStatus(oncaller);
    failedNum = 25;
    if(failedTimer) {
        failedTimer = window.setInterval(failedFunc, 1000);
    }
    return;
}
function loadIm(){
    //chooseAppId();
    $.ajax({
        url: commUrl+'/user/getAPPIMList',
        data:{
            token: $.cookie('token'),
            //imUserId: oncaller,
        },
        type:'POST',
        success: function(data){
            data= JSON.parse(data);
            //console.log(data);
            var html = ''
            if(data.code == 1){
                if(data.data.length == 0){
                    alert('暂无空闲三宝,请稍后再拨');
                    return;

                } else if(data.data.length ==1){
                    oncaller =data.data[0].imUser;
                    //oncaller = 'huanxin';
                    callOut();
                }else{
                    $.each(data.data,function(i,key){
                        html +='<li data-imuser="'+key.imUser+'">'+key.appName+'</li>';
                    })
                    /*html +='<li data-imuser="doctor442c05a1c4c6">三宝3</li><li data-imuser="doctor442c0575637a">三宝2</li>';*/
                    $('.showcall').empty().html(html).show();
                    chooseAppId();
                }

            }else{
                alert(data.msg);
            }

        },
        error: function(){
            alert('出错啦~~！');
        }

    })
}
function closePush(){
    $.ajax({
        url: commUrl+'/pushMaterial/pushClose',
        data:{
            token: $.cookie('token'),
            imUserId: oncaller,
        },
        type:'POST',
        success: function(data){
            data= JSON.parse(data);
            var html = ''
            if(data.code == 1){
                alert('素材关闭成功！');
            }else{
                alert(data.msg);
            }

        },
        error: function(){

        }

    })
}
function closeveiw(){
    $('.closeveiw').on('click',function(){
        if(oncaller==''){
            alert('客服暂未连接，请连接后使用该功能。');
            return;
        }else {
            closePush();
        }
    })
}
function onbeforeLoad(){
    window.onbeforeunload = function () {
        if (monitoringflag) {
            var evt = window.event || arguments[0];
            var userAgent = navigator.userAgent;
            if (userAgent.indexOf("MSIE") > 0) {
                var n = window.event.screenX - window.screenLeft;
                var b = n > document.documentElement.scrollWidth - 20;
                if (b && window.event.clientY < 0 || window.event.altKey) {
                    window.event.returnValue = ("该操作将会导致非正常退出系统(正确退出系统方式：点击退出系统按钮)，您是否确认?");
                }else {
                    return ("该操作将会导致非正常退出系统(正确退出系统方式：点击退出系统按钮)，您是否确认?");
                }
            }else if (userAgent.indexOf("Firefox") > 0) {
                return ("该操作将会导致非正常退出系统(正确退出系统方式：点击退出系统按钮)，您是否确认?");
            }else if (userAgent.indexOf("Chrome") > 0){
                return "确定要离开本页面吗？";
            }
        }
    }
}
function endVedio(){
    $('.endVedio').on('click',function(){//�ر���Ƶ
        //console.log(flag);
        rtcCall.endCall();
        //closeVideoPhone();
        oncaller = '';
    });
    $('.offCallImg').on('click',function(){
        endTheCall()
       /* if(judge == true){//判断是否环信有呼叫的挂断
         rtcCall.endCall();
         }
        failedNum = 0;
        if(failedTimer) {
            clearInterval(failedTimer);
        }
        $('.onCallImg').show();
        $('.offCallImg').hide();
        monitoringflag = false;*/
    })
}
function endTheCall(){
    if(judge == true){//判断是否环信有呼叫的挂断
        rtcCall.endCall();
    }
    failedNum = 0;
    if(failedTimer) {
        clearInterval(failedTimer);
    }
    $("#changeVoice").attr('disabled',true);
    $('.onCallImg').show();
    $('.offCallImg').hide();
    monitoringflag = false;
    changeVoice = 200;
}
function sendMessage(){//������Ϣ
    $('#chatText').on('focus',function(){
        //alert('123');
        if($(this).val() !== ''){
            $(this).val('');
        }

    })
    $('#sendMessage').on('click',function(){
        if(oncaller == ''){
            alert('客服暂未连接，请连接后使用该功能。');
            return false;
        }
        var text = $('#chatText').val();
        if(text == ''){
            alert('内容不能为空');
            return;
        }
        $.ajax({
            url: commUrl+'/pushMaterial/pushChatString',
            data:{
                token: $.cookie('token'),
                imUserId: oncaller,
                content: text
            },
            type:'POST',
            success: function(data){
                data= JSON.parse(data);
                var html = ''
                if(data.code == 1){
                    html = '<div class="talkingRight"><div class="tallkingText">'+text+'</div><div class="tallimg"> <img src="images/local.png" alt=""> </div> </div>';
                    $('.talkingBox').append(html);
                    $('#chatText').val('');
                }else{
                    alert(data.msg);
                }

            },
            error: function(){

            }

        })
    })
}

function Touch(clickEle,parEle,showEle,prev,next,overflow,tips){

    $(clickEle).unbind('click').click(function(){
        $(tips).empty();
        var num = $(parEle).length - 1;
        console.log('++++++++++++++++++++++++++++++++'+num);
        var index = $(this).parents(parEle).attr('data-index');
        console.log(index);
        console.log(num);
        if(num == 0){
            $(prev).hide();
            $(next).hide();
            //debugger;
        }else{
            $(prev).show();
            $(next).show();
        }
        $(showEle).removeClass('show');
        $(next).removeClass('last');
        $(prev).removeClass('first');
        $(showEle).eq(index).addClass('show');
        if(index == num){//

            $(next).addClass('last');
        }else if(index == 0){//Ԥ����һ��

            $(prev).addClass('first');
        }
        $(overflow).show();//��ʾ
        //next click
        $(next).unbind('click').click(function(){
            var flag = $(this).parents('.showerBox').hasClass('video');
            if(flag){
                $('.showVideo video').trigger('pause');
                console.log('video');

            }
            console.log($(this).parents('.showerBox').hasClass('video'));
            var num = $(parEle).length - 1;
            var ele = showEle+'.show';
            var index2 = $(ele).attr('data-num')
            console.log(index2);
            console.log('++++++++++++++++++++++++++++++++'+num);
            if(index2==num){
                $(tips).html('已经是最后了！');
                $(next).addClass('last');
                //return;
            }else{
                index2 = index2 - 0 + 1;
                console.log(index2);
                $(showEle).removeClass('show');
                $(showEle).eq(index2).addClass('show');
                $(prev).removeClass('first');
                $(next).removeClass('last');
                $(tips).empty();
                //return;
            }
        })
        $(prev).unbind('click').click('click',function(){
            var flag = $(this).parents('.showerBox').hasClass('video');
            if(flag){
                $('.showVideo video').trigger('pause');
                console.log('video');

            }
            //console.log();
            var num = $(parEle).length - 1;
            var ele = showEle+'.show';
            var index2 = $(ele).attr('data-num')
            console.log('++++++++++++++++++++++++++++++++'+num);
            if(index2==0){
                $(tips).html('已经是最前了！');
                $(prev).addClass('first');
                //return;
            }/*else if(index2 == num){
             index2 = index2 - 1;
             $(showEle).removeClass('show');
             $(showEle).eq(index2).addClass('show');
             $(next).removeClass('last');
             $(tips).empty();
             }*/else {
                index2 = index2 - 1;
                $(showEle).removeClass('show');
                $(showEle).eq(index2).addClass('show');
                $(next).removeClass('last');
                $(prev).removeClass('first');
                $(tips).empty();
                //return;
            }
        })
        $('.close').on('click',function(){
            var flag = $(this).parents('.showerBox').hasClass('video');
            if(flag){
                $('.showVideo video').trigger('pause');
                console.log('video');

            }
            $(overflow).hide();//��ʾ
        })
    })

}
function push(){
    $('.push').on('click',function(){
        //console.log(pushTime);
        if( pushTime < 5  ){
           // clearInterval(failedPushTimer);
            alert('请5秒后不能推送过于频繁');
            return;

        }
        if(flag == 'false'){
            alert('客服暂未连接，请连接后使用该功能。')
            return false;
        }
        var Id = $(this).attr('data-id');
        var index = $(this).attr('data-index');
        var _read = $(this).attr('data-type');
        /*  if(oncaller == ''){
         return false;
         }*/
        var obj = {
            imUserId: oncaller,//'huanxin442c0575637a', //'doctor442c0575637a',
            materialId: Id,
            token:$.cookie('token')
        }
        if(index !== undefined){
            obj.index = index;
        }
        if(_read !==''|| _read !== undefined){
            obj.read = _read;
        }

        $.ajax({
            url: commUrl+'/pushMaterial/push',
            type:'POST',
            data: obj,
            cache:false,
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1){
                    alert('推送成功');
                    pushTime = 5;
                    if(failedPushTimer) {
                        clearInterval(failedPushTimer);
                    }
                    failedPushTimer = window.setInterval(pushTimer,1000)
                }else{
                    alert(data.msg);
                }
            },
            error: function(state){

            }
        })
    })
}
function pushTimer(){

    if(pushTime > 0){
        pushTime --;
        //console.log(pushTime+'------------------------------------------');
    }else{
        clearInterval(failedPushTimer);
        pushTime = 10;
        //console.log(pushTime+'+++++++++++++++++++++++++++++++++++++++++++');
    }
}
function pagenation(page,type){
    page = page?page:1;
    var obj = {
        token:$.cookie("token"),
        page: page,
        row: '6',
        type:type
    }
    $.ajax(
        {
            url: commUrl+'/pushMaterial',
            data: obj,
            success: function (data) {
                data = JSON.parse(data);
                /*console.log(data);
                 debugger;*/
                var html = '';
                var dom = '';
                var page = '';
                if(data.code == '1'){
                    var reponse = data.data.datas;
                    switch (type){
                        case 'image':
                            if(reponse.length == 0){
                                $('#thumbs').empty().html('暂无可以推送素材，请先添加素材！').css({'text-align':'center','line-height':'60px'});
                                return;
                            }
                            $.each(reponse,function(i,key){//����ͼƬ
                                html +='<div class="viewImgBox" data-index="'+i+'"> ' +
                                    '<img src="'+key.img+'" alt=""/> ' +
                                    '<h4 class="title">'+key.title+'</h4> ' +
                                    '<div class="toolbar"> ' +
                                    '<a data-index="'+i+'" class="preview preview1" data-id="'+key.id+'">预览</a> ' +
                                    '<a class="push" data-id="'+key.id+'">推送</a> </div> </div>';
                                dom += '<div class="showImg" data-num="'+i+'"> ' +
                                    '<img src="'+key.img+'" alt=""/> ' ;
                                if($.cookie('accountType') == 'service'){
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a></div> </div>';
                                }else{
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'" data-type="">推送</a><a class="closeveiw" data-id="'+key.id+'">取消推送</a></div> </div>';
                                }


                            })
                            $('.gallerySlider').empty().html(dom);
                            $('.gallerySlider').parent('.showerBox').addClass('img');
                            $('#thumbs').empty().html(html).addClass('img');
                            //preview1();
                            Touch('.preview1','.viewImgBox','.showImg','.prevArrow1','.nextArrow1','#galleryOverlay','.pagelimit1');
                            push();
                            closeveiw();
                            if(data.data.count<= 6){
                                return;
                            }
                            if(data.data.page == data.data.pageCount){
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="image" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage readonly" onclick="javascript:nextPage(this)" data-type="image">&rsaquo;</li>'
                            }
                            else if(data.data.page == '1') {
                                page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" data-type="image">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                                    ' <li class="nextPage" onclick="javascript:nextPage(this)" data-type="image">&rsaquo;</li>'

                            }
                            else {
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="image">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage" onclick="javascript:nextPage(this)" data-type="image">&rsaquo;</li>'
                            }

                            $(".pages1 ul").html(page);
                            break;
                        case 'text'://�����ı�
                            if(reponse.length == 0){
                                $('#textThumbs').empty().html('暂无可以推送素材，请先添加素材！').css({'text-align':'center','line-height':'60px'});
                                return;
                            }
                            $.each(reponse,function(i,key){
                                html +='<div class="testBox" data-index="'+i+'"> ' +
                                    '<h4 class="title">'+key.title+'</h4> ' +
                                    '<div class="textToolbar"> ' +
                                    '<a data-index="'+i+'" class="preview preview2" data-id="'+key.id+'">预览</a> ' +
                                    '<a class="push" data-id="'+key.id+'">推送</a> </div> </div>'
                                dom += '<div class="showIext" data-num="'+i+'"> ' +
                                    '<h4 class="title">'+key.title+'</h4> ' +
                                    '<div class="content">'+key.content+'</div>';
                                if($.cookie('accountType') == 'service'){
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a></div> </div>';
                                }else{
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'">只推送</a><a class="push" data-id="'+key.id+'" data-type="app"  style="width:110px; margin-right: 5px;">三宝语音推送</a><a class="closeveiw" data-id="'+key.id+'">取消推送</a></div> </div>';
                                }

                                // '<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a></div> </div>';

                            })
                            $('#textSlider').empty().html(dom);
                            $('#textSlider').parent('.showerBox').addClass('text');
                            $('#textThumbs').empty().html(html);

                            Touch('.preview2','.testBox','.showIext','.prevArrow2','.nextArrow2','#TextOverlay','.pagelimit2');
                            push();
                            closeveiw();
                            if(data.data.count<= 6){
                                return;
                            }
                            if(data.data.page == data.data.pageCount){
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="text" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage readonly" onclick="javascript:nextPage(this)" data-type="text">&rsaquo;</li>'
                            }
                            else if(data.data.page == '1') {
                                page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" data-type="text">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                                    ' <li class="nextPage" onclick="javascript:nextPage(this)" data-type="text">&rsaquo;</li>'

                            }
                            else {
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="text">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage" onclick="javascript:nextPage(this)" data-type="text">&rsaquo;</li>'
                            }

                            $(".pages2 ul").html(page);
                            break;
                        case 'test':
                            if(reponse.length == 0){
                                $('#testThumbs').empty().html('暂无可以推送素材，请先添加素材！').css({'text-align':'center','line-height':'60px'});
                                return;
                            }
                            $.each(reponse,function(i,key){
                                html +='<div class="testBox" data-index="'+i+'"> ' +
                                    '<h4 class="title">'+key.title+'</h4> ' +
                                    '<div class="textToolbar"> ' +
                                    '<a data-index="'+i+'" class="preview preview4" data-id="'+key.id+'">预览</a><a data-index="'+i+'" class="preview preview3" data-id="'+key.id+'">推送</a></div> </div>'
                            })
                            $('#testThumbs').empty().html(html);
                            previewTest();
                            if(data.data.count<= 6){
                                return;
                            }
                            if(data.data.page == data.data.pageCount){
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="test" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage readonly" onclick="javascript:nextPage(this)" data-type="test">&rsaquo;</li>'
                            }
                            else if(data.data.page == '1') {
                                page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" data-type="test">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                                    ' <li class="nextPage" onclick="javascript:nextPage(this)" data-type="test">&rsaquo;</li>'

                            }
                            else {
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="test">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage" onclick="javascript:nextPage(this)" data-type="test">&rsaquo;</li>'
                            }

                            $(".pages3 ul").html(page);

                            break;
                        case 'video':
                            if(reponse.length == 0){
                                $('#videoThumbs').empty().html('暂无可以推送素材，请先添加素材！').css({'text-align':'center','line-height':'60px'});
                                return;
                            }
                            $.each(reponse,function(i,key){//����ͼƬ
                                html +='<div class="viewImgBox1" data-index="'+i+'"> ' +
                                    //<video id="videoId" style="width: 200px;display: none" controls="" src="" data-time="0"></video>
                                    '<video src="'+key.video+'" controls=""></video> ' +
                                    '<h4 class="title">'+key.title+'</h4> ' +
                                    '<div class="toolbar"> ' +
                                    '<a data-index="'+i+'" class="preview preview4" data-id="'+key.id+'">预览</a> ' +
                                    '<a class="push" data-id="'+key.id+'">推送</a> </div> </div>';
                                dom += '<div class="showVideo" data-num="'+i+'"> ' +
                                    '<video src="'+key.video+'" controls=""></video> ' ;
                                if($.cookie('accountType') == 'service'){
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a></div></div>';
                                }else{
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'" data-type="">推送</a><a class="closeveiw" data-id="'+key.id+'">取消推送</a></div> </div>';
                                }


                            })
                            $('#videoSlider').empty().html(dom);
                            $('#videoSlider').parent('.showerBox').addClass('video');
                            $('#videoThumbs').empty().html(html).addClass('video');
                            //preview1();
                            Touch('.preview4','.viewImgBox1','.showVideo','.prevArrow4','.nextArrow4','#videoOverlay','.pagelimit4');
                            push();
                            closeveiw();
                            if(data.data.count<= 6){
                                return;
                            }
                            if(data.data.page == data.data.pageCount){
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="video" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage readonly" onclick="javascript:nextPage(this)" data-type="video">&rsaquo;</li>'
                            }
                            else if(data.data.page == '1') {
                                page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" data-type="video">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                                    ' <li class="nextPage" onclick="javascript:nextPage(this)" data-type="video">&rsaquo;</li>'

                            }
                            else {
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="video">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage" onclick="javascript:nextPage(this)" data-type="video">&rsaquo;</li>'
                            }

                            $(".pages4 ul").html(page);
                            break;
                        case 'emotion':
                            /*console.log(reponse);
                            debugger;*/
                            $.each(reponse,function(i,key){//表情循环
                                html +='<div class="viewImgBox2" data-index="'+i+'"> ' +
                                        //<video id="videoId" style="width: 200px;display: none" controls="" src="" data-time="0"></video>
                                    '<img src="'+key.img+'" alt=""/> ' +
                                    '<h4 class="title">'+key.title+'</h4> ' +
                                    '<div class="toolbar"> ' +
                                    '<a class="push" data-id="'+key.id+'">推送</a> </div> </div>';
                            })
                            //console.log(html);
                            $('#emotionThumbs').empty().html(html).addClass('emotion');
                            push();
                            closeveiw();
                            if(data.data.count<= 6){
                                return;
                            }
                            if(data.data.page == data.data.pageCount){
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="emotion" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage readonly" onclick="javascript:nextPage(this)" data-type="emotion">&rsaquo;</li>'
                            }
                            else if(data.data.page == '1') {
                                page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" data-type="emotion">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                                    ' <li class="nextPage" onclick="javascript:nextPage(this)" data-type="emotion">&rsaquo;</li>'

                            }
                            else {
                                page = '<li class="prevPage" onclick="javascript:prevPage(this)" data-type="emotion">&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                                    '<li class="nextPage" onclick="javascript:nextPage(this)" data-type="emotion">&rsaquo;</li>'
                            }

                            $(".pages5 ul").html(page);
                            break;
                    }
                }else{
                    alert(data.msg)
                }



            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });
}
function preview1(){
    //Touch('.preview1','.viewImgBox','.showImg','.prevArrow1','.nextArrow1','#galleryOverlay','.pagelimit1');
    $(clickEle).unbind('click').click(function(){

        $(tips).empty();
        var num = $(parEle).length - 1;
        console.log('++++++++++++++++++++++++++++++++'+num);
        var index = $(this).parents(parEle).attr('data-index');
        console.log(index);
        console.log(num);
        if(num == 0){
            $(prev).hide();
            $(next).hide();
            //debugger;
        }else{
            $(prev).show();
            $(next).show();
        }
        $(showEle).removeClass('show');
        $(next).removeClass('last');
        $(prev).removeClass('first');
        $(showEle).eq(index).addClass('show');
        if(index == num){//

            $(next).addClass('last');
        }else if(index == 0){//Ԥ����һ��

            $(prev).addClass('first');
        }
        $(overflow).show();//��ʾ
        //next click
    })
}
function previewTest(){
    $('.preview3').on('click',function(){
        var id = $(this).attr('data-id')
        loadTest(id,'');
        $('#TestOverlay').show();
    })
    $('.preview4').on('click',function(){
        var id = $(this).attr('data-id')
        var all = 'all';
        loadTest(id,all);
        $('#TestOverlay').show();
    })


}
function loadTest(id,all){
    var obj = {
        token:$.cookie("token"),
        page: 1,
        row: '10000',
        //type:type,
        id:id
    }
    $.ajax(
        {
            url: commUrl+'/pushMaterial',
            data: obj,
            success: function (data) {
                data = JSON.parse(data);
                var dom = '';
                //var localData = [];
                var reponse = data.data.bundle.tests;
                var testId = data.data.id;
                console.log(data);
                if(all==''||all==undefined){
                    $.each(reponse,function(i,key){
                        dom += '<div class="showIext" data-index="'+key.index+'"><h4 class="title">'+key.title+'</h4> '
                        var html = '';
                        $.each(key.options,function(num,val){
                            var code = '';
                            switch (num){
                                case 0:
                                    code = 'A';
                                    break;
                                case 1:
                                    code = 'B';
                                    break;
                                case 2:
                                    code = 'C';
                                    break;
                                case 3:
                                    code = 'D';
                                    break;
                                case 4:
                                    code = 'E';
                                    break;
                            }
                            html +='<label><input type="radio" class="checkTest" name="test'+i+'" data-index="'+key.index+'" data-point="'+val.point+'"/><span>'+code+''+val.content+'</span></label>'
                        })
                        dom += '<div class="content">'+html+'</div>';
                        if($.cookie('accountType') == 'service'){
                            dom += '<div class="toolbar"><a data-index="'+key.index+'" class="push" data-id="'+testId+'" >推送</a> ' +
                                '<a data-index="'+key.index+'" class="button confirm" data-id="'+testId+'">提交</a></div> </div>';
                        }else{
                            dom +='<div class="toolbar"><a data-index="'+key.index+'" class="push" data-id="'+testId+'">只推送</a><a data-index="'+key.index+'"  class="push"  data-type="app"  data-id="'+testId+'" style="width:110px;  margin-right: 5px;">三宝语音推送</a> ' +
                                '<a data-index="'+key.index+'" class="button confirm" data-id="'+testId+'">提交</a></div> </div>';
                        }


                    })
                }else{
                    var newdom='';
                    $.each(reponse,function(i,key){
                        newdom += '<h4 class="title showtitle">'+key.title+'</h4> '
                        var html = '';
                        $.each(key.options,function(num,val){
                            var code = '';
                            switch (num){
                                case 0:
                                    code = 'A';
                                    break;
                                case 1:
                                    code = 'B';
                                    break;
                                case 2:
                                    code = 'C';
                                    break;
                                case 3:
                                    code = 'D';
                                    break;
                                case 4:
                                    code = 'E';
                                    break;
                            }
                            html +='<label><input type="radio" class="checkTest" name="test'+i+'" data-index="'+key.index+'" data-point="'+val.point+'"/><span>'+code+''+val.content+'</span></label>'
                        })
                        newdom += '<div class="content showcontent">'+html+'</div>';
                    })
                    dom ='<div class="showIext">'+newdom+'</div>'
                }

                $('#testSlider').empty().html(dom);
                $('#testSlider').parent('.showerBox').addClass('test');
                $('#testSlider .showIext:first-child').addClass('show');
                push();
                close();
                confirm();


            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });
}
function close(){
    $('.close').on('click',function(){
        $('#TestOverlay').hide();
    })
};
function confirm(){
    $('.confirm').on('click',function(){
        if(oncaller == ''){
            alert('客服暂未连接，请连接后使用该功能。')
            return false;
        }
        $('.pagelimit3').empty();
        var leth = $('#testSlider .showIext').length - 1;
        var index = $('#testSlider .showIext').index($(this).parents('.showIext'));
        var Ele = $('.checkTest[name="test'+index+'"]:checked').length;
        var testId = $(this).attr('data-id');
        var localData= [];
        if(Ele == 0){
            $('.pagelimit3').html('')
            return false;
        }
        if(leth == index){

            $('.checkTest').each(function(){
                if($(this).is(':checked')){
                    var index = $(this).attr('data-index');
                    var point = $(this).attr('data-point');
                    var obj = {
                        index: index,
                        point: point
                    };
                    localData.push(obj);
                }
            })
            var objBox = {
                imUserId: oncaller,
                materialId: testId,
                result:localData

            }
            $.ajax({
                url: commUrl + '/pushMaterial/testSubmit?token=' + $.cookie("token"),
                type: 'POST',
                cache: false,
                data: JSON.stringify(objBox),
                dataType: 'json',
                contentType: 'application/json; charset=UTF-8',
                success: function(data){
                    console.log(data);
                    data = JSON.parse(data);
                    var html = '';
                    if(data.code == 1){
                        var html = '<div class="showIext show"> ' +
                            '<h4 class="title">测试结果</h4> ' +
                            '<div class="content">'+data.data.comment+'</div></div>'
                        $('#testSlider').empty().html(html);
                        closePush();
                    }else{
                        alert(data.msg)
                    }
                },
                error: function(state){

                }
            });
        }else{
            index = index +1;
            $('#testSlider .showIext').removeClass('show');
            $('#testSlider .showIext').eq(index).addClass('show');
        }
    })
};

function prevPage(e) {
    $(e).next("li").find(".onpage").text();
    var type=$(e).attr('data-type')
    if($(e).next("li").find(".onpage").text() == '1'){
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        pagenation(page,type);
    }
}

function nextPage(e){
    var type = $(e).attr('data-type')
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
    }
    else {
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        pagenation(page,type);

    }
}

function movement(){
    $('.image').on('click',function(){
        if( $('#img').is(':hidden')){
            var type = $(this).attr('class');
            pagenation('',type);
            $('.movement').hide();
            $('.multiBox a').removeClass('choose');
            $(this).addClass('choose')
            $('#img').show();
        }else {
            $('.multiBox a').removeClass('choose');
            $('#img').hide();
        }

    })
    $('.text').on('click',function(){
        if( $('#text').is(':hidden')){
            var type = $(this).attr('class');
            pagenation('',type);
            $('.multiBox a').removeClass('choose');
            $(this).addClass('choose')
            $('.movement').hide();
            $('#text').show();
        }else {
            $('.multiBox a').removeClass('choose');
            $('#text').hide();
        }
        //}


    })

    $('.test').on('click',function(){
        if( $('#test').is(':hidden')){
            var type = $(this).attr('class');
            pagenation('',type);
            $('.multiBox a').removeClass('choose');
            $(this).addClass('choose')
            $('.movement').hide();
            $('#test').show();
        }else {
            $('.multiBox a').removeClass('choose');
            $('#test').hide();
        }

    })
    $('.video').on('click',function(){
        if( $('#videoBox').is(':hidden')){
            var type = $(this).attr('class');
            console.log(type);
            $('.multiBox a').removeClass('choose');
            $(this).addClass('choose')
            pagenation('',type);
            $('.movement').hide();
            $('#videoBox').show();
        }else {
            $('.multiBox a').removeClass('choose');
            $('#videoBox').hide();
        }

    })
    $('.emotion').on('click',function(){
        if( $('#emotion').is(':hidden')){
            var type = $(this).attr('class');
            console.log(type);
            $('.multiBox a').removeClass('choose');
            $(this).addClass('choose')
            pagenation('',type);
            $('.movement').hide();
            $('#emotion').show();
        }else {
            $('.multiBox a').removeClass('choose');
            $('#emotion').hide();
        }

    })
}
function sports(Element){//动作推送
    $(Element).on('click',function(){
        if(oncaller == ''){
            alert('客服暂未连接，请连接后使用该功能。')
            return ;
        }
        var command = $(this).attr('data-command');
        $.ajax({
            url: commUrl + '/mac/controlMachine',
            data: {
                token: $.cookie("token"),
                imUserId:oncaller,
                command: command
            },
            cache: false,
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                data = eval('(' + data + ')');
                if(data.code == '1') {
                    /*$.each(data.data.datas, function(i, key) {


                    });*/
                }else{
                    alert('三宝没有收到到指令，请重试');
                }
            },
            error: function(text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
    })
}
function Timer(){
    var minite = '0';
    var second = '0';
    function setTTime( timer1 ,timer2){//alert('123');
        second = parseInt(timer2,10);
        minite = parseInt(timer1,10);
        if(minite == 0){
            $('.minute').empty().html(minite);
        }
        if(second < 59){
            second++;
            $('.second').empty().html(second);
        }else{
            minite++;
            second = 0;
            $('.minute').empty().html(minite);
            $('.second').empty().html(second);
        }
    };
    stopTimer = setInterval( function(){
        setTTime(minite,second)
    },1000);
};
/*var setInventFor = */
function sendPrivateText(id) {
    //var id = conn.getUniqueId();
    var msg = new WebIM.message('txt', id);
    var value = $("#changeVoice").children('option:selected').attr('value');
    $("#changeVoice").attr('disabled',false);
    var obj = {
        code:'200',
        message:value,
        title:'toneChange'
    }
    obj = JSON.stringify(obj)
    console.log(obj);
    msg.set({
        msg: obj,                       // 消息内容
        to: id,                          // 接收消息对象
        roomType: false,
        success: function (id, serverMsgId) {
            console.log(id);
            console.log(serverMsgId);
            console.log("send private text Success");
        }
    });
    msg.body.chatType = 'singleChat';
    conn.send(msg.body);
}
function connRtc(){
   /* conn.listen({
        onOpened: function (message) {          //链接状态监听
            //console.log(message);
            console.log("%c [opened] 已连接", "color: green")
        },
        onTextMessage: function (message) {//文本监听
        },

        onOnline: function () {
            console.log('onLine');
        },
        onOffline: function () {
            console.log('offline');
        },
        onError: function (message) {
            console.log('Error');
            console.log(message);
            if (message && message.type == 1) {
                console.warn('不能进行视频通话！您的浏览器不支持webrtc或者协议不是https。')
            }
            if (message && message.type == 8) {
                $('.endcall').show();
                monitoringflag = false;
                if(oncaller!==''){
                    rtcCall.endCall();
                }
                $('.endcall').find('.popap p').empty().text('您的账号已在别处登录');
                setTimeout(function(){
                    window.location.href = menuUrl + 'index.html';
                },10000)


            }
        },
    });*/
//rtc����
    $('#workStatus').on('change',function(){
        /*$("#workStatus").children('option').attr("selected", false)*/
        var status = $(this).children('option:selected').val();
        if(status == 'busyness'){
            reportIMState("on","busyness");
            $.cookie('state', "busyness", {path: '/'});
        }else{
            reportIMState("on","free");
            $.cookie('state', "free", {path: '/'});
        }
        console.log($.cookie('state'));
    })
    $('#onlineStstus').on('change',function(){//上线离线
        var status = $(this).children('option:selected').val();
        var username = $.cookie('IMusername');
        var password = $.cookie('IMpassword');
        if(status == 'on'){
            //alert('in');
            var options = {
                apiUrl: WebIM.config.apiURL,
                user: username,
                pwd: password,
                appKey: WebIM.config.appkey
            };
            conn.open(options)
            reportIMState("on","free");
            $('#workStatus').show();
            $("#workStatus").children('option').attr("selected", false)
            $("#workStatus").children('option[value="free"]').attr("selected", true);
            $.cookie('state', "free", {path: '/'});



        }else{//alert('out')
            conn.close();
            //console.log('success');
            conn.errorType = WebIM.statusCode.WEBIM_CONNCTION_CLIENT_LOGOUT;
            $("#workStatus").children('option[value="free"]').attr("selected", true);
            $.cookie('state', "free", {path: '/'});
            $('#workStatus').hide();
            reportIMState("off","");
        }
    })
    $('.onCallImg').on('click',function(){
        if($('.showcall').is(':hidden')){
            loadIm();
        }else {
            $('.showcall').hide();
        }

    });
    /*$('.muted').on('click',function(){
     $('#localVideo').attr('muted');
     })*/
    $("#videotape").on('click',function(){
        if($.cookie('state')=="free")
        {
            alert("暂时没有视频接入")
            return;
        }
        startRecording();
    })
    $("#endVideotape").on('click',function(){
        stopRecording();
    })
    $("#downLoadVideo").on('click',function(){
        download();
    })
}