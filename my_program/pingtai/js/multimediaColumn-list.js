/**
 * Created by A on 2017/4/13.
 */
/**
 * Created by A on 2017/4/10.
 */

$(document).ready(function(){
    //commUrl = 'http://10.10.23.67:8080/qh_server';
    $(".breadcrumb").empty();
    var breadcrumb = '<li><a class="" alt="multimedia-list.html" id="58a110bb30391db6e08754bb">多媒体列表</a></li><li class="selected"><a class="" alt="multimediaColumn-list.html" id="">栏目管理</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    $.cookie('rel1','0',{path:'/'});
    loadColumn();
    listPage();
    loadColumn();
    addColumn();
    hideOverflow1();
    addSceneConfirm();
    //deletedColumn();
    deletedCol();
    deleteColConfirm();
    deleteTagsConfirm();

})
function deleteTagsConfirm(){
    $('.deleteTagsConfirm').on('click',function(){
        var _id = $(this).attr('data-id');
        var _data = {
            token: $.cookie('token'),
            id: _id
        }
        $.ajax({
            url: commUrl+'/content/deleteColumn',
            //type:'POST',
            data: _data,
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1) {
                    alert('删除成功');

                    listPage();
                    $("#overall").hide();
                }else {
                    alert(data.msg);
                    $("#overall").hide();
                    //$(".overall1").hide();
                    //window.location.href = menuUrl+'index.html';
                }
            },
            error: function(text){
                alert('出错啦~！');
            }
        })
    });
};
function deleteColConfirm(){
    $('.deleteColConfirm').on('click',function(){
        var _id = $('#column1').children('option:selected').attr('data-id');
        var _data = {
            token: $.cookie('token'),
            id: _id
        }
        $.ajax({
            url: commUrl+'/content/deleteColumn',
            //type:'POST',
            data: _data,
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1) {
                    alert('删除成功');
                    loadColumn();
                    $("#deleColumn").hide();
                }else {
                    alert(data.msg);
                    $("#deleColumn").hide();
                    //window.location.href = menuUrl+'index.html';
                }
            },
            error: function(text){
                alert('出错啦~！');
            }
        })
    })
}
function deletedCol(){
    $('.deletedCol').on('click',function(){
        $('#deleColumn').show();
    })
}
function loadColumnName(){
    $('.loadColumnName').on('click',function(){
        var _columnName = $(this).text();
        var _id = $(this).attr('data-id');
        /*$('.deleted').show();*/
        $('.addScene').attr({'data-id':_id});
        $('.confirmDele').hide();
        $('.EditCol').show();
        $('#newScene').val(_columnName);
        $('#editColu').show();//遮罩显示
    });
}
function addSceneConfirm() {
    $('.addScene').on('click',function(){
        var name = $('#newScene').val();
        name = name.replace(/['\t]/g,'').replace(/\s*/g, '');
        var _data={}
        if($(this).attr('data-id')==''){
            _data = {
                token:$.cookie("token"),
                column:name
            }
        }else{
            _data = {
                token:$.cookie("token"),
                column:name,
                id:$(this).attr('data-id')
            }
        }
        $.ajax({
            url: commUrl+'/content/updateColumn',
            type:'POST',
            data: _data,
            success: function(data){
                data = JSON.parse(data);
                console.log()
                if(data.code == 1) {
                    alert('成功');
                    loadColumn();
                    $("#editColu").hide();
                    listPage();
                }else {
                    alert(data.msg);
                    $("#editColu").hide();
                    listPage();
                }
            },
            error: function(text){
                alert('出错啦~！');
            }
        })
    });
};
function hideOverflow1(){
    $(".minor").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(this).parents('.overall').hide();
        //$(".overall1").hide();
    })
}
function newPage(){
    $.ajax({
        url:menuUrl+'multimediaColumn-details.html',
        success: function(data){
            $('.main').html(data);
        }
    })
}

function editTags(){

    $('.editTags').on('click',function(){
        $.cookie('album-id',$(this).attr('data-id'),{path:'/'});
        newPage();
    });
}

function hideOverflow(){
    $('.hideOverflow').on('click',function(){
        $(this).parent('.popap').parent().hide();
    })
}
/*function showDeletePop(){
    $('.showDeletePop').on('click',function(){
        $('.overall').show();//遮罩显示
    })

};*/
function loadColumn(){
    //获取分栏
    $.ajax({
        url: commUrl+'/content/getcolu',
        async: false,
        //cache: false,
        data:{
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1){
                var html = '';
                html += '<option value="" data-id="">所有栏目</option>';
                columnInfo = data.data
                $.each(data.data, function(i,key){
                    html += '<option value="'+key.name+'" data-id="'+key.id+'">'+key.name+'</option>';
                })
                $('#column').html(html);
                choseColumn();
                $('#column1').html(html);
                columnInfo = data.data

            }
        },
        error: function(text){
            alert('出错了~~！');
        }
    });
}
function choseColumn(){
    $('#column').on('change',function(){
        var _value = $(this).children('option:selected').attr('value');
        if(_value !== ''){
            $.cookie('rel1','1',{path:'/'});
        }else {
            $.cookie('rel1','0',{path:'/'});
        }
        //classify(_value);
        listPage();
    })
}
function addColumn(){
    $('.showOverflow1').on('click',function(){
        $('.confirmDele').show();
        $('.EditCol').hide();
        $(".overall1").show();
    });
}
function listPage(page){
    var obj={};
    page = page?page:1;
    switch ($.cookie('rel1')){
        case '0':
            obj={
                token:$.cookie("token"),
                page:page,
                row:'10',
                sortId:'updateTime',
                sortType:'DESC'
            }
            break;
        case '1':
            obj={
                token:$.cookie("token"),
                page:page,
                row:'10',
                sortId:'updateTime',
                sortType:'DESC',
                column:$('#column').children('option:selected').attr('value')
            }

    //        if(_classId !== '' ){
    //            obj.classId = _classId;
    //        };
    //        if( _type !== ''){
    //            obj.type = _type;
    //        };
            break;
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
    }
    //var _data={};
    //_data = {
    //    token: $.cookie('token'),
    //    page:page,
    //    row:'10',
    //    sortId:'updateTime',
    //    sortType:'DESC',
    //}
    $.ajax({
        url:commUrl+'/content/getColumnList',//替换
        data:obj,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            //console.log(data);
            /*debugger;*/
            $(".grid-body").empty();
            var html = '';
            var sort = 0;
            var page = '';
            if(data.code == '1'){
                //console.log(columnInfo);
                //debugger;
                $.each(data.data.datas,function(i,key){

                    sort = i + 1;
                    html += '<div class="grid-body-tr" > <div style="width: 100px"><span>'+sort+'</span></div>' ;
                    //var newHtml = ''
                    $.each(columnInfo,function(num,val){
                        if(val.name == key.column   ){
                            html +='<div style="width: 220px"><span><a data-id="'+val.id+'" class="loadColumnName">'+val.name+'</a></span></div>';
                        }
                    })

                    html += '<div style="width: 220px"><span>'+key.classify+'</span></div> ';

                    if( key.labels == undefined){
                        html += '<div class="content" style="width: 250px"><span>暂无标签</span></div>';
                    }else{
                        var str = '';
                        $.each(key.labels,function(l,val){
                            str += val.labelName+';';
                        })
                        str = str.substr(0,str.length - 1);
                        html += '<div class="content" style="width: 250px"><span>'+str+'</span></div>';
                    }
                    html+='<div class="operation"  style="width:170px"><span>' +
                        '<a href="javascript:void(0);" class="editTags" data-id="'+key.id+'" data-column="'+key.column+'" data-classify="'+key.classify+'">编辑</a>' +
                        '<a href="javascript:void(0);" class="showDeletePop" data-id="'+key.id+'" data-column="'+key.column+'" data-classify="'+key.classify+'">删除</a></span></div> </div>';
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
            loadColumnName();
            showDeletePop();
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function showDeletePop(){
    $('.showDeletePop').on('click',function(){
        $('.deleteTagsConfirm').attr({'data-id':$(this).attr('data-id')});
        $('#overall').show();
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


