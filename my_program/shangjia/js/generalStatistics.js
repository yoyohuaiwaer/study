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
            sortId:'createTime',
            sortType:'DESC',
            startTime:start_Time+' 00:00:00',
        	endTime:end_Time+' 23:59:59'
		}
	 $.ajax({
        url:commUrl+'/qaSurveyStatistics',
        cache:false,
        type:'POST',
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
	console.log(data)
            $(".grid-body").empty();
            var html =  '<tr class="grid-head-th">'+
		                '<th class="start_Time" style="width: 200px;">时间</th>'+
		                '<th class="totalNum" style="width: 200px;">问答次数</th>'+
		                '<th class="successNum" style="width: 200px; ">成功次数</th>'+
		                '<th class="perc" style="width: 200px; ">准确率</th>'+
		                '<th class="errorNum" style="width: 200px; ">失败次数</th>'+
		           		'</tr>';
            var page = '';
            if(data.code == '1'){
				$.each(data.data.datas,function(i,key){
					var accuracy =(key.value.successCount/key.value.total)
					var perc = (parseFloat(accuracy.toFixed(3))*100).toFixed(1);
                    html += '<tr class="grid-body-tr" > <td class="start_Time"  style="width:200px">'+key.id+'</td> ' +
                    '<td class="totalNum"  style="width:200px;">'+key.value.total+'</td> ' +
                    '<td class="successNum"  style="width:200px;">'+key.value.successCount+'</td> ' +
                    '<td class="perc" style="width:200px;">'+perc+'%</td> ' +
                    '<td class="errorNum"  style="width:200px;">'+ key.value.errorCount+'</td> </tr>'
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
            parentId:$('.main-title').attr('title')
        },
        success: function(data){
            data = JSON.parse(data);
            if(data.code == 1) {
                $(".breadcrumb").empty();
                var breadcrumb = '';
                $.each(data.data, function(i,key) {
                    breadcrumb += '<li><a  onclick="javascript:changePage(this);"  title="'+menuUrl+''+key.url+'" id="'+key.id+'">'+key.name+'</a></li>'
                    $(".breadcrumb").html(breadcrumb);
                    $(".breadcrumb li:first-child").addClass('selected');
                })
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
