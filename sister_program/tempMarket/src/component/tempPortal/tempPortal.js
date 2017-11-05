require("../../util/slides/jquery.slides.min");
require("./tempPortal.css");
var imageLazyload = require("../../util/imageLazyload/imageLazyload");
var Pagination = require('../../util/pagination/pagination');
var template = require("./items.vm");

var portal={
    pageSize:null,
    totalItems:0,
    ajaxData:{},
    searchType:{},
    init:function(){
        self = this;
        //初始化轮播图
        this.initSlider();
        //拿到分页需要的一些数据
        this.initPageParams();
        //初始化分页组件
        this.initPagination();
        //搜索框的功能实现
        this.inputSearch();
        //左边的类型搜索实现
        this.typeSearch();
        //每一次input输入都会影响分页时的关键字，所以一旦变化的时候就要手动更改keysearch
        this.inputChange();
        //排序的搜索
        this.sortSearch();
        //图片懒加载
        this.imageLoad();
    },

    //初始化一些页面参数，主要用于pagination
    initPageParams:function () {
        self.pageSize = self.pageSize ? self.pageSize : $('#pageSize').val();   //当页面第一次进入时获取每页展示数据条数
        self.totalItems = self.totalItems ? self.totalItems : $('#total').val();  //当页面第一次进入时获取文章总条数
        //ajaxData初始化参数
        self.ajaxData={};
        self.searchLimit();
        self.ajaxData = $.extend(self.ajaxData,{"pageSize":self.pageSize},self.searchType);
    },

    //初始化轮播图
    initSlider:function(){
        $('#slides').slidesjs({
            play: {
                // [boolean] Generate the play and stop buttons.
                active: true,
                // [boolean] Start playing the slideshow on load.
                auto: true,
                // [number] Time spent on each slide in milliseconds.
                interval: 3000,
                // [boolean] show/hide stop and play buttons
                swap: true,
                // [boolean] pause a playing slideshow on hover
                pauseOnHover: false,
                // [number] restart delay on inactive slideshow
                restartDelay: 3000,
                // [string] Can be either "slide" or "fade"
                effect:"fade"
            }

        });
        //这里处理小圆点显示数字的问题
        $(".slidesjs-pagination-item a").text("");
        //这里处理点击小圆点击之后就停止播放的问题
        $(".slidesjs-pagination-item").on("click",function(){
            $(".slidesjs-play").trigger("click");
        });
    },

    //input搜索框的查询
    inputSearch:function () {
        $("#keyBtn").on("click",function(){
          /*  self.recoverDefault();*/
            if($("#keySearch").val()){
                self.typeAllSearch();
            }
            else{
                alert("请输入关键字，再进行搜索");
                return;
            }
        });
    },

    //左边分类的搜搜
    typeSearch:function () {
        $(".item").on("click",function () {
            if($(this).hasClass("active")){
                return ;
            };
            //选择颜色的单独判断
            if($(this).hasClass("color")){
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
                $(this).parents(".item-panel").find(".default").removeClass("active");
            }
            else{
                $(this).addClass("active");
                $(this).siblings().removeClass("active");
            }
            self.typeAllSearch();
        })
    },

    //排序的一些相关属性显阴以及刷新动作
    sortSearch:function () {
        $(".sort").on("click",function(){
            if($(this).hasClass("up")){
                $(this).removeClass("up");
                $(this).addClass("down");
            }
            else{
                $(this).removeClass("down");
                $(this).addClass("up");
            }
            $(this).addClass("active");
            $(this).siblings().attr("class","sort");
            self.typeAllSearch();
        });
    },

    //初始化分页组件
    initPagination:function () {
        Pagination.init({
            ajaxUrl: 'page.json',
            ajaxData: self.ajaxData,
            maxentries: self.totalItems,
            items_per_page: self.pageSize,
            pageNum: 'index',
            success: function (data) {
                if(data.success){
                        var parsedTmp = Velocity.parse(template);
                        var compiledHtml = (new Velocity.Compile(parsedTmp)).render({data: data});
                        $("#content").html(compiledHtml);
                        //懒加载
                        imageLazyload.reload();
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

    //重新获取搜索的限制条件，==全部的时候就没有限制条件，否则有相对应的字段限制条件
    searchLimit:function () {
        //input内容
        if($("#keySearch").val()){
            var keySearch = $("#keySearch").val();
            self.searchType["keySearch"]=keySearch;
        };
        var level = $(".level").find(".active").text();
        if(level != "全部"){
            self.searchType["level"]=level;
        }
        else{
            delete self.searchType["level"];
        }
        var theme = $(".theme").find(".active").text();
        if(theme != "全部"){
            self.searchType["theme"]=theme;
        }
        else{
            delete self.searchType["theme"];
        }
        var professional = $(".professional").find(".active").text();
        if(professional != "全部"){
            self.searchType["professional"]=professional;
        }
        else{
            delete self.searchType["professional"];
        }
        var style = $(".style").find(".active").text();
        if(style != "全部"){
            self.searchType["style"]=style;
        }
        else{
            delete self.searchType["style"];
        }
        var color = $(".color").find(".active").attr("data-color");
        if(color != "全部"){
            self.searchType["color"]=color;
        }
        else{
            delete self.searchType["color"];
        }
        if($(".sort").filter(".active")){
            var sort = $(".sort").filter(".active").attr("data-type");
            self.searchType["sortType"]=sort;
            if($(".sort").filter(".active").hasClass("up")){
                self.searchType["sortUp"]=true;
            }
            else{
                self.searchType["sortUp"]=false;
            }
        }
    },

    //控制input每次改变时，pagination的input关键字keysearch也更新
    inputChange:function () {
        $("#keySearch").on("change",function(){
            if($(this).val()){
                Pagination.opts.ajaxData["keySearch"] = $(this).val();
            }
            else{
                delete  Pagination.opts.ajaxData["keySearch"];
            }
        });
    },
    
    //左边关键字搜索，类型选择，排序都使用此接口更新
    typeAllSearch:function () {
        self.searchLimit();
        $.ajax({
            url: "search.json",
            type: "POST",
            dataType:"json",
            data:self.searchType,
            success: function (data) {
                if(data.success){
                    var parsedTmp = Velocity.parse(template);
                    var compiledHtml = (new Velocity.Compile(parsedTmp)).render({data: data});
                    $("#content").html(compiledHtml);
                    imageLazyload.reload();
                    self.pageSize = $('#pageSize').val() ? $('#pageSize').val() : self.pageSize;   //当页面第一次进入时获取每页展示数据条数
                    self.totalItems = $('#total').val() ? $('#total').val() : self.totalItems;
                    self.initPageParams();
                    //控制再次初始化时不刷新页面
                    Pagination.opts.refresh = false;
                    self.initPagination();
                    //懒加载
                    imageLazyload.reload();
                }
                else{
                    alert("data,success=false");
                }
            },
            error: function () {
                alert("网络异常");
            }
        });
    },
    imageLoad:function () {
        imageLazyload.init({
            node: '[lazy-img="jd-app"]'
        });
    }
};

$(function () {
    portal.init();
});

