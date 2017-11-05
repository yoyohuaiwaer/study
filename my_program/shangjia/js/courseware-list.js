/**
 * Created by A on 2017/5/24.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="courseware-list.html" id="59312f490b82ad25721593a0">课件管理</a></li>';
    $(".breadcrumb").html(breadcrumb);
    loadTid();
    listPage();
    edit();
    deleted();
    hideOverflow();
    hideOverflow1();
    confiemTeach();
})
function loadTid(){
    $.ajax({
        url:commUrl+'/teacher/teacherList',
        type:'GET',
        cach:false,
        aysn: false,
        data:{
            token:$.cookie("token"),
            page:1,
            row: 100,
            sortId:'createTime',
            sortType:'DESC'
        },
        success: function(response){
            var html = '';
            var page = '';
            response = JSON.parse(response);
            if(response.code == 1){
                if(response.data.datas.length == 0){
                    html = '<option>暂无老师</option>';
                }else {
                    //数据循环
                    html +='<option>选择老师</option>';
                    $.each(response.data.datas,function(i,key){
                        html += '<option value="'+key.name+'" id="'+key.id+'" data-username="'+key.username+'">'+key.name+'</option>' ;
                    });
                    $("#tid").empty().html(html);
                    tidChange();
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
function tidChange(){
    $('#tid').on('change',function(){
        listPage();
    });
};
function hideOverflow1(){
    $(".hideOverflow1").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(".overall1").hide();
    })
}

function hideOverflow(){
    $(".hideOverflow").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(".overall").hide();
    })
}

function edit(){
    $('.edit').on('click',function(){
        var id = $(this).attr('data-id');
        $.cookie('sports-id',id,{path:'/'});
        if(id !== ''){

            if($(this).attr('data-tid') !== 'undefined'){

                //console.log($.cookie('usernameCheck'));
                if($.cookie('usernameCheck') == $(this).attr('data-username')){
                    newPage();
                }else {
                    $(".overall1").show();
                    var _username = $(this).attr('data-username');
                    $('#username').val(_username);
                    $('.confiemTeach').attr({'data-status': $(this).attr('data-status')})
                }
            }else {
                newPage();
            }



            //$(".overall1").show();
            //$(".deleted").attr({id: $(this).attr('data-id')});
            //$('.confiemTeach').attr({'data-status': $(this).attr('data-status')})
        }else {
            newPage();
        }

    })
}
function newPage(){
    $.ajax({
        url:menuUrl+'courseware-details.html',
        success: function(data){
            $('.main').html(data);
        }
    })
};
function listPage(page){
    page = page?page:1;
    var _tid = $('#tid').find("option:selected").attr("id");
    if(_tid == undefined){
        var obj={
            token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'updateTime',
            sortType:'DESC'
        };
    }else {
        var obj={
            token:$.cookie("token"),
            page:page,
            tid: _tid,
            row:'10',
            sortId:'updateTime',
            sortType:'DESC'
        };
    }

    /*switch ($.cookie('columnId')){
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
    }*/
    //var commUrl ='http://10.10.23.65:8080/manage/'
    $.ajax({
        url:commUrl+'/courseware',//替换
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
                        html += '<div class="grid-body-tr" > <div style="width: 50px"><span>'+sort+'</span></div><div style="width: 200px"><span>'+key.name+'</span></div>' +
                            '<div style="width: 150px"><span>'+key.type+'</span></div> ';

                        if(key.tid == undefined){
                            html += '<div class="content" style="width: 160px"><span>公共</span></div>';
                        }else{
                            html += '<div class="content" style="width: 160px"><span>'+key.tname+'</span></div>';
                        }
                        //if(key.imgs.length == 0){
                            html += '<div style="width: 200px"><span>'+key.updateTime+'</span></div>'
                        //}else{
                        //    html += '<div style="width: 120px"><span><img src="'+key.imgs[0]+'" style="width:80px;"/></span></div>'
                        //}
                        html+=' <div class="operation"  style="width:200px">' +
                                //'<a href="javascript:void(0);" class="commend" data-id="'+key.id+'">推荐</a>' +
                                //'<a href="javascript:void(0);" class="toTop" data-id="'+key.id+'">置顶</a>' +
                            '<a href="javascript:void(0);" class="edit" data-id="'+key.id+'" data-tid="'+key.tid+'" data-username="'+key.username+'" data-status="1">查看</a>' +
                            '<a href="javascript:void(0);" class="showDeletePop" data-id="'+key.id+'" data-tid="'+key.tid+'" data-username="'+key.username+'" data-status="0">删除</a></div> </div>';
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
                showOverflow();
                edit();

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
function editcourseware(){

};
function confiemTeach(){
    $('.confiemTeach').on('click',function(){
        var _username = $('#username').val();
        var _password = $('#password').val();
        var _status = $(this).attr('data-status');
        console.log(_username);
        console.log(_password);
        $.ajax({
            url: commUrl+'/teacher/valid',
            type:'POST',
            data:{
                token:$.cookie("token"),
                username: _username,
                password: _password
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    var date = new Date();
                    date.setTime(date.getTime()+600*1000);
                    $.cookie('usernameCheck',_username,{expires: date,path:'/'});
                    $.cookie('passwordCheck',_password,{expires: date,path:'/'});
                    if(_status == 1){
                        /*var date = new Date();
                        date.setTime(date.getTime()+600*1000);
                        $.cookie('usernameCheck','true',{expires: date,path:'/'})*/
                        newPage();
                    }else {
                        $(".overall1").hide();
                        $(".overall").show();
                    }

                }else{
                    alert('无权访问该课件');
                    $(".overall1").hide();

                }
            }
        });
    })
}
function showOverflow(){
    $(".showDeletePop").on('click',function(){
        $(".deleted").attr({id: $(this).attr('data-id')});

        if( $(this).attr('data-tid') !== 'undefined'){
            if($.cookie('usernameCheck') !== $(this).attr('data-username')){
                $(".overall1").show();
                //$(".deleted").attr({id: $(this).attr('data-id')});
                var _username = $(this).attr('data-username');
                $('#username').val(_username);
                $('.confiemTeach').attr({'data-status': $(this).attr('data-status')})
            }else{
                $(".overall").show();
            }

        }else{
            $(".overall").show();
        }

    })
};


function deleted(){
    $('.deleted').on('click',function(){
        var id = $(this).attr('id');
        var _data = {
            token:$.cookie("token"),
            id:id
        }
        //_data = JSON.stringify(_data);
        $.ajax({
            url: commUrl+'/courseware/d',
            type:'POST',
            dataType:'json',
            //contentType: 'application/json; charset=UTF-8',
            data: _data,
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    $(".overall").hide();
                    var page =  $('.onpage').text();
                    listPage(page);
                }else{
                    $(".overall").hide();
                    alert(data.msg);
                }
            }
        })
    })
}

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
        listPage(page);
    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
        var page = $(".pagecount").text();
        listPage(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        listPage(page)

    }
}