$(document).ready(function(){
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
            if(data.code == '1'){
            	$(".breadcrumb").empty();
                var breadcrumb = '';
                 $.each(data.data, function(i,key) {
                    breadcrumb += '<li><a class="" alt="'+menuUrl+''+key.url+'" id="'+key.id+'">'+key.name+'</a></li>'
                    $(".breadcrumb").html(breadcrumb);
                    $(".breadcrumb li:nth-child(2)").addClass('selected');
                    changeBreadcrumb();
                })
            }
        },
        error: function(text){
            alert(text.readyState);
            alert(text.status);
        }
    });
    listPage();
    function listPage(){
    	var list = getQuestionList();
    	console.log(list)
    	 $.ajax({
            url:commUrl+'/customercare/findhot',
            data:{
                token:$.cookie("token")
            },
            dataType:'json',
            success:function(data){
                data = eval('('+data+')');
                $(".grid-body").empty();
                var html = '';
                var selectHtml='<option class="answerList">'+'请选择问题'+'</option>';
                var sort = 0;
                if(data.code == '1'){
                	console.log(data.data.length)
                	var str = '下面的邮件是反垃圾邮件系统做昨天为您过滤的垃圾邮件，这些垃圾邮件暂时保存在您WEBMAIL邮箱账户内的“垃圾邮件”邮箱中， 垃圾邮件的保存期为15天，系统将在15天后自动清除这些垃圾邮件'
                    var newStr = str.substring(0,30)  
                    var length =data.data.length 
                	if(length>0)
                	{
                		 $.each(data.data,function(i,key){
	                        sort = i + 1;
	                        if(key.state == '1'){
		                        html += '<div class="grid-body-tr"> <div class="number" style="width:60px">'+sort+'</div> ' +
	                                        '<select class="questionList" style="width:400px;height:30px; font-size:14px; " onchange="javascript:selectChange(this);">'+
							                	'<option title='+str+' class="answerList">'+newStr+'</option>'+
							                	'<option selected="true" title='+str+' class="answerList">'+'问题二'+'</option>'+
							                	'<option title='+str+' class="answerList">'+newStr+'</option>'+
							                	'<option title='+str+' class="answerList">'+newStr+'</option>'+
							                '</select>'+
	//                                      '<div class="answer" style="width:700px; max-width:700px;" > '+'key.unit'+'</div> ' +
	                                    '</div> '
		                    }
	                    })
                	}else
                	{
                		
                		if(length<10)
                		{
                			var max = 10- length;
                			for(var i =length;i<max;i++)
	                		{
	                			sort = i + 1;
	                			html += '<div class="grid-body-tr"> <div class="number" style="width:60px">'+sort+'</div> ' +
	                                '<select class="questionList" style="width:400px;height:30px; font-size:14px; " onchange="javascript:selectChange(this);"></select>'+
	                            '</div> ';
	                            selectHtml ='<option class="answerList">'+'请选择问题'+'</option>';
	                           $.each(list,function(a,obj){
			                   		selectHtml +='<option title='+obj.answer+' id="'+obj.id +'" class="answerList">'+obj.answer+'</option>'
				                })
	                		}
                		}
                	}
                }
                $(".grid-body").html(html);
                $(".questionList").html(selectHtml);
            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        })
    }
    
})
	function getQuestionList(){
		var arr=[];
		$.ajax({
            url:commUrl+'/customercare/findall',
            data:{token:$.cookie("token")},
            dataType:'json',
            success:function(data){
                data = eval('('+data+')');
                var html = '<option class="answerList">'+'请选择问题'+'</option>';
                if(data.code == '1'){
                   $.each(data.data,function(i,key){
                   	arr.push(key)
                   		html +='<option title='+key.answer+' class="answerList">'+key.answer+'</option>'
	                })
                }
//              $(".questionList").html(html);
//               console.log(html);
            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        })
		 return arr;
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
    function selectChange(e){
    	var question = $(e)[0].options[$(e)[0].selectedIndex].value;
//  	console.log($(e)[0].name=question)
//  	$(e).parent().find('.answer').html(question);
    }
//  热门问题列表保存
    function saveList(e){
    	var arr = [];
    	var length = $('.questionList').length;
    	for(var i =0;i<length;i++)
    	{
    		var id = $('.questionList')[i].options[$('.questionList')[i].selectedIndex].id;
    		if(id !=''){
	    		arr.push(id)
    		}
    	}
    	if(arr.length>0)
    	{
    		arr =pureArr(arr);
    		console.log(arr)
    		$.ajax({
	            url:commUrl+'/customercare/savehot',
	            data:{token:$.cookie("token"),
	            	ids:arr
	            },
	            dataType:'json',
	            success:function(data){
	            	console.log(data);
	                data = eval('('+data+')');
	                var html = '<option class="answerList">'+'请选择问题'+'</option>';
	                if(data.code == '1'){
	                   $.each(data.data,function(i,key){
	                   	arr.push(key)
	                   		html +='<option title='+key.answer+' class="answerList">'+key.answer+'</option>'
		                })
	                }
	//              $(".questionList").html(html);
	            },
	            error: function(text){
	                alert(text.readyState);
	                alert(text.status);
	            }
	        })
    	}
    	
    	function pureArr(arr){
			var n = []; 
			for(var i = 0; i < arr.length; i++) 
			{
				if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
			}
			return n;
		}
    }

