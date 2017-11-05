/**
 * Created by Administrator on 2016/9/17.
 */
/**
 * Created by A on 2016/9/7.
 */
$(document).ready(function(){
    //左侧树导入
    //logout();
    var href = excelUrl+"/excel/manual.pdf";
	$(".downLoadzy").attr("href",href); //下载模板
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
            console.log(data);
            if(data.code== '1'){
                $('#tree-menus').empty();
                var html = '';

                $.each(data.data, function(i,key){
                    //console.log( this.menu1.name);
                    var dom = '';

                    if(this.menu1.id == "57d21a5a240a7a19c23ccc9e"){

                        $.each(key.menu2,function(l,val){
                            if(this.view == 1){
                                dom +='<li class="node neck" id="'+this.id+'"> <div class="node-font"> <span class="node-icon icon-file"></span> <div class="node-name" data-id="'+val.id+'" ><a href="javascript:void(0);" title="'+menuUrl+''+this.url+'">'+this.name+'</a></div> </div> </li>';
                            }
                        })
                        dom+='<li class="node" id="add"> <div class="node-font"> <span class="node-icon icon-file">+</span> <div class="node-name" ><a href="javascript:void(0);" title=" '+menuUrl+'addfunction.html" >添加功能</a></div> </div> </li>';
                    }
                    else{
                        $.each(key.menu2,function(l,val){
                            dom +='<li class="node neck" id="'+val.id+'">' +
                                ' <div class="node-font"><span class="node-icon icon-file"></span>' +
                                ' <div class="node-name" data-id="'+val.id+'"><a href="javascript:void(0);" title="'+menuUrl+''+val.url+'">'+val.name+'</a></div> ' +
                                '</div> </li>';
                        });
                    }
                    if(dom == ''){
                        html+='<li class="node" id="'+this.menu1.id+'"> <div class="node-font"> <span class="node-icon icon-file"><img src="'+this.menu1.icon+'"/></span> <div class="node-name" >'+this.menu1.name+'</div> </div></li>';
                    }else{
                        html+='<li class="node" id="'+this.menu1.id+'"> <div class="node-font"> <span class="node-icon icon-file"><img src="'+this.menu1.icon+'"/></span> <div class="node-name" >'+this.menu1.name+'</div> </div><ul class="tree-menus tree-meni2">'+dom+'</ul></li>';
                    }
                   
                })

                $('#tree-menu1').html(html);


            }else {
                alert('请登录~！');
                window.location.href == menuUrl+'index.html'
            }
        },
        error: function(data,text,status){
            alert('出错啦~~!');
            //alert(data.status);
        }
    })
    //默认菜单加载
    //$("#57d21d52240a7a19c23ccca8").addClass('node-selected');

  /*  $(".main-title").text($(".node-selected").text()).attr({title:$(".node-selected").attr("id")});
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
    });*/
//点击菜单加载右侧内容
    chooseMenus();

   /* $(".tree-meni2 .node").click(function(){
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
    });*/
})



function chooseMenus(){

    var eleMenus = $(".tree .neck a").bind("click", function(event) {
        //console.log(this);
        //debugger;
        if(this.title !==''){
            var query = this.title.split(".")[0];
            var partentsEvel = $(this).parent().parent().parent('.node');
            var _id = $(this).parent('.node-name').attr('data-id');
            //console.log(history.pushState)
            //console.log(query);
            //debugger;
            if (history.pushState && query && !partentsEvel.hasClass('node-selected')|| history.pushState && query && partentsEvel.hasClass('node-selected')) {//或者后面加多一个判断点击当前页面也会刷新页面
                $(".neck").removeClass('node-selected');
                partentsEvel.addClass('node-selected');
                var breadcrumb = '<li class="selected"><a alt="'+query+'.html"  id="'+_id+'">'+$(this).text()+'</a></li>';
                $(".breadcrumb").empty().html(breadcrumb);
                changeBreadcrumb();
                $.ajax({
                    url: this.title,
                    type:'GET',
                    async: false,
                    success: function(data){
                        $(".main").empty().html(data);
                    },
                    error: function(text){
                        alert(text.readyState);
                        alert(text.status);
                    }
                })
                //debugger;
                // history处理
                var title = "旗瀚商家平台-" + $(this).text();
                document.title = title;

                if (event && /\d/.test(event.button)) {
                    //alert(location.href);
                    //debugger;
                    var  _url = location.href.split("?")[0] + "?" + query;
                    var _otherkey = query+'.html';
                    var state = {
                        title: title,
                        url: _url,
                        otherkey: _otherkey
                    }
                    history.pushState(state, title, location.href.split("?")[0] + "?" + query);
                }
            }
            return false;
        }
    });
    var fnHashTrigger = function(target) {
        console.log(location.href);
        var query = location.href.split("?")[1], eleTarget = target || null;
        console.log(query);
        console.log(eleTarget);

        if (typeof query == "undefined") {
            //debugger;
            if (eleTarget = eleMenus.get(0)) {
                // 如果没有查询字符，则使用第一个导航元素的查询字符内容
                //console.log(location.hash);
                history.replaceState(null, document.title, location.href.split("#")[0] + "?" + eleTarget.title.split("?")[0]) + location.hash;
                //debugger;
                fnHashTrigger(eleTarget);
            }
        } else {
            eleMenus.each(function() {
                //console.log(this);
                if (eleTarget === null && this.title.split(".")[0] === query) {
                    eleTarget = this;
                    //console.log(eleTarget);
                    //debugger;
                }else {
                    $('.breadcrumb li a').each(function(){
                        console.log($(this).attr('alt').split(".")[0])
                        if($(this).attr('alt').split(".")[0] == query){
                            eleTarget = $(this);
                        }
                    });
                    /*breadB.each(function(){
                     console.log(this);
                     debugger;
                     /!*if( this.attr('alt').split(".")[0] === query){
                     eleTarget = this;
                     }*!/
                     })*/
                }
            });
            if (!eleTarget) {
                // 如果查询序列没有对应的导航菜单，去除查询然后执行回调
                history.replaceState(null, document.title, location.href.split("?")[0]);
                fnHashTrigger();
            } else {
                $(eleTarget).trigger("click");
            }
        }
    };
    if (history.pushState) {
        window.addEventListener("popstate", function() {
            fnHashTrigger();

        });
        // 默认载入
        fnHashTrigger();
    }


}


//面包屑点击

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

