$(document).ready(function() {
	$.ajax({
		url: commUrl + '/menu/findbyid',
		data: {
			token: $.cookie("token"),
			parentId: '598173badac5751672de1384'
		},
		success: function(data) {
			data = eval('(' + data + ')');
			$(".breadcrumb").empty();
			var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a>' +
				'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'add-ad.html' + '" id="' + data.data[0].parentId + '">历史消息</a></li>';
			$(".breadcrumb").html(html);
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
	if($.cookie('line')=='on')
	{
		$('#kfIsOn').html("客服在线中...")
        $('.search-box').show();
	}else{
		$('#kfIsOn').html("客服已离线");
		$('.search-box').hide();
	}
	kfstate();
	pagenation();
	sceneChange();
	deleted();
	hideOverflow();

})

function kfstate() {
	if($.cookie("state") =='free')
	{
		$("#kfstate option").eq(0).attr("selected",true);
	}else{
		$("#kfstate option").eq(1).attr("selected",true);
	}
	$('#kfstate').change(function() {
		$(this).children('option:selected').attr('value');
		var ostate = $(this).children('option:selected').attr('value');
		reportIMState("on", ostate);
	})
}

function sceneChange() {
	$('#scene').change(function() {
		$(this).children('option:selected').attr('value');
		pagenation(1)
	})
}

function confirm() {
		$('.confirm').on('click', function() {
			var newQuestion = $(this).parents('.grid-body-tr').find('input.keyWord').val();
			var newAnswer = $(this).parents('.grid-body-tr').find('input.synonym').val();
			var id = $(this).attr('id');
			$.ajax({
				url: commUrl + '/qaRecord',
				data: {
					token: $.cookie("token"),
					id: id,
					question:newQuestion,
					answer:newAnswer
				},
				type: 'POST',
				success: function(data) {
					console.log(data);
					var page =  $('.onpage').text();
                    pagenation(page);
				},
				error: function(text) {
					console.log(text);
				}
			})
		})
}

function cancel() {
	$('.cancel').on('click', function() {
		$(this).parents('.grid-body-tr').remove();
	})
}

function pagenation(page) {
	
	var curTime = $("#scene").children('option:selected').attr('value');
	var valueTime = 1;
	switch(curTime)
	{
		case "昨天":valueTime = 1;break;
		case "7天":valueTime = 7;break;
		case "30天":valueTime = 30;break;
		case "90天":valueTime = 90;break;
	}
//	var dd = new Date();
//	var d1 = new Date(dd);
//	d1.setDate(dd.getDate()-1);
	var d1 = new Date();
	var d2 = new Date(d1);
	d2.setDate(d1.getDate()-valueTime);
	var d1month = (d1.getMonth()+1)<10?("0"+(d1.getMonth()+1)):d1.getMonth()+1;
	var d2month = (d2.getMonth()+1)<10?("0"+(d2.getMonth()+1)):d2.getMonth()+1;
	var d1day = (d1.getDate())<10?("0"+(d1.getDate())):d1.getDate();
	var d2day = (d2.getDate())<10?("0"+(d2.getDate())):d2.getDate();
	var ostartDate = d2.getFullYear()+"-"+d2month+"-"+d2day;
	var oendDate = d1.getFullYear()+"-"+d1month+"-"+d1day;
	
	page = page ? page : 1;
	var obj = {};
	obj = {
		token: $.cookie("token"),
		maid: $.cookie("maid"),
		page: page,
		row: '10',
		sortId: 'createTime',
		sortType: 'DESC',
		startDate:ostartDate,
		endDate:oendDate
	}
	$.ajax({
		url: commUrl + '/qaRecord',
		data: obj,
		dataType: 'json',
		async: false,
		success: function(response) {
			response = JSON.parse(response);
			console.log(response)
			$(".grid-body").empty();
			$(".pages ul").empty()

			var html = '';
			var page = '';
			if(response.code == '1') {
				if(response.data.count == 0) {
					html = '<div class="grid-body-tr"><p>暂时无数据,请点击右上角按钮选择时间</p></div>';
				} else {
					var sort = 0;
					$.each(response.data.datas, function(i, key) {
						sort = sort + 1;
						var newstr = "无";
						var audioStr = "";
						var uploadStr = '';
						if(key.showAnswer==undefined)
						{
						}else{
							newstr = key.showAnswer;
						}
						if(key.audio)
						{
							audioStr= '<div style="width: 61px; min-width:61px;"><audio id="' + key.id + '" preload="auto" oncanplay="canplay()" class="audioBox"   src="'+key.audio+'" ></audio><img class="playPauseBtn" id="' + key.id + '"  onclick="playOrPaused(this);" src="images/play.png" /></div>' ;
						}else{
							audioStr= '<div style="width: 61px; min-width:61px;"></div>' ;
						}
						if(key.uploadId)
						{
							uploadStr = '<div style="width: 240px; min-width:240px; max-width:240px;">已上传资料库</div></div>' ;
						}else{
							uploadStr = ' <div class="buttonList"><span> <a class="confirm" rel="0"  id="' + key.id + '" style="display: none">确定</a><a class="edit" data-answer="'+newstr+'" data-question="'+key.showQuestion+'" id="' + key.id + '">修改</a><a class="cancelEdit" style="display: none">取消</a><a class="overflowShow" id="' + key.id + '">删除</a></span></div></div>';
						}
						html += '<div class="grid-body-tr"> <div style="width: 41px; min-width:41px;"><span>' + sort + '</div> </span>';
						html += '<div style="width: 150px; min-width:150px; max-width:150px; padding:0 0 ;"><span>'+key.createTime+'</span></div>';
						html += '<div style="width: 235px; min-width:235px; max-width:235px;"><span><input type="text" class="keyWord text" style="display: none" value="' + key.showQuestion + '"/><span class="keyWord" >' + key.showQuestion + '</span></span></div>';	
						html += audioStr+'<div style="width: 235px; min-width:235px; max-width:235px;"><span><input type="text" class="synonym text" style="display: none" value="' + newstr + '"/><span class="synonym">' + newstr+ '</span></span></div>' +
//							' <div class="buttonList"><span> <a class="confirm" rel="0"  id="' + key.id + '" style="display: none">确定</a><a class="edit" data-question="'+key.showQuestion+'" id="' + key.id + '">修改</a><a class="cancelEdit" style="display: none">取消</a><a class="overflowShow" id="' + key.id + '">删除</a></span></div></div>';
							uploadStr
					})
					if(response.data.page == response.data.pageCount) {
						page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li> ' +
							'<li class="nextPage readonly" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)"  value="确定"/></li>'
					} else if(response.data.page == '1') {
						page = '<li class="prevPage readonly" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li>' +
							' <li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定"/></li>'
					} else {
						page = '<li class="prevPage" onclick="javascript:prevPage(this)" >&lsaquo;</li> <li class="page"> <span class="onpage">' + response.data.page + '</span>/<span class="pagecount">' + response.data.pageCount + '</span> </li> ' +
							'<li class="nextPage" onclick="javascript:nextPage(this)">&rsaquo;</li><li class="turnPage"><input type="number" class="nowPage"/><input type="button" onclick="javascript:turnPage(this)" value="确定" /></li>'
					}
				}
			}
			$('.grid-body').html(html)
			$(".pages ul").html(page);
   			initAudio();
			edit();
			showOverflow();
			cancelEdit();
			confirm();
			upKU();
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
}

function upKU() {
	$('.upKU').on('click', function() {
		var id = $(this).attr('id');
		$.ajax({
			url: commUrl + '/qaRecord/upload',
			data: {
				token: $.cookie("token"),
				id: id
			},
			type: 'POST',
			success: function(data) {
				console.log(data);
				alert('上传成功')
			},
			error: function(text) {
				console.log(text);
			}
		})
	})
}
var playPause
var audioTimer;
var audioTotalTime = -1;
var currentTime = 0;
var curIndex = -1;
function initAudio(){
	playPause= $('.playPauseBtn');
	currentTime = 0;
	audioTotalTime = -1;
	curIndex = -1;
	if($('.audioBox') && $('.audioBox').length>0)
	{
		$('.audioBox')[0].currentTime = 0;
	}
	clearInterval(audioTimer);
}
function canplay() {
	audioTotalTime = $('.audioBox')[0].duration;
}

function playOrPaused(e) {
	var id = $(e).attr('id');
	currentTime = 0;
	clearInterval(audioTimer);
	for(var i = 0; i < $('.audioBox').length; i++) {
		var bID = $('.audioBox')[i].id;
		if(id != bID)
		{
			$('.audioBox')[i].pause();
			playPause[i].setAttribute("src", "images/play.png");
		}
	}
	
	for(var a = 0; a < $('.audioBox').length; a++) {
		var aID = $('.audioBox')[a].id;
		if(id == aID)
		{
			if($('.audioBox')[a].paused) {
				$('.audioBox')[a].play();
				('.audioBox')[a].currentTime=0;
				curIndex = a;
				audioTimer = window.setInterval(audioProgress, 1000);
				if(playPause[a])
				{
					playPause[a].setAttribute("src", "images/pause.png");
				}
				return;
			}
			if(audioTimer) {
				currentTime = 0;
				clearInterval(audioTimer);
			}
			$('.audioBox')[a].pause();
			if(playPause[a]){
				playPause[a].setAttribute("src", "images/play.png");
			}
			break;
		}
		
	}
}

function audioProgress() {
	if(audioTotalTime > 0) {
		currentTime++;
		if(currentTime >= audioTotalTime) {
			if($('.audioBox')[curIndex].played) {
				endVideo();
			} else {
				endVideo();
			}
		}
	}

	if($('.audioBox').duration != undefined && $('.audioBox').currentTime != undefined) {
		if($('.audioBox').currentTime < $('.audioBox').duration) {
			if($('.audioBox').played) {
				endVideo();
			}
		} else {
			endVideo();
		}
	}
}
function endVideo(){
	audioTotalTime = -1;
	currentTime = 0;
	clearInterval(audioTimer);
	$('.audioBox')[curIndex].pause();
	$('.audioBox')[curIndex].currentTime = 0;
	playPause[curIndex].setAttribute("src", "images/play.png");
	curIndex = -1;
}
function hideSimiOver(e){
	$(".similarQueOverall").hide();
}
function okBtn(e){
	var isshow = $('.mrAnswer').css('display');
	var id = $('.editTreeTitleInput').attr('id');
	var answer = '';
	var obj = {};
	obj.token = $.cookie("token");
	if(isshow=='none')//搜索
	{
		var type = '';
		var qaid = '';
		$("input[name='sim']:radio:checked").each(function(e){ 
			 answer = $(this).val();
			 type = $(this).data('type');
			 qaid = $(this).attr('id');
		})
		obj.recordid = id;
		obj.qaid = qaid;
		obj.class = type;
		if(answer =='' || answer == '无')
		{
			alert('请搜索并选择您的答案');
			return;
		}
		ssFun(obj);
	}else{
		answer = $('.editAnswerText').val();
		obj.id = id;
		obj.answer = answer;
		obj.parentId = $(".treeTitleInput").attr('id');
		if(answer =='' || answer == '无')
		{
			alert('请输入答案');
			return;
		}
		bjFun(obj);
	}
}
function ssFun(obj)
{
	console.log(obj)
	$.ajax({
		url: commUrl + '/qaRecord/upload1',
		data: obj,
		dataType:'json',
		type: 'POST',
		success: function(data) {
			console.log(data)
			$(".similarQueOverall").hide();
			var page = $('.onpage').text();
			pagenation(page);
		},
		error: function(text) {
			alert(text.readyState);	
			alert(text.status);
		}
	})
}
function bjFun(obj){
	console.log(obj)
	$.ajax({
		url: commUrl + '/qaRecord/upload',
		data: obj,
		dataType:'json',
		type: 'POST',
		success: function(data) {
			console.log(data)
			$(".similarQueOverall").hide();
			var page = $('.onpage').text();
			pagenation(page);
		},
		error: function(text) {
			alert(text.readyState);	
			alert(text.status);
		}
	})
}

//新增问题取消
function cancelBtn(e){
	$(".similarQueOverall").hide();
}

function edit() {
	$('.edit').on('click', function(e) {
		var question = $(this).data('question');
		var answer = $(this).data('answer');
		var id = $(this).attr('id');
		$(".similarQueOverall").show();
		$('.similarAnsList').empty();
		$('.searchInput').val("");
		$('#tree').css('display', 'none');
		$('.editTreeTitleInput').val(question);
		$('.editTreeTitleInput').attr('id',id);
		$('.editAnswerText').val(answer);
		
	})
}
//function edit() {
//	$('.edit').on('click', function() {
//		$(this).next('a').show();
//		$(this).prev('a').show();
//		$(this).hide();
//		$('.upKU').hide();
//		$('.confirm').show();
//		$(this).parents('.grid-body-tr').addClass('red');
//		$(this).parents('.grid-body-tr').find('input.keyWord').show();
//		$(this).parents('.grid-body-tr').find('input.synonym').show();
//		$(this).parents('.grid-body-tr').find('span.keyWord').hide();
//		$(this).parents('.grid-body-tr').find('span.synonym').hide();
//	})
//}

function cancelEdit() {
	$('.cancelEdit').on('click', function() {
		$(this).prev('a').prev('a').hide();
		$(this).prev('a').show();
		$('.upKU').show();
		$(this).hide();
		$('.confirm').hide();
		$(this).parents('.grid-body-tr').removeClass('red');
		$(this).parents('.grid-body-tr').find('input.keyWord').hide();
		$(this).parents('.grid-body-tr').find('input.synonym').hide();
		$(this).parents('.grid-body-tr').find('span.keyWord').show();
		$(this).parents('.grid-body-tr').find('span.synonym').show();
	})
}

function deleted() {
	$('.deleted').on('click', function() {
		var id = $(".deleted").attr('id');
		$.ajax({
			url: commUrl + '/qaRecord/d',
			type:'POST',
			data: {
				token: $.cookie("token"),
				id: id
			},
			success: function(data) {
				data = JSON.parse(data);
				console.log(data);
				if(data.code == 1) {
					$(".overall").hide();
					var page = $('.onpage').text();
					pagenation(page);
				} else if(data.code == -1) {
					$(".overall").hide();
				}
			}
		})
	})
}

function prevPage(e) {
	$(e).next("li").find(".onpage").text();

	if($(e).next("li").find(".onpage").text() == '1') {
		$(e).addClass("readonly");
	} else {
		var page = $(e).next("li").find(".onpage").text() - 1;
		pagenation(page)
	}
}

function nextPage(e) {
	if($(e).prev("li").find(".onpage").text() == $(e).prev("li").find(".pagecount").text()) {
		$(e).addClass("readonly");
	} else {
		var page = $(e).prev("li").find(".onpage").text() - 0 + 1;
		pagenation(page)
	}
}
//输入框跳转页面
function turnPage(e) {
	if(parseInt($(e).prev(".nowPage").val()) <= 1) {
		var page = 1;
		pagenation(page);
	} else if(parseInt($(e).prev(".nowPage").val()) >= parseInt($(".pagecount").text())) {
		var page = $(".pagecount").text();
		pagenation(page)
	} else {
		var page = $(e).prev(".nowPage").val();
		pagenation(page)

	}
}

function showOverflow() {
	$(".overflowShow").on('click', function() {
		$(".deleted").attr({
			id: $(this).attr('id')
		});
		$(".overall").show();
	})
};

function hideOverflow() {
	$(".hideOverflow").on('click', function() {
		$(".overall").hide();
	})
}

function isShowTree(e)
{
	var isshow = $('#tree').css('display');
	$('#tree').css('display', isshow == 'none' ? 'inline-block' : "none");
	if($('#tree').css('display')!='none')
	{
		setTree();
	}
}
function setTree() {
	
	var obj = {
		level:1,
		token: $.cookie("token")
	}
	$.ajax({
		url: commUrl + '/qacates/node' ,
		data: obj,
		cache: false,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			data = eval('(' + data + ')');
			console.log(data)
			addLeftTree(data.data);
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}
var treeData={};
//加载树html
function addLeftTree(datas){
	var addHtml='';
	treeData =datas;
	$.each(datas, function(i, key) {
		var levelNum = key.cateName+"( "+key.count+" )";
		var parentId = key.parentId?key.parentId:key.id;
		var addHtml2 = '';
		var addHtml3 = '';
		var addHtml4 = '';
		var addHtml5 = '';
		if(key.level=='1')
		{
			if(key.subs.length>0){
				$.each(key.subs, function(i, key) {
					if(key.level=='2')
					{
						addHtml3 = '';
						if(key.subs.length>0)
						{
							$.each(key.subs, function(i, key) {
								addHtml4 = '';
								if(key.level=='3')
								{
									if(key.subs.length>0)
									{
										$.each(key.subs, function(i, key) {
											addHtml5 = '';
											if(key.level=='4')
											{
												if(key.subs.length>0)
												{
													$.each(key.subs, function(i, key) {
														var levelNum = key.cateName+"( "+key.count+" )";
														var parentId = key.parentId?key.parentId:key.id;
														addHtml5 += '<li class="collapsable lastCollapsable">'+
															'<span onclick="javascript:getNodeId(this)" class="folder" data-cateName="'+key.cateName+'" data-parentId="'+parentId+'" data-level="'+key.level+'"  id="' + key.id + '">'+levelNum+
															'</span>'+
														'</li>';
													})
												}
											}
											var levelNum = key.cateName+"( "+key.count+" )";
											var parentId = key.parentId?key.parentId:key.id;
											addHtml4 += '<li>'+
												'<span onclick="javascript:getNodeId(this)" class="folder" data-cateName="'+key.cateName+'" data-parentId="'+parentId+'" data-level="'+key.level+'"  id="' + key.id + '">'+levelNum+
												'</span>'+
												'<ul>'+addHtml5+'</ul>'+
											'</li>';
										})
									}
								}
								var levelNum = key.cateName+"( "+key.count+" )";
								var parentId = key.parentId?key.parentId:key.id;
								addHtml3 += '<li>'+
									'<span onclick="javascript:getNodeId(this)" class="folder" data-cateName="'+key.cateName+'" data-parentId="'+parentId+'" data-level="'+key.level+'"  id="' + key.id + '">'+levelNum+
									'</span>'+
									'<ul>'+addHtml4+'</ul>'+
								'</li>';
							})
						}
					}
					var levelNum = key.cateName+"( "+key.count+" )";
					var parentId = key.parentId?key.parentId:key.id;
					addHtml2 += '<li>'+
						'<span onclick="javascript:getNodeId(this)" class="folder" data-cateName="'+key.cateName+'" data-parentId="'+parentId+'" data-level="'+key.level+'"  id="' + key.id + '">'+levelNum+
						'</span>'+
						'<ul>'+addHtml3+'</ul>'+
					'</li>';
				})

			}
			addHtml+='<li data-count="'+key.count+'">'+
				'<span onclick="javascript:getNodeId(this)" class="folder" data-cateName="'+key.cateName+'" data-parentId="'+parentId+'" data-level="'+key.level+'"  id="' + key.id + '">'+levelNum+
				'</span>'+
				'<ul>'+addHtml2+'</ul>'+
			'</li>';
		}
		
	})
	$("#tree").html(addHtml);
	$("#tree").treeview();

}

var editName='';
var editId ='';
//编辑问题
function checkInfo(e){
	editId = $(e).data('parentid');
	id = $(e).attr('id');
//	if($(e).data('parentid') == 'undefined')
//	{
//		editId = $(e).attr('id');
//	}
//	isEdit = true;
//	isSim = false;
//	$(".similarQueOverall").show();
//	$("#simlarEdit").show();
//	$("#simlarOne").hide();
//	$("#simlarAdd").hide();
//	$('.anotherTree').css('display','none');
//	getCurrQues(id);
//	getNewsimilarQue(id);
	getTreeName();
}
function getTreeName(){
	$.each(treeData, function(i, key) {
		if(key.id == editId){
			editName = key.cateName;
		}
		if(key.level=='1')
		{
			if(key.subs.length>0){
				$.each(key.subs, function(i, key) {
					if(key.id == editId){
						editName = key.cateName;
					}
					if(key.level=='2')
					{
						if(key.subs.length>0)
						{
							$.each(key.subs, function(i, key) {
								if(key.id == editId){
									editName = key.cateName;
								}
								if(key.level=='3')
								{
									if(key.subs.length>0)
									{
										$.each(key.subs, function(i, key) {
											if(key.id == editId){
												editName = key.cateName;
											}
											if(key.level=='4')
											{
												if(key.subs.length>0)
												{
													$.each(key.subs, function(i, key) {
														if(key.id == editId){
															editName = key.cateName;
														}
													})
												}
											}
										})
									}
								}
							})
						}
					}
				})

			}
		}
	})
		$(".treeTitleInput").attr('placeholder',editName);
		$(".treeTitleInput").attr('id',editId);
}
function searchFun(e){
	var ans = $('.searchInput').val();
	if(ans=='')
	{
		alert('请输入要搜索的答案');
		return;
	}
	$.ajax({
		url: commUrl + '/qa/simqa',
		data: {
			question: $('.searchInput').val(),
			token: $.cookie("token")
		},
		cache: false,
		dataType: 'json',
		type: 'POST',
		success: function(data) {
			data = eval('(' + data + ')');
			console.log(data);
			var html='';
			$('.similarAnsList').empty();
			for(var i =0;i<data.data.length;i++)
			{
				html+= '<li class="similarLi" >'+
								'<span>'+data.data[i].answer+'</span>'+
								'<input type="radio" name="sim" class="elCheckbox" style="left:460px;" value="' + data.data[i].answer + '" id="' + data.data[i].id + '" data-type="'+data.data[i].type+'">'+
							'</li>'
				$('.similarAnsList').html(html);
			}
			if(data.code=='-1')
			{
				alert(data.msg+" 请重新登录")
			}
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}
function setAnsPanl(e){
	$('.mrAnswer').css('display', 'none');
	$('.fenleiPanl').css('display', 'none');
	$('.treeTitleInput').attr('id','');
	$('.simB').css('display', 'inline-block');
	console.log($('.btns').find('input').eq(0))
	$('.btns').find('input').eq(0).css("background-color","#00a0ea");
	$('.btns').find('input').eq(0).css("border-color","#00a0ea");
	$('.btns').find('input').eq(0).css("color","white");
	$('.btns').find('input').eq(1).css("background-color","white");
	$('.btns').find('input').eq(1).css("border-color","#dbdae0");
	$('.btns').find('input').eq(1).css("color","#333");
}
function setEditAnsPanl(e){
	$('.simB').css('display', 'none');
	$('.mrAnswer').css('display', 'inline-block');
	$('.fenleiPanl').css('display', 'inline-block');
	$('.btns').find('input').eq(0).css("background-color","white");
	$('.btns').find('input').eq(0).css("border-color","#dbdae0");
	$('.btns').find('input').eq(0).css("color","#333");
	$('.btns').find('input').eq(1).css("background-color","#00a0ea");
	$('.btns').find('input').eq(1).css("border-color","#00a0ea");
	$('.btns').find('input').eq(1).css("color","white");
}
function getNodeId(e){
	var id  = $(e).attr('id');
	var parentId = $(e).data('parentid');
	$(".treeTitleInput").attr('id',id)
	$(".treeTitleInput").val($(e).data('catename'))
	
	$('#tree').css('display', 'none');
}
