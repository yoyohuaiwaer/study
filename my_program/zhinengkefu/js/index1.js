/**
 * Created by Administrator on 2016/9/17.
 */
/**
 * Created by A on 2016/9/7.
 */
$(document).ready(function() {
    failedPushTimer= '-1';
    monitoringflag = false;
    pushTime = 5;
    flag = 'false';
    oncaller = '';
    connect = '';
    satusConnect= 0;
    judge = false
    getIM();
    //左侧树导入
    logout();
    $(".user-name a").empty().html($.cookie("username"));
    $(".user-indrustry a").empty().html($.cookie("industry"));
    $.ajax({
        url: commUrl + '/menu/find',
        type: 'GET',
        data: {
            token: $.cookie("token")
        },
        dataType: 'json',
        async: false,
        success: function(data) {
            //alert(data);
            data = eval('(' + data + ')');
            //console.log(data);
            if(data.code == '1') {
                $('#tree-menus').empty();
                var html = '';

                $.each(data.data, function(i, key) {
                    //console.log( this.menu1.name);
                    var dom = '';

                    if(this.menu1.id == "57d21a5a240a7a19c23ccc9e") {

                        $.each(key.menu2, function(l, val) {
                            if(this.view == 1) {
                                dom += '<li class="node neck" id="' + this.id + '"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" data-id="'+val.id+'" ><a href="javascript:void(0);" title="' + menuUrl + '' + this.url + '">' + this.name + '</a></div> </div> </li>';
                            }
                        })
                        dom += '<li class="node" id="add"> <div class="node-font"> <span class="node-icon icon-file">+</span> <div class="node-name" ><a href="javascript:void(0);" title=" ' + menuUrl + 'addfunction.html" >添加功能</a></div> </div> </li>';
                    } else {
                        $.each(key.menu2, function(l, val) {
                            if(val.id == '57d21d52240a7a19c23ccca8') { //问答库关键词
                                dom += '<li class="node neck" id="' + this.id + '"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" data-id="'+val.id+'"><a href="javascript:void(0);" title="' + menuUrl + '' + "scene-question-list.html" + '">' + this.name + '</a></div> </div> </li>';
                            } else {
                                dom += '<li class="node neck" id="' + this.id + '"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" data-id="'+val.id+'"><a href="javascript:void(0);" title="' + menuUrl + '' + this.url + '">' + this.name + '</a></div> </div> </li>';
                            }
                        });
                    }
                    if(dom == '') {
                        html += '<li class="node" id="' + this.menu1.id + '"> <div class="node-font"> <span class="node-icon icon-file"><img src="' + this.menu1.icon + '"/></span> <div class="node-name" >' + this.menu1.name + '</div> </div></li>';
                    } else {
                        html += '<li class="node" id="' + this.menu1.id + '"> <div class="node-font"> <span class="node-icon icon-file"><img src="' + this.menu1.icon + '"/></span> <div class="node-name" >' + this.menu1.name + '</div> </div><ul class="tree-menus tree-meni2">' + dom + '</ul></li>';
                    }

                })

                $('#tree-menu1').html(html);

            }
        },
        error: function(data, text, status) {
            alert(' 登录失败~请重新登录');
            window.location.href = menuUrl + 'index.html';
        }
    })
    //默认菜单加载
    /*if($.cookie('accountType') == 'service'){
     $("#5982c7fca790de8893de73cc").addClass('node-selected');
     }else {
     $("#59ad1f5df23da26b3117aba4").addClass('node-selected');
     }


     $(".main-title").text($(".node-selected").text()).attr({
     title: $(".node-selected").attr("id")
     });
     var nodeurl = ($(".node-selected a").attr('title')); //
     //alert(nodeurl);
     $.ajax({
     url: '' + nodeurl + '',
     type: 'GET',
     //async: false,
     success: function(data) {
     $(".main").html(data);
     },
     error: function(text) {
     alert('请重新登录');
     window.location.href = menuUrl + 'index.html';
     //          alert(text.readyState);
     //          alert(text.status+"===1");
     }
     });*/
    //点击菜单加载右侧内容

    /*$(".tree-meni2 .node").click(function() {
        if(oncaller != '') {
            alert("视频中暂时不能离开")
            return;
        }
        $(".node").removeClass("node-selected")
        $(this).addClass("node-selected");
        var selectedurl = $(this).find("a").attr("title");
        $("h2.main-title").text($(this).text()).attr({
            title: $(this).attr("id")
        });
        $.ajax({
            url: selectedurl,
            type: 'GET',
            //async: false,
            success: function(data) {
                $(".main").empty().html(data);
            },
            error: function(text) {
                alert(text.readyState);
                alert(text.status);
            }
        });
    });*/
    chooseMenus()
    endcallbutn();
})
//面包屑点击
function endcallbutn() {
    $('.endcallbutn').on('click', function() {
        $('.endcall').hide();
    })
}

function changePage(e) {
    $(e).parents("ul").find("li").removeClass("selected");
    $(e).parent("li").addClass("selected");
    $.cookie("read", e.name, {
        path: '/'
    })
    $.ajax({
        url: '' + e.title + '',
        type: 'GET',
        //async: false,
        success: function(data) {

            $(".main").empty().html(data);
        },
        error: function(text) {
            alert(text.readyState);
            alert(text.status);
        }
    })
}

//面包屑点击
function changeBreadcrumb() {
    $('.breadcrumb li').on('click', function() {
        $('.breadcrumb li').removeClass("selected");
        $(this).addClass('selected');
        var url = $(this).find('a').attr('alt');
        //alert(url);
        $.ajax({
            url: url,
            type: 'GET',
            //async: false,
            success: function(data) {

                $(".main").empty().html(data);
            },
            error: function(text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
    });
}

//退出登录
function logout() {
    $('.logout').on('click', function() {
        if(oncaller !== '') {
            alert('当前正在视屏通话中，请关闭通话后退出！')
            return;
        }
        $.ajax({
            url: commUrl + '/login/loginout',
            data: {
                token: $.cookie("token")
            },
            success: function(data) {
                //alert(data);
                data = JSON.parse(data);
                if(data.code == 1) {
                    window.location.href = menuUrl + 'index.html'; //
                    $.cookie('state', "free", {path: '/'});
                    reportIMState("off", "");

                }
            }

        })
    })

}
function chooseMenus(){

    var eleMenus = $(".tree .neck a").bind("click", function(event) {
        //console.log(this);
        //debugger;
        if(oncaller !== ''){
            alert("视频中暂时不能离开")
            return;
        }
        if(this.title !==''){
            var query = this.title.split(".")[0];
            var partentsEvel = $(this).parent().parent().parent('.node');
            var _id = $(this).parent('.node-name').attr('data-id');
            console.log(history.pushState)
             debugger;
            if (history.pushState && query && !partentsEvel.hasClass('node-selected')) {
                $(".neck").removeClass('node-selected');
                partentsEvel.addClass('node-selected');
                var breadcrumb = '<li class="selected"><a alt="'+query+'.html"  id="'+_id+'">'+$(this).text()+'</a></li>';
                $("h2.main-title").empty().html($(this).text());
                $(".breadcrumb").empty().html(breadcrumb);
                changeBreadcrumb();
                $.ajax({
                    url: this.title,
                    type:'GET',
                    async: false,
                    success: function(data){
                        $(".main").empty().html(data);
                    },
                    error: function(text){
                        alert(text.readyState);
                        alert(text.status);
                    }
                })
                // history处理
                var title = "旗瀚商家平台-" + $(this).text();
                document.title = title;

                if (event && /\d/.test(event.button)) {
                    //alert(location.href);
                    //debugger;
                    var  _url = location.href.split("?")[0] + "?" + query;
                    var _otherkey = query+'.html';
                    var state = {
                        title: title,
                        url: _url,
                        otherkey: _otherkey
                    }
                    history.pushState(state, title, location.href.split("?")[0] + "?" + query);
                }
            }
            return false;
        }
    });
    var fnHashTrigger = function(target) {
        console.log(location.href);
        var query = location.href.split("?")[1], eleTarget = target || null;
        console.log(query);
        console.log(eleTarget);
        if (typeof query == "undefined") {
            //debugger;
            if($.cookie('accountType') == 'service'){
                if (eleTarget = eleMenus.get(6)) {
                    history.replaceState(null, document.title, location.href.split("#")[0] + "?" + eleTarget.title.split("?")[0]) + location.hash;
                    debugger;
                    fnHashTrigger(eleTarget);
                }
                debugger;
            }else {
                if (eleTarget = eleMenus.get(0)) {
                    // 如果没有查询字符，则使用第一个导航元素的查询字符内容
                    //console.log(location.hash);
                    history.replaceState(null, document.title, location.href.split("#")[0] + "?" + eleTarget.title.split("?")[0]) + location.hash;
                    debugger;
                    fnHashTrigger(eleTarget);
                }
                debugger;
            }
        } else {
            eleMenus.each(function() {
                //console.log(this);
                if (eleTarget === null && this.title.split(".")[0] === query) {
                    eleTarget = this;
                    console.log(eleTarget);
                    debugger;
                }
            });
            if (!eleTarget) {
                // 如果查询序列没有对应的导航菜单，去除查询然后执行回调
                history.replaceState(null, document.title, location.href.split("?")[0]);
                fnHashTrigger();
                debugger;
            } else {
                debugger;
                $(eleTarget).trigger("click");
            }
        }
    };
    if (history.pushState) {
        window.addEventListener("popstate", function() {
              debugger;
            fnHashTrigger();

        });
        // 默认载入
        debugger;
        fnHashTrigger();
    }


}
//   创建环信连接
var conn = {};
var rtcCall = null;
var stopTimer = -1;
var windowStream;
var failedTimer = -1;
var failedNum = 10;

function rtc() {
    oncaller = '';
    if(WebIM.WebRTC) {
        rtcCall = new WebIM.WebRTC.Call({
            connection: conn,

            mediaStreamConstaints: {
                audio: true,
                video: true
            },

            listener: {
                onAcceptCall: function(from, options) {
                    console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
                    /*if( from !== ''&& satusConnect==0){
                     judge = 'true'
                     }*/
                },
                onGotRemoteStream: function(stream, streamType) {
                    console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType);
                    /*var video = document.getElementById('video');
                     video.srcObject = stream;
                     windowStream = stream;*/
                    if(satusConnect==0){//接受视频
                        showIndexOverflow();
                        $.ajax({
                            url: 'workbench.html',
                            async: false,
                            datatype: 'html',
                            success: function(data) {
                                $(".main").empty().html(data);
                                //rtcCall.acceptCall();
                            }
                        });

                        var video = document.getElementById('video');
                        video.srcObject = stream;
                        windowStream = stream;
                    }else{//打出视频 对方接听后 显示对方视频流
                        var video = document.getElementById('video');
                        video.srcObject = stream;
                        windowStream = stream;
                        failedNum = 0;
                        if(failedTimer) {
                            clearInterval(failedTimer);
                        }
                        success();
                        clearInterval(failedPushTimer);
                        pushTime = 10;

                    }
                },
                onGotLocalStream: function(stream, streamType) {
                    if(satusConnect == 0){//接受视频
                        console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType);
                        var video = document.getElementById('localVideo');
                        video.srcObject = stream;
                        console.log($.cookie('iceState'));
                        if($.cookie('iceState') == 'connected'){
                            success();
                            connect = '';
                            console.log('local OK==============================')
                        }
                    }else{//打出视频时显示本地视频流
                        var video = document.getElementById('localVideo');
                        video.srcObject = stream;
                    }



                },
                onRinging: function(caller) {
                    console.log('onRinging::', 'caller:', caller);
                    oncaller = caller.split('_')[1];
                    oncaller = oncaller.split('@')[0];
                },
                onTermCall: function(reason) {//忙时有返回结果
                    console.log('onTermCall::');
                    console.log('reason:', reason);//failed-transport 传输失败
                    if(reason=='busy'){
                        updataStatus();
                        alert('当前正在通话中...请稍后再拨！');
                    }
                    if(reason=='failed-transport'){
                        updataStatus();
                        alert('链接失败~请稍后再拨！');
                    }
                    if(reason == 'undefined'){
                        rtcCall.endCall();
                        updataStatus();
                    }
                },
                onIceConnectionStateChange: function(iceState) {
                    console.log('onIceConnectionStateChange::', 'iceState:', iceState);
                    $.cookie('iceState',iceState,{path:'/'})
                    if(iceState == 'closed') {
                        //alert('连接中断！');
                        closeVideoPhone();
                        $('.endcall').find('p').empty().text('通话结束');
                        $('.endcall').show();
                    }
                    if(iceState == "failed") {
                        if(failedTimer) {
                            clearInterval(failedTimer);
                            //console.log('555555555555555555555555555555555');
                            //console.log(failedNum);
                        }
                        failedNum = 10;
                        if(failedTimer) {
                            failedTimer = window.setInterval(failedFunc, 1000);
                        }
                    }

                    if(iceState == "connected") {
                        failedNum = 0;
                        if(failedTimer) {
                            clearInterval(failedTimer);
                        }
                        if(connect == 'true'){
                            success();
                            connect='';
                            console.log('ok');
                        }
                    }
                },
                onError: function(e) {
                    if(e.name == 'NotFoundError' ) {
                        connect='';
                        rtcCall.endCall();
                        closeVideoPhone();
                        if(failedPushTimer){
                            clearInterval(failedPushTimer);
                        }
                        pushTime = 10;
                        alert('检测到本地没有麦克风，无法接通视频');

                    }
                }
            }
        });
    } else {
        console.warn('不能进行视频通话！您的浏览器不支持webrtc或者协议不是https。')
    }
    conn.listen({
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
    });
}

function failedFunc() {
    //console.log(failedNum);
    if(failedNum > 0) {
        failedNum--;
    }
    if(failedNum <= 0) {

        if( flag == 'true'&& satusConnect==0){
            $('.endcall').find('.popap p').empty().text('网络异常，连接已中断');
            $('.endcall').show();
            //clearInterval(failedTimer);
            /*alert('网络异常，连接已中断')*/
            ;
        }else if(flag == 'false' && satusConnect==0){
            $('.endcall').find('.popap p').empty().text('网络异常，连接超时');
            $('.endcall').show();
            //alert('网络异常，连接超时');
        }else if(flag == 'false' && satusConnect==1){
            $('.endcall').find('.popap p').empty().text('无人接听');
            $('.endcall').show();
            updataStatus();
        }else if((flag == 'true'&& satusConnect==1)){
            $('.endcall').find('.popap p').empty().text('网络异常，连接已中断');
            $('.endcall').show();
            //clearInterval(failedTimer);
            /*alert('网络异常，连接已中断')*/
        }
        clearInterval(failedTimer);
        rtcCall.endCall()
        closeVideoPhone();

        //$('.endcall').show();
    }
}

function addHX(data) {
    conn = new WebIM.connection({
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
        https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
        url: WebIM.config.xmppURL,
        heartBeatWait: WebIM.config.heartBeatWait,
        autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
        autoReconnectInterval: WebIM.config.autoReconnectInterval,
        apiUrl: WebIM.config.apiURL,
        isHttpDNS: WebIM.config.isHttpDNS,
        isWindowSDK: WebIM.config.isWindowSDK,
        isAutoLogin: true,
        encrypt: WebIM.config.encrypt,
        delivery: WebIM.config.delivery
    });
    //使用用户名/密码登录环信 Web IM:
    var options_dl = {
        apiUrl: WebIM.config.apiURL,
        user: data.data.username,
        pwd: data.data.password,
        appKey: WebIM.config.appkey
    };
    conn.open(options_dl);
}

function getIM() {
    $.ajax({
        url: commUrl + '/user/getIMUser',
        data: {
            token: $.cookie("token")
        },
        success: function(data) {
            //console.log(data);
            data = JSON.parse(data);
            //console.log(data);

            if(data.code == 1) {
                $.cookie('IMusername', data.data.username, {
                    path: '/'
                });
                $.cookie('IMpassword', data.data.password, {
                    path: '/'
                });
                addHX(data);
                $.cookie('line', "on", {path: '/'});
                $.cookie('state', "free", {path: '/'});
                reportIMState("on", "free");
                onConfirmIndex();
                onCancelIndex();
                rtc();
            }
            if(data.code == '-1') {
                alert(data.msg + " 请重新登录")
            }
        },
        error: function(text) {
            alert('IM账号登录失败');
        }

    })
}

function reportIMState(oline, ostate) {
    $.ajax({
        url: commUrl + '/user/reportIMState',
        data: {
            token: $.cookie("token"),
            line: oline,
            state: ostate
        },
        type: 'POST',
        success: function(data) {
            //console.log(data);
            data = eval('(' + data + ')');
            if(data.code == "1") {
                $.cookie('line', oline, {
                    path: '/'
                });
                $.cookie('state', ostate, {
                    path: '/'
                });
                console.log($.cookie('state')+"==========$.cookie('state')")
            }
            if(data.code == '-1') {
                alert(data.msg + " 请重新登录")
            }
        },
        error: function(text) {
            console.log(text);
        }

    })
}
//客服收到来电播放铃声
function showIndexOverflow() {
    $(".overallIndex").show();
    if($('.phoneAudio')[0].paused) {
        $('.phoneAudio')[0].play();
    }
};
/*function monitoringRtc(){
 conn.listen({
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
 });
 }*/
function success(){
    flag = 'true'
    $('#video').show();
    $(".overallIndex").hide();
    Timer();
    $('.showBig').show();
    showBox();
    $('.unicom').show();
    $('.call').hide();
    var mesage = oncaller + '已接通'
    $('.ulink').html(mesage);
    //$('#sendMessage').removeAttr('readonly');
    $('.phoneAudio')[0].pause();
    reportIMState("on", "busyness");
    $('#onlineStstus').attr('disabled', true);
    $("#workStatus").attr('disabled', true);
    $("#workStatus").children('option[value="busyness"]').attr("selected", true);
    $.cookie('state', "busyness", {
        path: '/'
    });
    $.ajax({//拉取2分钟内最后一条无答案的问题
        url: commUrl + '/qaRecord/byim',
        data: {
            token: $.cookie('token'),
            imuser: oncaller
        },
        success: function(data) {
            data = JSON.parse(data);
            var html = ''
            if(data.code == 1 && data.data !=='') {
                html = '<div class="talkingLeft"> <div class="tallimg"> <img src="images/sanbot.png" alt=""> </div> <div class="tallkingText">'+data.data.originalQuestion+'</div> </div>';
                $('.talkingBox').empty().html(html);
            }
            if(data.code == '-1') {
                alert(data.msg)
            }
        },
        error: function() {
            alert('出错啦~~')
        }

    });
    monitoringflag = true;
}
function onConfirmIndex() {
    $(".onConfirm").on('click', function() {
        rtcCall.acceptCall();
        $(".overallIndex").hide();
        connect = 'true';
    })
}

function onCancelIndex() {
    $(".onCancel").on('click', function() {
        rtcCall.endCall();
        $(".overallIndex").hide();
        //closeVideoPhone();
    })
}
function updataStatus(){//上报机器人状态
    $.ajax({
        url: commUrl+'/user/reportAPPIMState',
        data:{
            token: $.cookie('token'),
            username: $.cookie('UserState'),
        },
        type:'POST',
        success: function(data){
            data= JSON.parse(data);
            console.log(data);
            var html = ''
            if(data.code == 1){
                console.log('上报成功');
            }else{
                console.log(data.msg);
            }

        },
        error: function(){
            alert('出错啦~~！');
        }

    })
}
function closeVideoPhone() {
    console.log(flag);
    failedNum = 0;
    if(failedTimer) {
        clearInterval(failedTimer);
    }
    if(flag == 'true') {
        $('#video').hide();
        $('.unicom').hide();
        if(stopTimer) {
            clearInterval(stopTimer);
        }
        //$('.movement').hide();
        flag = 'false';
        $('.showBig').hide();
        $('.showSmall').hide();
        $('.videoBox').css({width:'270px',height:'205px',left:0,top:0});
    } else {
        if($('.phoneAudio') && $('.phoneAudio')[0]) {
            $('.phoneAudio')[0].pause();
        }
        $(".overallIndex").hide();

    }
    satusConnect = 0;
    reportIMState("on", "free")
    $.cookie('state', "free", {
        path: '/'
    });
    $('.talkingBox').empty();
    $('.voiceBox input[type="range"]').val('2');
    $('.rangeSelect').css({width:'50px'});
    $('#onlineStstus').attr('disabled', false);
    $("#workStatus").attr('disabled', false);
    $('.onCallImg').show();
    $('.offCallImg').hide();
    if($.cookie('accountType') !== 'service'){
        $('.call').show();
    }
    $("#workStatus").children('option').attr("selected", false)
    $("#workStatus").children('option[value="free"]').attr("selected", true);
    oncaller = '';
    judge = false;
    monitoringflag = false;
}