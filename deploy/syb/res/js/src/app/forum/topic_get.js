define(["app","app/home", "app/valid", "lib/jquery.fileupload", "lib/bootstrap-tags"],
    function(app,home, v) {
        app.controller("topicController",['$scope', '$http', '$modal',
            function($scope, $http, $modal){
            $scope.view = {title:'一个传统制造业的人如何开始创业？' , topicContent:'如何开始创业呢？'};
            $scope.view = gg_topic;
        }]);

        var pId ;

        var loadReply = function(num) {
            home.mask($(".comment-list"));
            $.ajax({
                url: "/forum/reply/list/" + pId,
                type: "POST",
                data: {
                    page: num,
                    rows: 40
                }
            }).done(function(data) {
                if (data.success == true && data.responseData.records > 0) {
                    $(".comment-list").html($("#temp-reply-item").render(data.responseData.rows));
                    home.paging($(".reply-pager"), data.responseData.total, data.responseData.page, loadReply, "small", "middle", $("body"));
                    initEvent();
                } else {
                    $(".comment-list").html($("#temp-no-reply").render({}));
                }
                home.unmask($(".comment-list"));
            })
        }
        var initEvent = function() {
            $(".btn-reply-c").click(function() {
                var replyId = $(this).data("id");
                $("[data-reply-text-id=" + replyId + "]").toggle(310);
            });
            $(".btn-pub-reply-c").click(function() {
                var replyId = $(this).data("id");
                var reta = $(this).prev().prev();
                if (v.doValidForm($(this).parent())) {
                    $.ajax({
                        url: "/forum/topic/reply/add/c/" + replyId,
                        type: "POST",
                        data: {
                            content: reta.val()
                        }
                    }).done(function(data) {
                        if (data.success) {
                            home.success(data.message);
                            location.reload();
                        } else {
                            home.error(data.message);
                        }
                    })
                }
            })
        }
        var loadCreply = function(num, clr$, lcid) {
            $.ajax({
                url: "/forum/reply/c/list/" + lcid,
                type: "POST",
                data: {
                    rows: 3,
                    page: num
                }
            }).done(function(data) {
                if (data.success == true && data.responseData.records > 0) {
                    clr$.show();
                    clr$.html($("#temp-c-reply-item").render(data.responseData.rows));
                    if (data.responseData.total <= 1) {
                        $(".c-reply-pager[data-id='" + lcid + "']").html("");
                        return;
                    }
                    $(".c-reply-pager[data-id='" + lcid + "']").bootstrapPaginator({
                        bootstrapMajorVersion: 3,
                        currentPage: data.responseData.page,
                        totalPages: data.responseData.total,
                        size: "small",
                        alignment: "middle",
                        itemTexts: function(type, page, current) {
                            switch (type) {
                                case "first":
                                    return "<<";
                                case "prev":
                                    return "<";
                                case "next":
                                    return ">";
                                case "last":
                                    return ">>";
                                case "page":
                                    return "" + page;
                            }
                        },
                        pageUrl: function(type, page, current) {
                            return "javascript:void(0)";
                        },
                        onPageClicked: function(e, originalEvent, type, page) {
                            loadCreply(page, clr$, lcid);
                        }
                    });
                };
            });
        }
        var initCReply = function() {
            $(".c-reply-list").each(function() {
                loadCreply(1, $(this), $(this).data("id"));
            });
        }
        return {
            init: function() {
                //pId = $("#pId").val();
                if (ISLOGIN == "false") {} else {
                    if (typeof Markdown != 'undefined' && $('#wmd-input').length) {
                        var converter1 = new Markdown.Converter();
                        var editor1 = new Markdown.Editor(converter1, $('.wmd-panel'), $('#wmd-preview'));
                        editor1.run();
                    }
                }
                $('.wmd-input').atwho({
                    at: "@",
                    callbacks: {
                        remoteFilter: function(query, callback) {
                            if (query.length > 0) {
                                $.ajax({
                                    url: "/people/searchname/" + query,
                                    type: "POST"
                                }).done(function(data) {
                                    callback(data)
                                });
                            }
                        }
                    }
                });
                $(".reply-user").click(function() {
                    var nickname = $(this).attr("data-nickname");
                    $("#wmd-input").html("@" + nickname + " ");
                    $("html,body").animate({
                            scrollTop: ($(".reply-widget").offset().top - 100)
                        },
                        1000);
                });
                $(".del-reply").click(function() {
                    if (confirm("确定要删除这个回帖吗?")) {
                        var $replyId = $(this).data("id");
                        var $b = $(this);
                        var c = $b.html();
                        home.lbtn($b);
                        $.ajax({
                            url: "/forum/reply/del/" + $replyId,
                            type: "POST"
                        }).done(function(data) {
                            if (data.success == true) {
                                home.success(data.message);
                                location.reload();
                            } else {
                                home.error(data.message);
                            }
                            home.cbtn($b, c);
                        });
                    }
                });
                $(".del-topic").click(function() {
                    if (confirm("确定要删除这个帖子吗?")) {
                        var $b = $(this);
                        var c = $b.html();
                        home.lbtn($b);
                        $.ajax({
                            url: "/forum/topic/del/" + pId,
                            type: "POST"
                        }).done(function(data) {
                            if (data.success == true) {
                                home.success(data.message);
                                location.href = "/forum/list";
                            } else {
                                home.error(data.message);
                            }
                            home.cbtn($b, c);
                        });
                    }
                });
                $(".doReplyBtn").click(function() {
                    var $b = $(this);
                    var c = $b.html();
                    home.lbtn($b);
                    $.ajax({
                        url: "/forum/topic/reply/add/" + pId,
                        type: "POST",
                        data: {
                            content: new Markdown.Converter().makeHtml($("#wmd-input").val())
                        }
                    }).done(function(data) {
                        if (data.success == true) {
                            home.success(data.message);
                            location.reload();
                        } else {
                            home.error(data.message);
                        }
                        home.cbtn($b, c);
                    });
                });
            }
        };
    });