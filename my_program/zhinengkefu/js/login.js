/**
 * Created by A on 2016/9/6.
 */

$(document).ready(function() {

	/*var evt = window.event || arguments[0];
	var userAgent = navigator.userAgent;
	console.log(userAgent);
	/!*if (userAgent.indexOf("MSIE") > 0) {
		alert('ie');
		var n = window.event.screenX - window.screenLeft;
		var b = n > document.documentElement.scrollWidth - 20;
		if (b && window.event.clientY < 0 || window.event.altKey) {
			//alert()
			//window.event.returnValue = ("该操作将会导致非正常退出系统(正确退出系统方式：点击退出系统按钮)，您是否确认?");
		}else {
			//return ("该操作将会导致非正常退出系统(正确退出系统方式：点击退出系统按钮)，您是否确认?");
		}
	}else*!/ if (userAgent.indexOf("Firefox") > 0) {
		//alert('Firefox');
		//return ("该操作将会导致非正常退出系统(正确退出系统方式：点击退出系统按钮)，您是否确认?");
		console.log('11111111111111111111');
	}else if (userAgent.indexOf("Chrome") > 0){
		//alert('Chrome');
		//return "确定要离开本页面吗？";
		console.log('222222222222222222222222');
	}else{
		console.log(userAgent);
		var a = confirm('您当前使用的浏览器不支持该平台，推荐您安装火狐浏览器和谷歌浏览器。');
		console.log('222222222222222222222222');
		if(a==true){
			$('.overall').show();
		}else{
			$('.overall').show();
		}

		//alert('您当前使用的浏览器不支持该平台，推荐您安装火狐浏览器和谷歌浏览器。');
		//return false;
	}*/


	$('#codeImage').attr('src', commUrl + '/login/logincode?abc=' + Math.random());
	if($.cookie('rmbUser') == "true") {
		$('#username').val($.cookie('username'));
	}
	$('input[type="text"]').each(function() {
		var vdefault = this.value;
		//alert(this.id);
		if(this.id == 'password') {
			$(this).focus(function() {
				if(this.value == vdefault) {
					this.value = "";
					this.type = 'password';
				}
			});
		} else {
			$(this).focus(function() {
				if(this.value == vdefault) {
					this.value = "";
				}
			});
		};

		/*$(this).blur(function() {
		  if (this.value == "") {
		  this.value = vdefault;
		  }
		});*/
	});

	$('#codeImage').click(function() {
		$('#codeImage').attr('src', commUrl + '/login/logincode?abc=' + Math.random()); //ˢ����֤��
	});
	$("#submit").click(function(e) {
		if($('input[type="text"]').val() !== '') {
			$.ajax({
				url: commUrl + '/login/logincheck',
				type: 'POST',
				data: {
					username: $('#username').val(),
					password: $('#password').val(),
					strCode: $('#strCode').val(),
					abc: $('#codeImage').attr('src').substr($('#codeImage').attr('src').indexOf("=") + 1) //abc��ȡ�Ⱥź����string
				},
				dataType: 'json',
				success: function(data) {
					data = eval('(' + data + ')'); //json�ַ�תΪjson����
					function newcode() {
						$(".tipscode").empty();
						$(".tipsuser").empty();
						$(".tipspassword").empty();
						$('#strCode').val("");
						$('#codeImage').attr('src', commUrl + '/login/logincode?abc=' + Math.random());
					}
					if(data.code == '1') {

						if($('.remberme').prop("checked")) {
							$.cookie('rmbUser', true, {
								path: '/'
							});
							$.cookie('username', $('#username').val(), {
								path: '/'
							});
							//alert($.cookie('username'));
						}
						$.cookie('industry', data.data.industry, {
							path: '/'
						});
						$.cookie('username', data.data.username, {
							path: '/'
						});
						$.cookie('accountType',data.data.appType,{path:'/'});
						$.cookie('token', data.token, {
							path: '/'});


						window.location.href = menuUrl + 'home.html';
					} else if(data.code == '-1') {
						//�������
						newcode();
						$(".tipspassword").html(data.msg);
					} else if(data.code == '-3') {
						//��֤�����
						newcode();
						$(".tipscode").html(data.msg);
					} else if(data.code == '-2') {
						//��֤�����
						newcode();
						$(".tipscode").html(data.msg);
					} else {
						newcode();
						$(".tipsueser").html(data.msg);
					}
				},
				error: function(data, text, status) {
					alert(data.readyState);
					alert(data.status);
				}
			})
			e.preventDefault(); //��ֹĬ����Ϊ
		} else {
			return false;
		}
	})

})
