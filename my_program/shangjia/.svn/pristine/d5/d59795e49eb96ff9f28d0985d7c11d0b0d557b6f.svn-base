	$(document).ready(function(){
		if(parseInt($.cookie("read"))>0){
	        $.ajax({
	            url:commUrl+'/menu/findbyid',
	            //type:'GET',
	            //async: false,
	            data:{
	                token:$.cookie("token"),
	                parentId:$(".main-title").attr("title")
	            },
	            success: function(data){
	                data = eval('('+data+')')
	                $(".breadcrumb").empty();
	                var html = '<li><a href="javascript:void(0);"  onclick="javascript:changePage(this);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</a>' +
	                        '<li class="selected"><a href="javascript:void(0);"  title="'+menuUrl+'+'+data.data[1].url+'" id="'+data.data[1].parentId+'">编辑问题详情</a></li>' ;
	               
	               $(".breadcrumb").html(html);
	            },
	            error: function(text){
	                alert(text.readyState);
	                alert(text.status);
	            }
	        });
	        $.ajax({
	            url:commUrl+'/customercare/findbyid',
	            data:{
	            	  token:$.cookie("token"),
	            	  id:$.cookie('id')
	            	  },
	            type:'GET',
	            dataType:'json',
	            success:function(data){
	                data = eval('('+data+')');
	                if(data.code == '1'){
	                    $("#question").val(data.data.question);
	                    $("#answer").val(data.data.answer);
	                }
	            },
	            error: function(text){
	                alert(text.readyState);
	                alert(text.status);
	            }
	        })
	    }else {
	        $.ajax({
	            url:commUrl+'/menu/findbyid',
	            //type:'GET',
	            //async: false,
	            data:{
	                token:$.cookie("token"),
	                parentId:$(".main-title").attr("title")
	            },
	            success: function(data){
	                data = eval('('+data+')')
	                $(".breadcrumb").empty();
	                var html = '<li><a href="javascript:void(0);"  onclick="javascript:changePage(this);" title="'+menuUrl+''+data.data[0].url+'" id="'+data.data[0].parentId+'">'+data.data[0].name+'</a>' +
	                        '<li class="selected"><a href="javascript:void(0);"   title="'+menuUrl+''+data.data[1].url+'" id="'+data.data[1].parentId+'">'+'新增问答'+'</a></li>' ;
	                $(".breadcrumb").html(html);
	            },
	            error: function(text){
	                alert(text.readyState);
	                alert(text.status);
	            }
	        });
	    }
	})
	
	
	function loadPage(){
	    $.ajax({
	        url:commUrl+'/qa',
	        data: {
	            token: $.cookie('token'),
	            id: $.cookie('qaId'),
	            //scene: $.cookie("scene"),
	            //industryId: $.cookie("industryId"),
	            text: $.cookie('asTxt')
	        },
	        success: function(response){
	            response = JSON.parse(response);
	            if(response.code == 1){
	                //console.log(response.data.answers);
	                $("#question").val(response.data.question).attr('readonly');
	                $("#answer").val(response.data.answers[0].text);
	                $("#url").val(response.data.answers[0].url);
	                //alert(data.data.answers[0].action);
	                if(data.data.answers[0].action == ''){
	                    $("#action").children('option[value="none"]').attr({selected:"selected"});
	                }else{
	                    $("#action").children('option[value="'+data.data.answers[0].action+'"]').attr({selected:"selected"});
	                }
	
	            }
	        },
	        error: function(text){
	            alert("出错啦~！")
	        }
	    });
	}
//	$("#question").blur(function(){
//      if($(this).val() == ''){
//          $(".tip1").html("<font color=\"red\" size=\"2\">问题不能为空</font>");
//      }
//  });
//  $("#answer").blur(function(){
//      if($(this).val() == ''){
//          $(".tip2").html("<font color=\"red\" size=\"2\">答案不能为空</font>");
//      }
//  }) ;
    
    function submitAddAnswers(e){
	    var flag=true;
	    var question=$("#question").val().length;
	    var answer=$("#answer").val().length;
	    if(question>0 && answer> 0 ){
	    	var obj = {};
	    	if(parseInt($.cookie("read"))>0){
	    		obj= {
	    			token:$.cookie("token"),
	            	id:$.cookie('id'),
	                question:$("#question").val(),
	                answer:$("#answer").val()
	    		}
	    	}else
	    	{
	    		obj= {
	    			token:$.cookie("token"),
	                question:$("#question").val(),
	                answer:$("#answer").val()
	    		}
	    	}
	        $.ajax({
	            url:commUrl+'/customercare/save',
	            data:obj,
	            type:'POST',
	            success: function(data){
	                data = eval('('+data+')');
	                if(data.code == '1'){
	                    newPage();
	                }
	            }
	        })
	    }else {
	    	if(question<=0)
	    	{
	    		$(".tip3").empty().css({color:"red"}).html("问题不能为空");
	    	}else{
		        $(".tip3").empty().css({color:"red"}).html("答案不能为空");
	    	}
	    }
	}
    
    function resetAddAnswers(e){
	    $.ajax({
	        url:'auto_service.html',
	        datatype:'html',
	        success:function(data){
	            $(".main").empty().html(data);
	        }
	    })
	}
    function newPage(){
	    $.get('auto_service.html',{token:$.cookie("token"),scene:$.cookie("scene")},function(response){
	        $(".main").empty().html(response);
	    })
	}