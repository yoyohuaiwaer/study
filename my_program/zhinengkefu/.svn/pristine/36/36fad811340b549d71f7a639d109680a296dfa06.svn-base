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
			$(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="' + menuUrl + 'logo-upload.html" id="">Logo图片</span></li>');
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
	loadImg();
	confirm();
	cancel();
});

function imgChange() {
	$(".change input").change(function() {
		var file = this.files[0];
		//console.log(file.size/1024);
		if(file.name = /[^\s]+\.(jpg|jpeg|png|bmp)/i) {
			if(file.size / 1024 < 1000) {
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

						// var json = eval('(' + data.responseText + ')');

						$('#imageId').attr('src', json.imgurl);
						//alert(json.result);
						var img = $("#imageId"); //获取img元素
						var picRealWidth, picRealHeight;
						$("<img>") // 在内存中创建一个img标记
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
				}).html("图片大小不能大于1000k");
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
			if(file.size / 1024 < 1000) {
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
				}).html("图片大小不能大于1000k")
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
		data: {
			token: $.cookie('token'),
			//token:'e34bba5afd3ab4db657c0881340c2561'
		},
		success: function(data) {
			data = JSON.parse(data);
console.log(data)
			if(data.code == 1) {
				//绑定传图片事件
				if(data.data == '') {
					$('.preview').attr('src', 'http://172.16.8.230:8082/server_cs/images/none.jpg');
					$('.preview1').attr('src', 'http://172.16.8.230:8082/server_cs/images/none.jpg');
					$('.confirm').attr('id', '');
				} else {
					$('#title').val(data.data.title);
					$('#welcome').val(data.data.welcome);
					$('#vipWelcome').val(data.data.vipWelcome);
					$('#guide').val(data.data.guide);
					$('.preview').attr('src', data.data.imgUrl);
					$('.preview1').attr('src', data.data.logoUrl);
					$('.confirm').attr('id', data.data.id);
					$('#registerSuccess').val(data.data.registerSuc);
					$('#registerFail').val(data.data.registerFail);
					$('#loginSuccess').val(data.data.loginSuc);
					$('#loginFail').val(data.data.loginFail);
					$("#welcomeAction").children('option[value="'+data.data.welcomeAction+'"]').attr({selected:"selected"});
					$("#registerAction").children('option[value="'+data.data.registerAction+'"]').attr({selected:"selected"}); 
					$("#loginAction").children('option[value="'+data.data.loginAction+'"]').attr({selected:"selected"});
				}
				imgChange();
			}

		}
	})
}

function confirm() {
	$('.confirm').on('click', function() {
		if($(this).attr('id') == '') {
			$.ajax({
				url: commUrl + '/startlogo/save',
				type: 'POST',
				data: {
					token: $.cookie('token'),
					//token:'e34bba5afd3ab4db657c0881340c2561',
					title: $('#title').val(),
					welcome: $('#welcome').val(),
					vipWelcome: $('#vipWelcome').val(),
					guide: $('#guide').val(),
					imgUrl: $('#imageId').attr('src'),
					logoUrl: $('#imageId1').attr('src'),
					welcomeAction:$("#welcomeAction").children("option:selected").attr("value"),
					registerAction:$("#registerAction").children("option:selected").attr("value"),
					loginAction:$("#loginAction").children("option:selected").attr("value"),
					registerSuc: $('#registerSuccess').val(),
					registerFail: $('#registerFail').val(),
					loginSuc: $('#loginSuccess').val(),
					loginFail: $('#loginFail').val()
				},
				success: function(data) {
					data = JSON.parse(data);
					console.log(data);
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
						}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为1920px*1200px");
						$(".imgTips1").empty().css({
							color: "#333"
						}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为80px*80px");
						alert("保存成功");

					}
				}
			})
		} else {
			if($("#imageId").attr('src') !== '' & $("#imageId1").attr('src') !== '') {
				$.ajax({
					url: commUrl + '/startlogo/save',
					type: 'POST',
					data: {
						token: $.cookie('token'),
						//token:'e34bba5afd3ab4db657c0881340c2561',
						title: $('#title').val(),
						welcome: $('#welcome').val(),
						vipWelcome: $('#vipWelcome').val(),
						guide: $('#guide').val(),
						imgUrl: $('#imageId').attr('src'),
						logoUrl: $('#imageId1').attr('src'),
						id: $('.confirm').attr('id'),
							welcomeAction:$("#welcomeAction").children("option:selected").attr("value"),
						registerAction:$("#registerAction").children("option:selected").attr("value"),
						loginAction:$("#loginAction").children("option:selected").attr("value"),
						registerSuc: $('#registerSuccess').val(),
						registerFail: $('#registerFail').val(),
						loginSuc: $('#loginSuccess').val(),
						loginFail: $('#loginFail').val()
					},
					success: function(data) {
						data = JSON.parse(data);
						//console.log(data);
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
							}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为1920px*1200px");
							$(".imgTips1").empty().css({
								color: "#333"
							}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为80px*80px");
							alert("保存成功");

						}
					}
				})
			} else if($("#imageId").attr('src') == '' & $("#imageId1").attr('src') !== '') {
				$.ajax({
					url: commUrl + '/startlogo/save',
					type: 'POST',
					data: {
						token: $.cookie('token'),
						//token:'e34bba5afd3ab4db657c0881340c2561',
						title: $('#title').val(),
						welcome: $('#welcome').val(),
						vipWelcome: $('#vipWelcome').val(),
						guide: $('#guide').val(),
						imgUrl: $('.preview').attr('src'),
						logoUrl: $('#imageId1').attr('src'),
						id: $('.confirm').attr('id'),
							welcomeAction:$("#welcomeAction").children("option:selected").attr("value"),
						registerAction:$("#registerAction").children("option:selected").attr("value"),
						loginAction:$("#loginAction").children("option:selected").attr("value"),
						registerSuc: $('#registerSuccess').val(),
						registerFail: $('#registerFail').val(),
						loginSuc: $('#loginSuccess').val(),
						loginFail: $('#loginFail').val()
					},
					success: function(data) {
						data = JSON.parse(data);
						//console.log(data);
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
							}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为1920px*1200px");
							$(".imgTips1").empty().css({
								color: "#333"
							}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为80px*80px");
							alert("保存成功");

						}
					}
				})
			} else if($("#imageId").attr('src') !== '' & $("#imageId1").attr('src') == '') {
				$.ajax({
					url: commUrl + '/startlogo/save',
					type: 'POST',
					data: {
						token: $.cookie('token'),
						//token:'e34bba5afd3ab4db657c0881340c2561',
						title: $('#title').val(),
						welcome: $('#welcome').val(),
						vipWelcome: $('#vipWelcome').val(),
						guide: $('#guide').val(),
						imgUrl: $('#imageId').attr('src'),
						logoUrl: $('.preview1').attr('src'),
						id: $('.confirm').attr('id'),
						welcomeAction:$("#welcomeAction").children("option:selected").attr("value"),
						registerAction:$("#registerAction").children("option:selected").attr("value"),
						loginAction:$("#loginAction").children("option:selected").attr("value"),
						registerSuc: $('#registerSuccess').val(),
						registerFail: $('#registerFail').val(),
						loginSuc: $('#loginSuccess').val(),
						loginFail: $('#loginFail').val()
					},
					success: function(data) {
						data = JSON.parse(data);
						//console.log(data);
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
							}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为1920px*1200px");
							$(".imgTips1").empty().css({
								color: "#333"
							}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为80px*80px");
							alert("保存成功");
						}
					}
				})
			} else if($("#imageId").attr('src') == '' & $("#imageId1").attr('src') == '') {
				$.ajax({
					url: commUrl + '/startlogo/save',
					type: 'POST',
					data: {
						token: $.cookie('token'),
						//token:'e34bba5afd3ab4db657c0881340c2561',
						title: $('#title').val(),
						welcome: $('#welcome').val(),
						guide: $('#guide').val(),
						imgUrl: $('.preview').attr('src'),
						logoUrl: $('.preview1').attr('src'),
						vipWelcome: $('#vipWelcome').val(),
						id: $('.confirm').attr('id'),
						welcomeAction:$("#welcomeAction").children("option:selected").attr("value"),
						registerAction:$("#registerAction").children("option:selected").attr("value"),
						loginAction:$("#loginAction").children("option:selected").attr("value"),
						registerSuc: $('#registerSuccess').val(),
						registerFail: $('#registerFail').val(),
						loginSuc: $('#loginSuccess').val(),
						loginFail: $('#loginFail').val()
					},
					success: function(data) {
						data = JSON.parse(data);
						//console.log(data);
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
							}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为1920px*1200px");
							$(".imgTips1").empty().css({
								color: "#333"
							}).html("图片格式为jpg|jpeg|png|bmp 小于1000k且宽高为80px*80px");
							alert("保存成功");

						}
					}
				})
			}

		}

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