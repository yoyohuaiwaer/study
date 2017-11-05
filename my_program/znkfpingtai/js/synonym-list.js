/**
 * Created by A on 2016/11/9.
 */
$(document).ready(function(){
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="synonym-list.html" id="5850c1b5b2a99afa74c513b3">同义词列表</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    loadSecene();
    pagenation();
    $.cookie('sences','1',{path:'/'})
    /*if($.cookie('nowpage')==''){
        pageOrder();
    }else{
        var page = $.cookie('nowpage')
        pageOrder(page);
    }*/
    sceneChange();
    addSynonym();
    deleted();
    hideOverflow();


})
function sceneChange(){
    $('#scene').change(function(){
        $.cookie('sences','2',{path:'/'});
        //$(this).children('option:selected').attr('value');
        console.log($(this).children('option:selected').attr('value'));
        pagenation();
    })
}
function loadSecene(){
    $.ajax({
        url:commUrl+'/qa/allindustry',
        async: false,
        data:{
            token:$.cookie("token")
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                var html = '';
                $('#scene').empty();
                html += '<option value="" >选择行业</option><option value="通用" id="">通用</option>';
                $.each(response.data,function(i,key){
                    html += '<option value="'+key.name+'" id="'+key.id+'">'+key.name+'</option>'
                });
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
function addSynonym(){
    $('.addSynonym').on('click',function(){
        var sort = $(".grid-body-tr").length;
        sort+=1;
        var html = '';
        html += '<div class="grid-body-tr red"> <div class=""><span>'+sort+'</span></div> ' +
            '<div class=""><select name="" class="industry"></select></div> ' +
            '<div><span ><input type="text" class="keyWord text" style="width: 180px"/></span></div>' +
            '<div><span><input type="text" class="synonym text"/></span></div>'+
            ' <div class="operation"> <a class="confirm" rel="1">确定</a><a class="cancel">取消</a></div></div>';
        $(".grid-body").append(html);

        loadIndustry();
        confirm();
        cancel();
    })
}
function loadIndustry(){
    $.ajax({
        url: commUrl+'/qa/allindustry',
        async: false,
        data: {
            token: $.cookie('token'),
            //industry:$.cookie('industryName')
        },
        success: function(response){
            //console.log(response);
            response = JSON.parse(response);
            if(response.code == 1){
                $('#entity').empty();
                var html = '';

                $.each(response.data,function(i,key){
                    html += '<option value="'+key.name+'" id="'+key.id+'">'+key.name+'</option>'
                })
                html += '<option value="" id="">通用</option>';

                $('.industry').html(html);
            }
        }
    })
    /*$('#industry').change(function(){
        loadentities();
    })*/
}
function confirm(){
    $('.confirm').on('click',function(){
        var obj = {}
        if($(this).attr('rel') == 0){
            var keyWord = $(this).parents('.grid-body-tr').find('input.keyWord').val();
            var feathers = $(this).parents('.grid-body-tr').find('input.synonym').val();
            var id = $(this).attr('data-content-id');
            obj = {
                token:$.cookie("token"),
                industryId:$(this).attr('data-industryId'),
                industry:$(this).attr('data-industry'),
                mainKey:keyWord,
                feathers:feathers,
                id:id
            }
        }else if($(this).attr('rel') == 1){
            var keyWord = $(this).parent('.operation').prev().prev().find('.keyWord').val();
            var feathers = $(this).parent('.operation').prev().find('.synonym').val();
            var industry = $(this).parents('.grid-body-tr').find('.industry').children('option:selected').attr('value');
            var industryId = $(this).parents('.grid-body-tr').find('.industry').children('option:selected').attr('id');
            console.log(industry);
            console.log(industryId);
            debugger;
            obj = {
                token:$.cookie("token"),
                industryId:industryId,
                industry:industry,
                mainKey:keyWord,
                feathers:feathers,
                id:''
            }
        }
        $.ajax({
            url: commUrl+'/synonym/save',
            type:'POST',
            data:obj,
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    var page =  $('.onpage').text();
                    pagenation(page);
                }else if(data.code == -1){
                    alert(data.msg);
                    //window.location.href = menuUrl+'index.html';
                }
            }
        })
    })
}
function cancel(){
    $('.cancel').on('click',function(){
        $(this).parents('.grid-body-tr').remove();
    })
}
function findMenus(parentId){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        async:false,
        data: {
            token:$.cookie("token"),
            parentId:parentId
        },
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);

            if(data.code == 1) {
                var breadcrumb = ''
                $.each(data.data,function(i,key){
                    breadcrumb += '<li class=""><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">'+key.name+'</a></li>';
                })

                $(".breadcrumb").append(breadcrumb);
                //changeBreadcrumb();
            }
        }
    })
}
function pagenation(page){
    //console.log($.cookie("token"))
    page = page?page:1;
    var data = {};
    ($.cookie('sences') == 1) ? data = {token:$.cookie("token"), page:page, row: '10', sortId:'createTime', sortType:'DESC'}: data = {token:$.cookie("token"), page:page, row: '10', sortId:'createTime', sortType:'DESC', indus:  $('#scene').children('option:selected').val()};
    $.ajax(
        {
            url: commUrl+'/synonym/find',
            data: data,
            dataType: 'json',
            async: false,
            success: function (response) {
                response = JSON.parse(response);

                $(".grid-body").empty();
                //debugger;
                $(".pages ul").empty()
                var html = '';
                var page = '';
                if(response.code == '1'){
                    if(response.data.count == 0){
                        html = '<div class="grid-body-tr"><p>暂无无数据</p></div>';
                    }else {
                        var sort = 0;
                        $.each(response.data.datas, function(i,key){
                            sort = sort+1;
                            //console.log(key);
                            var newstr = '';
                            $.each(key.feathers,function(i,val){
                                //alert(val);
                                newstr += val+' ';
                            })
                            //alert(newstr);
                            html += '<div class="grid-body-tr"> <div class=""><span>'+sort+'</span></div> ' ;
                            (key.industry == undefined) ? html += '<div class=""><span>通用</span></div>':html += '<div class=""><span>'+key.industry+'</span></div>' ;
                               html += '<div><span><input type="text" class="keyWord text" style="display: none" readonly value="'+key.mainKey+'"/><span class="keyWord">'+key.mainKey+'</span></span></div>' +
                                '<div><span><input type="text" class="synonym text" style="display: none" value="'+newstr+'"/><span class="synonym">'+newstr+'</span></span></div>'+
                                ' <div class="operation"><span> <a class="confirm" rel="0" data-industry="'+key.industry+'" data-industryId="'+key.industryId+'" data-content-id="'+key.id+'" style="display: none">确定</a><a class="edit" id="'+key.id+'">修改</a><a class="cancelEdit" style="display: none">取消</a><a class="overflowShow" data-contentId="'+key.id+'">删除</a></span></div></div>';

                        })
                        //  debugger;
                        if(response.data.page == response.data.pageCount){
                            page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                                '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                        }
                        else if(response.data.page == '1') {
                            page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li>' +
                                ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'
                        }
                        else {
                            page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+response.data.page+'</span>/<span class="pagecount">'+response.data.pageCount+'</span> </li> ' +
                                '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                        }
                    }

                }
                //debugger;
                $(".grid-body").html(html);
                //debugger;
                $(".pages ul").html(page);
                //确定绑定跳转
                edit();
                showOverflow();

                cancelEdit();
                confirm();
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        });
}
function edit(){
    $('.edit').on('click',function(){
        $(this).next('a').show();
        $(this).prev('a').show();
        $(this).hide();
        $(this).parents('.grid-body-tr').addClass('red');
        $(this).parents('.grid-body-tr').find('input.keyWord').show();
        $(this).parents('.grid-body-tr').find('input.synonym').show();
        $(this).parents('.grid-body-tr').find('span.keyWord').hide();
        $(this).parents('.grid-body-tr').find('span.synonym').hide();
    })
}
function cancelEdit(){
    $('.cancelEdit').on('click',function(){
        $(this).prev('a').prev('a').hide();
        $(this).prev('a').show();
        $(this).hide();
        $(this).parents('.grid-body-tr').removeClass('red');
        //synonym
        $(this).parents('.grid-body-tr').find('input.keyWord').hide();
        $(this).parents('.grid-body-tr').find('input.synonym').hide();
        $(this).parents('.grid-body-tr').find('span.keyWord').show();
        $(this).parents('.grid-body-tr').find('span.synonym').show();
    })
}
function deleted(){
    $('.deleted').on('click',function(){
        //alert("123");
        var id = $(this).attr('id');
        $.ajax({
            url: commUrl+'/synonym/delete',
            //type:'POST',
            data:{
                token:$.cookie("token"),
                //industryId:$.cookie('industryId'),
                //industry:$.cookie('industryName'),
                //mainKey:keyWord,
                //feathers:feathers,
                id:id
            },
            success: function(data){
                data = JSON.parse(data);
                console.log(data);
                if(data.code == 1) {
                    $(".overall").hide();
                    var page =  $('.onpage').text();
                    pagenation(page);
                }else if(data.code == -1){
                    $(".overall").hide();
                    alert(data.msg);
                    //window.location.href = menuUrl+'index.html';
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
    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
        var page = $(".pagecount").text();
        pagenation(page)
    }else{
        var page = $(e).prev(".nowPage").val();
        pagenation(page)

    }
}
function showOverflow(){
    $(".overflowShow").on('click',function(){
        $(".deleted").attr({id: $(this).attr('data-contentId')});
        $(".overall").show();
    })
};
function hideOverflow(){
    $(".hideOverflow").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(".overall").hide();
    })
}