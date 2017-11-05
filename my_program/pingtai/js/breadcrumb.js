/**
 * Created by A on 2016/10/13.
 */

/*$(".node").removeClass("node-selected")
$(this).addClass("node-selected");
var selectedurl = $(this).find("a").attr("title");
$("h2.main-title").text($(this).text()).attr({title:$(this).attr("id")});
$.ajax({
    url:''+selectedurl+'',
    type:'GET',
    //async: false,
    success: function(data){

        $(".main").empty().html(data);
    },
    error: function(text){
        alert(text.readyState);
        alert(text.status);
    }
});*/
//alert("123");
var eleMenus = $("#tree-menu1 a").on("click", function(event) {
    //alert("123");
    var str = this.href;
    alert(str);
    var query = str;//this.href.split("?")[1];
    if (history.pushState && query && !$(this).hasClass(clMenuOn)) {
        var selectedurl = $(this).attr("href");
         /*$.ajax({
         url:''+selectedurl+'',
         type:'GET',
         //async: false,
         success: function(data){

         $(".main").empty().html(data);
         },
         error: function(text){
         alert(text.readyState);
         alert(text.status);
         }
         });*/


        // history处理
        var title = "旗瀚官方平台-" + $(this).text();
        document.title = title;
        if (event && /\d/.test(event.button)) {
            history.pushState({ title: title }, title, location.href.split("?")[0] + "?" + query);
        }
    }
    return false;
});

var fnHashTrigger = function(target) {
    var query = location.href.split("?")[1], eleTarget = target || null;
    if (typeof query == "undefined") {
        if (eleTarget = eleMenus.get(0)) {
            // 如果没有查询字符，则使用第一个导航元素的查询字符内容
            history.replaceState(null, document.title, location.href.split("#")[0] + "?" + eleTarget.href.split("?")[1]) + location.hash;
            fnHashTrigger(eleTarget);
        }
    } else {
        eleMenus.each(function() {
            if (eleTarget === null && this.href.split("?")[1] === query) {
                eleTarget = this;
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