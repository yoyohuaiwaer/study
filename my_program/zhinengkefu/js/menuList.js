/*
 * Created by Administrator on 2016/9/17.
 */
$(document).ready(function() {
    $.ajax({
        url:commUrl+'/appmenu/findparent',
        data:{
            token:$.cookie("token"),
        },
        success: function(data){
            data = eval('('+data+')');
            if(data.code == '1'){
                $(".breadcrumb").empty();
                var breadcrumb = '';
                $.each(data.data, function(i,key){
                    var parentMenuId = this.id;
                    if(i == 0){
                        breadcrumb += '<li class="selected"><span  id="'+parentMenuId+'">'+this.name+'</span><span onclick="showOverall1(this)" id="'+parentMenuId+'" >X</span></li>';
                        $.cookie("currentMenuId",parentMenuId);
                        $.cookie("currentMenuName",this.name);
                        $.ajax(
                            {
                                url: commUrl+'/appmenu/findmenus',
                                data: {
                                    token:$.cookie("token"),
                                    parentId:parentMenuId,
                                    page:"1",
                                    row: '10',
                                    sortId:'createTime',
                                    sortType:'DESC'
                                },
                                dataType: 'json',
                                async: false,
                                success: function (response) {
                                    response = eval('(' + response + ')')
                                    console.log(response);
                                    $(".grid-body").empty();
                                    var html = '';
                                    var page = '';
                                    if(response.code == '1'){
                                        if(response.data.datas == ''){
                                            html='<p>无数据</p>'
                                        }
                                        else{
                                            var sort = 0;
                                            $.each(response.data.datas, function(i,key){
                                                sort = sort+1;
                                                html+=' <div class="grid-body-tr"> <div class="order-number" style="width: 100px;">'+sort+'</div> <div class="industrybox" style="width: 250px;" onclick=""><span >'+key.name+'</span></div>' +
                                                    '<div class="menu-category" style="width: 230px;"><span >';
                                                if(key.category == 1){
                                                    html+= '消息';
                                                }else{
                                                    html+= '跳转';
                                                }
                                                html+='</span></div> <div class="menu-content" style="width: 220px;"><span >';
                                                if(key.category == 2){
                                                if( key.content == 'CallActivity'){
                                                    html+= '呼叫界面';
                                                }
                                                if( key.content == 'MainActivity'){
                                                    html+= '聊天界面';
                                                }
                                                if( key.content == 'MenuActivity'){
                                                    html+= '点菜界面';
                                                }
                                                if( key.content == 'VoiceSettingActivity'){
                                                    html+= '订单详情界面';
                                                }
                                                }else{
                                                     var size = key.content.length;
                                    if(size > 10){
                                        var content = key.content.substring(0,10)+'...';
                                        html+= content;
                                    }else{
                                        html+= key.content;
                                    }                                                }
                                                html+='</span></div><div class="operation" style="width: 160px;"> <a href="javascript:void(0);" onclick="javascript:editMenu(\''+key.id+'\')" class="editMenu"  id="'+key.id+'">修改</a><a href="javascript:void(0);" onclick="javascript:showOverall(this)" id="'+key.id+','+parentMenuId+'" >删除</a></div> </div>';
                                            })
                                        }
                                        if(response.data.page == response.data.pageCount){
                                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage readonly" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                                        }
                                        else {
                                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                                        }

                                    }
                                    $(".grid-body").html(html);
                                    $(".pages ul").html(page);
                                },
                                error: function (text) {
                                    alert(text.readyState);
                                    alert(text.status);
                                }
                            })

                    }else{
                        breadcrumb += '<li><a href="javascript:void(0);"  onclick="javascript:changeMenu(\''+parentMenuId+'\')"  id="'+this.id+'">'+this.name+'</a><span onclick="showOverall1(this)" id="'+parentMenuId+'">X</span></li>';
                    }
                })
                breadcrumb += '<li><input type="button" onclick="javascript:viewAdd();"  id="addParent"  value="+"/></li>' +
                    '<li id="edit" style="display: none" ><input class="text" name="menuName" id="menuName" type="text"/><input type="button" onclick="javascript:addParentMenu();"  class="addScene button"  value="提交"/><input type="button" onclick="javascript:cancleAdd()" class="addScene button" value="取消"/></li>';
                $(".breadcrumb").html(breadcrumb);
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
})

//修改按钮
function editMenu(e){
    $.cookie("currentSonMenuId",e);
    $.ajax(
        {
            url: 'menu-record.html',
            dataType: 'html',
            success: function (response) {
                $(".breadcrumb").empty();
                $(".main").empty().html(response);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}

//修改确认按钮
function submitEdit(e){
    var id = e.id;
    var menuId = id.split(",")[0];
    var parentId = id.split(",")[1];
    var name = $(e).parents(".grid-body-tr").find(".industrybox input").val();
    var category = $(e).parents(".grid-body-tr").find(".category select").val();
    var content = $(e).parents(".grid-body-tr").find(".menu-content select").val();
    $.ajax(
        {
            url: commUrl+'/appmenu/save',
            type: 'POST',
            data: {
                token:$.cookie("token"),
                id: menuId,
                name: name,
                category:category,
                content:content,
                lv:2,
                parentId:parentId
            },
            dataType: 'json',
            async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                //alert(response.msg);
                console.log(response);
                if(response.code == '1'){
                    changeMenu(parentId);
                }
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
};

function deleteParent(e){
    var id = e.id;
    if(id != ""){
        $.ajax(
            {
                url: commUrl+'/appmenu/delete',
                data: {
                    token:$.cookie("token"),
                    id: id
                },
                type:'POST',
                dataType: 'json',
                success: function (response) {
                    response = eval('(' + response + ')')
                    if(response.code == '1'){
                        newPage();
                    }else{
                        alert(response.msg);
                    }
                },
                error: function (text) {
                    alert(text.readyState);
                    alert(text.status);
                }
            });
    }
}

function deleteMenu(e){
    var id = e.id;
    var menuId = id.split(",")[0];
    var parentId = id.split(",")[1];
    $(".overall").hide();
    if(id != ""){
        $.ajax(
            {
                url: commUrl+'/appmenu/delete',
                data: {
                    token:$.cookie("token"),
                    id: menuId
                },
                type:'POST',
                dataType: 'json',
                success: function (response) {
                    response = eval('(' + response + ')')
                    if(response.code == '1'){
                        changeMenu(parentId);
                    }else{
                        alert(response.msg);
                    }
                },
                error: function (text) {
                    alert(text.readyState);
                    alert(text.status);
                }
            });
    }
}

function viewAdd(){
    $("#addParent").hide();
    $("#edit").show();
}
function cancleAdd(){
    $("#addParent").show();
    $("#edit").hide();
}
function addParentMenu(){
    var name = $("#menuName").val();
   if(name == ''){
       alert("菜单名不能为空");
   }else{
       $.ajax(
           {
               url: commUrl+'/appmenu/save',
               data: {
                   token:$.cookie("token"),
                   name: name,
                   lv:'1'
               },
               type:'POST',
               dataType: 'json',
               success: function (response) {
                   response = eval('(' + response + ')')
                   console.log(response);
                   if(response.code == '1'){
                       newPage();
                   }else{
                       alert(response.msg);
                   }
               },
               error: function (text) {
                   alert(text.readyState);
                   alert(text.status);
               }
           });
   }
}

function newPage(){
    $.get('menu-list.html',{token:$.cookie("token")},function(response){
        $(".main").empty().html(response);
    })
}

function changeMenu(parentMenuId){
    $.ajax({
        url:commUrl+'/appmenu/findparent',
        data:{
            token:$.cookie("token"),
        },
        success: function(data){
            data = eval('('+data+')');
            if(data.code == '1'){
                $(".breadcrumb").empty();
                var breadcrumb = '';
                $.each(data.data, function(i,key){
                    if(key.id == parentMenuId){
                        breadcrumb += '<li class="selected"><span  id="'+parentMenuId+'">'+key.name+'</span><span id="deleteParentMenu" onclick="javascript:deleteParent(\''+parentMenuId+'\')">X</span></li>';
                        $.cookie("currentMenuId",parentMenuId);
                        $.cookie("currentMenuName",this.name);
                        $.ajax(
                            {
                                url: commUrl+'/appmenu/findmenus',
                                data: {
                                    token:$.cookie("token"),
                                    parentId:parentMenuId,
                                    page:"1",
                                    row: '10',
                                    sortId:'createTime',
                                    sortType:'DESC'
                                },
                                dataType: 'json',
                                async: false,
                                success: function (response) {
                                    response = eval('(' + response + ')')
                                    console.log(response);
                                    $(".grid-body").empty();
                                    var html = '';
                                    var page = '';
                                    if(response.code == '1'){
                                        if(response.data.datas == ''){
                                            html='<p>无数据</p>'
                                        }
                                        else{
                                            var sort = 0;
                                            $.each(response.data.datas, function(i,key){
                                                sort = sort+1;
                                                 html+=' <div class="grid-body-tr"> <div class="order-number" style="width: 100px;">'+sort+'</div> <div class="industrybox" style="width: 250px;" onclick=""><span >'+key.name+'</span></div>' +
                                                    '<div class="menu-category" style="width: 230px;"><span >';
//                                              html+=' <div class="grid-body-tr"> <div class="order-number">'+sort+'</div> <div class="industrybox" onclick=""><span >'+key.name+'</span></div><div class="menu-category"><span >';
                                                if(key.category == 1){
                                                    html+= '消息';
                                                }else{
                                                    html+= '跳转';
                                                }
                                                html+='</span></div> <div class="menu-content"><span >';
                                                if(key.category == 2){
                                                    if( key.content == 'CallActivity'){
                                                        html+= '呼叫界面';
                                                    }
                                                    if( key.content == 'MainActivity'){
                                                        html+= '聊天界面';
                                                    }
                                                    if( key.content == 'MenuActivity'){
                                                        html+= '点菜界面';
                                                    }
                                                    if( key.content == 'VoiceSettingActivity'){
                                                        html+= '订单详情界面';
                                                    }
                                                }else{
                                                     var size = key.content.length;
                                    if(size > 10){
                                        var content = key.content.substring(0,10)+'...';
                                        html+= content;
                                    }else{
                                        html+= key.content;
                                    }                                                }
                                                html+='</span></div><div class="operation" style="width: 160px;"> <a href="javascript:void(0);" onclick="javascript:editMenu(\''+key.id+'\')" class="editMenu"  id="'+key.id+'">修改</a><a href="javascript:void(0);" onclick="javascript:showOverall(this)" id="'+key.id+','+parentMenuId+'" >删除</a></div> </div>';
                                            })
                                        }
                                        if(response.data.page == response.data.pageCount){
                                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage readonly" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                                        }
                                        else {
                                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                                        }

                                    }
                                    $(".grid-body").html(html);
                                    $(".pages ul").html(page);
                                },
                                error: function (text) {
                                    alert(text.readyState);
                                    alert(text.status);
                                }
                            })

                    }else{
                        breadcrumb += '<li><a href="javascript:void(0);"  onclick="javascript:changeMenu(\''+key.id+'\')"  id="'+this.id+'">'+this.name+'</a><span id="deleteParentMenu" onclick="javascript:deleteParent(\''+key.id+'\')">X</span></li>';
                    }
                })
                breadcrumb += '<li><input type="button" onclick="javascript:viewAdd();"  id="addParent"  value="+"/></li><li id="edit" style="display: none" ><input class="text" name="menuName" id="menuName" type="text"/><input type="button" onclick="javascript:addParentMenu();"  class="addScene button"  value="提交"/><input type="button" onclick="javascript:cancleAdd()" class="addScene button" value="取消"/></li>';
                $(".breadcrumb").html(breadcrumb);
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
}


//&lsaquo;
function prevPage(e,parentMenuId) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1'){
        $(e).addClass("readonly");
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        $.ajax(
            {
                url: commUrl+'/appmenu/findmenus',
                data: {
                    token:$.cookie("token"),
                    parentId:parentMenuId,
                    page:page,
                    row: '10',
                    sortId:'createTime',
                    sortType:'DESC'
                },
                dataType: 'json',
                async: false,
                success: function (response) {
                    response = eval('(' + response + ')')
                    console.log(response);
                    $(".grid-body").empty();
                    $(".pages ul").empty()
                    var html = '';
                    var page = '';
                    if(response.code == '1'){
                        if(response.data.datas == ''){
                            html='<p>无数据</p>'
                        }
                        else{
                            var sort = 0;
                            $.each(response.data.datas, function(i,key){
                                sort = sort+1;
                                 html+=' <div class="grid-body-tr"> <div class="order-number" style="width: 100px;">'+sort+'</div> <div class="industrybox" style="width: 250px;" onclick=""><span >'+key.name+'</span></div>' +
                                                    '<div class="menu-category" style="width: 230px;"><span >';
//                              html+=' <div class="grid-body-tr"> <div class="order-number">'+sort+'</div> <div class="industrybox" onclick=""><span >'+key.name+'</span></div><div class="menu-category"><span >';
                                if(key.category == 1){
                                    html+= '消息';
                                }else{
                                    html+= '跳转';
                                }
                                html+='</span></div> <div class="menu-content"><span >';
                                if(key.category == 2){
                                    if( key.content == 'CallActivity'){
                                        html+= '呼叫界面';
                                    }
                                    if( key.content == 'MainActivity'){
                                        html+= '聊天界面';
                                    }
                                    if( key.content == 'MenuActivity'){
                                        html+= '点菜界面';
                                    }
                                    if( key.content == 'VoiceSettingActivity'){
                                        html+= '订单详情界面';
                                    }
                                }else{
                                     var size = key.content.length;
                                    if(size > 10){
                                        var content = key.content.substring(0,10)+'...';
                                        html+= content;
                                    }else{
                                        html+= key.content;
                                    }
                                }
                                html+='</span></div><div class="operation" style="width: 160px;"> <a href="javascript:void(0);" onclick="javascript:editMenu(\''+key.id+'\')" class="editMenu"  id="'+key.id+'">修改</a><a href="javascript:void(0);" onclick="javascript:showOverall(this)" id="'+key.id+','+parentMenuId+'" >删除</a></div> </div>';
                            })
                        }
                        if(response.data.page == '1'){
                            page = '<li class="prevPage readonly" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                        }
                        else {
                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                        }


                    }
                    $(".grid-body").html(html);
                    $(".pages ul").html(page);
                },
                error: function (text) {
                    alert(text.readyState);
                    alert(text.status);
                }
            });
    }
}


//&rsaquo;
function nextPage(e,parentMenuId){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        $(e).addClass("readonly");
    }
    else {
        //alert($(e).prev("li").find(".onpage").text());
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        //alert(page);
        $.ajax(
            {
                url: commUrl+'/appmenu/findmenus',
                data: {
                    token:$.cookie("token"),
                    parentId:parentMenuId,
                    page:page,
                    row: '10',
                    sortId:'createTime',
                    sortType:'DESC'
                },
                dataType: 'json',
                async: false,
                success: function (response) {
                    response = eval('(' + response + ')')
                    console.log(response);
                    $(".grid-body").empty();
                    $(".pages ul").empty()
                    var html = '';
                    var page = '';
                    if(response.code == '1'){
                        if(response.data.datas == ''){
                            html='<p>无数据</p>'
                        }
                        else{
                            var sort = 0;
                            $.each(response.data.datas, function(i,key){
                                sort = sort+1;
                                html+=' <div class="grid-body-tr"> <div class="order-number" style="width: 100px;">'+sort+'</div> <div class="industrybox" style="width: 250px;" onclick=""><span >'+key.name+'</span></div>' +
                                                    '<div class="menu-category" style="width: 230px;"><span >';
//                              html+=' <div class="grid-body-tr"> <div class="order-number">'+sort+'</div> <div class="industrybox" onclick=""><span >'+key.name+'</span></div><div class="menu-category"><span >';
                                if(key.category == 1){
                                    html+= '消息';
                                }else{
                                    html+= '跳转';
                                }
                                html+='</span></div> <div class="menu-content"><span >';
                                if(key.category == 2){
                                    if( key.content == 'CallActivity'){
                                        html+= '呼叫界面';
                                    }
                                    if( key.content == 'MainActivity'){
                                        html+= '聊天界面';
                                    }
                                    if( key.content == 'MenuActivity'){
                                        html+= '点菜界面';
                                    }
                                    if( key.content == 'VoiceSettingActivity'){
                                        html+= '订单详情界面';
                                    }
                                }else{
                                    var size = key.content.length;
                                    if(size > 10){
                                        var content = key.content.substring(0,10)+'...';
                                        html+= content;
                                    }else{
                                        html+= key.content;
                                    }                                
				}
                                html+='</span></div><div class="operation" style="width: 160px;"> <a href="javascript:void(0);" onclick="javascript:editMenu(\''+key.id+'\')" class="editMenu"  id="'+key.id+'">修改</a><a href="javascript:void(0);" onclick="javascript:showOverall(this)" id="'+key.id+','+parentMenuId+'" >删除</a></div> </div>';
                            })
                        }
                        if(response.data.page == response.data.pageCount){
                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage readonly" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                        }
                        else {
                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                        }


                    }
                    $(".grid-body").html(html);
                    $(".pages ul").html(page);
                },
                error: function (text) {
                    alert(text.readyState);
                    alert(text.status);
                }
            });
    }
}

function toPage(pageCount,parentMenuId){
    var num = $("#num").val();
    var page = 1;
    if(num != ""){
        if(num <= 1){
            page =1
        }else if(num >= pageCount){
            page = pageCount;
        }else{
            page = num;
        }
        $.ajax(
            {
                url: commUrl+'/appmenu/findmenus',
                data: {
                    token:$.cookie("token"),
                    parentId:parentMenuId,
                    page:page,
                    row: '10',
                    sortId:'createTime',
                    sortType:'DESC'
                },
                dataType: 'json',
                async: false,
                success: function (response) {
                    response = eval('(' + response + ')')
                    //console.log(response);
                    $(".grid-body").empty();
                    $(".pages ul").empty()
                    var html = '';
                    var page = '';
                    if(response.code == '1'){
                        if(response.data.datas == ''){
                            html='<p>无数据</p>'
                        }
                        else{
                            var sort = 0;
                            $.each(response.data.datas, function(i,key){
                                sort = sort+1;
                                html+=' <div class="grid-body-tr"> <div class="order-number" style="width: 100px;">'+sort+'</div> <div class="industrybox" style="width: 250px;" onclick=""><span >'+key.name+'</span></div>' +
                                                    '<div class="menu-category" style="width: 230px;"><span >';
//                              html+=' <div class="grid-body-tr"> <div class="order-number" >'+sort+'</div> <div class="industrybox" onclick=""><span >'+key.name+'</span></div><div class="menu-category"><span >';
                                if(key.category == 1){
                                    html+= '消息';
                                }else{
                                    html+= '跳转';
                                }
                                html+='</span></div> <div class="menu-content"><span >';
                                if(key.category == 2){
                                    if( key.content == 'CallActivity'){
                                        html+= '呼叫界面';
                                    }
                                    if( key.content == 'MainActivity'){
                                        html+= '聊天界面';
                                    }
                                    if( key.content == 'MenuActivity'){
                                        html+= '点菜界面';
                                    }
                                    if( key.content == 'VoiceSettingActivity'){
                                        html+= '订单详情界面';
                                    }
                                }else{
                                     var size = key.content.length;
                                    if(size > 10){
                                        var content = key.content.substring(0,10)+'...';
                                        html+= content;
                                    }else{
                                        html+= key.content;
                                    }                                }
                                html+='</span></div><div class="operation" style="width: 160px;"> <a href="javascript:void(0);" onclick="javascript:editMenu(\''+key.id+'\')" class="editMenu"  id="'+key.id+'">修改</a><a href="javascript:void(0);" onclick="javascript:showOverall(this)" id="'+key.id+','+parentMenuId+'" >删除</a></div> </div>';
                            })
                        }
                        if(response.data.page == response.data.pageCount){
                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage readonly" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                        }
                        else {
                            page = '<li class="prevPage" onclick="javascript:prevPage(this,\''+parentMenuId+'\')" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> <li class="nextPage" onclick="javascript:nextPage(this,\''+parentMenuId+'\')">&rsaquo;</li><li class="turnPage"><input id="num" type="number" class="nowPage"/><input onclick="javascript:toPage(\''+response.data.pageCount+'\',\''+parentMenuId+'\')" type="button" value="跳转"/></li>'
                        }


                    }
                    $(".grid-body").html(html);
                    $(".pages ul").html(page);
                },
                error: function (text) {
                    alert(text.readyState);
                    alert(text.status);
                }
            });
    }
}

//弹出遮罩
function showOverall(e){
    //alert("123");
    $(".deleteMenu").attr({id: e.id}).show();
    $(".overall").show();
    $(".deleteParent").hide();
    //$(".deleteMenu");
}
function showOverall1(e){
    //alert("123");
    $(".deleteParent").attr({id: e.id}).show();
    $(".overall").show();
    $(".deleteMenu").hide();
}
function clearOverall(e){
    $(".overall").hide();
}

//新增问答按钮
function addMenu(e){
    $.ajax(
        {
            url: 'menu-record.html',
            dataType: 'html',
            success: function (response) {
                $(".breadcrumb").empty();
                $(".main").empty().html(response);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}
