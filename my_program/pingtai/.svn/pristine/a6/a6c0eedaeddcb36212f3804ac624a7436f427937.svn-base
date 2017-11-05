/**
 * Created by Administrator on 2016/9/17.
 */
//页面加载
//var commUrl = 'http://172.16.8.70:8080/manage';//明伟
//var commUrl = 'http://172.16.8.71:8080/manage';//胡威
$(document).ready(function() {
    //面包屑加载
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="currency-QA.html" id="5850bfeeb2a99afa74c513ad">官方通用问答库列表</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();

    if($.cookie('nowpage1') == 1){
        pagenation();
    }else {
        var page = $.cookie('nowpage1');
        pagenation(page);

    }

    //列表加载
    $.cookie('rel1','1',{path:'/'});
    loadSecene();
    searchbtn();
    addQuestion();
    deleted();
    hideOverflow();
    hideOverflow1();
    sceneChange();
    addScene();
    addSceneConfirm();
});
function sceneChange(){
    $('#scene').change(function(){
        $.cookie('rel1','2',{path:'/'});
        //$(this).children('option:selected').attr('value');
        //console.log($(this).children('option:selected').attr('value'));
        pagenation();
    })
}
function loadSecene(){
    $.ajax({
        url:commUrl+'/qa/industry',
        async: false,
        data:{
            token:$.cookie("token"),
            //industryId: $.cookie('industryId'),
            page:1,
            row: 10000,
        },
        success: function(response){
            response = JSON.parse(response);
            //console.log(response);
            if(response.code == 1){
                var html = '';
                $('#scene').empty();
                html += '<option value="none">选择场景</option>';
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
function addSceneConfirm() {
    $('.addScene').on('click',function(){
        var name = $('#newScene').val();
        name = name.replace(/['\t]/g,'').replace(/\s*/g, '');
        $.ajax({
            url: commUrl+'/qa/savescene',
            type:'POST',
            data:{
                token:$.cookie("token"),
                //industry:$.cookie('industryName') ,
                //industryId: $.cookie('industryId'),
                name:name
            },
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1) {
                    $(".overall1").hide();
                }else if(data.code == -1){
                    alert(data.msg);
                    //$(".overall1").hide();
                    //window.location.href = menuUrl+'index.html';
                }
            }
        })
    });
};
function addScene(){
    $('.showOverflow1').on('click',function(){
        $(".overall1").show();
    });
}
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
            //console.log(data);
            if(data.code == 1) {
                var breadcrumb1 = '';
                breadcrumb1 = '<li class=""><a alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
                //alert(breadcrumb1);
                $(".breadcrumb").append(breadcrumb1);
                changeBreadcrumb();
            }
        }
    })
}


function searchbtn(){
    $('.searchbtn').on('click',function(){
        $.cookie('rel1', $(this).attr('data-status'),{path:'/'});
        pagenation();

    })
};
function pagenation(page){
    page = page?page:1;
    var obg = {
    };
    if($.cookie('rel1') == 0){
        var condition = $('#search').children('option:selected').val();
        var text = $('.searchText').val();
        var scene = '' ;
        var key = '';
        var ans = '';
        if($('#scene').children('option:selected').val() !== 'none'){
            scene = $('#scene').children('option:selected').val();
        };
        if($('#search').children('option:selected').val() == '关键词') {
            //debugger;
            key = $('.searchText').val();
        }else {
            ans = $('.searchText').val();
        }
        obg = {
            token:$.cookie("token"),
            key: key,
            ans: ans,
            scene: scene,
            page:page,
            row: '10',
            sortId:'createTime',
            sortType:'DESC'
        }
    }else if($.cookie('rel1') == 1) {
        obg = {
            token:$.cookie("token"),
            page:page,
            row: '10',
            sortId:'createTime',
            sortType:'DESC'
        }
    }else if($.cookie('rel1') == 2){
        var scene = '' ;
        var key = '';
        var ans = '';
        //debugger;
        if($('#scene').children('option:selected').attr('value') !== 'none'){
            scene = $('#scene').children('option:selected').val();
        };
        obg = {
            token:$.cookie("token"),
            key: key,
            ans: ans,
            scene: scene,
            page:page,
            row: '10',
            sortId:'createTime',
            sortType:'DESC'
        }

    }
    $.ajax(
        {
            url: commUrl+'/qacategory/list',
            data: obg,
            dataType: 'json',
            async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                //console.log(response);
                //debugger;
                $(".grid-body").empty();
                $(".pages ul").empty()
                var html = '';
                var page = '';
                if(response.code == '1'){
                    if(response.data.datas == ''){
                        html='<p>暂无数据，请添加问答</p>'
                    }else {
                        var sort = 0;
                        $.each(response.data.datas, function(i,key){
                            var question = key.question;
                            var id = key.id;
                            //console.log(key);
                            $.each(key.answers,function(num,value){
                                //question = question;
                                sort = sort+1;
                                //console.log(value);
                                html+=' <div class="grid-body-tr"> <div class=""><span>'+sort+'</span></div><div class=""><span>'+key.scene+'</span></div><div class=""><span>'+key.question+'</span></div><div class=""><span title="'+id+'">'+key.mainKey+'</span></div>' +
                                    ' <div><span >'+value.text+'</span></div>' ;
                                if(value.action == 'none'|| value.action == ''){
                                    html+= '<div><span>无动作</span></div>' ;
                                }else if(value.action == 'happy'){
                                    html+= '<div><span>开心</span></div>';
                                }else if(value.action == 'sad'){
                                    html+= '<div><span>悲伤</span></div>';
                                }else if(value.action == 'thinking'){
                                    html+= '<div><span>思考</span></div>';
                                }else if(value.action == 'angry'){
                                    html+= '<div><span>愤怒</span></div>';
                                }else if(value.action == 'goodBye'){
                                    html+= '<div><span>再见</span></div>';
                                }

                                html+= '<div><span><a class="checkquestion" rel="0" data-id="'+id+'">查看</a><a class="overflowShow" rel="'+id+'" alt="'+value.text+'">删除</a></span></div></div>';
                            })
                        })
                        if(response.data.page == response.data.pageCount){
                            page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                                '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                        }
                        else if(response.data.page == '1') {
                            page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                                ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                        }
                        else {
                            page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                                '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" min="1" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                        }
                    }

                }
                $(".grid-body").html(html);
                $(".pages ul").html(page);
                checkquestion();
                showOverflow();
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });

}
function prevPage(e) {
    $(e).next("li").find(".onpage").text();

    if($(e).next("li").find(".onpage").text() == '1'){
        $(e).addClass("readonly");
    }
    else {
        var page = $(e).next("li").find(".onpage").text() - 1;
        pagenation(page)
    }
}

function nextPage(e){
    if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()){
        $(e).addClass("readonly");
    }
    else {
        //alert($(e).prev("li").find(".onpage").text());
        var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
        pagenation(page)

    }
}
//输入框跳转页面
function turnPage(e){
    //alert($(e).prev(".nowPage").val());
    if(parseInt($(e).prev(".nowPage").val()) <= 1){
        var page = 1;
        pagenation(page);
    }else if(parseInt($(e).prev(".nowPage").val()) >= parseInt($(".pagecount").text())){
        var page = $(".pagecount").text();
        pagenation(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        pagenation(page)

    }
}
function checkquestion(){
    $('.checkquestion').on('click',function(){
        $.cookie('qusID',$(this).attr('data-id'),{path:'/'});
        $.cookie('rel',$(this).attr('rel'),{path:'/'});
        //$.cookie('ansTxt',$(this).attr('alt'),{path:'/'});
        $.cookie('nowpage1',$('.onpage').text(),{path:'/'});
        $.ajax({
            url:menuUrl+'add-currencyQA.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    })
}
function addQuestion(){
    $('.addQuestion').on('click',function(){
        $.cookie('rel',$(this).attr('rel'),{path:'/'});
        //pagenation(1,true)
        $.ajax({
            url:menuUrl+'add-currencyQA.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    });

}
function showOverflow(){

    $(".overflowShow").on('click',function(){
        $(".deleted").attr({id: $(this).attr('rel'),rel:$(this).attr('alt')});
        $(".overall").show();
    })
};
function deleted(){
    $(".deleted").on('click',function(){
        //alert($(this).attr('id'));
        $.ajax({
            url: commUrl+'/qacategory/del',
            type:'POST',
            data:{
                token:$.cookie("token"),
                id:$(this).attr('id'),
                //industry:$.cookie("industryName"),
                //text:$(this).attr('rel')
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    var page =  $('.onpage').text();
                    pagenation(page);
                    $(".overall").hide();
                }
            }
        })
    })
}
function hideOverflow(){
    $(".hideOverflow").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(".overall").hide();
    })
}
function hideOverflow1(){
    $(".hideOverflow1").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(".overall1").hide();
    })
}




