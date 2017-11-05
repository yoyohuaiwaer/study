/**
 * Created by A on 2017/7/12.
 */
/**
 * Created by A on 2017/4/17.
 */
$(document).ready(function(){
    /*$(".breadcrumb").empty();
    var breadcrumb = '<li class = "selected"><a alt="courseware-list.html" id="58f461763c9e9c3c425683c8">课件管理</a></li>';
    $(".breadcrumb").html(breadcrumb);*/
    //$.cookie('columnId','0',{path:'/'});
    listPage();
    changeBreadcrumb();
    Column();
    tags();
    loadColumn();
    //deleteTagsConfirm();
    cancel();
    changeStatus();
})
function changeStatus(){
    $('#status').on('change',function(){
        listPage();
    })
}
function cancel(){
    $(".minor").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(this).parents('.overall').hide();
        //$(".overall1").hide();
    })
}
function change(){
    $('.change').on('click',function(){
        var _url = $(this).attr('data-value');
        $.ajax({
            url:_url,
            type: 'POST',
            success: function(data){

            },
            error: function(e){

            }

        })
       // return false;
    })
}
function loadColumn(){
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
        dataType: 'json',
        success: function (data) {
            data = JSON.parse(data);
            if(data.code == 1){
                var html = '<option value="" data-name="">选择栏目</option>'
                $.each(data.data.datas,function(i,key){
                    html += '<option value="'+key.id+'" data-name="'+key.columnName+'">'+key.columnName+'</option>'
                })
                //console.log(html);
                $('#column').html(html);
                var _columnId = $('#column').children('option:selected').val();
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
        if( _columnId !== ''){
            $.cookie('columnId','1',{path:'/'});
        }else{
            $.cookie('columnId','0',{path:'/'});

        }
        listPage();
    })
};

function Column(){
    $('.Column').on('click',function(){
        $.ajax({
            url:menuUrl+'column-list.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    })
}
function tags(){
    $('.tags').on('click',function(){
        $.cookie('tags-type',$(this).attr('tags-type'),{path:'/'})
        $.ajax({
            url:menuUrl+'multimedia-tags.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    })
}
function listPage(page){
    page = page?page:1;
    var obj={token:$.cookie("token"),
        page:page,
        row:'10',
        sortId:'updateTime',
        sortType:'DESC'};
/*    switch ($.cookie('columnId')){
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
                row:'40',
                sortId:'updateTime',
                sortType:'DESC',
                columnId:$('#column').children('option:selected').attr('value')
            }

            //if(_classId !== '' ){
            //    obj.classId = _classId;
            //};
            //if( _type !== ''){
            //    obj.type = _type;
            //};
            break;
        //case '2':
        //    obj={
        //        token:$.cookie("token"),
        //        page:page,
        //        row:'10',
        //        sortId:'updateTime',
        //        sortType:'DESC',
        //    };
        //    if( _type !== ''){
        //        obj.type = _type;
        //    };
        //    if(_classId !== '' ){
        //        obj.classId = _classId;
        //    };
        //    break;
        //case '3':
        //    obj={
        //        token:$.cookie("token"),
        //        page:page,
        //        row:'10',
        //        sortId:'updateTime',
        //        sortType:'DESC',
        //        name: _name
        //    };
    }*/
    var _status = $('#status').children('option:selected').attr('value');
    if(_status !== undefined){
        obj.open = _status;
    }
    //var commUrl ='http://10.10.23.65:8080/manage/'
    $.ajax({
        url:commUrl+'/story',//替换
        data:obj,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".grid-body").empty();
            var html = '';
            var sort = 0;
            var page = '';
            if(data.code == '1'){
                if(data.data.datas.length <= 0){
                    html = '<p style="line-height: 50px; text-align: center;">暂无数据</p>';
                }else{
                    $.each(data.data.datas,function(i,key){
                        sort = i + 1;
                        html += '<div class="grid-body-tr" > <div style="width:80px"><span>'+sort+'</span></div><div style="width: 250px"><span>'+key.name+'</span></div>' +
                            '<div style="width: 200px;  "><span><img style="width:120px; height:80px; vertical-align: middle; padding: 5px 0" src="'+key.img+'"  alt=""/></span></div>';
                        if(key.status == 0){
                            //正式环境推送地址：http://119.23.115.167:7084/app/wx/lsd/pushStory?loginId=oMpca0Z0DPiNSWNkBAGKm6IOXLgo&id=
                            html += '<div  style="width:130px"><span>私有</span></div><div class="operation"  style="width:300px"><a class="change" data-value="http://10.10.0.236:8081/app/wx/lsd/pushStory?loginId=oMpca0Z0DPiNSWNkBAGKm6IOXLgo&id='+key.id+'"data-id="'+key.id+'">推送</a></div></div>';
                        }else if(key.status == 1){
                            html += '<div style="width: 130px"><span>审核中</span></div><div class="operation"  style="width:300px"><a data-value="http://10.10.0.236:8081/app/wx/lsd/pushStory?loginId=oMpca0Z0DPiNSWNkBAGKm6IOXLgo&id='+key.id+'" class="change" data-id="'+key.id+'">推送</a><a href="javascript:void(0);" class="changeOpen" data-id="'+key.id+'" data-status="2">公开</a></div></div>';
                        }else if(key.status == 2){
                            html += '<div style="width: 130px"><span>公开</span></div><div class="operation"  style="width:300px"><a data-value="http://10.10.0.236:8081/app/wx/lsd/pushStory?loginId=oMpca0Z0DPiNSWNkBAGKm6IOXLgo&id='+key.id+'" class="change" data-id="'+key.id+'">推送</a><a href="javascript:void(0);" class="changeOpen" data-id="'+key.id+'" data-status="1">审核</a></div></div> '
                        }
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
                change();
                changeOpen();

            }else{
                alert(data.msg);
            }

        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function changeOpen(){
    $('.changeOpen').on('click',function(){
        var _id = $(this).attr('data-id');
        var _status = $(this).attr('data-status');
        $.ajax({
            url:commUrl +'/story/review',
            data:{
                token: $.cookie('token'),
                id: _id,
                status: _status
            },
            type: 'POST',
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1){
                    var page = $('.onpage').text().toString();
                    listPage(page);
                }
                console.log(data);
            },
            error: function(e){

            }

        })
    })

}
/*function showDeletePop(){
    $('.showDeletePop').on('click',function(){
        $('.deleteTagsConfirm').attr({'data-id':$(this).attr('data-id')});
        $('.overall').show();
    })
};*/
function prevPage(e) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1'){
        $(e).addClass("readonly");
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        listPage(page)
    }
}

function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        $(e).addClass("readonly");
    }
    else {
        //alert($(e).prev("li").find(".onpage").text());
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        listPage(page)

    }
}
//输入框跳转页面
function turnPage(e){
    //alert($(e).prev(".nowPage").val());
    if(parseInt($(e).prev(".nowPage").val()) <= 1){
        var page = 1;
        listPage(page)
    }else if(parseInt($(e).prev(".nowPage").val()) >=parseInt( $(".pagecount").text())){
        var page = $(".pagecount").text();
        listPage(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        listPage(page)

    }
}