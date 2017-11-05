/**
 * Created by A on 2016/10/24.
 */
/**
 * Created by A on 2016/10/21.
 */
//var commUrl = 'http://172.16.8.70:8080/manage';
$(document).ready(function(){
    $(".breadcrumb").empty();
    if($.cookie('ansType') == 1){
        var Id1 = '5850c057b2a99afa74c513af';
        findMenus(Id1);
        var Id2 = '5850c0a1b2a99afa74c513b0';
        findMenus(Id2);
        $(".breadcrumb li:last-child").addClass('selected');
    }else{
        var breadcrumb = '<li class="selected"><a class="" alt="conflict.html" id="585a2c3ab2a99afa74c513c0">关键词冲突</a></li>';
        $(".breadcrumb").html(breadcrumb);
        var Id2 = '5850c0a1b2a99afa74c513b0';
        findMenus(Id2);
    }

    if($.cookie('rel') == 0){
        loadPage();
    }else {
    }
    confirm();
    cancel();

/*    $.ajax({
        url:commUrl+'/menu/findbyid',
        async: false,
        data: {
            token:$.cookie("token"),
            parentId:'57ff306b0a263655e986ccf4'
        },
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            if(data.code == 1) {
                var breadcrumb = '';
                //breadcrumb = '<li><a class="" alt="'+menuUrl+''+data.data[2].url+'" id="'+data.data[2].id+'">'+data.data[2].name+'</a></li>';
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
                var Id1 = data.data[2].id;
                findMenus(Id1)
                var Id2 = '5809ec703797701ca16e4622';
                //alert(Id1);
                findMenus(Id2);
                var Id3 = '5809ecab3797701ca16e4623';
                findMenus(Id3);
                $(".breadcrumb li:last-child").addClass('selected');

            }
        }
    })*/
    loadSecene();
    loadAd();
    selectList();

});
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
            if(data.code == 1) {
                var bred = '';
                bred = '<li><a alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
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
function loadAd(){
    var obj = {
        token:$.cookie("token"),
        //page:page,
        //row:'10',
        sortId:'createTime',
        sortType:'DESC'
    }
    $.ajax({
        url:commUrl+'/ad/findAll',
        data:obj,
        async: false,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".selectOption").empty();
            var html = '';
            if(data.code == '1'){
                $.each(data.data,function(i,key){
                    html += '<li><input type="checkbox" value="'+key.id+'"/>'+key.title+'</li>';
                })
                $(".selectOption").html(html);

            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
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
function loadSecene(){
    $.ajax({
        url:commUrl+'/qa/industry',
        async: false,
        data:{
            token:$.cookie("token"),
            industryId: $.cookie('industryId'),
            page:1,
            row: 10000,
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                var html = '';
                $('#scene').empty();
                $.each(response.data.datas,function(i,key){
                    html += '<option value="'+key.name+'">'+key.name+'</option>';
                })

                $('#scene').html(html);
            }

        },
        error: function( text){
            alert(text.readyState);
            alert(text.status);
            alert("出错啦");
        }
    })
}
function newPage(){
    $.get('question-list.html',{token:$.cookie("token"),scene:$.cookie("scene")},function(response){
        $(".main").empty().html(response);
    })
}

function loadPage(){
    $.ajax({
       url:commUrl+'/qacategory',
        data: {
            token: $.cookie('token'),
            id: $.cookie('qusID'),
            //scene: $.cookie("scene"),
            industry: $.cookie("industryName"),
            //text: $.cookie('ansTxt')
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                $("#question").val(response.data.question).attr('readonly');
                $("#mainKey").val(response.data.mainKey).attr('readonly');
                $.each(response.data.keywords,function(i,key){
                    if(key.relate !== undefined){
                        var type = key.relate;
                        switch(type) {
                            case type='SBV':
                                $("#sbv").val(key.word);
                                break;
                            case type='VOB':
                                $("#vob").val(key.word);
                                break;
                            case type='S':
                                $("#s").val(key.word);
                                break;
                        }
                    }
                })
                $("#answer").val(response.data.answers[0].text);
                $("#url").val(response.data.answers[0].url);
                if(response.data.operation =="LBS"){
                    $("[name='lbs']").attr("checked",'true');
                }
                if(response.data.scene == ''){
                    $("#scene").children('option[value="none"]').attr({selected:"selected"});
                }else{
                    $("#scene").children('option[value="'+response.data.scene+'"]').attr({selected:"selected"});
                }
                if(response.data.answers[0].action == ''){
                    $("#action").children('option[value="none"]').attr({selected:"selected"});
                }else{
                    $("#action").children('option[value="'+response.data.answers[0].action+'"]').attr({selected:"selected"});
                }
                if(response.data.adIds !== ''){
                    var arr = response.data.adIds
                    $.each(arr,function(i,key){
                        $('.selectOption input[type="checkbox"]').each(function(){
                            if($(this).attr('value') == key){
                                $(this).prop( "checked", true );
                            }
                        })
                    })
                }
            }
        },
        error: function(text){
            alert("出错啦~！")
        }
    });

}

function newPage(){
    $.ajax({
        url:menuUrl+'scene-question-list.html',
        success: function(response){
            $('.main').html(response);
        }
    })
}
function confirm(){
    $(".confirm").click(function(){
        var adId = ''
        $('.selectOption input[type="checkbox"]').each(function(){
            if($(this).is(':checked')){
                adId += $(this).attr('value')+',';
            }
        })
        adId = adId.substring(0,adId.length-1);
        var lbs = $("[name='lbs']").is(':checked')?"LBS":'';
        var obj = {}
        if($.cookie('rel') == 1){
            obj = {
                token:$.cookie("token"),
                scene: $("#scene").children("option:selected").attr("value"),
                question:$("#question").val(),
                mainKey:$("#mainKey").val(),
                answer:$("#answer").val(),
                ads:adId,
                s:$("#s").val(),
                vob:$("#vob").val(),
                sbv:$("#sbv").val(),
                url:$("#url").val(),
                action:$("#action").children("option:selected").attr("value"),
                industry:$.cookie('industryName'),
                operation:lbs
            };
        }else if($.cookie('rel') == 0){
            obj = {
                token:$.cookie("token"),
                id: $.cookie('qusID'),
                scene: $("#scene").children("option:selected").attr("value"),
                question:$("#question").val(),
                mainKey:$("#mainKey").val(),
                answer:$("#answer").val(),
                s:$("#s").val(),
                vob:$("#vob").val(),
                sbv:$("#sbv").val(),
                ads:adId,
                url:$("#url").val(),
                action:$("#action").children("option:selected").attr("value"),
                industry:$.cookie('industryName'),
                operation:lbs
            };

        };
        if($("#url").val().substr(0,7) == "http://"||$("#url").val() == ""){
            $.ajax({
                url:commUrl+'/qacategory',
                type:'POST',
                data:obj,
                success: function(data){
                    data = eval('(' + data + ')')
                    if(data.code == '1'){
                        if($.cookie('ansType') == 1){
                            newPage();
                        }else {
                            $.ajax({
                                url:menuUrl+'conflict.html',
                                success: function(reponse){
                                    $('.main').html(reponse);
                                }
                            })
                        }

                    }
                },
                error: function(text){
                    alert('出错啦~！');
                }
            })
        }
        else {
            $("#tip4").show().text("输入地址有误，地址必须是以http://开头的url");
        }

    })
}
function cancel(){
    $(".cancel").on('click',function(){
        if($.cookie('ansType') == 1){
            newPage();
        }else {
            $.ajax({
                url:menuUrl+'conflict.html',
                success: function(data){
                    $('.main').html(data);
                }
            })
        }

    })
}
