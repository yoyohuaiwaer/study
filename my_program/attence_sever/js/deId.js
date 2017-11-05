/**
 * Created by A on 2017/7/28.
 */
$(document).ready(function(){
    listPage();
    hideOverflow1();
    addClass();
    addClassConfirm();
    deleted();
})
function listPage(page){
    var obj={};
    page = page?page:1;
    var _classId = $('#classId').children('option:selected').attr('value');
    var _type = $('#type').children('option:selected').attr('value');
    var _name = $('.searchText').val();
    var _producer = $('#producer').children('option:selected').attr('value');
    //console.log($.cookie('rel1'));
    obj = {
        token:$.cookie("token"),
        page:page,
        /*row:'10',
        sortId:'updateTime',
        sortType:'DESC'*/
    }
    $.ajax({
        url:commUrl+'/employee/findDept',
        type:'POST',
        data:obj,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            /*console.log(data);
            debugger;*/
            $(".grid-body").empty();
            var html = '';
            var sort = 0;
            var page = '';
            if(data.code == '1'){
                $.each(data.data,function(i,key){
                    sort = i + 1;
                    html += '<div class="grid-body-tr" > <div class="number"  style="width:150px">'+sort+'</div>' +
                        '<div class="title"  style="width:390px;max-width:300px; ">'+key.deptName+'</div>' +
                        '<div class="operation"  style="width:410px">' +
                        '<a href="javascript:void(0);" onclick="" class="addClass" data-id="'+key.id+'" title="'+key.title+'"  data-name="'+key.deptName+'">编辑</a>' +
                        '<a href="javascript:void(0);"  onclick="" class="deleteGoods" data-id="'+key.id+'">删除</a></div> </div>'
                })

                /*if(data.data.page == '1') {
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
                }*/

            }
            $(".pages ul").html(page);
            $(".grid-body").html(html);
            showOverall();
            addClass();
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
/*function prevPage(e) {
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
}*/
function showOverall(){
    $('.deleteGoods').on('click',function(){
        var id = $(this).attr('data-id')
        $(".deleteQuestion").attr({'data-id':id});
        $(".overall").show();
    })

}
function deleted(){
    $('.deleteQuestion').on('click',function(){
        var _id = $(this).attr('data-id');
        $.ajax({
            url:commUrl+'/employee/delDept',
            data:{
                token:$.cookie("token"),
                id:_id
            },
            cache:false,
            type:'POST',
            success: function(data){
                console.log(data)

                data = eval('('+data+')');
                if(data.code == '1'){
                    //var page =  $('.onpage').text()
                    listPage();
                    $(".overall").hide();
                }else {
                    alert(data.msg);
                }

            }
        })
    })
}
function addClassConfirm() {
    //var commUrl = 'http://10.10.23.67:8080/qh_server'
    $('.addClassConfirm').on('click',function(){
        var name = $('#newScene').val();
        var id = $(this).attr('data-id');
        var obj = {
            token:$.cookie("token"),
            deptName:name
        }
        if(id !==undefined){
            obj.id = id;
        }
        //name = name.replace(/['\t]/g,'').replace(/\s*/g, '');
        $.ajax({
            url: commUrl+'/employee/updateDept',
            type:'POST',
            data:obj,
            success: function(data){
                data = JSON.parse(data);
                if(data.code == 1) {
                    listPage();
                    $(".overall1").hide();
                    $('#newScene').val('');
                    //classId();
                }else{
                    alert(data.msg);
                    //$(".overall1").hide();
                    //window.location.href = menuUrl+'index.html';
                }
            }
        })
    });
};

function addClass(){
    $('.addClass').on('click',function(){
        var id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        if(id !==undefined){
            $('.addClassConfirm').attr({'data-id':id});
            $('.newScene').val(name);
        }
        $(".overall1").show();
    });
}
function clearOverall(e){
    $(".overall").hide();
}
function hideOverflow1(){
    $(".hideOverflow1").on('click',function(){
        //$(".deleted").attr({id: $(this).attr('rel')});
        $(".overall1").hide();
    })
}