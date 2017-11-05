/**
 * Created by A on 2017/4/13.
 */
/**
 * Created by A on 2017/4/10.
 */

$(document).ready(function(){
    //commUrl = 'http://10.10.23.67:8080/qh_server';
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
                var breadcrumb = '<li><a alt="courseware-list.html" id="58f461763c9e9c3c425683c8">课件管理</a></li><li class = "selected" ><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="'+menuUrl+''+data.data[2].url+'" id="'+data.data[2].id+'">'+data.data[2].name+'</a></li>';
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    $.cookie('rel1','0',{path:'/'});
    listPage();
    //hideOverflow1();
    //  detailSearchbtn();
    //addColumn();
    //addMediaTags();
    //showDeletePop();
    //hideOverflow();
    //loadTags();
    //addTagsConfirm();
    addColumn();
})
function newPage(){
    $.ajax({
        url:menuUrl+'column-details.html',
        success: function(data){
            $('.main').html(data);
        }
    })
}
function addColumn(){

    $('.addColumn').on('click',function(){
        $.cookie('column-id','',{path:'/'});
        newPage();
    })
}
function editTags(){

    $('.editTags').on('click',function(){
        $.cookie('column-id',$(this).attr('data-id'),{path:'/'});
        newPage();
    });
}
function addTagsConfirm(){
    $('.').on('click',function(){
        var _data = {
            token:$.cookie("token")
        };
        if($(this).attr('data-id') !== ''){
            _data.id = $(this).attr('data-id');
        }
        $.ajax({
            url:commUrl+'/member/delMember',//替换接口
            data:_data,
            cache:false,
            type:'POST',
            success: function(data){
                data = eval('('+data+')');
                if(data.code == '1'){
                    newPage();
                }
            }
        })
    })
}
function hideOverflow(){
    $('.hideOverflow').on('click',function(){
        $(this).parent('.popap').parent().hide();
    })
}
function showDeletePop(){
    $('.showDeletePop').on('click',function(){
        $('.overall').show();//遮罩显示
    })

};
function addColumn(){
    $('.addColumn').on('click',function(){
        //debugger;
        var _columnId =  $(this).attr('data-id');
        $.cookie('column-id',_columnId,{path:'/'});
        $.ajax({
            url:'column-details.html',//
            cache:false,
            datatype:'html',
            success:function(data){
                $(".main").empty().html(data);
            }
        })
    });
}

function listPage(page){
    //var obj={};
    page = page?page:1;
    //var _classId = $('#classId').children('option:selected').attr('value');
    //var _type = $('#type').children('option:selected').attr('value');
    //var _name = $('.searchText').val();
    //console.log($.cookie('rel1'));
    //switch ($.cookie('rel1')){
    //    case '0':
    //        obj={
    //            token:$.cookie("token"),
    //            page:page,
    //            row:'10',
    //            sortId:'updateTime',
    //            sortType:'DESC'
    //        }
    //        break;
    //    case '1':
    //        obj={
    //            token:$.cookie("token"),
    //            page:page,
    //            row:'10',
    //            sortId:'updateTime',
    //            sortType:'DESC',
    //        }
    //
    //        if(_classId !== '' ){
    //            obj.classId = _classId;
    //        };
    //        if( _type !== ''){
    //            obj.type = _type;
    //        };
    //        break;
    //    case '2':
    //        obj={
    //            token:$.cookie("token"),
    //            page:page,
    //            row:'10',
    //            sortId:'updateTime',
    //            sortType:'DESC',
    //        };
    //        if( _type !== ''){
    //            obj.type = _type;
    //        };
    //        if(_classId !== '' ){
    //            obj.classId = _classId;
    //        };
    //        break;
    //    case '3':
    //        obj={
    //            token:$.cookie("token"),
    //            page:page,
    //            row:'10',
    //            sortId:'updateTime',
    //            sortType:'DESC',
    //            name: _name
    //        };
    //}
    var _data={};
    _data = {
        token: $.cookie('token'),
        page:page,
        row:'10',
        sortId:'updateTime',
        sortType:'DESC',
    }
    $.ajax({
        url:commUrl+'/coursewareColumn',//替换
        data:_data,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".grid-body").empty();
            var html = '';
            var sort = 0;
            var page = '';
            if(data.code == '1'){
                $.each(data.data.datas,function(i,key){
                    //$.each(data.data.datas,function(i,key){
                        sort = i + 1;
                        html += '<div class="grid-body-tr" > <div class="" style="width: 70px">'+sort+'</div><div style="width: 230px;">'+key.columnName+'</div> ';

                        if(key.labels.length == '0'){
                            html += '<div class="content" style="width: 230px">暂无标签</div>';
                        }else{
                            var str = '';
                            $.each(key.labels,function(l,val){
                                str += val.labelName+';';
                            })
                            str = str.substr(0,str.length - 1);
                            html += '<div class="content" style="width: 230px">'+str+'</div>';
                        }
                        html+='<div class="startTime" style="width: 250px">'+ key.updateTime+'</div> <div class="operation"  style="width:190px">' +
                            '<a href="javascript:void(0);" class="editTags" data-id="'+key.id+'">编辑</a>' +
                            //'<a href="javascript:void(0);" class="showDeletePop" data-id="'+key.id+'">删除</a>' +
                            '</div> </div>';
                    //})
                })
                if(data.data.page == '1') {
                    page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> ' +
                        '<span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                        ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage">' +
                        '<input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                }
                else if(data.data.page == data.data.pageCount){
                    page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page">' +
                        ' <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                        '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage">' +
                        '<input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                }
                else {
                    page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page">' +
                        ' <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                        '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage">' +
                        '<input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                }

            }
            $(".pages ul").html(page);
            $(".grid-body").html(html);
            editTags();
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}

function prevPage(e) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1'){
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        listPage(page);
    }
}

function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
    }
    else {
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        listPage(page);

    }
}
function turnPage(e){
    var page = 1;
    if(parseInt($(e).prev(".nowPage").val()) <= 1){

    }else if(parseInt($(e).prev(".nowPage").val()) >= parseInt($(".pagecount").text())){
        page = $(".pagecount").text();
    }else{
        page = $(e).prev(".nowPage").val();
    }
    listPage(page);
}

