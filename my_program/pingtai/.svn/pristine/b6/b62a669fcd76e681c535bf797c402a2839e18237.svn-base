/**
 * Created by A on 2017/2/13.
 */
//var commUrl = 'http://172.16.8.70:8080/manage';
//页面加载
$(document).ready(function() {
    //面包屑加载
    $(".breadcrumb").empty();
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            parentId:'58a1109330391db6e08754ba'
        },
        success: function(data){
            data = JSON.parse(data);

            if(data.code == 1) {
                var breadcrumb = '';
                breadcrumb += '<li class="selected"><a class="" alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
                //var parentId = data.data[0].id;
                //findMenus(parentId);
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
            }
        }
    })
    //列表加载
    if($.cookie('nowPage') == 1 || $.cookie('nowPage') == undefined){
        $.cookie('rel1','0',{path:'/'});
        pagenation();
    }else {
        var _page;
        _page = $.cookie('nowPage');
        pagenation(_page);
        var _nowPage = parseInt('1');
        $.cookie('nowPage',_nowPage,{path:'/'});
    }

    //关闭遮罩
    hideOverflow();
    //删除内容
    deleted();
    loadColumn();
    detailSearchbtn();
    tags();
    Column();
})
function Column(){
    $('.Column').on('click',function(){
        $.ajax({
            url:menuUrl+'multimediaColumn-list.html',
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
function detailSearchbtn(){
  $('.searchbtn').on('click',function(){
      $.cookie('rel1','3',{path:'/'});
      pagenation();
  });
};
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
                $.each(data.data, function(i,key){
                    html += '<option value="'+key.name+'" data-id="'+key.id+'">'+key.name+'</option>';
                })
                $('#column').html(html);
                choseColumn();

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
        classify(_value);
        pagenation();
    })
}
function classify(id){
    //获取分类
    if(id == ''){
        var html = '<option value="" selected="selected">所有专辑</option>';
        $('#classify').empty().html(html);
    }else {
        $.ajax({
            url: commUrl+'/content/getclassify',
            async: false,
            data:{
                token:$.cookie("token"),
                column:id
            },
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1){
                    var html = '';
                    html += '<option value="" selected="selected">所有专辑</option>';
                    $.each(data.data, function(i,key){
                        html += '<option value="'+key.name+'" data-id="'+key.id+'">'+key.name+'</option>';
                    })

                    $('#classify').empty().html(html);
                    ChoseClassify();
                }
            },
            error: function(text){
                alert('出错了~~！');
            }
        });
    }

}
function ChoseClassify(){
    $('#classify').on('change',function(){
        var _value = $(this).children('option:selected').attr('value');
        if(_value !== ''){
            $.cookie('rel1','2',{path:'/'});
        }else{
            $.cookie('rel1','1',{path:'/'});
        }
        pagenation()
    });
};
function pagenation(page){
    page = page?page:1;
    var obg = {};
    switch ($.cookie('rel1')){
        case '0':
            obg = {
                token: $.cookie("token"),
                page:page,
                row: '10',
                sortId:'updateTime',
                sortType:'DESC'
            };
            break;
        case '1':
            obg = {
                token: $.cookie("token"),
                page:page,
                row: '10',
                sortId:'updateTime',
                sortType:'DESC',
                column: $('#column').children('option:selected').attr('value')
            };
            break;
        case '2':
            obg = {
                token: $.cookie("token"),
                page:page,
                row: '10',
                sortId:'updateTime',
                sortType:'DESC',
                column: $('#column').children('option:selected').attr('value'),
                classify: $('#classify').children('option:selected').attr('value')
            };
            break;
        case '3':
            obg = {
                token: $.cookie("token"),
                page:page,
                row: '10',
                sortId:'updateTime',
                sortType:'DESC',
                //column: $('#column').children('option:selected').attr('value'),
                //classify: $('#classify').children('option:selected').attr('value')
                name:$('.searchText').val()
            };
            break;
    }
    //var commUrl = 'http://10.10.23.67:8080/qh_manager';田璞本地地址
    $.ajax(
        {
            url: commUrl+ '/content/findall',
            type:'GET',
            data: obg,
            //dataType: 'jsonp',
            async: false,
            success: function (response) {
                response = eval('(' + response + ')');
                //console.log(response);
                $(".grid-body").empty();
                $(".pages ul").empty()
                var html = '';
                var page = '';
                if(response.code == '1'){
                    if(response.data.datas == ''){
                        html='<p>暂无数据</p>'
                    }else {
                        var sort = 0;
                        $.each(response.data.datas, function(i,key){
                            html+=' <div class="grid-body-tr"> <div class=""><span>'+key.id+'</span></div><div><span>'+key.name+'</span></div>' ;
                            var ary,sb;
                            ary = key.lable;
                            var _category,_state;
                                html +='<div><span>'+key.column+'</span></div>' ;
                                (key.category == '1')? _category = '音频': _category = '视频';//判断音频或者视频
                                html +='<div><span>'+_category+'</span></div>';
                                (key.state == '1')? _state = '上线': _state = '下线';//判断什么状态
                                html +='<div><span>'+_state+'</span></div><div><span >'+key.updateTime+'</span></div>';
                                html +='<div><span><a class="checkquestion" rel="0" data-id="'+key.id+'">查看</a><a class="overflowShow" data-id="'+key.id+'">删除</a></span></div></div>';
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
    }else if(parseInt($(e).prev(".nowPage").val()) >=parseInt( $(".pagecount").text())){
        var page = $(".pagecount").text();
        pagenation(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        pagenation(page)

    }
}
function checkquestion (){
    $(".checkquestion").on('click',function(){
        var _currPage = parseInt($('.onpage').text())//;
        var _dataId = $(this).attr('data-id');
        $.cookie('currPage',_currPage,{path:'/'});
        $.cookie('dataId',_dataId,{path:'/'});
        $.ajax({
            url:menuUrl+'multimedia-detail.html',
            success: function(data){
                $('.main').html(data);
            }
        })
    });
}
function showOverflow(){

    $(".overflowShow").on('click',function(){
        $(".overall").show();
        $(".deleted").attr({id: $(this).attr('data-id'),rel:$(this).attr('alt')});

    })
};

function deleted(){
    $(".deleted").on('click',function(){
        //alert($(this).attr('id'));
        $.ajax({
            url: commUrl+'/content/delete',
            type:'GET',
            data:{
                token:$.cookie("token"),
                id:$(this).attr('id'),
                //industry:$.cookie("industryName"),
                //text:$(this).attr('rel')
            },
            success: function(data){
                data = JSON.parse(data);
                //console.log(data);
                if(data.code == 1) {
                    var num = $('.grid-body-tr').length;
                    if(num = 0){
                        var page =  $('.onpage').text() - 1;
                    }else {
                        var page =  $('.onpage').text();
                    }
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

