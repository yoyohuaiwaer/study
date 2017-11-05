require("./jquery-pagination");

var Pagination = {
    defOpts: {
        ajaxUrl: '',  //ajax请求地址
        ajaxData: {},  //ajax请求数据
        pageNum: 'pageNum', //服务端提供的页面字段
        maxentries: "100", //总条目数，必传项
        boxNode: '.pages',  //分页容器节点
        paginationId: '#pagination',  //分页id
        pageInput: '.num-input',  //页码输入框
        btnJump: '.btn-jump',  //跳转按钮
        current_page: '0', //当前选中的页面，默认是0，表示第1页
        items_per_page: 10,  //每页显示的条目数
        num_display_entries: 4,  //分页插件省略号之前部分显示的分页条目数
        num_edge_entries: 2,  //分页插件省略号之后部分显示的分页条目数
        link_to: 'javascript:;',  //分页按钮的链接
        prev_text: '<i class="icon-triangle-left"></i>',  //“上一页”分页按钮上显示的文字
        next_text: '<i class="icon-triangle-right"></i>',  //“下一页”分页按钮上显示的文字
        refresh:false, //yoyo第一次初始化组件的时候是否再次进行ajax请求
        success: function (data) {

        },
        error: function () {

        }
    },
    /**
     * 初始化
     * @param opts
     */
    init: function (opts) {
        this.opts = $.extend(this.defOpts, opts);
        this.$node = $(this.opts.boxNode);
        this.iptBind();
        this.pagination();
        this.pageJump();
    },
    /**
     * 输入框事件绑定
     */
    iptBind: function () {
        var self = this;

        /**
         * 只能输入数字
         */
        self.$node.find(self.opts.pageInput).on('keyup', function () {
            $(this).val($(this).val().replace(/\D/g,''));
        }).on('afterpaste', function () {
            $(this).val($(this).val().replace(/\D/g,''));
        });

        /**
         * 回车键触发跳转事件
         */
        self.$node.find(self.opts.pageInput).on('keyup', function (ev) {
            if (ev.keyCode == 13) {
                self.$node.find(self.opts.btnJump).trigger('click');
            }
        })
    },
    /**
     * 分页
     */
    pagination: function () {
        var self = this;

        if (self.opts.maxentries <= 0) {
            self.$node.hide();
            return false;
        }
        $(self.opts.paginationId).pagination(self.opts.maxentries, {
            current_page: self.opts.current_page, //当前选中的页面
            items_per_page: self.opts.items_per_page,  //每页显示的条目数
            num_display_entries: self.opts.num_display_entries,  //分页插件省略号之前部分显示的分页条目数
            num_edge_entries: self.opts.num_edge_entries,  //分页插件省略号之后部分显示的分页条目数
            link_to: self.opts.link_to,  //分页按钮的链接
            prev_text: self.opts.prev_text,  //“上一页”分页按钮上显示的文字
            next_text: self.opts.next_text,  //“下一页”分页按钮上显示的文字
            callback: function (ev) {
                    self.ajaxPagination(parseInt(ev, 10));
            }
        });
    },
    /**
     * 分页跳转
     */
    pageJump: function () {
        var self = this;

        self.$node.find(self.opts.btnJump).on('click', function () {
            var pageNum = self.$node.find(self.opts.pageInput).val().trim();

            var arrPage = $(self.opts.paginationId).children();

            if (pageNum == '') {
                return false;
            }

            if (pageNum < 1) {
                pageNum = 1;
            }
            else if (pageNum > arrPage.length - 2) {
                pageNum = arrPage.length - 2;
            }

            //self.$node.find(self.opts.pageInput).val(pageNum);
            //yoyo 修改为如下。上面的写法在有省略号的情况下有bug
            self.$node.find(self.opts.pageInput).val(arrPage.eq(pageNum).text());
            arrPage.eq(pageNum).trigger('click');
        });
    },
    /**
     * ajax请求分页数据
     * @param pageNum
     */
    ajaxPagination: function (pageNum) {
        var self = this;
        if(!self.opts.refresh){
            self.opts.refresh = true;
            return;
        }
        self.opts.ajaxData[self.opts.pageNum] = pageNum + 1;
        $.ajax({
            type: 'POST',
            url: self.opts.ajaxUrl,
            data: self.opts.ajaxData,
            dataType: 'json',
            success: function (data) {
                self.opts.success(data, pageNum);
            },
            error: function (data) {
                self.opts.error(data);
            }
        })
    }


};

module.exports = Pagination;