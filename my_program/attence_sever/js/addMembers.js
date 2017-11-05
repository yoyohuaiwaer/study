$(document).ready(function() {
	//commUrl = 'http://10.10.23.67:8080/qh_server';
	producer();
	if(parseInt($.cookie("read")) > 0) {
		loadInfo();

	} else {
		//getMemId();
		//initAd();
	}


	//图片

	changeImg()
})
function producer(){
	$.ajax({
		url: commUrl + '/user/userList',
		//type: 'POST',
		cache: false,
		async: false,
		data: {
			token: $.cookie("token")
		},
		//dataType: 'json',
		//contentType: 'application/json; charset=UTF-8',
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				//if(data.data.length > 1){
					var str = ''
					//str = '<option value="">选择公司</option>';
					$.each(data.data,function(i,key){
						str +='<option value="'+key.id+'">'+key.nick+'</option>'
					});
				if(data.data.length == 1){
					$('#producer').html(str);
				}else {
					$('#producer').html(str).show();
				}
				var _id = $('#producer').children('option:selected').attr('value');
				classId( _id);
				searchProducer();
				//}

			}
		},
		error: function(text){

		}
	})
}
function searchProducer(){
	$('#producer').on('change',function(){
		//$.cookie('rel1','4',{path:'/'});
		var _id = $('#producer').children('option:selected').attr('value');
		classId(_id);
		//listPage();
	})
};

function loadInfo(){
	$.ajax({
		url: commUrl + '/employee/getEmployeeById',
		type:'POST',
		data: {
			token: $.cookie("token"),
			id: $.cookie('read')
		},
		cache: false,
		//type: 'GET',
		dataType: 'json',
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				var key = data.data
				//$.each(data.data.datas, function(i, key) {
				if(key.id == $.cookie('read')) {
					createTime = key.createTime
					$('#phone').val(key.phone);
					$('#number').val(key.number).attr({'readonly':'readonly'});
					$('#name').val(key.name).attr({'data-id':key.id ,'data-createTime':key.createTime});
					$("#producer").find("option[value='"+ key.meid+ "']").attr({selected: "selected"});
					var proId = key.meid;
					classId(proId);


					$("#classId").find("option[value='"+ key.deptId+ "']").attr({selected: "selected"});
					$("#type").find("option[value='" + key.type+"']").attr({selected: "selected"});
					$("#sex").find("input[value='" + key.sex + "']").attr({checked: "checked"});
					$("#status").find("input[value='" + key.state + "']").attr({checked: "checked"});

					if(key.faceUrls)
					{
						for(var i = 0; i < key.faceUrls.length; i++) {
							var curID = "imageStr" + (i);
							var layerId = "layer"+ i;
							document.getElementById(curID).src = key.faceUrls[i];
							document.getElementById(curID).style.display = 'inline-block';
							document.getElementById(layerId).style.display = 'inline-block';
						}
					}
				}

				//});
			}
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}
function changeImg(){
	$(".changeImg input").change(function() {
		var imgList = checkImgLength();

		var filesList = this.files;
		if(filesList.length > 5) {
			$(".tip").empty().css({
				color: "red"
			}).html("最多可以上传5张图片");
			return false;
		}
		var curIndex = 0;
		var isHasDel =false;
		var realList = [];
		for(var imgI = 0;imgI<imgList.length;imgI++)
		{
			if(imgList[imgI]==" ")
			{
				isHasDel = true;
				curIndex = imgI;
			}else{
				realList.push(imgList[imgI])
			}
		}
		if(realList.length >= 5) {
			$(".tip").empty().css({
				color: "red"
			}).html("最多可以上传5张图片");
			return false;
		}
		if (curIndex==0 && !isHasDel) {
			curIndex = imgList.length;
		}
		for(var i = 0; i < filesList.length; i++) {
			loadImg(filesList[i])
		}
		function loadImg(file) {
			var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
			if(fileName == "jpg" || fileName == "jpeg" || fileName == "png" || fileName == "bmp") {
				if(file.size / 1024 < 1000) {
					showOverall();
					var formData = new FormData();
					formData.append('file1', file);
					var curID = "imageStr" + curIndex;
					var layerId = "layer"+ curIndex;
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
							var json = eval('(' + data.responseText + ')');
							document.getElementById(curID).src = json.imgurl;
							document.getElementById(layerId).src = "images/delected.png";
							//$('imageStr'+curID).attr('src', json.imgurl);
							var img = document.getElementById(curID); //获取img元素
							var picRealWidth, picRealHeight;
							$("<img>") // 在内存中创建一个img标记
								.attr("src", $(img).attr("src"))
								.load(function() {
									picRealWidth = this.width;
									picRealHeight = this.height;
									$(".imgTips").empty().css({
										color: "green"
									}).html("");
									document.getElementById(curID).src = json.imgurl;
									document.getElementById(curID).style.display = 'inline-block';
									document.getElementById(layerId).style.display = 'inline-block';
									clearOverall();
								});

						}
					});
				} else {
					clearOverall();
					if(document.getElementById(curID))
					{
						document.getElementById(curID).src = "";
						document.getElementById(curID).style.display = 'none';
						document.getElementById(layerId).style.display = 'none';
					}
					$(".imgTips").empty().css({
						color: "red"
					}).html("图片大小不能大于1M");
				}
			} else {
				if(document.getElementById(curID)) {
					document.getElementById(curID).src = "";
					document.getElementById(curID).style.display = 'none';
					document.getElementById(layerId).style.display = 'none';
				}
				$(".imgTips").empty().css({
					color: "red"
				}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
			}
		}

	});
}

function classId(id){
	var _data = {
		token: $.cookie("token")
	}
	if(id !== undefined){
		_data.meid = id;
	}
	$.ajax({
		url: commUrl + '/employee/findDept',
		type: 'POST',
		cache: false,
		data: _data,
		async: false,
		//dataType: 'json',
		//contentType: 'application/json; charset=UTF-8',
		success: function(data) {
			data = eval('(' + data + ')');
			//console.log(data);
			if(data.code == '1') {
				var str = ''
				$.each(data.data,function(i,key){
					str +='<option value="'+key.id+'">'+key.deptName+'</option>'
				});
                 $('#classId').html(str);
			}
		},
		error: function(text){

		}
	})
}
function cancelAdFun(e) {
	$.ajax({
		url: 'membersList.html',
		datatype: 'html',
		cache: false,
		success: function(data) {
			$(".main").empty().html(data);
		}
	})
}

function addAdFun(e) {
	var mphone = $('#phone').val();
	var mname = $('#name').val();
	var msex = $("input[name='sex']:checked").val();
	var mclassID = $('#classId option:selected').attr('value');
	var mclassName = $('#classId option:selected').html();
	var _meid = $('#producer option:selected').attr('value');
	var mType =  $("input[name='type']:checked").val();
	var state = $("input[name='status']:checked").val();
	var id = $.cookie('read');
	var number =  $('#number').val();
	var maudio = [];
	var imgArr = [];
	$('.imageBox .photo').each(function() {
		var src = $(this).attr('src');
		if(src != ""&& src!=" ") {
			imgArr.push(src)
		}
	})
	if(mname == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("请添加姓名");
		return false;
	}
	if(imgArr.length <= 0) {
		$(".tip").empty().css({
			color: "red"
		}).html("请添加会员相片");
		return false;
	}
	if(mname == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("请添加姓名");
		return false;
	}
	if(number == '') {
		$(".tip").empty().css({
			color: "red"
		}).html("请输入员工编号");
		return false;
	}

	$(".tip").empty();
	var obj = {phone: mphone,
		name: mname,
		sex: msex,
		deptId:mclassID,
		deptName:mclassName,
		type: mType,
		number: number,
		//vprUrls: maudio,
		faceUrls: imgArr,
		meid: _meid,
		state: state
	}
	if($('#name').attr('data-id') !== '') {
		obj.id= id
	}
	$.ajax({
		url: commUrl + '/employee/updateEmployee?token=' + $.cookie("token"),
		type: 'POST',
		cache: false,
		data: JSON.stringify(obj),
		dataType: 'json',
		contentType: 'application/json; charset=UTF-8',
		success: function(data) {
			data = eval('(' + data + ')');
			if(data.code == '1') {
				newPage();
			}else{
				alert(data.msg)
			}

		}
	})
}

function newPage() {
	$.get('membersList.html', {
		token: $.cookie("token"),
		scene: $.cookie("scene")
	}, function(response) {
		$(".main").empty().html(response);
	})
}

function clearOverall() {
	$(".overall").hide();
}

function showOverall() {
	$(".overall").show();
}

function checkImgLength() {
	var imgList = [];
	$('.imageBox .photo').each(function() {
		var src = $(this).attr('src');
		if(src != "") {
			imgList.push(src)
		}
	})
	return imgList;
}
function delcfm(e){
	var list = checkImgLength();
	var curImg = $(e).parent().find("img")
	curImg.css("display","none")
	$('.imageBox .photo').each(function(i,key) {
		if(i ==$(e).attr('title') )
		{
			var src = $(this).attr('src');
		}
	})
	
	curImg.attr('src', " ");
	list = checkImgLength();
}
