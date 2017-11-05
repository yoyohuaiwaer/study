/**
 * Created by A on 2017/8/9.
 */
$(document).ready(function(){
    $('.main-title').hide();
    $('.breadcrumb').hide();
     failedPushTimer= '-1';
    $('.nick').html($.cookie('IMusername')+'工作台');
     pushTime = 11;
    //var localData = [];
    if($.cookie('state') == undefined){
        $.cookie('state', "free", {path: '/'});
    }
    console.log($.cookie('state')+'123');
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
    connRtc();
    sports('.top');
    sports('.right');
    sports('.left');
    sports('.bottom');
    movement();
    endVedio();
    sendMessage();
    //closeveiw()//心理医生关闭窗口
})
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
function endVedio(){
    $('.endVedio').on('click',function(){//�ر���Ƶ
        //console.log(flag);
        rtcCall.endCall();
        //closeVideoPhone();
        oncaller = '';

    });
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
        //var id = conn.getUniqueId();
        //var msg = new WebIM.message('txt', id);
        console.log(oncaller);
        console.log(text);
        //debugger;
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
    $(clickEle).on('click',function(){
        var index = $(this).parents(parEle).attr('data-index');
        console.log(index);
        var num = $(parEle).length - 1;
        console.log(num);
        if(num == 0){
            $(prev).hide();
            $(next).hide();
        }
        $(showEle).removeClass('show');
        $(next).removeClass('last');
        $(prev).removeClass('first');
        $(showEle).eq(index).addClass('show');
        if(index == num){//

            $(next).addClass('last');
        }else if(index == 1){//Ԥ����һ��

            $(prev).addClass('first');
        }
        $(overflow).show();//��ʾ
        //next click
        $(next).on('click',function(){
            var index2 = $(showEle).index($('.show'));
            console.log(index2);
            console.log(num);
            if(index2==num){
                $(tips).html('已经是最后了！');
                $(next).addClass('last');
            }else if(index2 == 0){
                index2 = index2 + 1;
                $(showEle).removeClass('show');
                $(showEle).eq(index2).addClass('show');
                $(prev).removeClass('first');
                $(tips).empty();
            }else{
                index2 = index2 + 1;
                $(showEle).removeClass('show');
                $(showEle).eq(index2).addClass('show');
            }
        })
        $(prev).on('click',function(){
            var index2 = $(showEle).index($('.show'));
            console.log(index2);
            console.log(num);
            if(index2==0){
                $(tips).html('已经是最前了！');
                $(prev).addClass('first');
            }else if(index2 == num){
                index2 = index2 - 1;
                $(showEle).removeClass('show');
                $(showEle).eq(index2).addClass('show');
                $(next).removeClass('last');
                $(tips).empty();
            }else {
                index2 = index2 - 1;
                $(showEle).removeClass('show');
                $(showEle).eq(index2).addClass('show');
            }
        })
        $('.close').on('click',function(){
            $(overflow).hide();//��ʾ
        })
    })

}
function push(){
    $('.push').on('click',function(){
        if( pushTime <= 10 ){
            alert('请10秒后不能推送过于频繁');
            return;

        }
        if(oncaller == ''){
            alert('客服暂未连接，请连接后使用该功能。')
            return false;
        }
        var Id = $(this).attr('data-id');
        var index = $(this).attr('data-index');
        if(oncaller == ''){
            return false;
        }
        var obj = {
            imUserId:oncaller,//'huanxinac83f3304a9a',
            materialId: Id,
            token:$.cookie('token')
        }
        if(index !== undefined){
            obj.index = index;
        }
        console.log(obj);
        //debugger;

        $.ajax({
            url: commUrl+'/pushMaterial/push',
            type:'POST',
            data: obj,
            cache:false,
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1){
                    alert('推送成功');
                    pushTime = 0;
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
    if(pushTime < 10){
        pushTime ++;
        //console.log(pushTime);
    }else{
        clearInterval(failedPushTimer);
        pushTime = 11;
        //console.log(pushTime);
    }
}
function pagenation(page,type){
    page = page?page:1;
    /*if(page == undefined){
     page = 1;
     }else {
     page = page;
     }*/
    var obj = {
        token:$.cookie("token"),
        page: page,
        row: '6',
        type:type
    }
/*    if(type == 'image'){
        obj.row = 6;
    }else if(type == 'text'|| type == 'test'){
        obj.row = 6;
    }*/
    //console.log(JSON.stringify(obj));
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
                if(data.code==1){
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
                                dom += '<div class="showImg"> ' +
                                    '<img src="'+key.img+'" alt=""/> ' ;
                                if($.cookie('accountType') == 'service'){
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a></div> </div>';
                                }else{
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a><a class="closeveiw" data-id="'+key.id+'">取消推送</a></div> </div>';
                                }


                            })
                            $('.gallerySlider').empty().html(dom);
                            $('.gallerySlider').parent('.showerBox').addClass('img');
                            $('#thumbs').empty().html(html).addClass('img');
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
                                dom += '<div class="showIext"> ' +
                                    '<h4 class="title">'+key.title+'</h4> ' +
                                    '<div class="content">'+key.content+'</div>';
                                if($.cookie('accountType') == 'service'){
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a></div> </div>';
                                }else{
                                    dom +='<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a><a class="closeveiw" data-id="'+key.id+'">取消推送</a></div> </div>';
                                }

                                   // '<div class="toolbar"><a class="push" data-id="'+key.id+'">推送</a></div> </div>';

                            })
                            $('#textSlider').empty().html(dom);
                            $('#textSlider').parent('.showerBox').addClass('text');
                            $('#textThumbs').empty().html(html);
                            Touch('.preview2','#textThumbs .testBox','#textSlider .showIext','.prevArrow2','.nextArrow2','#TextOverlay','.pagelimit2');
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
                                    '<a data-index="'+i+'" class="preview preview3" data-id="'+key.id+'">预览</a></div> </div>'
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


function previewTest(){
    $('.preview3').on('click',function(){
        var id = $(this).attr('data-id')
        loadTest(id);
        $('#TestOverlay').show();
    })
}
function loadTest(id){
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
                console.log(JSON.stringify(data));
                var dom = '';
                //var localData = [];
                var reponse = data.data.bundle.tests;
                var testId = data.data.id;
                console.log(data);
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
                    dom += '<div class="content">'+html+'</div>'+
                     '<div class="toolbar"><a data-index="'+key.index+'" class="push" data-id="'+testId+'">推送</a> ' +
                        '<a data-index="'+key.index+'" class="button confirm" data-id="'+testId+'">提交</a></div> </div>';

                })


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
                    $.each(data.data.datas, function(i, key) {


                    });
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
function connRtc(){
    conn.listen({
        onOpened: function (message) {          //���ӳɹ��ص������ӳɹ���ſ��Է�����Ϣ
            console.log(message);
            console.log("%c [opened] 已连接", "color: green")
        },
        onTextMessage: function (message) {
            // �ڴ˽��պʹ�����Ϣ������message.type������Ϣ��Դ��˽�Ļ�Ⱥ���������
            /*$('.talkingBox').append('<div class="talkingLeft"> <div class="tallimg"> </div> <div class="tallkingText">'+message.data+'</div> </div>');*/
        },  //�յ��ı���Ϣ

        onOnline: function () {
            console.log('onLine');
        },                  //�����������ӳɹ�
        onOffline: function () {
            console.log('offline');
        },                 //�����������
        onError: function (message) {
            console.log('Error');
            console.log(message);
            if (message && message.type == 1) {
                console.warn('不能进行视频通话！您的浏览器不支持webrtc或者协议不是https。')
            }
        },           //ʧ�ܻص�
    });
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
    $('#onlineStstus').on('change',function(){//������������
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

    //$('.call').on('click',call);
    $('.muted').on('click',function(){
        $('#localVideo').attr('muted');
    })
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