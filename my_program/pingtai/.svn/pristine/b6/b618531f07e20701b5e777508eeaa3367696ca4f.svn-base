$(document).ready(function(){

    pagenation();
    $(".breadcrumb").empty();
    var breadcrumb = '<li class="selected"><a class="" alt="entities-list.html" id="5850be18b2a99afa74c513a7">实体流程</a></li>';
    $(".breadcrumb").html(breadcrumb);
    changeBreadcrumb();
    addSynonym();
})
function addSynonym(){
	
    $('.addSynonym').on('click',function(){
        var sort = $(".grid-body-tr").length;
        sort+=1;
        var html = '';
        html += '<div class="grid-body-tr red"> <div class=""><span>'+sort+'</span></div> ' +
         	'<div><select id="scenes" class="text scenes" style="width: 60px;"></select></div>'+
            '<div><span ><input type="text" class="keyWord text" style="width: 100px;"/></span></div>' +
            '<div><span><input type="text" class="formula text" style="width: 150px;"/></span></div>'+
            '<div><span><input type="text" class="answers text" style="width: 150px;"/></span></div>'+
            '<div><span><input type="text" class="words text"/></span></div>'+
            ' <div class="operation"> <a class="confirm" rel="1">确定</a><a class="cancel">取消</a></div></div>';
        $(".grid-body").append(html);
        $.ajax({
	        url:commUrl+'/qa/allindustry',
	        data: {
	            token:$.cookie("token")
	        },
	        success: function(data){
	            data = JSON.parse(data);
	            if(data.code == 1) {
	            	var optionHtml = '<option >'+'通用'+'</option>';
	            	$.each(data.data, function(i,key) {
	                    optionHtml += '<option id='+key.id+'  title='+key.name+' >'+key.name+'</option>'
	                })
	            	$("#scenes").html(optionHtml);
	            }
	        }
	    })
        confirm();
        cancel();
    })
}
function confirm(){
    $('.confirm').on('click',function(){
        if($(this).attr('rel') == 1){
            var _keyWord = $(this).parents('.grid-body-tr').find('.keyWord').val();
            var _formula = $(this).parents('.grid-body-tr').find('.formula').val();
            var _answers = $(this).parents('.grid-body-tr').find('.answers').val();
            var _words = $(this).parents('.grid-body-tr').find('.words').val();
            $.ajax({
                url: commUrl+'/entity/process',
                type:'POST',
                data:{
                    token:$.cookie("token"),
                    key:_words,
                    formula:_formula,
                    industry:$("#scenes").find("option:selected").html(),
                    name:_keyWord,
                    answer:_answers
                },
                success: function(data){
                    data = JSON.parse(data);
                    if(data.code == 1) {
                     var page =  $('.onpage').text();
                        pagenation(page);
                     }else if(data.code == -1){
                     alert(data.msg);
                     window.location.href = menuUrl+'index.html';
                     }
                }
            })
        }else if($(this).attr('rel') == 0){
            var _keyWord = $(this).parents('.grid-body-tr').find('input.keyWord').val();
            var _formula = $(this).parents('.grid-body-tr').find('input.formula').val();
            var _answers = $(this).parents('.grid-body-tr').find('input.answers').val();
            var _words = $(this).parents('.grid-body-tr').find('input.words').val();
			var _industry = $(this).parents('.grid-body-tr').find('input.scenes').val();
            $.ajax({
                url: commUrl+'/entity/process',
                type:'POST',
                data:{
                    token:$.cookie("token"),
                    id:$(this).attr('id'),
                    key:_words,
                    formula:_formula,
                    industry:_industry,
                    name:_keyWord,
                    answer:_answers
                },
                success: function(data){
                    data = JSON.parse(data);
                    if(data.code == 1) {
                     var page =  $('.onpage').text();
                        pagenation(page);
                     }else if(data.code == -1){
                     alert(data.msg);
                     window.location.href = menuUrl+'index.html';
                     }
                }
            })
        }

    })
}
function cancel(){
    $('.cancel').on('click',function(){
        $(this).parents('.grid-body-tr').remove();
    })
}
function pagenation(page){
    page = page?page:1;
    $.ajax({
            url: commUrl+'/entity/process',
            data: {
                token:$.cookie("token"),
                page:page,
                row: '10',
                sortId:'createTime',
                sortType:'DESC'
            },
            dataType: 'json',
            async: false,
            success: function (response) {
                response = JSON.parse(response);
                $(".grid-body").empty();
                $(".pages ul").empty()
                var html = '';
                var page = '';
                if(response.code == '1'){
                    var sort = 0;
                    $.each(response.data.datas, function(i,key){
                        sort = sort+1;
                        html += '<div class="grid-body-tr"> <div class="" style="width: 60px;"><span>'+sort+'</span></div> ' +
                            '<div style="width:120px; max-width:120px;"><span><input type="text" class="synonym text scenes" style="display: none ; width:100px; max-width:100px;"  value="'+key.industry+'"/><span class="synonym scenes">'+key.industry+'</span></span></div>' +
                            '<div style="width:110px; max-width:110px;"><a id="'+key.id+'"><span><input type="text" class="synonym  keyWord text" style="display: none ; width:90px; max-width:90px;" value="'+key.name+'"/><span  onclick ="javascript:fix(this)" id="'+key.id+'" class="synonym keyWord">'+key.name+'</span></span></a></div>'+
                            '<div style="width:170px; max-width:170px;"><span><input type="text" class="synonym text formula" style="display: none; width:150px; max-width:150px;" value="'+key.formula+'"/><span class="synonym formula">'+key.formula+'</span></span></div>'+
                            '<div style="width:200px; max-width:200px;"><span><input type="text" class="synonym text answers" style="display: none; width:180px; max-width:180px;" value="'+key.answer+'"/><span class="synonym answers">'+key.answer+'</span></span></div>'+
                            '<div style="width:150px; max-width:150px;"><span><input type="text" class="synonym text words" style="display: none; width:130px; max-width:130px;" value="'+key.key+'"/><span class="synonym words">'+key.key+'</span></span></div>'+
                            ' <div class="operation" style="width: 150px; max-width: 150px;"><span> <a class="confirm" rel="0" id="'+key.id+'" style="display: none;width: 130px; max-width: 130px;">确定</a><a class="edit" id="'+key.id+'">修改</a><a class="cancelEdit" style="display: none">取消</a><a onclick="javascript:showOverall(this)"  class="deleted" id="'+key.id+'">删除</a></span></div></div>';

                    })
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
                $(".grid-body").html(html);
                $(".pages ul").html(page);
                //确定绑定跳转
                edit();
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

function fix(e){
	$.cookie("goodsId", e.id,{path:'/'});
	 	$.ajax({
        url:'goods-list.html',
        datatype:'html',
        success:function(data){
       		$(".main").empty().html(data);
   		}
    })
}
function cancelEdit(){
    $('.cancelEdit').on('click',function(){
        $(this).prev('a').prev('a').hide();
        $(this).prev('a').show();
        $(this).hide();
        $(this).parents('.grid-body-tr').removeClass('red');
        $(this).parents('.grid-body-tr').find('input.keyWord').hide();
        $(this).parents('.grid-body-tr').find('input.synonym').hide();
        $(this).parents('.grid-body-tr').find('span.keyWord').show();
        $(this).parents('.grid-body-tr').find('span.synonym').show();
    })
}

function deleted(e){
    var id = e.id;
	var url = commUrl+'/entity/process_' + id;        
    $.ajax({
        url:url,
          type:'POST',
        data:{
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            console.log(data);
            if(data.code == 1) {
                var page =  $('.onpage').text();
                pagenation(page);
                 $(".overall").hide();
            }else if(data.code == -1){
                alert(data.msg);
                window.location.href = menuUrl+'index.html';
            }
        }
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
    if(parseInt($(e).prev(".nowPage").val() )<= 1){
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
function showOverall(e){
    $(".deleted").attr({id: e.id});
    $(".overall").show();
}
function clearOverall(e){
    $(".overall").hide();
}