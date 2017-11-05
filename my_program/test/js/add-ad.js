$(document).ready(function() {
	//	getFullTime('#timeWrap')
	//commUrl = 'http://10.10.23.65:8080/server'
	newDireObj = [];
	if($.cookie('adId')!=='') {
		loadImage();
	}
	cancel();//返回素材列表页
	chooseType();//选择素材
	uploadImage();//图片素材上传图片

	addimage('.confirmImage')
	addimage('.textConfirm');
	addimage('.testConfirm');
	overshow();//弹出新增
	cancelAdd();//取消新增题
	addDirection();//新增题的提交按钮
	deleDirection();//删除某一道题
})
function cancel(){
	$('.cancle').on('click',function(){
		$.ajax({
			url: 'adList.html',
			datatype: 'html',
			cache: false,
			success: function(data) {
				$(".main").empty().html(data);
			}
		})
	})
}
function cancelAdd(){//弹出框隐藏
	$('.cancelAdd').on('click',function(){

		$('.overall').hide();
	})
}
function overshow(){
	$('.overshow').on('click',function(){
		$('.deleDirection').hide();
		$('.subject').val('');
		$('.option').val('');
		$('.point').each(function(){
			$(this).children('option:eq(0)').prop('selected',true);
		})

		$('.addDirection').attr({'data-id':''});
		$('.overall').show();
	})
}
function chooseType(){
	$('#type').on('change',function(){
		var type = '#'+$(this).children('option:selected').val();
		changeShow(type)
	})
}
function changeShow(type){
	$('.bigBox').hide();
	$(type).show();
}

function loadImage(){
	$.ajax({
		url: commUrl + '/pushMaterial',
		data: {
			token: $.cookie("token"),
			id: $.cookie('adId')
		},
		cache: false,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			data = eval('(' + data + ')');
			var type = ''
			if(data.code == '1') {
				data = data.data
				if(data.type=='image'){//图片类型
					$('#type').children('option:eq(0)').prop('selected',true);
					type = '#imageUpload';
					$("#title").val(data.title);
					$("#content").val(data.content);
					$("#url").val(data.url);
					if(data.img !=="")
					{
						$('#imageId').attr('src', data.img);
						$('#imageId').css('width', '120').css('height', '120').css('display', 'inline-block');
					}
					$('.confirmImage').attr({'data-id':data.id,'data-meid':data.meid});

				}else if(data.type == 'text'){//文本类型
					$('#type').children('option:eq(1)').attr('selected',true);
					type = '#textUpload';
					$('#textTitle').val(data.title);
					$('#textContent').val(data.content);
					$('.textConfirm').attr({'data-id':data.id,'data-meid':data.meid});
				}else if(data.type == 'test'){//测试题
					$('#type').children('option:eq(2)').attr('selected',true);
					$('#testTitle').val(data.title);
					type = '#testUpload';
					newDireObj=data.bundle.tests
					loadDirecEle(newDireObj);
					$.each(data.bundle.comments,function(i,key){
						$('.command').eq(i).find('.minPoint').val(key.minPoint)
						$('.command').eq(i).find('.maxPoint').val(key.maxPoint)
						$('.command').eq(i).find('.resultCommand').val(key.comment);
					})
					$('.testConfirm').attr({'data-id':data.id,'data-meid':data.meid});
				}
				//editDirection();
				changeShow(type);
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

function initAd() {
	$.ajax({
		url: commUrl + '/menu/findbyid',
		cache: false,
		data: {
			token: $.cookie("token"),
			parentId: '586606df5a5a9763823e6399'
		},
		success: function(data) {
			data = eval('(' + data + ')');
			$(".breadcrumb").empty();
			var html = '<li ><a href="javascript:void(0);" onclick="javascript:changePage(this);" title="' + menuUrl + '' + data.data[0].url + '" id="' + data.data[0].id + '">' + data.data[0].name + '</a>' +
				'<li class="selected"><a href="javascript:void(0);"   title="' + menuUrl + '' + 'add-ad.html' + '" id="' + data.data[0].parentId + '">编辑素材详情</a></li>';
			$(".breadcrumb").html(html);
			if(data.code=='-1')
			{
				alert(data.msg+" 请重新登录")
			}
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
}

function uploadImage(){
	$(".file_upload").change(function() {
		var file = this.files[0];
		if(file ==undefined)
		{
			return;
		}
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
			if(file.size / 1024 < 1000) {
				showOverall();
				var formData = new FormData();
				formData.append('file1', file);
				$.ajax({
					type: "POST", //必须用post
					url: imgUrl,
					crossDomain: true,
					cache: false,
					jsonp: "jsoncallback",
					data: formData,
					contentType: false, //必须
					processData: false,
					complete: function(data) {
						clearOverall();
						var json = eval('(' + data.responseText + ')');
						$('#imageId').attr('src', json.imgurl);
						var img = $("#imageId"); //获取img元素
						var picRealWidth, picRealHeight;
						$("<img>") // 在内存中创建一个img标记
							.attr("src", $(img).attr("src"))
							.load(function() {
								picRealWidth = this.width;
								picRealHeight = this.height;
								$(".imgTips").empty().css({
									color: "green"
								}).html("");
								$('#imageId').show().attr('src', json.imgurl);
								$('#imageId').css('display', 'inline-block');
							});
							if(data.code=='-1')
							{
								alert(data.msg+" 请重新登录")
							}
					}
				});
			} else {
				clearOverall();
				$('#imageId').attr('src', '');
				$('#imageId').css('display', 'none');
				$(".imgTips").empty().css({
					color: "red"
				}).html("图片大小不能大于1M");
			}
		} else {
			$('#imageId').attr('src', '');
			$('#imageId').css('display', 'none');
			$(".imgTips").empty().css({
				color: "red"
			}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
		}
	})
}



function addimage(Ele) {
	$(Ele).on('click',function(){
		var type = $(this).attr('data-type')
		var id = $(this).attr('data-id');

		var meid = $(this).attr('data-meid');
		var obj = {}
		if(type =='image'){//图片参数
			var title = $('#title').val();
			var content = $('#content').val()
			var imgView = $('#imageId').attr('src');
			var imgUrl = $('#url').val();
			if(title == '') {
				$(".tip").empty().css({
					color: "red"
				}).html("标题不能为空");
				return false;
			} else if(content == '') {
				$(".tip").empty().css({
					color: "red"
				}).html("内容不能为空");
				return false;
			}
			if(imgUrl != "") {
				if(imgUrl.substr(0, 4) != "http") {
					$(".tip").empty().css({
						color: "red"
					}).html("输入地址有误，地址必须是以http开头的url");
					return false;
				}
			} else if(imgView == '') {
				$(".tip").empty().css({
					color: "red"
				}).html("请添加素材图");
				return false;
			}
			$(".tip").empty();

			if(id == '') {
				obj = {
					title: title,
					content: content,
					img: imgView,
					url: imgUrl,
					type: type,
					creator: $.cookie('username')
				}
			} else {
				obj = {
					//token: $.cookie("token"),
					title: title,
					content: content,
					img: imgView,
					url: imgUrl,
					type: type,
					creator: $.cookie('username'),
					id: id,
					meid: meid
				}
			}

		}
		else if(type == 'text'){
			var title = $('#textTitle').val();
			var content = $('#textContent').val()
			if(title ==''){
				alert('标题不能为空');
				return false

			}
			if(content == ''){
				alert('内容不能为空');
				return false
			}
			if(id == ''){
				obj = {
					title: title,
					content: content,
					type: type,
					creator: $.cookie('username')}
			}else{
				obj = {
					title: title,
					content: content,
					id: id,
					type: type,
					creator: $.cookie('username'),
					meid: meid
				}

			}
		}else if(type == 'test'){
			var title = $('#testTitle').val();
			var comments = [];
			var testObj = {};
			$('.command').each(function(){
				var minPoint = $(this).find('.minPoint').val();
				var maxPoint = $(this).find('.maxPoint').val();
				var comment = $(this).find('.resultCommand').val();
				if(minPoint!==''&& maxPoint!==''&&comment!== ''){
					var obg = {
						minPoint: minPoint,
						maxPoint: maxPoint,
						comment: comment
					}
					comments.push(obg);
				}
			})
			if(title==''|| newDireObj.length==0 || comments.length==''){
				alert('标题不能、试题、结果均不能为空！请检查~！')
				return false;
			}
			testObj = {
				title: title,
				comments: comments,
				tests: newDireObj
			}
			if(id == ''){
				obj = {
					title: title,
					bundle: testObj,
					type: type,
					creator: $.cookie('username')}
			}else{
				obj = {
					/*token: $.cookie("token"),*/
					title: title,
					bundle: testObj,
					id: id,
					type: type,
					creator: $.cookie('username'),
					meid: meid
				}

			}
		}
		ajax(obj)


	})
}

function ajax(obj){
	$.ajax({
		url: commUrl + '/pushMaterial?token='+$.cookie("token"),
		//data: obj,
		type: 'POST',
		cache: false,
		data: JSON.stringify(obj),
		dataType: 'json',
		contentType: 'application/json; charset=UTF-8',
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				newPage();
			}else if(data.code=='-1')
			{
				$(".tip").empty().css({
					color: "red"
				}).html(data.msg);
			}
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}








function checked(judge){
	var newArry = [];
	var bigBox = {};
	var title = $('.subject').val();
	$('.testCheckbox').each(function(i,Ele){
		var content = $(this).find('.option').val();
		var point = $(this).find('.point').children('option:selected').val();
		var index = i +1;
		if(content !== ''){
			var obj = {
				content: content,
				point:point,
				index: index
			};
			newArry.push(obj);
		}
	});
	if(newArry.length == 0 || title == ''){
		alert('未添加选项或者未添加标题！')
		return false;
	}
	var option = newArry;

	if(judge == ''){
		var index = newDireObj.length +1;
		bigBox = {
			options: option,
			title: title,
			index: index
		}
		newDireObj.push(bigBox)

	}else{
		newDireObj[judge].options = option;
		newDireObj[judge].title = title;

	}
	loadDirecEle(newDireObj);
	$('.overall').hide();

}
function addDirection(){//鏂板鍔ㄤ綔鎻愪氦
	$('.addDirection').on('click',function(){
		var judge = $(this).attr('data-id');
		checked(judge);
	})
}

function loadDirecEle(newDireObj){
	/*if(Arr){
		newDireObj.push(Arr);
	}*/
	/*console.log(newDireObj);
	 debugger;*/
	var html = '';
	$.each(newDireObj,function(i,key){
		html += '<a class="editDirection" data-id="id'+key.index+'">'+key.title+'</a>'
	})
	$('.subjectBox').empty().html(html);
	editDirection();//修改测试题
}
function deleDirection(){//删除动作
	$('.deleDirection').on('click',function(){
		//deleDirection()
		var index = $(this).attr('data-id');
		newDireObj = $.grep(newDireObj,function(n,i){
			return i != index;
		})
		for(var i = 0; i < newDireObj.length; i++){
			newDireObj[i].index = i+1;
		}
		loadDirecEle(newDireObj);
		$('.overall').hide();
	});
};
function editDirection() {//修改动作
	$('.editDirection').on('click', function () {
		var index = $('.editDirection').index(this);
		$('.addDirection').attr({'data-id':index});
		$('.deleDirection').show().attr({'data-id':index});
		var arr = newDireObj[index];

		$('.subject').val(arr.title)
		$.each(arr.options, function (i, key) {
			$('.testCheckbox').eq(i).find('.option').val(key.content);
			$('.testCheckbox').eq(i).find('.point').children('option[value="'+key.point+'"]').attr('selected',true);
		})
		$('.overall').show();
	})
}













function newPage() {
	$.get('adList.html', {
		token: $.cookie("token"),
		scene: $.cookie("scene")
	}, function(response) {
		$(".main").empty().html(response);
	})
}

function clearOverall() {
	$(".overall1").hide();
}

function showOverall() {
	$(".overall1").show();
}