$(document).ready(function(){
	$('#dateinfo').val('');
	$('#dateLast').val('');
	searchbtn();
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
	start_Time = dateArray[0]+' 00:00:00';
	var end_Time = dateArray[dateArray.length - 1]+' 23:59:59';
	pullModel(start_Time, end_Time, page);
}
function pullModel(start_Time,end_Time,page){
	var optionValue = checkCBox();
	var obj ={
			token:$.cookie("token"),
            page:page,
            row:'10',
            sortId:'date',
            sortType:'DESC',
            startTime:start_Time,
        	endTime:end_Time,
        	option:optionValue,
        	name: $('.searchText').val()
		}
	 $.ajax({
        url:commUrl+'/member/memberLoginDetail',
        cache:false,
        type:'get',
        data:obj,
        dataType:'json',
        success:function(data){
            data = eval('('+data+')');
            $(".grid-body").empty();
            var html =  '<tr class="grid-head-th">'+
           					'<th class="order">序号</th>'+
			                '<th class="memebersNum">会员号</th>'+
			                '<th class="name">姓名</th>'+
			                '<th class="memeberType" >类别</th>'+
			                '<th class="time" >登录时间</th>'+
		           		'</tr>';
            var page = '';
            if(data.code == '1'){
            	 var sort = 0;
				$.each(data.data.datas,function(i,key){
					 sort = i + 1;
					 var category = key.category;
					 if(category==undefined)
					 {
					 	category ='';
					 }
                    html += '<tr class="grid-body-tr" > <td class="order">'+sort+'</td> ' +
                    '<td class="memebersNum">'+key.memberNo+'</td> ' +
                    '<td class="name">'+key.name+'</td> ' +
                    '<td class="memeberType">'+category+'</td> ' +
                    '<td class="time">'+key.time+'</td> ' +
                    '</tr>'
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
               var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[1].url + '" id="' + data.data[1].id + '">' + data.data[1].name + '</a>' +
					'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'add-ad.html' + '" id="' + data.data[1].parentId + '">登录详情</a></li>';
				$(".breadcrumb").html(html);
            }
        }
    })
}
	function listPage(page){
		page = page?page:1;
		var start_Time = $('#dateinfo').val();
	    var end_Time =  $('#dateLast').val();
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
			initModel(7,page);
			return;
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
function clickCheckbox(){
	var start_Time = $('#dateinfo').val();
	var end_Time =  $('#dateLast').val();
	if(start_Time == '' && end_Time=='')
	{
		initModel(7,1);
	}else
	{
		clickTime();
	}
}
function clickTime(){
	isSeven=false;
	isThere =false;
	$(".tip").empty();
	var start_Time = $('#dateinfo').val();
	var end_Time =  $('#dateLast').val();
	if(start_Time=='')
	{
		$(".tip").empty().css({
			color: "red"
		}).html("请选择开始时间");
		return false;
	}
	if( end_Time=='')
	{
		$(".tip").empty().css({
			color: "red"
		}).html("请选择结束时间");
		return false;
	}
	if( new Date(end_Time)< new Date(start_Time))
	{
		$(".tip").empty().css({color:"red"}).html("开始时间不能小于结束时间");
			return;
		}else{
			$(".tip").empty();
	}
	pullModel(start_Time, end_Time, 1);
}

function checkCBox(){
	var optionValue = '';
	var first = '';
	var last = '';
	if($("[name='fTime']").is(':checked'))
	{
		first = 'first';
		optionValue = 'first';
	}
	if($("[name='lTime']").is(':checked'))
	{
		last = 'last';
		optionValue = 'last';
	}
	if(first!='' && last!='')
	{
		optionValue = 'firstAndLast';
	}
	return optionValue;
}
function searchbtn(){
    $('.searchbtn').on('click',function(){
        listPage(1,true);
    })
};