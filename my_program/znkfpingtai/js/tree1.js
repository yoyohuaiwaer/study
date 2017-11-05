/**
 * Created by A on 2016/11/15.
 */
//var commUrl = 'http://172.16.8.40:8080/qh_manager'
$(document).ready(function(){
    //$('.last').attr({'data-industry':$.cookie('industryName')})
    $(".breadcrumb").empty();
    //alert("123");
    $.ajax({
        url:commUrl+'/menu/findbyid',
        async: false,
        data: {
            token:$.cookie("token"),
            parentId:'5809ec503797701ca16e4621'
        },
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            if(data.code == 1) {
                //$(".breadcrumb").empty();
                var breadcrumb = '';
                breadcrumb = '<li><a class="" alt="'+menuUrl+''+data.data[1].url+'" id="'+data.data[1].id+'">'+data.data[1].name+'</a></li>';
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
                var Id2 = '582d11e1b2a99afa74c510dc';
                findMenus(Id2);
                $(".breadcrumb li:last-child").addClass('selected');
            }
        }
    })
    loadentities();
    Elements();
    addElement();
    deleteElement()
    detailConfirm();
    detailCancel();
    addDetails();
    confirm();
    cancel();
    overflowHide();
    loadTreeList();
    deleted();
    loadAd()
    selectList();


});
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
            console.log(data);
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
function loadentities(){
    $.ajax({
        url: commUrl+'/entity/process',
        data: {
            token: $.cookie('token'),
            industry:$.cookie('industryName')
        },
        success: function(response){
          //console.log(response);
            response = JSON.parse(response);
            if(response.code == 1){
                $('#entity').empty();
                var html = '';
                html+='<option value="" id="" selected>未关联实体</option>'
                $.each(response.data.datas,function(i,key){
                    html += '<option value="'+key.name+'" id="'+key.id+'">'+key.name+'</option>'
                })
                $('#entity').html(html);
            }
        }
    })
}
function Elements(){
    $('.treeview').on('click','.hitarea',function(){
        if($(this).parent('li').attr('class') == 'collapsable'){
            $(this).attr({class:'hitarea expandable-hitarea'});
            $(this).parent('li').attr({class:'expandable'});
            $(this).parent('li').children('ul').slideUp();
        }else if($(this).parent('li').attr('class') =='expandable'){
            $(this).attr({class:'hitarea collapsable-hitarea'});
            $(this).parent('li').attr({class:'collapsable'});
            $(this).parent('li').children('ul').slideDown();
        } else if($(this).parent('li').attr('class') == 'collapsable lastCollapsable'){
            $(this).parent('li').attr({class:'expandable lastExpandable'});
            $(this).attr({class:'hitarea lastExpandable-hitarea'})
            $(this).parent('li').children('ul').slideUp();
        }  else if($(this).parent('li').attr('class') == 'expandable lastExpandable'){
            $(this).parent('li').attr({class:'collapsable lastCollapsable'});
            $(this).attr({class:'hitarea lastCollapsable-hitarea'});
            $(this).parent('li').children('ul').slideDown();
        }
    });
}
function deleteElement(){
    $('.treeview').on('click','.deleteElement',function(){
        //var nodeID = '#'+$(this).attr('data-nodeID');
        if($(this).parent('.fontBox').parent('li').parent('ul').children('li').length > 1){//先判断这个ul有至少2个节点
            if($(this).parent('.fontBox').parent('li').children(' ul').length > 0){//判断是否有子节点
                $('.deleted').attr({id:$(this).parent('.fontBox').parent('li').attr('id')});
                $('.overall').show();
            }else{// if($(this).parent('.fontBox').parent('li').children(' ul').length == 0 ){//无子节点
                if($(this).parent('.fontBox').parent('li').attr('class') == 'last'){//无子节点切为最后一个节点
                    if($(this).parent('.fontBox').parent('li').prev('li').attr('class') == undefined){//判断上一个节点无子节点
                        $(this).parent('.fontBox').parent('li').prev('li').attr({class:'last'})
                    }else if ($(this).parent('.fontBox').parent('li').prev('li').attr('class') == 'collapsable'){//上一个节点有子节点且是展开
                        $(this).parent('.fontBox').parent('li').prev('li').attr({class:'collapsable lastCollapsable'}).children('.hitarea ').attr({class:'hitarea lastCollapsable-hitarea'});
                    } else if($(this).parent('.fontBox').parent('li').prev('li').attr('class') == 'expandable'){//上一个节点有子节点且是收缩
                        $(this).parent('.fontBox').parent('li').prev('li').attr({class:'expandable lastExpandable'}).children('.hitarea ').attr({class:'hitarea lastExpandable-hitarea'});
                    }//$(this).parent('.fontBox').parent('li').remove();
                }
                $(this).parent('.fontBox').parent('li').remove()
            }
        }else {//先判断这个只有一个节点
            //debugger;
            if($(this).parent('.fontBox').parent('li').parent('ul').parent('li').attr('class') == 'collapsable lastCollapsable'){//这个节点ui所属的li是为最后一个节点
                if($(this).parent('.fontBox').parent('li').children(' ul').length > 0){//判断是否有子节点
                    $('.deleted').attr({id:$(this).parent('.fontBox').parent('li').attr('id')});
                    $('.overall').show();
                }else {//if($(this).parent('.fontBox').parent('li').children(' ul').length == 0 ){//无子节点
                    //中间节点且无子节点
                    $(this).parent('.fontBox').parent('li').parent('ul').parent('li').attr({class:'last'}).children('.hitarea ').remove();
                    $(this).parent('.fontBox').parent('li').parent('ul').remove();
                }
            }else {//这个节点ui所属的li是不为最后一个节点
                if($(this).parent('.fontBox').parent('li').children(' ul').length > 0){//判断是否有子节点
                    $('.deleted').attr({id:$(this).parent('.fontBox').parent('li').attr('id')});
                    $('.overall').show();
                }else {//if($(this).parent('.fontBox').parent('li').children(' ul').length == 0 ){//无子节点
                    $(this).parent('.fontBox').parent('li').parent('ul').parent('li').attr({class:''}).children('.hitarea ').remove();
                    $(this).parent('.fontBox').parent('li').parent('ul').remove();
                }
            }
        }
    });
};
function deleted(){
    $('.deleted').on('click',function(){
        var nodeId = '#'+$(this).attr('id');
        if($(nodeId).parent('ul').children('li').length > 1){
            if($(nodeId).attr('class') == 'collapsable lastCollapsable' || $(nodeId).attr('class') == 'expandable lastExpandable'){//无子节点切为最后一个节点
                if($(nodeId).prev('li').attr('class') == undefined){//判断上一个节点无子节点
                    $(nodeId).prev('li').attr({class:'last'})
                }else if ($(nodeId).prev('li').attr('class') == 'collapsable'){//上一个节点有子节点且是展开
                    $(nodeId).prev('li').attr({class:'collapsable lastCollapsable'}).children('.hitarea ').attr({class:'hitarea lastCollapsable-hitarea'});
                } else if($(nodeId).prev('li').attr('class') == 'expandable'){//上一个节点有子节点且是收缩
                    $(nodeId).prev('li').attr({class:'expandable lastExpandable'}).children('.hitarea ').attr({class:'hitarea lastExpandable-hitarea'});
                }//$(this).parent('.fontBox').parent('li').remove();
            }
        }else {
            if($(nodeId).parent('ul').parent('li').attr('class') == 'collapsable lastCollapsable'){
                $(nodeId).parent('ul').parent('li').attr({class:'last'}).children('.hitarea ').remove();
            }else if($(nodeId).parent('ul').parent('li').attr('class') == 'collapsable'){
                $(nodeId).parent('ul').parent('li').attr({class:''}).children('.hitarea ').remove();
            }
        }
        $(nodeId).remove();
        $('.overall').hide();

    })
}
function overflowHide(){
    $('.hideOverflow').on('click',function(){
        $('.overall').hide();
    })
}
function addElement(){
    $('.treeview').on('click','.addElement',function(){
        var nodeID = '#'+$(this).attr('data-nodeID');
        var html = '';
        var i = $(this).parent('.fontBox').parent('li').attr('data-col')-0+1;
        var eLength = $(this).parent('.fontBox').parent('li').attr('id');
        if(i < 7){
            if($(this).parent('.fontBox').parent('li').children(' ul').length == 0){
                if($(this).parent('.fontBox').parent('li').attr('class')== 'last'){
                    $(this).parent('.fontBox').parent('li').attr({class:'collapsable lastCollapsable'}).prepend('<div class="hitarea lastCollapsable-hitarea"></div>');

                }else {
                    $(this).parent('.fontBox').parent('li').attr({class:'collapsable'}).prepend('<div class="hitarea collapsable-hitarea"></div>');
                }
                eLength += '_1'
                html = '<ul data-col="'+i+'"><li class="last" data-col="'+i+'" id="'+eLength+'" rel="1" data-industry="'+$.cookie('industryName')+'"> ' ;
                if(i==2){
                    i = '二';
                }else if(i==3){
                    i = '三';
                }else if(i==4){
                    i = '四';
                }else if(i==5){
                    i = '五';
                }else if(i==6){
                    i = '六';
                }
                html+= '<div class="fontBox"><span class="folder"><a class="addDetails">'+i+'层问答</a></span><a class="addElement" date-nodeID="'+eLength+'">+</a><a class="deleteElement" data-nodeID="'+eLength+'">-</a></div></li></ul>';
                $(this).parent('.fontBox').parent('li').append(html);
            }else {
                var ilength = $(this).parent('.fontBox').parent('li').children(' ul').children('li:first-child').attr('id');
                ilength = ilength.charAt(ilength.length -1) - 0 + 1;
                eLength = eLength +'_'+ilength;
                html = '<li data-col="'+i+'" id="'+eLength+'" rel="1" data-industry="'+$.cookie('industryName')+'">' ;
                if(i==2){
                    i = '二';
                }else if(i==3){
                    i = '三';
                }else if(i==4){
                    i = '四';
                }else if(i==5){
                    i = '五';
                }else if(i==6){
                    i = '六';
                }
                html+= '<div class="fontBox"><span class="folder"><a class="addDetails">'+i+'层问答</a></span><a class="addElement" data-nodeID="'+eLength+'">+</a><a class="deleteElement" data-nodeID="'+eLength+'">-</a></div></li>'
                $(this).parent('.fontBox').parent('li').children(' ul').prepend(html);
            }
        } else {

            alert('最多只能添加六层问答');
            return;
        }

    })
};
function addDetails(){
    $('.treeview').on('click','.addDetails',function(){
        var contentID = $(this).parent('.folder').parent('.fontBox').parent('li').attr('id');
        if($(this).parent('.folder').parent('.fontBox').parent('li').attr('rel') == 1){
            $('#tree-details').attr({'data-content-id':contentID});
            $('.detailConfirm').attr({'data-content-id':contentID});
            $('#question').val('');
            $('#questions').val('');
            $('#answers').val('');
            $('input[name="sType"]').each(function(){
                if($(this).attr('value') == 1){
                    $(this).prop( "checked", true);
                }
            })
            loadentities();
            loadAd();
        }else if($(this).parent('.folder').parent('.fontBox').parent('li').attr('rel') == 0){
            if($(this).parent('.folder').parent('.fontBox').parent('li').attr("data-entityname") == ''){
                loadentities();
            }else {
                var value = $(this).parent('.folder').parent('.fontBox').parent('li').attr("data-entityname");
                $('#entity').children('option[value="'+value+'"]').attr({selected:true});
            }
            loadAd();
            if($(this).parent('.folder').parent('.fontBox').parent('li').attr("data-adID") !== ''){
                var arr = $(this).parent('.folder').parent('.fontBox').parent('li').attr("data-adID").split(',');
                //dom.attr('data-questions')
                for(var i in arr){
                    arr[i]
                }
                $.each(arr,function(i,key){
                    $('.selectOption input[type="checkbox"]').each(function(){
                        if($(this).attr('value') == key){
                            $(this).prop( "checked", true );
                        }
                    })
                })
            }
            var sType = $(this).parent('.folder').parent('.fontBox').parent('li').attr("data-sType");
            $('input[name="sType"]').each(function(){
                //alert(sType);
                if($(this).attr('value') == sType){
                    $(this).prop( "checked", true);
                }
            })
            $('#tree-details').attr({'data-content-id':contentID});
            $('.detailConfirm').attr({'data-content-id':contentID});
            $('#question').val($(this).parent('.folder').parent('.fontBox').parent('li').attr('data-question'));
            $('#questions').val($(this).parent('.folder').parent('.fontBox').parent('li').attr('data-questions'));
            $('#answers').val($(this).parent('.folder').parent('.fontBox').parent('li').attr('data-answers'));
        }
        $('#tree-details').attr({'data-content-id':contentID})
    })
}
function detailConfirm(){
    $('.detailConfirm').on('click',function(){
        var adId = ''
        $('.selectOption input[type="checkbox"]').each(function(){

            if($(this).is(':checked')){
                adId += $(this).attr('value')+',';
            }
        })
        adId = adId.substring(0,adId.length-1);
        if($('#question').val() !==''& $('#questions').val()!== ''){
            var  addId = '#'+$(this).attr('data-content-id');
            if($('#answers').val() !== ''){
                if($('#entity').children('option:selected').attr('id') == ''){
                    if(adId == ''){
                        $(addId).attr({'data-question':$('#question').val(),'data-answers':$('#answers').val(),'data-questions':$('#questions').val(),'rel':'0','data-entityID':'','data-entityName':'','data-adID':'','data-sType':$('input[name="sType"]:checked').attr('value')}).children('.fontBox').children('.folder').children('.addDetails').text($('#question').val());
                    }else {
                        $(addId).attr({'data-question':$('#question').val(),'data-answers':$('#answers').val(),'data-questions':$('#questions').val(),'rel':'0','data-entityID':'','data-entityName':'','data-adID':adId,'data-sType':$('input[name="sType"]:checked').attr('value')}).children('.fontBox').children('.folder').children('.addDetails').text($('#question').val());
                    }

                }else{
                    if(adId == ''){
                        $(addId).attr({'data-question':$('#question').val(),'data-answers':$('#answers').val(),'data-questions':$('#questions').val(),'rel':'0','data-entityID':$('#entity').children('option:selected').attr('id'),'data-entityName':$('#entity').children('option:selected').attr('value'),'data-adID':'','data-sType':$('input[name="sType"]:checked').attr('value')}).children('.fontBox').children('.folder').children('.addDetails').text($('#question').val());
                    }else {
                        $(addId).attr({'data-question':$('#question').val(),'data-answers':$('#answers').val(),'data-questions':$('#questions').val(),'rel':'0','data-entityID':$('#entity').children('option:selected').attr('id'),'data-entityName':$('#entity').children('option:selected').attr('value'),'data-adID':adId,'data-sType':$('input[name="sType"]:checked').attr('value')}).children('.fontBox').children('.folder').children('.addDetails').text($('#question').val());
                    }

                }

            }else{
                alert('答案不能为空！')
            }
        }else {
            alert('标题和关键词（组）不能为空！')
        }

    })
}
function detailCancel(){
    $('.detailCancel').on('click',function(){
        $('#question').val('');
        $('#questions').val('');
        $('#answers').val('');
    })
}
function confirm(){
    $('.confirm').on('click',function(){
        if($(this).attr('data-id') == ''){
            var a= [];
            setTreeEach($('#tree > li'),a);
            var newqa = a[0];
            $.ajax({
                url: commUrl+'/qa/multilayer_qa_add?token='+$.cookie("token"),
                type: 'POST',
                dataType:"json",
                contentType:'application/json; charset=UTF-8',
                data:JSON.stringify(newqa),
                success: function(response){
                    console.log(response);
                    response = JSON.parse(response);
                    if(response.code == 1){
                        //debugger;
                        $.ajax({
                            url:menuUrl+'tree-list.html',
                            success: function(reponse){
                                $('.main').html(reponse);
                            }
                        })
                    }
                },
                error: function(text){
                    console.log(text.readyState);
                    console.log(text.status);
                }
            })
        }else {
            var a= [];
            setTreeEach($('#tree > li'),a);
            /*console.log(a);
             console.log($.cookie("token"));
             console.log(commUrl+'/qa/multilayer_qa_add');*/
            var newqa = a[0];
            //console.log(JSON.stringify(newqa));
            //console.log(commUrl+'/qa/multilayer_qa_add?token='+$.cookie("token"));
            $.ajax({
                url: commUrl+'/qa/multilayer_qa_update?token='+$.cookie("token"),
                type: 'POST',
                dataType:"json",
                contentType:'application/json; charset=UTF-8',
                data:JSON.stringify(newqa),
                success: function(response){
                    console.log(response);
                    response = JSON.parse(response);
                    if(response.code == 1){
                        //debugger;
                        $.ajax({
                            url:menuUrl+'tree-list.html',
                            success: function(reponse){
                                $('.main').html(reponse);
                            }
                        })
                    }
                },
                error: function(text){
                    console.log(text.readyState);
                    console.log(text.status);
                }
            })
        }


    })
}

setTreeEach = function(dom,prevQAs){
    var newObj = {};
    var newArray = [];

    if(dom.children('ul').length > 0){
        dom.children('ul').children('li').each(function(i,key){
            setTreeEach($(this),newArray)
        })
    }
        var answers = [];
        var answersObj = {}
        answersObj.action = '';
        answersObj.url = '';
        answersObj.text = dom.attr('data-answers');
        answers.push(answersObj);
    var arr = dom.attr('data-questions').split('，');
    dom.attr('data-questions')
    //Array(arr);
    if(dom.attr('data-adID')!== ''){
        var addsID = dom.attr('data-adID').split(',')
        Array(addsID);
    }else {
        var addsID = [];
    }

    if(dom.attr('data-id')== ''){

    }else{
        newObj.id = dom.attr('data-id');
    }
    newObj.answers = answers;
    newObj.question = dom.attr('data-question');
    newObj.questions = arr;
    newObj.industry = dom.attr('data-industry');
    newObj.adIds = addsID;
    newObj.stype = dom.attr('data-sType');
    newObj.nextQAs = newArray;
    newObj.nodeId = dom.attr('id');
    newObj.entityId = dom.attr('data-entityID');
    newObj.entityName = dom.attr('data-entityName');
    //newObj.pinyin = '';
    //newObj.scene = '';
    //newObj.meid = '';
    prevQAs.push(newObj);
    console.log(prevQAs);
    //debugger;
}
function Array(newstring){
    for(var i in newstring){
        newstring[i];
    }
};
function cancel(){
    $('.cancel').on('click',function(){
        $.ajax({
            url:menuUrl+'tree-list.html',
            success: function(reponse){
                $('.main').html(reponse);
            }
        })
    })
}
function loadTreeList(){
    if($.cookie('rel') == 1){
        $('#tree').empty().html('<li class="last" data-id="" data-col="1" id="node1" rel="1" data-industry="'+$.cookie('industryName')+'"><div class="fontBox"><span class="folder"><a class="addDetails">首层问题</a></span><a class="addElement" data-nodeID="node1">+</a></div></li>');
        $('.confirm').attr({'data-id':''})

    }else if($.cookie('rel') == 0) {
        $('.confirm').attr({'data-id':$.cookie('treeId')})
        $.ajax({
            url: commUrl+'/qa/multilayer_qa_details',
            data:{
                token: $.cookie('token'),
                qaId:$.cookie('treeId')
            },
            success: function(response){
                response = JSON.parse(response);
                console.log(response);
                $('#tree').empty();
                if(response.code == 1){
                    console.log( response.data);
                    if(response.data.questions.length > 0){
                        var questions = response.data.questions.join('，');
                    }else{
                        var questions = response.data.questions[0];
                    }
                    var nodeId = response.data.nodeId;
                    var question = response.data.question;
                    var answers = response.data.answers[0].text;
                    var entityID = '';
                    var entityName = '';
                    var sType;
                    var fistyAdIds ;
                    if(response.data.adIds == undefined || response.data.adIds.length == 0){
                        fistyAdIds = '';
                    }else {
                         fistyAdIds = response.data.adIds.join(',');
                    }

                    if( response.data.stype == undefined){
                        sType = 2;
                    }else {
                        sType = response.data.stype;
                    }
                    if(response.data.entityId == undefined){
                        entityID = '';
                        entityName =''
                    }else{
                        entityID = response.data.entityId ;
                        entityName = response.data.entityName ;
                    }
                    var industry = response.data.industry;
                    var newHtml = setExport(response.data,'');
                    newHtml = '<li class="collapsable lastCollapsable" data-id="'+$.cookie('treeId')+'"data-col="1" id="'+nodeId+'" rel="0" data-adID="'+fistyAdIds+'" data-sType="'+sType+'" data-question="'+question+'" data-questions="'+questions+' " data-answers="'+answers+'" data-industry="'+industry+'" data-entityId="'+entityID+'" data-entityName="'+entityName+'"><div class="hitarea lastCollapsable-hitarea"></div><div class="fontBox"><span class="folder"><a class="addDetails">'+question+'</a></span><a class="addElement" data-nodeID="'+nodeId+'">+</a></div>'+newHtml+'</li>';
                    $('#tree').html(newHtml);
                }
            },
            error: function(text){
                console.log(text.readyState);
                console.log(text.status);
                alert('出错啦~！');
            }
        })
    }
}
var box = '';
setExport =  function(base,ul){
    var html ='';
    $.each(base.nextQAs,function(i,key){
        var newquestions = key.questions.join('，');
        var adIds;
        if(key.adIds == undefined || key.adIds.length == 0){
            adIds = ''
        }else {
             adIds = key.adIds.join(',');
        }
        //newObj.sType = dom.attr('data-sType');
        if(key.nextQAs.length > 0){
            setExport(key,box);
        }else {
            box = '';
        }
        var answers = '';
        var entityID = '';
        var entityName = '';
        var newsType;
        if(key.answers == undefined){
             answers = '';
        }else{
             answers = key.answers[0].text;
        }
        if(key.entityId == undefined){
            entityID = '';
            entityName =''
        }else{
            entityID = key.entityId ;
            entityName = key.entityName ;

        };

        if(key.stype == undefined){
            newsType = 2;
        }else {
            newsType = key.stype;
        }
        if(base.nextQAs.length == i+1){
            if(key.nextQAs.length > 0){
                html += '<li class="collapsable lastCollapsable" data-col="1" id="'+key.nodeId+'" rel="0" data-adID="'+adIds+'" data-sType="'+newsType+'" data-question="'+key.question+'"  data-questions="'+newquestions+'" data-answers="'+answers+'" data-industry="'+key.industry+'" data-entityId="'+entityID+'" data-entityName="'+entityName+'"><div class="hitarea lastCollapsable-hitarea"></div><div class="fontBox"><span class="folder"><a class="addDetails">'+key.question+'</a></span><a class="addElement">+</a><a class="deleteElement" data-nodeID="'+key.nodeId+'">-</a></div>'+box+'</li>';
            }else{
                html += '<li class="last" data-col="1" id="'+key.nodeId+'" rel="0" data-adID="'+adIds+'" data-sType="'+newsType+'" data-question="'+key.question+'" data-questions="'+newquestions+'" data-answers="'+answers+'" data-industry="'+key.industry+'"  data-entityID="'+entityID+'" data-entityName="'+entityName+'"><div class="fontBox"><span class="folder"><a class="addDetails">'+key.question+'</a></span><a class="addElement">+</a><a class="deleteElement" data-nodeID="'+key.nodeId+'">-</a></div>'+box+'</li>';
            }
        }else{
            if(key.nextQAs.length > 0){
                html += '<li class="collapsable" data-col="1" id="'+key.nodeId+'" rel="0" data-adID="'+adIds+'" data-sType="'+newsType+'" data-question="'+key.question+'" data-questions="'+newquestions+'" data-answers="'+answers+'" data-industry="'+key.industry+'" data-entityID="'+entityID+'" data-entityName="'+entityName+'"><div class="hitarea collapsable-hitarea"></div><div class="fontBox"><span class="folder"><a class="addDetails">'+key.question+'</a></span><a class="addElement">+</a><a class="deleteElement" data-nodeID="'+key.nodeId+'">-</a></div>'+box+'</li>';
            }else{
                html += '<li data-col="1" id="'+key.nodeId+'" rel="0" data-adID="'+adIds+'" data-sType="'+newsType+'" data-question="'+key.question+'" data-questions="'+newquestions+'" data-answers="'+answers+'" data-industry="'+key.industry+'"  data-entityID="'+entityID+'" data-entityName="'+entityName+'"><div class="fontBox"><span class="folder"><a class="addDetails">'+key.question+'</a></span><a class="addElement">+</a><a class="deleteElement" data-nodeID="'+key.nodeId+'">-</a></div>'+box+'</li>';
            }
        }
    });
    box ='<ul>'+html+'</ul>';
    ul += box;
    return ul;
}
