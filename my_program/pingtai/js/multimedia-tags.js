/**
 * Created by A on 2017/4/10.
 */

$(document).ready(function(){
    //commUrl = 'http://10.10.23.67:8080/qh_server';
    //$.ajax({
    //    url:commUrl+'/menu/findbyid',
    //    data:{
    //        token:$.cookie("token"),
    //        parentId:'58f461763c9e9c3c425683c8'
    //    },
    //    success: function(data){
    //        data = eval('('+data+')');
    //        if(data.code == '1'){
    //            $(".breadcrumb").empty();
    //            var breadcrumb = '<li><a alt="courseware-list.html" id="58f461763c9e9c3c425683c8">课件管理</a></li><li class = "selected" ><a href="javascript:void(0);" onclick="javascript:changePage(this);"  title="'+menuUrl+''+data.data[1].url+'" id="'+data.data[1].id+'">'+data.data[1].name+'</a></li>';
    //            $(".breadcrumb").html(breadcrumb);
    //            changeBreadcrumb();
    //        }
    //    },
    //    error: function(text){
    //        alert(text.readyState);
    //        alert(text.status);
    //    }
    //});
    $(".breadcrumb").empty();
    if($.cookie('tags-type') == 'courseware'){
        var breadcrumb = '<li><a alt="courseware-list.html" id="58f461763c9e9c3c425683c8">课件管理</a></li><li class = "selected" ><a alt="multimedia-tags.html" href="javascript:void(0);" >标签管理</a></li>';
    }else{
        var breadcrumb = '<li><a class="" alt="multimedia-list.html" id="58a110bb30391db6e08754bb">多媒体列表</a></li><li class = "selected" ><a alt="multimedia-tags.html" href="javascript:void(0);" >标签管理</a></li>';
    }

    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    //$.cookie('rel1','0',{path:'/'});
    listPage();
    //hideOverflow1();
    //  detailSearchbtn();
    addMediaTags();
    //showDeletePop();
    hideOverflow();
    loadTags();
    addTagsConfirm();
    addTags();
    //addTagsSucc();
    //deletTagsBox();
    //editTags();
})
function editTags(){
    $('.tagsContent').on('click',function(){
        var html = $(this).text();
        $(this).hide();
        $(this).prev('.deletTagsBox').hide();
        $(this).next('.tags').val(html).show();
    })
}
function deletTagsBox(){
    $('.deletTagsBox').on('click',function(){
        $(this).parent('.tagsBox').remove();
    })
}
function addTagsSucc(){
        $('.tags').on('blur',function(){
            var html = $(this).val();
            if(html !== ''){
                $(this).prev('.tagsContent').empty().html(html).css({'display': 'inline-block'});
                $(this).prev('.tagsContent').prev('.deletTagsBox').css({'display': 'inline-block'})
                $(this).hide();
            }
        });

}
function addTags(){
    $('.addTags').on('click',function(){
        var html = '<div class="tagsBox"> <span class="deletTagsBox">x</span> <span class="tagsContent" data-id=""></span> <input type="text" class="text tags" data-id="" id="tags" value=""/> </div>';
        $(this).before(html);
        addTagsSucc();
        deletTagsBox();
        editTags();
    })
}
function addTagsConfirm(){
    $('.addTagsConfirm').on('click',function(){
        var _desc = [];
        var _id= $(this).attr('data-id');
        $('.tagsContent').each(function(){
            if($(this).attr('data-id') == ''&&  $(this).text()!== ''){
                    var _destDetail = {};
                    _destDetail.labelName = $(this).text();
            }else if($(this).attr('data-id') !== ''&&  $(this).text()!== ''){
                    var _destDetail = {};
                _destDetail.id = $(this).attr('data-id');
                _destDetail.labelName = $(this).text();
                _destDetail.createTime = $(this).attr('data-time');
            }
            if(_destDetail !== undefined){
                _desc.push(_destDetail);
            }

        })
        var _labelGroupName = $('#tagsType').val();
        _desc = JSON.stringify(_desc);
        //console.log(_desc);
        //debugger;
        //var commUrl ='http://10.10.23.65:8080/manage/'
        if(_id ==''){
            var _url = commUrl+'/coursewareLabelGroup?token=' + $.cookie("token")+'&labelGroupName='+_labelGroupName+'&desc';
        }else{
            var _url = commUrl+'/coursewareLabelGroup?token=' + $.cookie("token")+ '&id='+ _id + '&labelGroupName='+_labelGroupName+'&desc';

        }
        $.ajax({
            url: _url,//替换接口
            //data:_data,
            cache:false,
            type:'POST',
            data: _desc,
            dataType: 'json',
            contentType: 'application/json; charset=UTF-8',
            success: function(data){
                alert('成功');
                data = eval('('+data+')');
                if(data.code == '1'){
                    $('.overall1').hide();
                    $('.tagsBox').remove();
                    var page = $('.onpage').text();
                    listPage(page);
                }
            },
            error: function(status){
                console.log(status.readyState);
                console.log(status.state);
                alert('出错啦~！！')
            }
        })

    })
}
function hideOverflow(){
    $('.hideOverflow').on('click',function(){
        $(this).parent('.popap').parent().hide();
        $('.tagsBox').remove();
    })
}
function showDeletePop(){
    $('.showDeletePop').on('click',function(){
        $('.overall').show();//遮罩显示
    })

};
function loadTags(){
    $('.editTags').on('click',function(){
        var _dataID = $(this).attr('data-id');
        $('.addTagsConfirm').attr({'data-id':_dataID});
        $.ajax({
            url:commUrl+'/coursewareLabel',//替换接口
            type:'GET',
            data:{
                token: $.cookie('token'),
                groupId: _dataID
            },
            cache:false,
            success: function(data){
                data = eval('('+data+')');
                //console.log(data);
                if(data.code == '1'){
                    $('#tagsType').val(data.data.labelGroupName);
                    var html ='';
                    $.each(data.data.labels,function(i,key){
                        html +='<div class="tagsBox"> <span class="deletTagsBox" style="display: inline-block">x</span> <span class="tagsContent" data-id="'+key.id+'" data-time="'+key.createTime+'" style="display:inline-block;">'+key.labelName+'</span> <input type="text" class="text tags" data-id="" id="tags" value="'+key.labelName+'" style="display: none"/></div>'
                    })
                    $('.addTags').before(html);
                    addTagsSucc();
                    deletTagsBox();
                    editTags();
                }
            },
            error: function(text){
                console.log(text.readyState);
                console.log(text.state);
            }
        })                        //内容加载
        $('.overall1').show();//遮罩显示
    })
}
function addMediaTags(){
    $('.addMediaTags').on('click',function(){
        $('#tagsType').attr({value:''});
        $('#tags').attr({value:''});
        $('.addClassConfirm').attr({'data-id':''});
        $('.overall1').show();

    });
}

function listPage(page){
    var obj={
        token: $.cookie('token'),
        page:page,
        row:'10',
        sortId:'updateTime',
        sortType:'DESC'
    };
    page = page?page:1;
    /*var _classId = $('#classId').children('option:selected').attr('value');
    var _type = $('#type').children('option:selected').attr('value');
    var _name = $('.searchText').val();*/
    //console.log($.cookie('rel1'));
   /* switch ($.cookie('rel1')){
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
            }

            if(_classId !== '' ){
                obj.classId = _classId;
            };
            if( _type !== ''){
                obj.type = _type;
            };
            break;
        case '2':
            obj={
                token:$.cookie("token"),
                page:page,
                row:'10',
                sortId:'updateTime',
                sortType:'DESC',
            };
            if( _type !== ''){
                obj.type = _type;
            };
            if(_classId !== '' ){
                obj.classId = _classId;
            };
            break;
        case '3':
            obj={
                token:$.cookie("token"),
                page:page,
                row:'10',
                sortId:'updateTime',
                sortType:'DESC',
                name: _name
            };
    }*/

    $.ajax({
        url:commUrl+'/coursewareLabelGroup',//替换
        data:obj,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            //console.log(data);
            //debugger;
            $(".grid-body").empty();
            var html = '';
            var sort = 0;
            var page = '';
            if(data.code == '1'){
                $.each(data.data.datas,function(i,key){
                    sort = i + 1;
                    html += '<div class="grid-body-tr" > <div class="number" style="width: 100px">'+sort+'</div><div class="title" style="width: 230px">'+key.labelGroupName+'</div> ';

                    if(key.labels.length == '0'){
                        html += '<div class="content"  style="width: 230px">暂无标签</div>';
                    }else{
                        var str = '';
                        $.each(key.labels,function(l,val){
                            str += val.labelName+';';
                        })
                        str = str.substr(0,str.length - 1);
                        html += '<div class="content" style="width: 230px">'+str+'</div>';
                    }
                    html+='<div class="startTime" style="width: 240px">'+ key.updateTime+'</div> <div class="operation"  style="width:160px">' +
                        '<a href="javascript:void(0);" class="editTags" data-id="'+key.id+'">编辑</a></div></div>' ;
                        //'<a href="javascript:void(0);" class="showDeletePop" data-id="'+key.id+'">删除</a>
                        ;
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
            showDeletePop();
            loadTags();
        },
        error: function(text){
            alert(text.readyState);
            alert(text.state);
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

