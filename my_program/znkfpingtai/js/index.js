/**
 * Created by Administrator on 2016/9/17.
 */
/**
 * Created by A on 2016/9/7.
 */

$(document).ready(function(){
    //左侧树导入
    //logout();

    $(".user-name a").empty().html($.cookie("Qusername"));
    if($.cookie("token") == undefined){
        window.location.href = menuUrl+'index.html'
    }else {
        $(".user-name a").empty().html($.cookie("Qusername"));
        $.ajax({
            url:commUrl+'/menu/find',
            //type:'GET',
       		cache:false,
            data:{token:$.cookie("token")},
            dataType:'json',
            async: false,
            success: function(data){
                //alert(data);
                data = eval('(' + data + ')');
                if(data.code== '1'){
                    $('#tree-menus').empty();
                    var html = '';

                    $.each(data.data, function(i,key){
                        var dom = '';
                        $.each(key.qhMenu2,function(l,val){

                            if(val.qhMenu2.id == '58661d345a5a9763823e639c'){
                                var xl = '' ;
                                $.each(val.qhMenu3,function(x,text){

                                    xl += '<li class="node" id="'+text.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" data-id="'+text.id+'"><a href="javascript:void(0);" title="'+menuUrl+''+text.url+'">'+text.name+'</a></div> </div> </li>';

                                })
                                dom +='<li class="node" id="'+val.qhMenu2.id+'"> <div class="node-font"> <span class="node-icon icon-file icon-chevron-left"></span> <div class="node-name" data-id="'+val.qhMenu2.id+'" ><a href="javascript:void(0);" title="'+menuUrl+''+val.qhMenu2.url+'">'+val.qhMenu2.name+'</a></div> </div><ul class="tree-menus tree-menu3 hide">'+xl+'</ul> </li>';
                            }else {
                                dom +='<li class="node" id="'+val.qhMenu2.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" data-id="'+val.qhMenu2.id+'"><a href="javascript:void(0);" title="'+menuUrl+''+val.qhMenu2.url+'">'+val.qhMenu2.name+'</a></div> </div> </li>';
                            }

                            //if(val.qhMenu3 == ''){
                            //    dom +='<li class="node" id="'+val.qhMenu2.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+val.qhMenu2.url+'">'+val.qhMenu2.name+'</a></div> </div> </li>';
                            //}else {
                            //    var xl = '' ;
                            //    $.each(val.qhMenu3,function(x,text){
                            //        if(text.id == '5850c1b5b2a99afa74c513b3'||text.id == '5850c3cab2a99afa74c513b6'|| text.id == '5850c3e7b2a99afa74c513b7' ){
                            //
                            //            xl += '<li class="node" id="'+text.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+text.url+'">'+text.name+'</a></div> </div> </li>';
                            //        }
                            //
                            //    })
                            //    if(val.qhMenu2.id == '58661d345a5a9763823e639c'){
                            //        debugger;
                            //        dom +='<li class="node" id="'+val.qhMenu2.id+'"> <div class="node-font"> <span class="node-icon icon-file icon-chevron-left"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+val.qhMenu2.url+'">'+val.qhMenu2.name+'</a></div> </div><ul class="tree-menus tree-menu3 hide">'+xl+'</ul> </li>';
                            //    }else {
                            //        dom +='<li class="node" id="'+val.qhMenu2.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" ><a href="javascript:void(0);" title="'+menuUrl+''+val.qhMenu2.url+'">'+val.qhMenu2.name+'</a></div> </div> </li>';
                            //    }
                            //
                            //}
                        });
                        if(dom == ''){
	                            html+='<li class="node" id="'+this.qhMenu.id+'"> <div class="node-font"> <span class="node-icon icon-file"><img src="'+this.qhMenu.icon+'"/></span> <div class="node-name" >'+this.qhMenu.name+'</div> </div></li>';
                        }else{
	                            html+='<li class="node" id="'+this.qhMenu.id+'"> <div class="node-font"> <span class="node-icon icon-file"><img src="'+this.qhMenu.icon+'"/></span> <div class="node-name" >'+this.qhMenu.name+'</div> </div><ul class="tree-menus tree-menu2">'+dom+'</ul></li>';
                        }
                    })

                    $('#tree-menu1').html(html);
                    //toggleMenu3();
                }
                else if(data.code == -1) {
                    window.location.href == menuUrl+'index.html'
                }
            },
            error: function(data,text,status){
                alert(data.readyState);
                alert(data.status);
            }
        })

        //默认菜单加载
        $("#tree-menu1 > li:first-child ").find('.tree-menu2 > li:first-child').addClass('node-selected');
        $("h2.main-title").text($('.node-selected > .node-font > .node-name').find('a').text()).attr({title:$('.node-selected').attr("id")});
        //$(".main-title").text();
        var breadcrumb = '<li class="selected"><a href="'+$(".node-selected a").attr('href')+'" " id="'+$(".node-selected").attr('id')+'">'+$(".node-selected a").text()+'</a></li>';
        $(".breadcrumb").html(breadcrumb);
        var nodeurl = $(".node-selected a").attr('title');//
        $.ajax({
            url:''+nodeurl+'',
            type:'GET',
            //async: false,
            success: function(data){
                $(".main").html(data);
            },
            error: function(text){
                alert(text.readyState);
                alert(text.status);
            }
        });
        //findMenus()

//

//点击菜单加载右侧内容
        $(".tree-menu2 .node-name").click(function(){
            if($(this).attr('data-id') == '58661d345a5a9763823e639c'){
                if($(this).parent('.node-font').next('.tree-menu3').hasClass('hide')){
                    //$('.tree-menu3').addClass('hide');
                    //chevron-down
                    $(this).prev('.node-icon').addClass('icon-chevron-down');
                    $(this).parent('.node-font').next('.tree-menu3').removeClass('hide');
                }else {
                    $(this).parent('.node-font').next('.tree-menu3').addClass('hide')
                    $(this).prev('.node-icon').removeClass('icon-chevron-down');
                }

            }else {
                $(".node").removeClass("node-selected")
                $(this).parent('.node-font').parent('.node').addClass("node-selected");
                var selectedurl = $(this).find("a").attr("title");
                $("h2.main-title").text($(this).text()).attr({title:$(this).attr("id"),alt:$(this).find('a').attr("alt")});
                $.ajax({
                    url:menuUrl+selectedurl,
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
            }

        });
    };
})

//面包屑点击
function changeBreadcrumb(){
    $('.breadcrumb li').on('click',function(){
        $('.breadcrumb li').removeClass("selected");
        $(this).addClass('selected');
        var url = $(this).find('a').attr('alt');
        //alert(url);
        $.ajax({
            url:menuUrl+url,
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
/*function changePage(e){
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
}*/
//退出登录

function logout(e){
    $.ajax({
        url:commUrl+'/login/loginout',
        data:{token:$.cookie("token")},
       	cache:false,
        success: function(data){
            //alert(data);
            data = JSON.parse(data);
            if(data.code == 1) {
                window.location.href = 'index.html';//
            }
        }

    })
}

function toggleMenu3(){
    $('.node-icon').on('click',function(){
        if($(this).parent('.node-font').next('.tree-menu3').hasClass('hide')){
            $('.tree-menu3').addClass('hide');
            //chevron-down
            $(this).addClass('icon-chevron-down');
            $(this).parent('.node-font').next('.tree-menu3').removeClass('hide');
        }else {
            $(this).parent('.node-font').next('.tree-menu3').addClass('hide')
            $(this).removeClass('icon-chevron-down')
        }
    })
}