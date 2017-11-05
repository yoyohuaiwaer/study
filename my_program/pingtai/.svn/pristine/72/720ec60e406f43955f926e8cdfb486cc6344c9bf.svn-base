$(document).ready(function() {
	//面包屑加载
	$(".breadcrumb").empty();
	$.ajax({
		url: commUrl + '/menu/findbyid',
		data: {
			token: $.cookie("token"),
			parentId: "57ff306b0a263655e986ccf4"
		},
		cache: false,
		success: function(data) {
			data = eval('(' + data + ')')
			$(".breadcrumb").html('<li class="selected"><span href="javascript:void(0);" title="' + menuUrl + '' + data.data[9].url + '" id="' + data.data[9].parentId + '">' + data.data[9].name + '</span></li>');
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	});
	var href = excelUrl + "/excel/template.xlsx";
	$(".downLoad").attr("href", href); //下载模板
	loadindustry();
	onFile();
});

function loadindustry() {
	$.ajax({
		url: commUrl + '/qa/allindustry',
		data: {
			token: $.cookie("token")
		},
		dataType: 'json',
		async: false,
		success: function(response) {
			response = eval('(' + response + ')')
			var html = '<option id=0 value= '+' 请选择行业>' + '请选择行业' + '</option>';
			html += '<option id=0 value='+'通用>' + '通用' + '</option>';
			if(response.code == '1') {
				$.each(response.data, function(i, key) {
					html += '<option  id=' + key.id + '  value=' + key.name + '   >' + key.name + '</option>'
				})
			}
			$("#industry").html(html);
			changeIndu();

		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}

function changeIndu() {
	$('#industry').change(function(e) {
		loadSecene()
	})
}

function loadSecene() {
	var industry = $("#industry").children("option:selected").attr("id");
	if(industry==0)
	{
		var normal = '<option id=0 value='+ '请选择场景>' + '请选择场景' + '</option>';
			normal += '<option id=0 value='+'通用 >' + '通用' + '</option>';
		$("#scene").html(normal);
		return;
	}
	
	$.ajax({
		url: commUrl + '/qa/industry',
		data: {
			token: $.cookie("token"),
			industryId: industry
		},
		dataType: 'json',
		async: false,
		success: function(response) {
			response = eval('(' + response + ')')
			var html = '<option id=0 value='+ '请选择场景>' + '请选择场景' + '</option>';
//			html += '<option id=0 value='+'通用 >' + '通用' + '</option>';
			if(response.code == '1') {
				$.each(response.data.datas, function(i, key) {
					html += '<option value=' + key.name + ' >' + key.name + '</option>'
				})
			}
			$("#scene").html(html);
		},
		error: function(text) {
			alert(text.readyState);
			alert(text.status);
		}
	})
}

//上传
function onFile() {
	$(".onfile").click(function() {
		var indus = $("#industry").children("option:selected").attr("value");
		if(indus == "请选择行业") {
			$('.errorTips').css('display', 'inline-block');
			$(".showTips").empty().html("请选择行业");
			return false;
		}
		var scen = $("#scene").children("option:selected").attr("value");
		if(scen == "请选择场景") {
			$('.errorTips').css('display', 'inline-block');
			$(".showTips").empty().html("请选择场景");
			return false;
		}
	})
	$(".onfile").change(function() {
		var scen = $("#scene").children("option:selected").attr("value");
		if(scen != undefined) {
			$('.errorTips').css('display', 'none');
		}
		
		var indus = $("#industry").children("option:selected").attr("value");
		if(indus != undefined) {
			$('.errorTips').css('display', 'none');
		}
		var file = this.files[0];
		if(file == undefined) {
			return;
		}
		var fileName = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
		if(fileName == "xlsx" || fileName == "xlsm" || fileName == "xltx" || fileName == "xltm" || fileName == "xls") {
			if(file.size / 1024 < 1000) {
				$(".urlTxt").val(file.name)
				var formData = new FormData();
				formData.append('qa_file', file);
				formData.append("scene",scen);
				formData.append("industry",indus);
				$.ajax({
					type: "POST",
					url: commUrl + "/qa_import?token=" + $.cookie("token"),
					cache: false,
					contentType: false,
					processData: false,
					data: formData,
					complete: function(data) {
						var obj = eval('(' + data.responseText + ')');
						console.log(obj)
						var msg = obj.msg;
						if(obj.successNumber > 0) {
							$('.successTips').css('display', 'inline-block');
							$('.errorTips').css('display', 'none');
							if(obj.errorNumber > 0) {
								msg += ',成功通过验证' + obj.successNumber + '条,失败' + obj.errorNumber + '条,详情请下载并查看' + '<a download href=' + obj.errorExcelUrl + '>上传结果</a>'
							}
						} else {
							$('.errorTips').css('display', 'inline-block');
							$('.successTips').css('display', 'none');
						}
						console.log(obj)
						$(".showTips").empty().html(msg);
					},
					error: function(text) {
						alert(text.readyState);
						alert(text.status);
					}
				});
			} else {
				$('.errorTips').css('display', 'inline-block');
				$('.successTips').css('display', 'none');
				$(".showTips").empty().html("文件过大？");
			}
		} else {
			$('.errorTips').css('display', 'inline-block');
			$('.successTips').css('display', 'none');
			$(".showTips").empty().html("请上传EXCEL表格类型的文件");
		}
	})
}