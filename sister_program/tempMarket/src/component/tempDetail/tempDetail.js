require("./tempDetail.css");
require("../../util/tabs/jquery.tabs.js");
var template = require("./detail.vm");
var imageLazyload = require("../../util/imageLazyload/imageLazyload");
var record = require("./table.vm");
var Pagination = require('../../util/pagination/pagination');

var HISTORY = "history.json";
var tempDetail = {
    pageSize:null,
    totalItems:0,
    ajaxData:{},
    historyView:false,
    init:function(){
        self = this;
        //START从这里到下一个结束点都是有关于收起服务，展开服务的东西交互效果，具体内容包括如下。
        // 但似乎这部分需求被删除掉，所以只需把 START--END删除即可
        //包括input的keyup和paste限制
        this.inputNumLimit();
        //点击加减号input的增减效果
        this.plusMin();
        //选中与非选中checkbox的清单列表效果
        this.checkServer();
        //收起服务，展开服务的效果
        this.serverToggle();
        //END到这里到结束，都是有关于收起服务，展开服务的东西交互效果：具体内容包括如上
        //选择几个月的效果
        this.serverTimeSelect();
        //初始化tab-----模板详情和成交记录,以及成交记录点击时的异步请求
        this.initTab();
        //图片懒加载的功能初始化
        this.imageLoad();
    },

    //限定input只能为数字
    onlyNumber:function(){
        var num = $(this).val().replace(/[^0-9]/g,'');
        $(this).val(num);
        if($(this).hasClass("number-box")){
            self.numberBoxChange.call($(this));
        }
        //否则是下面的更改改变上面的服务数字
        else{
            self.detailBoxChange.call($(this));
        }
    },

    //加号的作用
    add:function(){
        var val = parseInt($(this).prev().val()) ? parseInt($(this).prev().val()):0;
        $(this).prev().val(val + 1);
        self.numberBoxChange.call($(this).prev());
    },

    //减号的作用
    minus:function(){
        var val = parseInt($(this).next().val()) ? parseInt($(this).next().val()):0;
        if(val <= 1){
            return;
        }
        $(this).next().val(val - 1);
        self.numberBoxChange.call($(this).next());
    },

    //重新计算价格
    changePrice:function(){
        var serverPrice = 0;
        serverPrice = parseInt($(".month").filter(".active").attr("data-price"));
        $(".detail-input").each(function () {
            var price = parseInt($(this).val())? parseInt($(this).val()):0;
            serverPrice += price * parseInt($(this).attr("data-price"));
        });
        $(".price-panel span.price").text(serverPrice+ "/");
    },

    //checkbox 选择与否的动态交互效果
    checkboxChange:function () {
        if($(this).is(":checked"))
        {
            $(".server-detail").show();
            var index= $(this).index();
            var data = {
                "name":$(this).parent().parent().attr("data-name"),
                "price":$(this).parent().parent().attr("data-price"),
                "num":$(this).parent().next().children(".number-box").val()
            };
            var parsedTmp = Velocity.parse(template);
            var compiledHtml = (new Velocity.Compile(parsedTmp)).render({data: data});
            $(".server-detail").append(compiledHtml);
            //限定只能输入数字
            self.inputNumLimit();
            self.removeDetail();
        }
        else{
            var name = $(this).parent().parent().attr("data-name");
            $(".detail .detail-span").each(function (index) {
                if($(this).text() == name){
                    $(".detail").eq(index).remove();
                }
            });
            if($(".detail").length <= 0){
                $(".server-detail").hide();
            }
        }
        self.changePrice();

    },

    //展开和收起
    addServer:function(){
        var textName = $(this).text();
        textName = (textName=="收起服务")?"展开服务":"收起服务";
        $(this).text(textName);
        $(".server-panel").toggle();
    },

    //购买选择几个月的时候处理
    aLinkAction:function(){
        $(this).addClass("active");
        $(this).parent().siblings().children(".month").removeClass("active");
        self.changePrice();
    },

    //当detail-box价格更改的时候同步上面的input，并且改变价格
    detailBoxChange:function(){
        var name = $(this).attr("data-name");
        var parent = $(".server").filter("[data-name='" + name + "']");
        $(parent).find(".number-box").val($(this).val());
        self.changePrice();
    },

    //当number-box input数值变化的时候同步下面的input，并且更改价格
    numberBoxChange:function(){
        var name = $(this).parent().parent().attr("data-name");
        $(".detail-input[data-name='" + name + "']").val($(this).val());
        self.changePrice();
    },

    //点击detail删除按钮，删除detail选项
    removeDetail:function(){
        $(".del-btn").on("click",self.delDetail);
    },

    delDetail:function(){
        console.log("del");
        var name = $(this).prev().find(".detail-input").attr("data-name");
        //对应的checkbox改为不选中
        $(".server").filter("[data-name='" + name + "']").find(".server-check").prop("checked",false);
        $(this).parent().remove();
        if($(".detail").length <= 0){
            $(".server-detail").hide();
        }
    },

    //input+-的作用
    plusMin:function(){
        $(".add").on("click",self.add);
        $(".min").on("click",self.minus);
    },

    //input限定为数字输入
    inputNumLimit:function(){
        //限定只能输入数字
        $(".num-input").on("keyup",self.onlyNumber);
        $(".num-input").on("afterpaste",self.onlyNumber);
    },

    //当点击checkbox时，下面的选择了的服务列表出现
    checkServer:function(){
        $(".server-check").on("change",self.checkboxChange);
    },

    //点击选择服务，服务选择面板的出现与收起
    serverToggle:function() {
        $(".server-select").on("click", self.addServer);
    },

    //3个月,6个月，12个月的点击选择效果
    serverTimeSelect:function(){
        $(".month").on("click", self.aLinkAction);
    },
    //初始化tab
    initTab:function(){
        $('.temp-details').Tabs({
            event:'click'
        });
        //添加查看成交记录的ajax
        self.historyRecord();
    },

    //查看成交记录
    historyRecord:function(){
        $(".business-history").on("click",function () {
            if(!self.historyView){
                $.ajax({
                    url:"history.json",
                    dataType:"json",
                    type:"get",
                    success:function (data) {
                        var parsedTmp = Velocity.parse(record);
                        var compiledHtml = (new Velocity.Compile(parsedTmp)).render({data: data});
                        $(".tab_box").find(".record").html(compiledHtml);
                        $("#total").val(data.totalItem);
                        $("#pageSize").val(data.pageSize);
                        //只有第一次点击才有ajax请求
                        self.historyView = true;
                        self.initPagination();
                    },
                    error:function (data) {
                       console.log("出错怪我咯~");
                    }
                });
            }
            else{
                return;
            }
        });
    },
    imageLoad:function () {
        imageLazyload.init({
            node: '[lazy-img="jd-app"]'
        });
    },

    initPagination:function () {
        self.pageSize = self.pageSize ? self.pageSize : $('#pageSize').val();   //当页面第一次进入时获取每页展示数据条数
        self.totalItems = self.totalItems ? self.totalItems : $('#total').val();  //当页面第一次进入时获取文章总条数
        //ajaxData初始化参数
        self.ajaxData={
            "pageSize":self.pageSize,
            "totalItems":self.totalItems
        };
        Pagination.init({
            ajaxUrl: 'history.json',
            ajaxData: self.ajaxData,
            maxentries: self.totalItems,
            items_per_page: self.pageSize,
            pageNum: 'index',
            success: function (data) {
                if(data.success){
                    var parsedTmp = Velocity.parse(record);
                    var compiledHtml = (new Velocity.Compile(parsedTmp)).render({data: data});
                    $(".tab_box").find(".record").html(compiledHtml);
                }
                else{
                    alert("data,success=false");
                }
            },
            error:function () {
                alert("ajax出错了~");
            }
        });
    },
};

$(function () {
    tempDetail.init();
});



