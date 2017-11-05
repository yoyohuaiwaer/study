/**
 * Created by A on 2017/4/17.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class = "selected"><a alt="courseware-list.html" id="58f461763c9e9c3c425683c8">课件管理</a></li>';
    $(".breadcrumb").html(breadcrumb);
    $.cookie('columnId','0',{path:'/'});
    listPage();
    changeBreadcrumb();
    Column();
    tags();
    addcourseware();
    loadColumn();
    deleteTagsConfirm();
    cancel()
})
function cancel(){
    $(".minor").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(this).parents('.overall').hide();
        //$(".overall1").hide();
    })
}
function deleteTagsConfirm(){
    //$('.deleteTagsConfirm').on('click',function(){
    $('.deleteTagsConfirm').on('click',function(){
        var _id = $(this).attr('data-id');
        var _data = {
            token: $.cookie('token'),
            id: _id
        }
        $.ajax({
            url: commUrl+'/coursewareDel',
            type:'POST',
            data: _data,
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1) {
                    alert('删除成功');
                    listPage();
                    $(".overall").hide();
                }else {
                    alert(data.msg);
                    $(".overall").hide();
                    //$(".overall1").hide();
                    //window.location.href = menuUrl+'index.html';
                }
            },
            error: function(text){
                alert('出错啦~！');
            }
        })
    });
    //});
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
function addcourseware(){
  $('.addcourseware').on('click',function(){
      $.cookie('data-id',$(this).attr('data-id'),{path:'/'})
      //console.log($.cookie('data-id'));
      $.ajax({
          url:menuUrl+'courseware-details.html',
          success: function(data){
              $('.main').html(data);
          }
      })
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
    var obj={};
    switch ($.cookie('columnId')){
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
    }
    //var commUrl ='http://10.10.23.65:8080/manage/'
    $.ajax({
        url:commUrl+'/courseware',//替换
        data:obj,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            //console.log(data);
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
                        html += '<div class="grid-body-tr" > <div style="width: 50px"><span>'+sort+'</span></div><div style="width: 200px"><span>'+key.coursewareName+'</span></div>' +
                            '<div style="width: 150px"><span>'+key.columnName+'</span></div> ';

                        if(key.labels.length == '0'){
                            html += '<div class="content">暂无标签</div>';
                        }else{
                            var str = '';
                            $.each(key.labels,function(l,val){
                                str += val.labelName+';';
                            })
                            str = str.substr(0,str.length - 1);
                            html += '<div style="width: 200px"><span>'+str+'</span></div>';
                        }
                        if(key.imgs.length == 0){
                            html += '<div style="width: 120px"><span>暂无图片</span></div>'
                        }else{
                            html += '<div style="width: 120px"><span><img src="'+key.imgs[0]+'" style="width:80px;"/></span></div>'
                        }
                        html+=' <div class="operation"  style="width:240px">' +
                                //'<a href="javascript:void(0);" class="commend" data-id="'+key.id+'">推荐</a>' +
                                //'<a href="javascript:void(0);" class="toTop" data-id="'+key.id+'">置顶</a>' +
                            '<a href="javascript:void(0);" class="addcourseware" data-id="'+key.id+'">编辑</a>' +
                            '<a href="javascript:void(0);" class="showDeletePop" data-id="'+key.id+'">删除</a></div> </div>';
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
                addcourseware();
                showDeletePop();

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
function showDeletePop(){
    $('.showDeletePop').on('click',function(){
        $('.deleteTagsConfirm').attr({'data-id':$(this).attr('data-id')});
        $('.overall').show();
    })
};
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