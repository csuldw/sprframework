<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 15/9/16
  Time: 上午12:13
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="创业,创业团队,互联网招聘,合伙人,找工作,招聘网,人才网">
    <meta name="description" content="hiStarter是一个面向互联网创业团队的兴趣社交型垂直招聘平台，提供真实的创业招聘信息、免费的人才库，靠谱的团队都在这儿">
    <meta name="google-site-verification" content="mUGc4ma0gACN5ggsANW5_s7AcezE9yIk8CwjZ8BNJKg"/>
    <meta name="baidu-site-verification" content="wVc4DyAC41"/>
    <link href="/res/css/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/res/css/style_1.css?891b7fjkhdjld4fsfjldcvdsd2174ae34c21321" rel="stylesheet">
    <link href="/res/css/style_2.css?891b7fjkhdjld4fsfjldcvdsd2174ae34c21321" rel="stylesheet">
    <meta name="fragment" content="!"/>

    <script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
    <script type="text/javascript" data2-main="/res/js/src/main.js" src="/res/js/src/lib/require.js"></script>

    <script type="text/javascript" src="/res/js/src/main.js?891b7fjkhdjld4fsfjldcvdsd2174ae34c21321"></script>

    <script type="text/javascript" src="/res/js/src/jqueryPlugin.js"></script>
    <script type="text/javascript" src="/res/js/src/lib/other_init.js"></script>
    <script type="text/javascript" src="/res/js/src/starter.js"></script>
    <!-- 原始文件 -->

    <!--
    <script type="text/javascript" src="/res/js/bin/starter.js?891b7fjkhdjld4fsfjldcvdsd2174ae34c21321"></script>
    单个build后的文件
    -->

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script id="common-loading-tmpl" type="text/x-jsrender">
        <span ><i class="fa fa-spinner fa-spin"></i> {{:data}}</span>



    </script>
    <script id="common-loading-mini-tmpl" type="text/x-jsrender">
        <span ><i class="fa fa-spinner fa-spin"></i> {{:data}}</span>



    </script>
    <script type="text/javascript">

        var path = '';
        var ctxRoot = '';
        var ISLOGIN = 'false';
        var ISACTIVE = 'true';
        var ISPERFECT = 'true';
        var ISCOMPANY = 'false'
        var appId = 'page/welcome';
        var gg_username = '${session.user.username}' ;

        //服务端赋值
        if( '${session.ISLOGIN}' ) ISLOGIN = '${session.ISLOGIN}';
        console.log('islogin = ' + ISLOGIN);

        //        ISPERFECT = 'false';

    </script>
    <title>SYB | Start Your Business | 为创业者插上翅膀
    </title>

</head>

<body ><!-- style="background-color: #fff;" class="index_body wl" -->
<ul id="notyfy_container_top" class="notyfy_container navbar-fixed-top i-am-new"></ul>

<div class="navbar navbar-default navbar-fixed-top" role="navigation" id="top-nav" ng-controller="headerCtrl">

    <div class="progress top-progress" style="display: none">
        <div class="progress-bar progress-bar-success" id="top-progress-div" role="progressbar" aria-valuenow="0"
             aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
    </div>
    <div class="container relative_pos">
        <div class="container header_to_re">
            <div id="wrap" style="display: none">
                <label id='sideMenuControl' for='sideToggle'>=</label>
            </div>

            <div class="navbar-header ">
                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse"
                        data-target=".bs-navbar-collapse">
                    <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span
                        class="icon-bar"></span> <span class="icon-bar"></span>
                </button>
                <img class="hide" src="http://img.histarter.com/index/new_logo.png_fixhw300"/>
                <a class="navbar-brand navbar-brand-jobmain" href="/">
                    <img style="width: auto; height: 60px;" src="http://img.histarter.com/index/new_logo.png"/></a>
            </div>

            <div class="navbar-to-hide navbar-to-hider">
                <ul class="nav navbar-nav navbar-title">
                    <li style="display: none;">
                        <a href="/page/company/list/1">团队列表</a>
                        <a href="/page/people/list">团队列表</a>
                        <a href="/page/jobs/list">职位列表</a></li>

                    <li class="now"><a href="/" title="首页">首页</a></li>
                    <%--<li><a href="/p/company/company_main" title="创业团队 ">创业团队</a></li>
                    <li><a href="/p/people/people_main" class="btn-action" title="找合伙人">找合伙人</a></li>
                    <li><a href="/p/jobs/job_main" title="创业帮助">创业帮助</a></li>--%>
                    <li><a class="text-primary" href="/forum/list">社区</a>
                <span class="community_new" style="position: absolute; top: 10px; right: 0px;">
                 <img src="http://img.histarter.com/index/NEW.png">
                </span>
                    </li>
                    <%--<li class="dropdown mrg25R">
                        <a href="javascript:void(0);" class="dropdown-toggle"
                           data-toggle="dropdown" role="button" aria-expanded="false">更多 <span
                                class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="/event/list" title="活动">活动</a></li>
                        </ul>
                    </li>--%>
                    <li class="input-icon search-icon no_border"><i class="fa fa-search"></i>
                        <input
                            class="form-control form-searchkey" name="searchkey" data-toggle="dropdown"
                            aria-expanded="false" popover-postion="left" maxlength="20" type="text" data-type="1"
                            placeholder="搜索">
                        <ul class="dropdown-menu" role="menu" style="border: none;">
                            <li data-v="1" style="display: none;"><a class="btn ">切换职位搜索</a></li>
                            <li data-v="2"><a class="btn ">切换公司搜索</a></li>
                            <li data-v="3"><a class="btn ">切换人才搜索</a></li>
                        </ul>
                    </li>
                </ul>

                <c:if test="${!session.ISLOGIN}" >
                    <!-- 没有登录的界面,在此ul内 -->
                    <ul class="nav navbar-nav navbar-right header-btns">
                        <li><a href="javascript:void(0)"
                               style="padding-top: 15px; padding-bottom: 1px; background-color: #fff;">
                            <button type="button" class="btn btn-default openRegModal">注册</button>
                        </a></li>
                        <li><a href="javascript:void(0)"
                               style="padding-top: 15px; padding-bottom: 1px; background-color: #fff;">
                            <button type="button" class="btn btn-success openLogModal" ng-click="openLogin()">登录</button>
                        </a></li>
                    </ul>
                </c:if>

                <c:if test="${session != null && session.ISLOGIN}" >
                    <!-- 登录后的界面,在此ul中-->
                    <ul class="nav navbar-nav navbar-right pull-right pull-right-pad pull-right-res" data-right="right">
                        <li class="dropdown bullhorn"><a href="javascript:void(0)" class="dropdown-toggle show-notify" aria-expanded="true" data-toggle="dropdown"><i class="fa fa-bullhorn"><span class="new-c-span new-notify-c" style="display: none"></span></i></a>
                            <div class="dropdown-menu box-md float-right">
                                <div class="popover-title display-block clearfix pad10A">
                                    通知 <a class="text-transform-cap font-primary font-normal  pull-right header-clear-notify" href="javascript:void(0)" title="清空通知">清空</a>
                                </div>
                                <ul class="no-border notifications-box head-notifications-box">
                                </ul>
                                <div class="pad10A button-pane button-pane-alt text-center">
                                    <a href="/p/notify/list" class="btn btn-sm btn-success" title="View all notifications"> 查 看 所 有 </a>
                                </div>
                            </div></li>
                        <li class="envelope"><a href="/p/message/message_main" class=""><i class="fa fa-envelope"><span class="new-c-span new-message-c" style="display: none"></span></i></a></li>
                        <li class="dropdown ">

                            <a href="javascript:void(0);" class="dropdown-toggle " style="padding-bottom: 21px;" aria-expanded="true" data-toggle="dropdown">
                                <img style="width: 24px; height: 24px; margin-top: -2px; margin-bottom: 2px;" class="img-circle"
                                     src="http://img.histarter.com/upload/2015-08-24/18/24/22/98bedce11a764ce39b4a91534a54555d/1440411862963/t0kugj_fixhw28"/>
                                <span id="id-username"><!-- username --></span>
                                <span id="header-email" style="display: none"></span>
                                <b class="caret"></b></a>
                            <div class="dropdown-menu box-sm float-right">
                                <div class="box-sm">
                                    <div class="login-box clearfix">
                                        <div class="user-img">
                                            <a href="/p/people/people_setting?#general" title="" class="change-img">修改头像</a> <img src="http://img.histarter.com/upload/2015-08-24/18/24/22/98bedce11a764ce39b4a91534a54555d/1440411862963/t0kugj_fixhw80" alt="">
                                        </div>
                                        <div class="user-info">
                                            <span> <span id="nav-username"><!-- username --></span>
                                                <i>产品经理&nbsp;</i>
                                            </span> <a href="/people/7191" class="" title="Edit profile">个人主页</a>
                                        </div>
                                    </div>
                                    <div class="divider"></div>
                                    <ul class="reset-ul mrg5B">
                                        <li><span style="margin-left: 15px; margin-right: 25px;">我的团队</span>
                                            <a class="text-success " href="/chihuo"> 全名创业
                                                <i class="fa float-right fa-caret-right"></i>
                                            </a>
                                            <a style="color: #8da0aa;" class="pad5L" href="/p/jobs/job_main#job_my" title="View notifications">已发职位</a></li>

                                        <a style='display:none' class="text-success btn-action" href="javascript:void(0)">请先完善个人信息再创建团队 <i class="fa float-right fa-caret-right"></i>
                                        </a>
                                    </ul>
                                    <div class="divider"></div>
                                    <ul class="reset-ul mrg5B">
                                        <li><span style="margin-left: 15px; margin-right: 25px;">我的信息</span>
                                            <a style="color: #8da0aa;" href="/p/people/people_setting?xg#general" title="View notifications">修改资料</a> <a style="color: #8da0aa;" href="/p/people/people_setting?tx#resume" title="View notifications">填写简历</a></li>
                                    </ul>
                                    <div class="divider"></div>
                                    <ul class="reset-ul mrg5B">
                                        <li><span style="margin-left: 15px; margin-right: 25px;">快速漫游</span>
                                            <a style="color: #8da0aa;" href="/p/jobs/job_main?y#job_resume_send" title="View notifications">已投简历</a> <a style="color: #8da0aa;" href="/p/jobs/job_main?jl#job_resume_received" title="View notifications">已收简历</a> </li>
                                    </ul>
                                    <div class="divider"></div>
                                    <div class="pad5A button-pane button-pane-alt text-center">
                                        <a href="/logout" class="btn btn-block font-normal btn-danger"> <i class="fa fa-power-off"></i> 退出登录
                                        </a>
                                    </div>
                                </div>
                            </div></li>
                    </ul>
                    <!-- 登录后的界面end,在此ul中-->
                </c:if>

            </div>
        </div>
    </div>
</div>
<script type="text/x-jsrender" id="temp-search-div">
        <div class="btn btn-neeed cb" data-s-v="{{>code}}">{{>value}}</div>



</script>
<input id='sessionUID' value='5DC8A2613A6F475359AC8C6BA67DEA6F' type="hidden"/>
