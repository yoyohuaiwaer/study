/**
 * Created by Administrator on 2016/9/17.
 */
//页面加载
$(document).ready(function() {
    $.ajax({
        url:commUrl+'/menu/findbyid',
        //type:'GET',
        //async: false,
        data:{
            token:$.cookie("token"),
            parentId:$(".main-title").attr("title")
        },
        success: function(data){
            data = eval('('+data+')')
//            console.log(data);
//          $(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</span></li>');
       		var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + "scene-question-list.html" + '" id="' + data.data[0].parentId + '">' + '问答列表' + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].parentId + '">一问一答列表</a></li>';
			$(".breadcrumb").html(html);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    $.ajax(
        {
            url: commUrl+'/scene',
            data: {token:$.cookie("token")},
            dataType: 'json',
            async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                //console.log(response);
                $(".grid-body").empty();
                var html = '';
                if(response.code == '1'){
                    if(response.data == ''){
                        html = ''
                    }
                    else{
                        $.each(response.data, function(i,key){
                            sort = i+1;
                            html+=' <div class="grid-body-tr"> <div class="order-number">'+sort+'</div> ' +
                                '<div class="industrybox" onclick=""><span>'+key.industry+'</span><input type="text" name="industry" class="industry" value="'+key.industry+'"/><span class="tipIndustry"></span></div>' +
                                ' <div class="scene"><a href="javascript:void(0);" onclick="javascript:readscene(this)" rel="1" id="'+key.name+'"  >'+key.name+'</a><input type="text" name="name" class="name" value="'+key.name+'"/><span class="tipName"></span></div> <div class="answer-number">'+key.count+'</div> <div class="operation"> <a href="javascript:void(0);" onclick="javascript:editList(this)" class="editList" title="'+key.name+'">修改</a><a href="javascript:void(0);" onclick="javascript:clearEdit(this)" class="clearEdit" title="'+key.name+'">取消</a><a href="javascript:void(0);" onclick="javascript:submitEdit(this)" class="submitEdit" title="'+key.name+'">确认</a><a href="javascript:void(0);" onclick="javascript:showOverall(this)" title="'+key.name+'">删除</a> </div></div>'
                        })
                    }
                    var sort = 1;

                }
                $(".grid-body").html(html);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })

})
//公共get方法刷新页面
function newPage(){
    //接口为明伟本地接口
    $.get(commUrl+'/scene',{token:$.cookie("token")},function(response){
        response = eval('(' + response + ')')
        //alert(response.msg);
        $(".grid-body").empty();
        var html = '';
        if(response.code == '1'){
            var sort = 1;
            $.each(response.data, function(i,key){
                sort = i+1;
                html+=' <div class="grid-body-tr"> <div class="order-number">'+sort+'</div> <div class="industrybox" onclick=""><span>'+key.industry+'</span><input type="text" name="industry" class="industry" value="'+key.industry+'"/><span class="tipIndustry"></span></div> <div class="scene"><a href="javascrip:void(0);" onclick="javascript:readscene(this)" id="'+key.name+'" >'+key.name+'</a><input type="text" name="name" class="name" value="'+key.name+'"/><span class="tipName"></span></div> <div class="answer-number">'+key.count+'</div><div class="operation"> <a href="javascript:void(0);" onclick="javascript:editList(this)" class="editList" title="'+key.name+'">修改</a><a href="javascript:void(0);" onclick="javascript:clearEdit(this)" class="clearEdit" title="canyin">取消</a><a href="javascript:void(0);" onclick="javascript:submitEdit(this)" class="submitEdit" title="canyin">确认</a><a href="javascript:void(0);" onclick="javascript:deleteList(this)" title="'+key.name+'"">删除</a> </div></div>'
            })
        }
        $(".grid-body").html(html);
    })
}
//修改按钮
function editList(e){
    $(e).parents(".grid-body-tr").addClass("red");
   // $(e).parents(".grid-body-tr").find(".industrybox input").show();
   // $(e).parents(".grid-body-tr").find(".industrybox span").hide();
    $(e).parents(".grid-body-tr").find(".scene input").show();
    $(e).parents(".grid-body-tr").find(".scene a").hide();
    $(e).next(".clearEdit").show();
    $(e).next(".clearEdit").next(".submitEdit").show();
    $(e).hide();
}
//取消按钮
function clearEdit(e){
    $(e).parents(".grid-body-tr").removeClass("red");
    $(e).parents(".grid-body-tr").find(".industrybox input").hide();
    $(e).parents(".grid-body-tr").find(".industrybox span").show();
    $(e).parents(".grid-body-tr").find(".scene input").hide();
    $(e).parents(".grid-body-tr").find(".scene a").show();
    $(e).prev(".editList").show();
    $(e).next(".submitEdit").hide();
    $(e).hide();
}
//修改确认按钮
function submitEdit(e){
    var industry = $(e).parents(".grid-body-tr").find(".industrybox span").text();
    var name = $(e).parents(".grid-body-tr").find(".scene input").val();
    var count = $(e).parents(".grid-body-tr").find(".answer-number").text();
    $.ajax(
        {
            url: commUrl+'/scene_'+ e.title+'',
            type: 'POST',
            data: {
                token:$.cookie("token"),
                industry: ''+industry+'',
                name: ''+name+'',
                count:''+count+''
            },
            dataType: 'json',

            async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                //alert(response.msg);
                //console.log(response);
                if(response.code == '1'){
                    newPage();
                }
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
};
//删除按钮
function deleteList(e){
    //alert(e.title);
    $.ajax(
        {
            url: commUrl+'/scene/delete_'+ e.id+'',
            data: {
                token:$.cookie("token")
            },
            dataType: 'json',
            async: false,
            type:'POST',
            success: function (response) {
                response = eval('(' + response + ')')
                //alert(response.msg);
                //console.log(response);
                if(response.code == '1'){
                    $(".overall").hide();
                    newPage();
                }
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
};
//新增场景按钮
function addScene(e){
    //alert($(e).text());
    var sort = $(".grid-body-tr").length;
    sort+=1;
    var html = '';
    html = '<div class="grid-body-tr red"> <div class="order-number">'+sort+'</div> ' +
        '<div class="industrybox" onclick=""><span style="display: none">canyin</span><input type="text" name="industry" class="newindustry" /><span class="tipIndustry"></span></div> ' +
        '<div class="scene"><input type="text" name="name" class="newname"/><span class="tipName"></span></div> ' +
        '<div class="answer-number"></div><div class="operation"><a href="javascript:void(0);" onclick="javascript:clearAdd(this)" class="clearAdd">取消</a><a href="javascript:void(0);" onclick="javascript:submitAdd(this)" class="submitAdd">确认</a> </div> </div>'
    $(".grid-body").append(html);

};
//清楚场景按钮
function clearAdd(e){
    $(e).parents(".grid-body-tr").remove();
};
//提交新增场景按钮
function submitAdd(e){
    var industry = $(e).parents(".grid-body-tr").find(".industrybox input").val();
    var name = $(e).parents(".grid-body-tr").find(".scene input").val();
    //alert(industry);
    if(name !== ''){
        $.ajax({
            url:commUrl+'/scene/add',//明伟本地接口
            data:{
                token:$.cookie("token"),
                name:name,
                industry: industry
            },
            type:'POST',
            dataType:'json',
            success: function(data){
                data = eval('(' + data + ')');
                if(data.code == '1'){
                    //alert(data.code);
                    //alert(data.msg);
                    newPage();
                }
            }
        })
    }else {
        $(e).parents(".grid-body-tr").find(".tipName").show().text("场景名不能为空");

    }

};
//查看详情按钮
function readscene(e){
    $.cookie('scene', e.id,{ path: '/' });
    $.cookie('rel', e.rel,{path:'/'});
    //alert($.cookie('rel'));
    //alert($(".breadcrumb li:last-child span").attr("id"));

    $.ajax(
        {
            url: 'question-list.html',
            data: {token:$.cookie("token")},
            dataType: 'html',
            success: function (response) {
                //response = eval('(' + response + ')')
                //console.log(response);
                $(".main").empty().html(response);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}
//弹出遮罩
function showOverall(e){
    //alert("123");
    $(".deleteScene").attr({id: e.title});
    $(".overall").show();
}
function clearOverall(e){
    $(".overall").hide();
}
