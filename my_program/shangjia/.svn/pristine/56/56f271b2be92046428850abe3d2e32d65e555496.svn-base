/**
 * Created by A on 2016/10/14.
 */
//commUrl = 'http://172.16.8.230:8082/server/'  //测试服务器
$(document).ready(function() {
	//http://172.16.8.230:8082/server/startlogo/find/?token=a8f76c30ca1bb915a5185d4425110a76&&cate=2
	$.ajax({
		url: commUrl + '/menu/findbyid',
		//type:'GET',
		//async: false,
		data: {
			token: $.cookie("token"),
			parentId: $(".main-title").attr("title")
		},
		success: function(data) {
			data = eval('(' + data + ')')
				//console.log(data);
			$(".breadcrumb").empty();
			$(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="' + menuUrl + 'logo-upload.html" id="">基础信息设置</span></li>');
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
	loadImg();
	selectTime();
	confirm();
	confirmTime();
	cancel();
});
function confirmTime(){
	$('.confirmTime').on('click',function(){
		$(this).parent('.setTime').hide();
		var str = $(this).parent('.setTime').find('.hour option:selected').val()+':'+ $(this).parent('.setTime').find('.minute option:selected').val();//+':'+$(this).parent('.setTime').find('.second option:selected').val();
		$(this).parent('.setTime').prev('.selectTime').val(str);
	})
}
function setTimer(fac){
	var str = '';
	if(fac == '.hour'){

		for(var h = 0;h < 10;h++){
			str += '<option value="0' + h + '">0'+ h + '</option>';
		}
		for(var h = 10 ; h < 24 ; h++){
			str += '<option value="' + h + '">'+ h + '</option>';
		}
	}else {
		for(var h = 0;h < 10;h++){
			str += '<option value="0' + h + '">0'+ h + '</option>';
		}
		for(var h = 10 ; h < 60 ; h++){
			str += '<option value="' + h + '">'+ h + '</option>';
		}
	}
	$(fac).html(str);
}

function selectTime(){
	setTimer('.hour');
	setTimer('.minute');
	$('.selectTime').on('click',function(){
			$(this).next('.setTime').show();
	});
	/*$('.selectTime').on('blur',function(){
		$(this).next('.setTime').hide();
	})*/

}
function imgChange() {
	$(".change input").change(function() {
		var file = this.files[0];
		//console.log(file.size/1024);
		if(file.name = /[^\s]+\.(jpg|jpeg|png|bmp)/i) {
			if(file.size / 1024 < 300) {
				var formData = new FormData();
				formData.append('file1', file);
				//console.log(formData);
				$.ajax({
					type: "POST", //必须用post
					url: imgUrl,
					crossDomain: true,
					jsonp: "jsoncallback",
					data: formData,
					contentType: false, //必须
					processData: false,
					//不能用success，否则不执行
					complete: function(data) {
						var json = eval('(' + data.responseText + ')');
						$('#imageId').attr('src', json.imgurl);
						var img = $("#imageId"); //获取img元素
						var picRealWidth, picRealHeight;
						$("<img>")// 在内存中创建一个img标记0.
							.attr("src", $(img).attr("src"))
							.load(function() {
								picRealWidth = this.width;
								picRealHeight = this.height;
								if(picRealHeight <= 1200 && picRealWidth <= 1920) {
									$('#imageId').show().attr('src', json.imgurl);
									$(".imgTips").empty().css({
										color: "green"
									}).html("正确");
								} else {
									$(".imgTips").empty().css({
										color: "red"
									}).html("图片宽高分别为：1900px*1200px");
								}
							});
						//console.log(json);
						//$('#imageId').show().attr('src', json.imgurl);
					}
				});
			} else {
				$(".imgTips").empty().css({
					color: "red"
				}).html("图片大小不能大于300k");
			}
			//if(file.name )

		} else {
			$(".imgTips").empty().css({
				color: "red"
			}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
		}

	});
	$(".change1 input").change(function() {
		var file = this.files[0];
		//console.log(file.size/1024);
		if(file.name = /[^\s]+\.(jpg|jpeg|png|bmp)/i) {
			if(file.size / 1024 < 100) {
				var formData = new FormData();
				formData.append('file1', file);
				$.ajax({
					type: "POST", //必须用post
					url: imgUrl,
					crossDomain: true,
					jsonp: "jsoncallback",
					data: formData,
					contentType: false, //必须
					processData: false,
					//不能用success，否则不执行
					complete: function(data) {
						var json = eval('(' + data.responseText + ')');
						//console.log(json);
						$('#imageId1').attr('src', json.imgurl);
						var img = $("#imageId1"); //获取img元素
						var picRealWidth1, picRealHeight1;
						$("<img>") // 在内存中创建一个img标记
							.attr("src", $(img).attr("src"))
							.load(function() {
								picRealWidth1 = this.width;
								picRealHeight1 = this.height;
								if(picRealHeight1 <= 80 && picRealWidth1 <= 80) {
									$('#imageId1').show().attr('src', json.imgurl);
									$(".imgTips1").empty().css({
										color: "green"
									}).html("正确");
								} else {
									$(".imgTips1").empty().css({
										color: "red"
									}).html("图片宽高分别为：80px*80px");
								}
							});
					}
				});
			} else {
				$(".imgTips1").empty().css({
					color: "red"
				}).html("图片大小不能大于100k")
			}

		} else {
			$(".imgTips1").empty().css({
				color: "red"
			}).html("图片格式不正确，格式应为：jpg,jpeg,png,bmp");
		}

	});
}

function loadImg() {
	//alert("123");
	$.ajax({
		url: commUrl + '/startlogo/find/',
		cache: false,
		data: {
			token: $.cookie('token'),
			//token:'e34bba5afd3ab4db657c0881340c2561'
		},
		success: function(data) {
			data = JSON.parse(data);
			//console.log(data)
			if(data.code == 1) {
				//绑定传图片事件
				if(data.data == '') {
					$('.preview').attr('src', 'http://172.16.8.230:8082/server_cs/images/none.jpg');
					$('.preview1').attr('src', 'http://172.16.8.230:8082/server_cs/images/none.jpg');
					$('.confirm').attr('id', '');
				} else {
					$('#title').val(data.data.title);
					$('#welcome').val(data.data.welcome);
					$('.confirm').attr('id', data.data.id);
					$('#signinStart').val(data.data.signinStart);
					$('#signinStop').val(data.data.signinStop);
					$('#signinGuide').val(data.data.signinGuide);
					$('#signinSucTip').val(data.data.signinSucTip);
					$('#signinFailTip').val(data.data.signinFailTip);
					$('#signoutStart').val(data.data.signoutStart);
					$('#signoutStop').val(data.data.signoutStop);
					$('#signoutGuide').val(data.data.signoutGuide);
					$('#signoutSucTip').val(data.data.signoutSucTip);
					$('#signoutFailTip').val(data.data.signoutFailTip);
					$('#rewardTip').val(data.data.rewardTip);
					$('.preview').attr('src', data.data.imgUrl);
					$('.preview1').attr('src', data.data.logoUrl);
				}
				imgChange();
			}

		}
	})
}

function confirm() {
	$('.confirm').on('click', function() {
		var obj = {
		}
		if($(this).attr('id') == '') {


			obj = {
				token: $.cookie('token'),
				title: $('#title').val(),
				welcome: $('#welcome').val(),
				signinStart:$('#signinStart').val(),
				signinStop:$('#signinStop').val(),
				signinGuide:$('#signinGuide').val(),
				signinSucTip:$('#signinSucTip').val(),
				signinFailTip:$('#signinFailTip').val(),
				signoutStart:$('#signoutStart').val(),
				signoutStop:$('#signoutStop').val(),
				signoutGuide:$('#signoutGuide').val(),
				signoutSucTip:$('#signoutSucTip').val(),
				signoutFailTip:$('#signoutFailTip').val(),
				rewardTip:$('#rewardTip').val(),
				signinGuide_new: '{昵称}小朋友早上好，你是{班级}第{排名}个到园的',
				imgUrl: $('#imageId').attr('src'),
				logoUrl: $('#imageId1').attr('src'),

			}
		} else {
			if($("#imageId").attr('src') !== '' & $("#imageId1").attr('src') !== '') {
				obj = {
					token: $.cookie('token'),
					title: $('#title').val(),
					welcome: $('#welcome').val(),
					signinStart:$('#signinStart').val(),
					signinStop:$('#signinStop').val(),
					signinGuide:$('#signinGuide').val(),
					signinSucTip:$('#signinSucTip').val(),
					signinFailTip:$('#signinFailTip').val(),
					signoutStart:$('#signoutStart').val(),
					signoutStop:$('#signoutStop').val(),
					signoutGuide:$('#signoutGuide').val(),
					signoutSucTip:$('#signoutSucTip').val(),
					signoutFailTip:$('#signoutFailTip').val(),
					rewardTip:$('#rewardTip').val(),
					signinGuide_new: '{昵称}小朋友早上好，你是{班级}第{排名}个到园的',
					imgUrl: $('#imageId').attr('src') ,
					logoUrl: $('#imageId1').attr('src'),
					id: $('.confirm').attr('id'),
				};
			} else if($("#imageId").attr('src') == '' & $("#imageId1").attr('src') !== '') {
				obj = {
					token: $.cookie('token'),
					title: $('#title').val(),
					welcome: $('#welcome').val(),
					signinStart:$('#signinStart').val(),
					signinStop:$('#signinStop').val(),
					signinGuide:$('#signinGuide').val(),
					signinSucTip:$('#signinSucTip').val(),
					signinFailTip:$('#signinFailTip').val(),
					signoutStart:$('#signoutStart').val(),
					signoutStop:$('#signoutStop').val(),
					signoutGuide:$('#signoutGuide').val(),
					signoutSucTip:$('#signoutSucTip').val(),
					signoutFailTip:$('#signoutFailTip').val(),
					rewardTip:$('#rewardTip').val(),
					imgUrl: $('.preview').attr('src'),
					logoUrl: $('#imageId1').attr('src'),
					signinGuide_new: '{昵称}小朋友早上好，你是{班级}第{排名}个到园的'
				}
				//debugger;
			} else if($("#imageId").attr('src') !== '' & $("#imageId1").attr('src') == '') {
				obj = {
					token: $.cookie('token'),
					title: $('#title').val(),
					welcome: $('#welcome').val(),
					signinStart:$('#signinStart').val(),
					signinStop:$('#signinStop').val(),
					signinGuide:$('#signinGuide').val(),
					signinSucTip:$('#signinSucTip').val(),
					signinFailTip:$('#signinFailTip').val(),
					signoutStart:$('#signoutStart').val(),
					signoutStop:$('#signoutStop').val(),
					signoutGuide:$('#signoutGuide').val(),
					signoutSucTip:$('#signoutSucTip').val(),
					signoutFailTip:$('#signoutFailTip').val(),
					rewardTip:$('#rewardTip').val(),
					imgUrl: $('#imageId').attr('src'),
					logoUrl: $('.preview1').attr('src'),
					signinGuide_new: '{昵称}小朋友早上好，你是{班级}第{排名}个到园的',
					id: $('.confirm').attr('id'),

				}
			} else if($("#imageId").attr('src') == '' & $("#imageId1").attr('src') == '') {
				obj = {
					token: $.cookie('token'),
					//token:'e34bba5afd3ab4db657c0881340c2561',
					title: $('#title').val(),
					welcome: $('#welcome').val(),
					//guide: $('#guide').val(),
					//imgUrl: $('.preview').attr('src'),
					//logoUrl: $('.preview1').attr('src'),
					//vipWelcome: $('#vipWelcome').val(),
					id: $('.confirm').attr('id'),
					signinStart:$('#signinStart').val(),
					signinStop:$('#signinStop').val(),
					signinGuide:$('#signinGuide').val(),
					signinSucTip:$('#signinSucTip').val(),
					signinFailTip:$('#signinFailTip').val(),
					signoutStart:$('#signoutStart').val(),
					signoutStop:$('#signoutStop').val(),
					signoutGuide:$('#signoutGuide').val(),
					signoutSucTip:$('#signoutSucTip').val(),
					signoutFailTip:$('#signoutFailTip').val(),
					rewardTip:$('#rewardTip').val(),
					imgUrl: $('.preview').attr('src'),
					logoUrl: $('.preview1').attr('src'),
					signinGuide_new: '{昵称}小朋友早上好，你是{班级}第{排名}个到园的'
				}
			}
		}
		$.ajax({
			url: commUrl + '/startlogo/save',
			type: 'POST',
			data: obj,
			success: function(data) {
				data = JSON.parse(data);
				if(data.code == 1) {
					loadImg();
					$('#imageId').hide().attr({
						src: ''
					});
					$('#imageId1').hide().attr({
						src: ''
					});
					$(".imgTips").empty().css({
						color: "#333"
					}).html("图片格式为jpg|jpeg|png|bmp 小于100k且宽高为1920px*1200px");
					$(".imgTips1").empty().css({
						color: "#333"
					}).html("图片格式为jpg|jpeg|png|bmp 小于100k且宽高为80px*80px");
					alert("保存成功");
				}
			}
		})
	})
}

function cancel() {
	//alert("取消事件")
	$('.cancel').on('click', function() {
		//alert("确定事件");
		$('#imageId').hide().attr({
			src: ''
		});
		$('#imageId1').hide().attr({
			src: ''
		});
		//imgChange();
	})

}