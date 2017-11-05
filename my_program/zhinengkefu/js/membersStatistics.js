$(document).ready(function(){
	findMenus();
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
function initModel(value, page) {
	page = page ? page : 1;
	var myDate = GetDateStr(-(value - 1))
	var dateArray = [];
	var dateTemp;
	var flag = 1;
	var start_Time;
	for(var i = 0; i < value; i++) {
		dateTemp = p(myDate.getMonth() + 1) + "-" + p(myDate.getDate());
		start_Time = myDate.getFullYear() + "-" + dateTemp;
		dateArray.push(start_Time);
		myDate.setDate(myDate.getDate() + flag);
	}
	start_Time = dateArray[0];
	var end_Time = dateArray[dateArray.length - 1];
	pullModel(start_Time, end_Time, page);
}
function pullModel(start_Time,end_Time,page){
	var obj ={
			token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'date',
            sortType:'DESC',
            startDate:start_Time,
        	endDate:end_Time
		}
	 $.ajax({
        url:commUrl+'/member/memberLoginSurvey',
        cache:false,
        type:'get',
        data:obj,
//      dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".grid-body").empty();
            var html =  '<tr class="grid-head-th">'+
			                '<th class="start_Time">时间</th>'+
			                '<th class="totalNum">登录人数</th>'+
			                '<th class="noLoginNum" >未登录人数</th>'+
		           		'</tr>';
            var page = '';
            if(data.code == '1'){
            	var sort =0;
				$.each(data.data.datas,function(i,key){
					 sort = i + 1;
                    html +=  '<tr class="grid-body-tr" > <td class="start_Time">'+key.date+'</td> ' +
                    '<td class="totalNum">'+key.loginCount+'</td> ' +
                    '<td class="noLoginNum">'+key.notLoginCount+'</td> </tr>'
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
        	$(".grid").html(html);
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    })
}
function findMenus(){
    $.ajax({
        url:commUrl+'/menu/findbyid',
        cache:false,
        data: {
            token:$.cookie("token"),
            parentId:'582d3006b2a99afa74c510de'
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                $(".breadcrumb").empty();
 				 var html = '<li class="selected"><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[1].url + '" id="' + data.data[1].id + '">' + data.data[1].name + '</a>' +
					'<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);"   title="' + menuUrl + '' + 'membersDetail.html' + '" id="' + data.data[1].parentId + '">登录详情</a></li>';
				$(".breadcrumb").html(html);
            }
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
	    if(parseInt($(e).prev(".nowPage").val()) <= 1){
	    	
	    }else if(parseInt($(e).prev(".nowPage").val() )>= parseInt($(".pagecount").text())){
	        page = $(".pagecount").text();
	    }else{
	        page = $(e).prev(".nowPage").val();
	    }
	    listPage(page);
	}
	function setStartList(){
		var start_Time = $('#startTime')[0].value;
		var end_Time = $('#endTime')[0].value;
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
	function setList(e){//7日或者30日
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
	//导出Excel
	function forExcel() {
		outExcel('grid');
	}
