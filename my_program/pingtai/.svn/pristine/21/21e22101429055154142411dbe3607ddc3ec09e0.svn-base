$(document).ready(function(){
	findMenus();
	findAllStore();
	isSeven=true;
	isThere =false;
	initModel(7,1);
})
function GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return dd;
}
function p(s) {
        return s < 10 ? '0' + s: s;
 }
function initModel(value,page){
	page = page?page:1;
	var myDate = GetDateStr(-(value-1))
	var dateArray = []; 
	var dateTemp; 
	var flag = 1; 
	for (var i = 0; i < value; i++) {
	    dateTemp = p(myDate.getMonth() + 1) + "-" + p(myDate.getDate());
	    dateArray.push(dateTemp);
	    myDate.setDate(myDate.getDate() + flag);
	}
	var start_Time = myDate.getFullYear()+"-"+ dateArray[0];
	var end_Time = myDate.getFullYear()+"-"+ dateArray[dateArray.length-1];
	pullModel(start_Time,end_Time,page);
}
function findMenus(){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        data: {
            token:$.cookie("token"),
            parentId:'582d3006b2a99afa74c510de'
        },
        success: function(data){
            data = JSON.parse(data);
            //console.log(data);
            if(data.code == 1) {
                $(".breadcrumb").empty();
                var breadcrumb = '';
           		breadcrumb+='<li class="selected"><a href="javascript:void(0);" alt="'+menuUrl+''+data.data[2].url+'" id="'+data.data[2].id+'">'+data.data[2].name+'</a></li>';
                $(".breadcrumb").html(breadcrumb);
                changeBreadcrumb();
            }
        }
    })
}
function pullModel(start_Time,end_Time,page){
	page = page?page:1;
	var shopId =$("#shop").find("option:selected").attr("id");
	var obj ={}
	if(shopId== undefined)
	{
		obj ={
			token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'createTime',
            sortType:'ASC',
            startTime:start_Time+' 00:00:00',
	        endTime:end_Time+' 23:59:59'
		}
	}else
	{
		obj ={
			token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'createTime',
            sortType:'ASC',
            meid:shopId,
            startTime:start_Time+' 00:00:00',
	        endTime:end_Time+' 23:59:59'
		}
	}
	 $.ajax({
        url:commUrl+'/ad/find',
        cache:false,
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
        	console.log(data)
            $(".grid-body").empty();
            var html = '';
            var sort = 0;
            var page = '';
            for(var i =0;i<8;i++)
            {
            	data.data.datas.push(i)
            }
            if(data.code == '1'){
                $.each(data.data.datas,function(i,key){
                    sort = i + 1;
                    html += '<div class="grid-body-tr"> <div class="index"  style="width:160px">'+sort+'</div> ' +
                    '<div class="question"  style="width:400px;max-width:400px">'+key.content+'</div> ' +
                    '<div class="answer"  style="width:400px;max-width:400px">'+ key.startTime+'</div> </div>'
                })
                
                if(data.data.page == '1') {
                    page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li>' +
                        ' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'

                }
                else if(data.data.page == data.data.pageCount){
                    page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                        '<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
                }
                else {
                    page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">'+data.data.page+'</span>/<span class="pagecount">'+data.data.pageCount+'</span> </li> ' +
                        '<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
                }
                
            }
        	$(".pages ul").html(page);
        	$(".grid-body").html(html);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
	function listPage(page){
    	page = page?page:1;
		var start_Time = $('#startTime')[0].value;
		var end_Time = $('#endTime')[0].value;
		if(start_Time!=''|| end_Time!='')
		{
			if( new Date(end_Time)< new Date(start_Time))
			{
				$(".tip").empty().css({color:"red"}).html("开始时间不能小于结束时间");
				return;
			}else{
				$(".tip").empty();
			}
		}
		if(isSeven==true)
		{
			initModel(7,page);
			return;
		}
		if(isThere==true)
		{
			initModel(30,page);
			return;
		}
		if(start_Time==''&& end_Time==''){
			var myDate = new Date(); //获取今天日期
			myDate.setDate(myDate.getDate() - 7);
			var dateArray = []; 
			var dateTemp; 
			var flag = 1; 
			for (var i = 0; i < 7; i++) {
			    dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
			    dateArray.push(dateTemp);
			    myDate.setDate(myDate.getDate() + flag);
			}
			start_Time = myDate.getFullYear()+"-"+ dateArray[0];
			end_Time = myDate.getFullYear()+"-"+ dateArray[dateArray.length-1];
		}
		 pullModel(start_Time,end_Time,page);
    }
	function showOverall(e){
	    $(".deleteQuestion").attr({id: e.id});
	    $(".overall").show();
	}
	function newPage(){
	    $.get('adList.html',{token:$.cookie("token")},function(response){
	        $(".main").empty().html(response);
	    })
	}
	
	function prevPage(e) {
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
	    if(parseInt($(e).prev(".nowPage").val() )<= 1){
	    	
	    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
	        page = $(".pagecount").text();
	    }else{
	        page = $(e).prev(".nowPage").val();
	    }
	    listPage(page);
	}
	function setStartList(e){
		var startTime = new Date($('#startTime')[0].value);
		var endTime = new Date($('#endTime')[0].value);
		if(start_Time=='' || end_Time=='')
		{
			$(".tip").empty().css({color:"red"}).html("请选择开始时间和结束时间");
			return;
		}
		if(new Date(end_Time)<new Date(start_Time))
		{
			$(".tip").empty().css({color:"red"}).html("开始时间不能小于结束时间");
			return;
		}else{
			$(".tip").empty();
			isSeven=false;
			isThere =false;
			listPage();
		}
	}
	function setList(e){
		var value = e.title;
		if(value ==7)
		{
			isSeven=true;
			isThere =false;
		}else{
			isSeven=false;
			isThere =true;
		}
		initModel(value,1);
	}
	function setTypeSelect(e)
	{
		listPage();
	}
	function findAllStore(){
	 $.ajax({
        url:commUrl+'/user/findall',
        cache:false,
        data: {
            token:$.cookie("token")
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
            	var html = '<option >'+'全部商家'+'</option>';
            	$.each(data.data, function(i,key) {
                    html += '<option id='+key.id+'  title='+key.nick+' >'+key.nick+'</option>'
                })
            	$("#shop").html(html);
            }
        }
    })
}