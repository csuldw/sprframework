define('app/header', ["app", "app/home", "app/security", "app/valid", "lib/slimscroll", "lib/jquery.lazyloadxt", "lib/headroom"],
function(app, home, sec, v) {
    app.controller("headerCtrl", ['$scope', '$http', function($scope, $http) {}]);

    //common service start
    app.factory('commonService',
    function() {
        this.openMessageDialog = function(userId) {
            //消息站内信?
            if ($("#modal-message-user").length <= 0) {
                home.renderAppendTmpl("header/_header_modia_message", $("body"), {}).done(function() {
                    $(".send-message-btn").click(function() {
                        var $btn = $(this);
                        var c = $btn.html();
                        home.lbtn($btn);
                        $.ajax({
                            url: ctxRoot + "/message/sendToUser",
                            type: "POST",
                            data: {
                                userId: userId,
                                content: $("#user-message-text").val()
                            }
                        }).done(function(data) {
                            if (data.success == true) {
                                home.success(data.message);
                            } else {
                                home.error(data.message);
                            }
                            $("#modal-message-user").modal("hide");
                            home.cbtn($btn, c);
                        });
                    });
                    $("#modal-message-user").modal("show");
                });
            } else {
                $("#modal-message-user").modal("show");
            }
        }
        return {
            getTmpl: function(tmplName) {
                return "/templates/" + tmplName + ".tmpl.html";
            },
            openMessageDialog: this.openMessageDialog,
            sendMessage: this.sendMessage
        }
    });//common service end

    var unreadCount;;
    var isActive = false;
    var reuser = function() {
        $.ajax({
            url: "/public/refresh/user",
            type: "POST"
        }).done(function(data) {
            if (data.success) {
                $("#notyfy_container_top").find("li").remove();
                home.success("棒棒哒！您的账号已通过邮箱认证，<span id='uastio'>10</span>秒后将刷新当前页~", 10000);
                isActive = true
                var $t = 10;
                window.setInterval(function() {
                    $("#uastio").html(--$t);
                },
                1000);
                window.setTimeout(function() {
                    location.href = location.href;
                },
                5000);
            }
        })
    };
    var initNotifyEvent = function() {
        $(".agreeLookResume").click(function() {
            var $btn = $(this);
            var c = $btn.html();
            home.lbtn($btn);
            $.ajax({
                url: "/resume/yes/look/" + $(this).data("id"),
                type: "POST"
            }).done(function(data) {
                if (data.success == true) {
                    home.success(data.message);
                } else {
                    home.error(data.message);
                }
                home.cbtn($btn, c);
            });
        });
        $(".noLookResume").click(function() {
            var $btn = $(this);
            var c = $btn.html();
            home.lbtn($btn);
            $.ajax({
                url: "/resume/no/look/" + $(this).data("id"),
                type: "POST"
            }).done(function(data) {
                if (data.success == true) {
                    home.success(data.message);
                    loadNotify();
                } else {
                    home.error(data.message);
                }
                home.cbtn($btn, c);
            });
        });
    }
    var loadNotify = function() {
        if (ISLOGIN) {
            $.ajax({
                url: "/notify/my/new/count",
                type: "POST"
            }).done(function(data) {
                if (data > 0) {
                    unreadCount = data;
                    $(".new-notify-c").show();
                }
            });
            $.ajax({
                url: "/message/my/new/count",
                type: "POST"
            }).done(function(data) {
                if (data > 0) {
                    unreadCount = data;
                    $(".new-message-c").show();
                }
            });
            $.ajax({
                url: "/notify/my/new/count",
                type: "POST"
            }).done(function(data) {
                if (data > 0) {
                    unreadCount = data;
                    $(".new-notify-c").show();
                }
            });
            var ytitle = $("title").html();
            var time = 0;
            var tix = window.setInterval(function() {
                if (unreadCount > 0) {
                    if (time % 2) {
                        $("title").html("【　　　】" + ytitle);
                    } else {
                        $("title").html("【新消息】" + ytitle);
                    }
                    time++;
                } else {
                    $("title").html(ytitle);
                    window.clearInterval(tix);
                }
            },
            1000); $(".show-notify").click(function() {
                home.mask($(".head-notifications-box"));
                loadNotifyData();
                $.ajax({
                    url: "/notify/read/all",
                    type: "POST"
                }).done(function(data) {
                    $(".new-notify-c").hide();
                    unreadCount = 0;
                });
            });
        };
    };
    var loadNotifyData = function() {
        $.ajax({
            url: "/notify/my/new/list",
            type: "POST"
        }).done(function(data) {
            if (data.success == true && data.responseData.length > 0) {
                home.renderTmpl("notify/_header_notify_list", ".head-notifications-box", data.responseData);
                initNotifyEvent();
            } else {
                $(".head-notifications-box").html("<li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;暂无通知</li>");
            }
            home.unmask($(".head-notifications-box"));
        });
    }
    var doLogin = function() {
        if (v.doValidForm($("#modal-login-form"))) {
            home.mask($("#modal-login"));
            var $btn = $(".doLogBtn");
            var c = $btn.html();
            home.lbtn($btn);
            $.ajax({
                url: "/login",
                type: "POST",
                data: home.generateFormData($("#modal-login-form"))
            }).done(function(data) {
                if (data.success == true) {
                    location.href = data.str;
                } else {
                    if (data.str == "checkNote") {
                        $("#checkNoteInput").show();
                    }
                    home.error(data.message);
                }
                home.unmask($("#modal-login"));
                home.cbtn($btn, c);
            });
        }
    };
    var doReg = function() {
        var $this = $(".doRegBtn");
        if ($this.attr("disabled") == "disabled") {
            return;
        }
        $this.html($("#common-loading-tmpl").render({
            data: "正在注册"
        }));
        $this.attr("disabled", "disabled");
        if (v.doValidForm($("#modal-reg-form"))) {
            home.mask($("#modal-login"));
            $.ajax({
                url: "/user/register",
                type: "POST",
                data: home.generateFormData($("#modal-reg-form"))
            }).done(function(data) {
                if (data.success == true) {
                    location.href = "/p/people/people_info_perfect";
                } else {
                    home.error(data.message);
                }
                $this.html("注册");
                $this.attr("disabled", false);
                home.unmask($("#modal-login"));
            });
        } else {
            $this.html("注册");
            $this.attr("disabled", false);
        }
    }
    var oepnModalLoginOrReg = function(str) {
        if ($("#modal-login-reg").length <= 0) {
            //不存在第一次加载页面,并添加页面事件
            home.renderAppendTmpl("header/_header_modia_login", $("body"), {}).done(function() {
                if (str == 1) {
                    $("#modal-login-reg").modal().on("shown.bs.modal",
                    function() {
                        home.mask($("#modal-login-reg").find(".modal-dialog"));
                        $("#modal-reg").show();
                        $("#modal-login").hide();
                        home.converHtml();
                        home.unmask($("#modal-login-reg").find(".modal-dialog"));
                    }).modal("show");
                } else {
                    $("#modal-login-reg").modal().on("shown.bs.modal",
                    function() {
                        home.mask($("#modal-login-reg").find(".modal-dialog"));
                        $("#modal-reg").hide();
                        $("#modal-login").show();
                        home.converHtml();
                        home.unmask($("#modal-login-reg").find(".modal-dialog"));
                    }).modal("show");
                };
                $("#modal-login-form").find("input").keydown(function(event) {
                    if (event.which == 13) {
                        doLogin();
                    }
                });
                $("#modal-reg-form").find("input").keydown(function(event) {
                    if (event.which == 13) {
                        doReg();
                    }
                });
                $(".signUpBtn").click(function() {
                    oepnModalLoginOrReg();
                });
                $(".loginBtn").click(function() {
                    doLogin();
                });
                $(".doRegBtn").click(function() {
                    doReg();
                });
                $(".toRegBtn").click(function() {
                    $("#modal-login").hide();
                    $("#modal-reg").fadeIn(500);
                });
                $(".toLogBtn").click(function() {
                    $("#modal-reg").hide();
                    $("#modal-login").fadeIn(500);
                });
            });
        } else {
            if (str == 1) {//str = 1 为注册
                $("#modal-login-reg").modal().on("shown.bs.modal",
                function() {
                    home.mask($("#modal-login-reg").find(".modal-dialog"));
                    $("#modal-reg").show();
                    $("#modal-login").hide();
                    home.converHtml();
                    home.unmask($("#modal-login-reg").find(".modal-dialog"));
                }).modal("show");
            } else { //str 其他为login
                $("#modal-login-reg").modal().on("shown.bs.modal",
                function() {
                    home.mask($("#modal-login-reg").find(".modal-dialog"));
                    $("#modal-reg").hide();
                    $("#modal-login").show();
                    home.converHtml();
                    home.unmask($("#modal-login-reg").find(".modal-dialog"));
                }).modal("show");
            }
        }
    };
    return {
        init: function() {
            if (document.documentElement.clientWidth < 720) {
                $(".navbar-toggle").click(function(event) {
                    $(".navbar-title").show();
                    $(".navbar-to-hide ").toggle();
                    $(".pull-right").hide();
                    event.stopPropagation();
                    $(document).click(function() {
                        $(".navbar-to-hide").hide()
                    })
                });
                $(".img-circle").click(function(event) {
                    $(".navbar-to-hide ").toggle();
                    $(".pull-right").show();
                    $(".navbar-title").hide();
                    event.stopPropagation();
                    $(document).click(function() {
                        $(".navbar-to-hide").hide()
                    });
                });
                $("#sideMenuControl").on("click",
                function() {
                    $(".slide_left").css("left", 0 + "px");
                    return false
                }) ;
                $(document).on("click",
                function() {
                    $(".slide_left").css("left", -200 + "px")
                })
            }
            loadNotify();
            sec.initCheck();
            var perfect = $("#perfect").data("v");
            if (ISACTIVE == 'false' && perfect != true) {
                reuser();
            }
            if (ISLOGIN) {
                $(".header-clear-notify").click(function() {
                    if (confirm("确定要清空所有通知吗?")) {
                        $.ajax({
                            url: "/notify/clear",
                            type: "POST"
                        }).done(function(data) {
                            if (data.success == true) {
                                home.success(data.message);
                                loadNotifyData();
                            } else {
                                home.error(data.message);
                            }
                        });
                    }
                })
            }
            if (ISACTIVE == 'false' && perfect != true) {//ISACTIVE 是否激活
                var ws$ = window.setInterval(function() {
                    if (isActive == true) {
                        window.clearInterval(ws$);
                    } else {
                        reuser();
                    }
                },
                5000)
            }
            $.scrollUp({
                scrollName: 'scrollUp',
                topDistance: '400',
                topSpeed: 300,
                animation: 'fade',
                animationInSpeed: 200,
                animationOutSpeed: 200,
                scrollText: '',
                activeOverlay: false
            });
            $("#hiStarteriOSDownload").click(function() {
                home.success("hiStarter官方APP即将上线，敬请期待！")
            }) ;
            $(".footer_wechat").hover(function() {
                var imgUrl = $(this).data("img");
                $(this).find(".social-fa-wechat").popover({
                    html: true,
                    placement: "top",
                    content: function() {
                        return "<img  style='height:230px;width:230px;' src='" + imgUrl + "'/>";
                    }
                }).popover("show");
            },
            function() {
                var imgUrl = $(this).data("img");
                $(this).find(".social-fa-wechat").popover({
                    html: true,
                    placement: "top",
                    content: function() {
                        return "<img style='width:230px;' src='" + imgUrl + "'/>";
                    }
                }).popover("hide");
            });
            var headerStyle = $("body").attr("data-header-style");
            if (headerStyle == "lucency") {
                $(window).scroll(function() {
                    if ($(window).scrollTop() > 10) {
                        $("#top-nav").css("opacity", "1");
                    } else {
                        $("#top-nav").css("opacity", "0.7");
                    };
                });
            }
            $(window).scroll(function() {
                if ($(window).scrollTop() > 10) {
                    $("#top-nav").addClass("navbar-fixed-top");
                } else {
                    //$("#top-nav").removeClass("navbar-fixed-top");
                };
            });
            window.setInterval(function() {
                if ($(window).scrollTop() > 10) {
                    $("#top-nav").addClass("navbar-fixed-top");
                } else {
                    //$("#top-nav").removeClass("navbar-fixed-top");
                };
            },
            500);
            $(".head-notifications-box").slimScroll({
                wheelStep: 20
            });
            $(".form-searchkey").keydown(function(event) {
                if (event.which == 13) {
                    var searchType = $(this).attr("data-type");
                    if (searchType == "1") {
                        location.href = "/p/jobs/job_main?searchVal=" + $(".form-searchkey").val();
                    } else if (searchType == "2") {
                        location.href = "/p/company/company_main?searchVal=" + $(".form-searchkey").val();
                    } else {
                        location.href = "/p/people/people_main?searchVal=" + $(".form-searchkey").val();
                    }
                }
            });
            $(".form-searchkey").next().find("li").click(function() {
                var searchType = $(this).attr("data-v");
                if (searchType == "1") {
                    $(".form-searchkey").attr("placeholder", "搜索职位");
                }
                if (searchType == "2") {
                    $(".form-searchkey").attr("placeholder", "搜索公司");
                }
                if (searchType == "3") {
                    $(".form-searchkey").attr("placeholder", "搜索人才");
                }
                $(".form-searchkey").next().find("li").show();
                $(this).hide();
                $(".form-searchkey").focus();
                $(".form-searchkey").attr("data-type", searchType);
            });
            $("#footer-wechat").hover(function() {
                $(this).prev().show(310);
            },
            function() {
                $(this).prev().hide(310);
            },
            $(".pre-footer-logos img").hover(function() {
                var logoName = $(this).attr("data-name");
                $(this).attr("src", "http://img.histarter.com/img/logo/" + logoName + ".png_auto100")
            },
            function() {
                var logoName = $(this).attr("data-name");
                $(this).attr("src", "http://img.histarter.com/img/logo/" + logoName + "-bw.png_auto100")
            }),$(".openRegModal").click(function() {
                oepnModalLoginOrReg(1)
            }),
            $(".openLogModal").click(function() {
                oepnModalLoginOrReg()
            }))
        },
        oepnModalLoginOrReg: oepnModalLoginOrReg,
        reuser: reuser
    };
});