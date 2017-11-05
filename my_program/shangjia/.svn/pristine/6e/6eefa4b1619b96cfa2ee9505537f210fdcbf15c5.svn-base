$(document).ready(function(){
    if($.cookie('rel') == 0){
        loadPage();
    }else {

    }
    confirm();
    cancel();
    $(".breadcrumb").empty();
    $.ajax({
       url:commUrl+'/menu/findbyid',
                data:{
                    token:$.cookie("token"),
                    parentId:$(".main-title").attr("title")
                },
                success: function(data){
                    data = eval('('+data+')');
                    if(data.code == '1'){
                        $(".breadcrumb").empty();
                        var breadcrumb = 
//                      '<li><a href="javascript:void(0);"onclick="javascript:changePage(this);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</a></li>' +
                                '<li><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="'+menuUrl+''+"scene-question-list.html"+'" id="'+data.data[1].parentId+'">'+data.data[1].name+'</a></li>' +
                                '<li class="selected"><span href="javascript:void(0);" title="'+menuUrl+''+data.data[2].url+'" id="'+data.data[2].parentId+'">'+data.data[2].name+'</span></li>'
                        $(".breadcrumb").html(breadcrumb);
                        //alert(breadcrumb);
                    }
                },
                error: function(text){
                    alert(text.readyState);
                    alert(text.status);
                }
    })
    loadSecene()
    loadAd();
    selectList();

});
function findMenus(parentId){

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
            $(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+'问答列表'+'</span></li>');
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function loadAd(){
    var obj = {
        token:$.cookie("token"),
        //page:page,
        //row:'10',
        sortId:'createTime',
        sortType:'DESC'
    }
    $.ajax({
        url:commUrl+'/ad/findAll',
        data:obj,
        async: false,
        cache:false,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".selectOption").empty();
            var html = '';
            if(data.code == '1'){
                $.each(data.data,function(i,key){
                    html += '<li><input type="checkbox" value="'+key.id+'"/>'+key.title+'</li>';
                })
                $(".selectOption").html(html);

            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function selectList(){
    $('.optionSelected').click(function(){
        if($('.suport-icon').attr('class') == 'suport-icon icon-drop_down'){
            $(this).addClass('radius');
            $('.selectOption').slideDown();
            $('.suport-icon').removeClass('icon-drop_down').addClass('icon-drop_up');
        }else {

            $('.selectOption').slideUp();
            $(this).removeClass('radius');
            $('.suport-icon').removeClass('icon-drop_up').addClass('icon-drop_down');
        }
    })
};
function newPage(){
    $.get('question-list.html',{token:$.cookie("token"),scene:$.cookie("scene")},function(response){
        $(".main").empty().html(response);
    })
}
function loadSecene(){
	 $.ajax(
        {
            url: commUrl+'/scene',
            data: {token:$.cookie("token")},
            dataType: 'json',
            async: false,
            success: function (response) {
                response = eval('(' + response + ')')
                var html = '<option class="answerList">' + '请选择场景' + '</option>';
                if(response.code == '1'){
                	$.each(response.data, function(i, key) {
						html += '<option value=' + key.name + '  title=' + key.industry + ' >' + key.name + '</option>'
					})
                }
                $("#scene").html(html);
            },
            error: function (text) {
                alert(text.readyState);
                alert(text.status);
            }
        })
}
function loadPage(){
    $.ajax({
       url:commUrl+'/qacategory',
       cache:false,
        data: {
            token: $.cookie('token'),
            id: $.cookie('qusID'),
            //scene: $.cookie("scene"),
            industry: $.cookie("industry"),
            //text: $.cookie('ansTxt')
        },
        success: function(response){
            response = JSON.parse(response);
            if(response.code == 1){
                $("#question").val(response.data.question).attr('readonly');
                $("#mainKey").val(response.data.mainKey).attr('readonly');
                $("#answer").val(response.data.answers[0].text);
                $("#url").val(response.data.answers[0].url);
                if(response.data.operation =="LBS"){
	                $("[name='lbs']").attr("checked",'true');
                }
                if(response.data.scene == ''){
                    $("#scene").children('option[value="none"]').attr({selected:"selected"});
                }else{
                    $("#scene").children('option[value="'+response.data.scene+'"]').attr({selected:"selected"});
                }
                if(response.data.answers[0].action == ''){
                    $("#action").children('option[value="none"]').attr({selected:"selected"});
                }else{
                    $("#action").children('option[value="'+response.data.answers[0].action+'"]').attr({selected:"selected"});
                }
                if(response.data.adIds !== ''){
                    var arr = response.data.adIds;
                    if(arr)
                    {
                    	$.each(arr,function(i,key){
	                        $('.selectOption input[type="checkbox"]').each(function(){
	                            if($(this).attr('value') == key){
	                                $(this).prop( "checked", true );
	                            }
	                        })
	                    })
                    }
                }
            }
        },
        error: function(text){
            alert("出错啦~！")
        }
    });

}

function newPage(){
    $.ajax({
        url:menuUrl+'scene-question-list.html',
        success: function(data){
            $('.main').html(data);
        }
    })
}
function confirm(){
    $(".confirm").click(function(){
        var adId = ''
        $('.selectOption input[type="checkbox"]').each(function(){

            if($(this).is(':checked')){
                adId += $(this).attr('value')+',';
            }
        })
        adId = adId.substring(0,adId.length-1);
        var lbs = $("[name='lbs']").is(':checked')?"LBS":'';
        var ques =$("#question").val();
        if(ques=="")
        {
        	$("#tip5").empty().css({
				color: "red"
			}).html("问题不能为空");
			return false;
        }
        var scen = $("#scene").children("option:selected").attr("value");
        if(scen==undefined)
        {
        	$("#tip5").empty().css({
				color: "red"
			}).html("请选择场景");
			return false;
        }
        var ans = $("#answer").val();
        if(ans=="")
        {
        	$("#tip5").empty().css({
				color: "red"
			}).html("答案不能为空");
			return false;
        }
        var mks = $("#mainKey").val();
        if(mks=="")
        {
        	$("#tip5").empty().css({
				color: "red"
			}).html("关键词(组)不能为空");
			return false;
        }
        var obj = {}
        if($.cookie('rel') == 1){
            obj = {
                token:$.cookie("token"),
                scene: scen,
                question:ques,
                mainKey:mks,
                answer:ans,
                ads:adId,
                url:$("#url").val(),
                action:$("#action").children("option:selected").attr("value"),
                industry:$.cookie('industry'),
                operation:lbs
            };
        }else if($.cookie('rel') == 0){
            obj = {
                token:$.cookie("token"),
                id: $.cookie('qusID'),
                scene: scen,
                question:ques,
                mainKey:mks,
                answer:ans,
                ads:adId,
                url:$("#url").val(),
                action:$("#action").children("option:selected").attr("value"),
                industry:$.cookie('industry'),
                operation:lbs
            };

        };
        if($("#url").val().substr(0,7) == "http://"||$("#url").val() == ""){
            $.ajax({
                url:commUrl+'/qacategory',
                type:'POST',
                data:obj,
                cache:false,
                success: function(data){
                    data = eval('(' + data + ')')
                    if(data.code == '1'){
                        newPage();
                    }
                },
                error: function(text){
                    alert('出错啦~！');
                }
            })
        }
        else {
            $("#tip4").show().text("输入地址有误，地址必须是以http://开头的url");
        }

    })
}
function cancel(){
    $(".cancel").on('click',function(){
        newPage();
    })
}
