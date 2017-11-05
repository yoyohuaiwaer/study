﻿/**
 * Created by Administrator on 2016/9/17.
 */
/**
 * Created by A on 2016/9/7.
 */
$(document).ready(function(){
    //左侧树导入
    //logout();
    $(".user-name a").empty().html($.cookie("username"));
    $(".user-indrustry a").empty().html($.cookie("industry"));
    $.ajax({
        url:commUrl+'/menu/find',
        type:'GET',
        data:{token:$.cookie("token")},
        dataType:'json',
        async: false,
        success: function(data){
            //alert(data);
            data = eval('(' + data + ')');
            //console.log(data);
            if(data.code== '1'){
                $('#tree-menus').empty();
                var html = '';

                $.each(data.data, function(i,key){
                    //console.log( this.menu1.name);
                    var dom = '';

                    if(this.menu1.id == "57d21a5a240a7a19c23ccc9e"){

                        $.each(key.menu2,function(l,val){
                            if(this.view == 1){
                                dom +='<li class="node" id="'+this.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+this.url+'">'+this.name+'</a></div> </div> </li>';
                            }
                        })
                        dom+='<li class="node" id="add"> <div class="node-font"> <span class="node-icon icon-file">+</span> <div class="node-name" ><a href="javascript:void(0);" title=" '+menuUrl+'addfunction.html" >添加功能</a></div> </div> </li>';
                    }
                    else{
//                  	$.each(key.menu2,function(l,val){
//                          dom +='<li class="node" id="'+this.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+this.url+'">'+this.name+'</a></div> </div> </li>';
//                      });
                        $.each(key.menu2,function(l,val){
                        	if (val.id == '57d21d52240a7a19c23ccca8') {//问答库关键词
		                        dom +='<li class="node" id="'+this.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+"scene-question-list.html"+'">'+this.name+'</a></div> </div> </li>';
		                    }else
		                    {
	                            dom +='<li class="node" id="'+this.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+this.url+'">'+this.name+'</a></div> </div> </li>';
		                    }
                        });
                    }
                    if(dom == ''){
                        html+='<li class="node" id="'+this.menu1.id+'"> <div class="node-font"> <span class="node-icon icon-file"><img src="'+this.menu1.icon+'"/></span> <div class="node-name" >'+this.menu1.name+'</div> </div></li>';
                    }else{
                        html+='<li class="node" id="'+this.menu1.id+'"> <div class="node-font"> <span class="node-icon icon-file"><img src="'+this.menu1.icon+'"/></span> <div class="node-name" >'+this.menu1.name+'</div> </div><ul class="tree-menus tree-meni2">'+dom+'</ul></li>';
                    }
                   
                })

                $('#tree-menu1').html(html);


            }
        },
        error: function(data,text,status){
            alert('请重新登录~！')
            window.location.href = menuUrl+'index.html';
            //alert(data.readyState);
            //alert(data.status);
        }
    })
    //默认菜单加载
    $("#57d21d52240a7a19c23ccca8").addClass('node-selected');

    $(".main-title").text($(".node-selected").text()).attr({title:$(".node-selected").attr("id")});
    var nodeurl = ($(".node-selected a").attr('title'));//
    //alert(nodeurl);
    $.ajax({
        url:''+nodeurl+'',
        type:'GET',
        //async: false,
        success: function(data){
            $(".main").html(data);
        },
        error: function(text){
        	alert('请重新登录');
            window.location.href = menuUrl+'index.html';
//          alert(text.readyState);
//          alert(text.status+"===1");
        }
    });
//点击菜单加载右侧内容

    $(".tree-meni2 .node").click(function(){
        $(".node").removeClass("node-selected")
        $(this).addClass("node-selected");
        var selectedurl = $(this).find("a").attr("title");
        $("h2.main-title").text($(this).text()).attr({title:$(this).attr("id")});
        $.ajax({
            url:selectedurl,
            type:'GET',
            //async: false,
            success: function(data){

                $(".main").empty().html(data);
            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        });
    });
})
//面包屑点击

function changePage(e){
    $(e).parents("ul").find("li").removeClass("selected");
    $(e).parent("li").addClass("selected");
    $.cookie("read", e.name,{path:'/'})
    $.ajax({
     url:''+ e.title+'',
     type:'GET',
     //async: false,
     success: function(data){

     $(".main").empty().html(data);
     },
     error: function(text){
     	alert(text.readyState);
    	 alert(text.status);
     }
     })
}

//面包屑点击
function changeBreadcrumb(){
    $('.breadcrumb li').on('click',function(){
        $('.breadcrumb li').removeClass("selected");
        $(this).addClass('selected');
        var url = $(this).find('a').attr('alt');
        //alert(url);
        $.ajax({
            url:url,
            type:'GET',
            //async: false,
            success: function(data){

                $(".main").empty().html(data);
            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        })
    });
}

//退出登录
function logout(e){
    $.ajax({
        url:commUrl+'/login/loginout',
        data:{token:$.cookie("token")},
        success: function(data){
            //alert(data);
            data = JSON.parse(data);
            if(data.code == 1) {
                window.location.href = menuUrl+'index.html';//
            }
        }

    })
}

