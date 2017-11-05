/**
 * Created by A on 2016/11/20.
 */
$(document).ready(function(){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        async:false,
        cache: false,
        data: {
            token:$.cookie("token"),
            parentId:'5850be18b2a99afa74c513a7'
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                $(".breadcrumb").empty();
                $.each(data.data, function(i,key) {
                    var breadcrumb = '<li ><a alt="' + menuUrl + '' + key.url + '" id="' + key.id + '">' + key.name + '</a></li>'
                    $(".breadcrumb").html(breadcrumb);
                    var id = key.id;
                    //debugger;
                    findMenus(id);
                    //$(".breadcrumb li:nth-of-type(2)").addClass('selected');
                    changeBreadcrumb();
                })
            }
        }
    })
    pageOrder();
    //addTags();
    addTag();
   // cancel();
})
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
                var breadcrumb1 = '';
                breadcrumb1 = '<li class="selected"><a alt="'+menuUrl+''+data.data[1].url+'" id="'+data.data[1].id+'">'+data.data[1].name+'</a></li>';
                //alert(breadcrumb1);
                $(".breadcrumb").append(breadcrumb1);
                changeBreadcrumb();
            }
        }
    })
}
function pageOrder(page){
    //console.log($.cookie("token"));
    //var commUrl = 'http://172.16.8.40:8080/qh_manager';
    //debugger;
    //alert($.cookie("goodsId"));
    //alert($.cookie('industryName'));
    page = page?page:1;
    $.ajax({
        url:commUrl+'/entity/label',
        //type:'',
        data:{
            token:$.cookie("token"),
            //industry:$.cookie('industryName'),
            processId: $.cookie("goodsId"),
            page:page,
            //row: 10,
            sortId:'createTime',
            sortType:'DESC'
        },
        success: function(response){
            $(".grid-body").empty();
            $(".pages ul").empty()
            var html = '';
            var page = '';
            response = JSON.parse(response);
            if(response.code == 1){
                if(response.data.count == '0'){
                    html = '暂无数据';
                }else {
                    //数据循环
                    var sort = 0;
                    //debugger;
                    $.each(response.data.datas, function(i,key){
                        var question = key.question;
                        sort = i +1;
                        html += '<div class="grid-body-tr"> <div style="width: 80px"><span>'+sort+'</span></div> ' ;
                        html+= '<div style="width: 140px"><span><span class="name">'+key.name+'</span><input type="text" class="keyWord text name" style="width: 120px; display: none;" value="'+key.name+'"/></span></div>';
                        if(key.type ==0){
                            html+= '<div style="width: 300px"><span > <select name="type" id="" class="type"> <option value="0" selected>搜索实体</option> <option value="1">问答确认(会在APP下方浮层显示)</option> <option value="2">问答确认(不显示)</option> </select></span></div>';
                        }else if(key.type ==1){
                            html+= '<div style="width: 300px"><span > <select name="type" id="" class="type"> <option value="0" >搜索实体</option> <option value="1" selected>问答确认(会在APP下方浮层显示)</option> <option value="2">问答确认(不显示)</option> </select></span></div>';
                        }else if(key.type ==2){
                            html+= '<div style="width: 300px"><span > <select name="type" id=""  class="type"> <option value="0" selected>搜索实体</option> <option value="1">问答确认(会在APP下方浮层显示)</option> <option value="2" selected>问答确认(不显示)</option> </select></span></div>';
                        }

                        html +='<div  style="width: 300px"><span><span class="question">'+key.question+'</span><input type="text" class="synonym text question" style="display: none;" value="'+key.question+'"/></span></div><div style="width: 140px" class="operation"><span><a class="confirm" style="display: none;" data-id="'+key.id+'" rel="0">确定</a><a class="edit" data-id="'+key.id+'" rel="0">修改</a><a class="cancel" style="display: none;" data-id="'+key.id+'" rel="0">取消</a></span></div></div>';

                        //searchScene();
                    });
                    if(response.data.page == '1') {
                        page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                            ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                    }
                    else if(response.data.page == response.data.pageCount){
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage ">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                    }
                    else {
                        page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                            '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                    }

                    $(".grid-body").html(html);
                    $(".pages ul").html(page);
                    //确认绑定事件
                    confirm();
                    edit();
                    cancel();

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
function edit(){
    $('.edit').on('click',function(){
        $(this).next('a').show();
        $(this).prev('a').show();
        $(this).hide();
        $(this).parents('.grid-body-tr').addClass('red');
        $(this).parents('.grid-body-tr').find('input.name').show();
        $(this).parents('.grid-body-tr').find('input.question').show();
        $(this).parents('.grid-body-tr').find('span.name').hide();
        $(this).parents('.grid-body-tr').find('span.question').hide();
    })
}
function addTag(){
    $('.addTag').on('click',function(){
        var sort = $(".grid-body-tr").length;
        sort+=1;
        var html = '';
        html += '<div class="grid-body-tr red"> ' +
            '<div class=""><span>'+sort+'</span></div> ' +
            '<div><span ><input type="text" class="keyWord text name" style="width: 120px"/></span></div>' +
            '<div><span><select name="type" class="type"> <option value="0">搜索实体</option> <option value="1">问答确认(会在APP下方浮层显示)</option> <option value="2">问答确认(不显示)</option> </select></div>'+
            '<div><span><input type="text" class="synonym text question" /></span></div>'+
            ' <div class="operation"> <span><a class="confirm" rel="1" data-id="">确定</a><a class="cancel" rel="1">取消</a></span></div>' +
            '</div>';
        $(".grid-body").append(html);
        confirm();
        cancel();
    })
}
function cancel(){
    $('.cancel').on('click',function(){

        if($(this).attr('rel') == 0){
            $(this).prev('a').prev('a').hide();
            $(this).prev('a').show();
            $(this).hide();
            $(this).parents('.grid-body-tr').removeClass('red');
            $(this).parents('.grid-body-tr').find('input.name').hide();
            $(this).parents('.grid-body-tr').find('input.question').hide();
            $(this).parents('.grid-body-tr').find('span.name').show();
            $(this).parents('.grid-body-tr').find('span.question').show();
        }else {
            //alert($(this).attr('rel'));
            $(this).parents('.grid-body-tr').remove();
        }
    })
}
function confirm(){
    $('.confirm').on('click',function(){
        var name = $(this).parents('.grid-body-tr').find('input.name').val();
        //alert(name);
        var question =  $(this).parents('.grid-body-tr').find('input.question').val();
        //alert(question);
        var type = $(this).parents('.grid-body-tr').find('.type').children('option:selected').val();
        //alert(type);
        if($(this).attr('data-id') == ''){
            //alert('123')
            $.ajax({
                url: commUrl+'/entity/label',
                type:'POST',
                data:{
                    token: $.cookie('token'),
                    name: name,
                    question: question,
                    type: type,
                    processId:$.cookie("goodsId"),
                    industry:$.cookie('industry')
                },
                success: function(response){
                    response = JSON.parse(response);
                    if(response.code == 1){
                        pageOrder()
                    }
                    //alert(response);

                },
                error: function(text){
                    alert('出错啦~！')
                }
            })
        }else{
            //alert('456')
            $.ajax({
                url: commUrl+'/entity/label',
                type:'POST',
                data:{
                    token: $.cookie('token'),
                    name: name,
                    question: question,
                    type: type,
                    processId:$.cookie("goodsId"),
                    industry:$.cookie('industry'),
                    id:$(this).attr('data-id')
                },
                success: function(response){
                    response = JSON.parse(response);
                    if(response.code == 1){
                        pageOrder()
                    }
                    //alert(response);

                },
                error: function(text){
                    alert('出错啦~！')
                }
            })
        }
    })
}