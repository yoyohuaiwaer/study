$(document).ready(function(){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        async:false,
        cache: false,
        data: {
            token:$.cookie("token"),
            parentId:'5850be18b2a99afa74c513a7'
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                $(".breadcrumb").empty();
                $.each(data.data, function(i,key) {
                    var breadcrumb = '<li ><a alt="' + menuUrl + '' + key.url + '" id="' + key.id + '">' + key.name + '</a></li>'
                    $(".breadcrumb").html(breadcrumb);
                    var id = key.id;
                    //debugger;
                    findMenus(id);
                    //$(".breadcrumb li:nth-of-type(2)").addClass('selected');
                    changeBreadcrumb();
                })
            }
        }
    })
	init()
})
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
            if(data.code == 1) {
                var breadcrumb1 = '';
                breadcrumb1 = '<li class="selected"><a alt="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].id+'">'+data.data[0].name+'</a></li>';
                //alert(breadcrumb1);
                $(".breadcrumb").append(breadcrumb1);
                changeBreadcrumb();
            }
        }
    })
}
function init(page){
    var labelIds =$.cookie("labelIds").split(",");
	var  ladeblNames= $.cookie("ladeblNames").split(",");
	var html='';
	for(var i =0;i<ladeblNames.length;i++)
	{
		if(ladeblNames[i]!='')
		{
			html+='<div style="margin: 10px 0;">'+
			'<label style="width:100px; display:inline-block">'+ladeblNames[i]+'</label>'+
			'<input type="text" class="text" placeholder="必填"/>'+
			'</div>';
		}
		
	}
	$('.grid-body').html(html);
}
function addAdFun(){
	var inputs = $('.grid-body').find('input');
	if(inputs.length==0)
	{
		$(".tip").empty().css({color:"red"}).html("请先添加标签");
		return;
	}
	var labelIds =$.cookie("labelIds").split(",");
	var processId = $.cookie("goodsId");
	var newJson = [];
	
	for(var i =0;i<inputs.length;i++)
	{
		if(inputs[i].value=='')
		{
			$(".tip").empty().css({color:"red"}).html("请填入相关信息");
			return;
		}
	}
	for(var j=0;j<labelIds.length;j++)
	{
		var labObj = new Object();
		labObj.id=labelIds[j];
		labObj.value = inputs[j].value;
		labObj.processId = processId;
		newJson.push(labObj)
	}
//console.log(JSON.stringify(newJson))
    $.ajax({
        url:commUrl+'/entity/entity?token='+$.cookie("token"),
        type: "POST", 
        data: JSON.stringify(newJson),
        dataType: 'json',
        contentType:'application/json; charset=UTF-8',
        async: false,
        success: function (response) {
            response = JSON.parse(response);
            newPage()
        },
        error: function (text) {
            alert(text.readyState);
            alert(text.status);
        }
    });
	cancelAdFun();
}
function cancelAdFun(){
	$.ajax({
        url:'goods-list.html',
        datatype:'html',
        success:function(data){
            $(".main").empty().html(data);
        }
    })
}
 function newPage(){
    $.get('goods-list.html',{token:$.cookie("token"),scene:$.cookie("scene")},function(response){
        $(".main").empty().html(response);
    })
}

function addTag(e){
	$.ajax({
        url:'tag-details.html',
        datatype:'html',
        success:function(data){
            $(".main").empty().html(data);
        }
    })
}
