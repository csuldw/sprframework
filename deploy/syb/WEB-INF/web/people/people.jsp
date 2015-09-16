<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 15/9/14
  Time: 上午8:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta name="keywords" content="wahaha,创业人才,ios招聘,安卓招聘,java招聘,php招聘,互联网招聘">
    <link href="/res/css/font-awesome/css/font-awesome.min.css" rel="stylesheet">
    <link href="/res/css/style_1.css?891b7fjkhdjld4fsfjldcvdsd2174ae34c21321" rel="stylesheet">
    <link href="/res/css/style_2.css?891b7fjkhdjld4fsfjldcvdsd2174ae34c21321" rel="stylesheet">
    <meta name="fragment" content="!"/>

    <script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
    <script type="text/javascript" src="/res/js/src/lib/require.js"></script>
    <script type="text/javascript" src="/res/js/src/main.js?891b7fjkhdjld4fsfjldcvdsd2174ae34c21321"></script>
    <script type="text/javascript" src="/res/js/bin/starter.js?891b7fjkhdjld4fsfjldcvdsd2174ae34c21321"></script>
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
        var ISLOGIN = 'true';
        var ISACTIVE = 'true';
        var ISPERFECT = 'true';
        var ISCOMPANY = 'true'
        var appId = 'people/people_get';
    </script>
    <meta name="description" content="创业帮助|hiStarter">
    <title>wahaha的个人主页 - hiStarter | 靠谱的创业团队都在这儿
    </title>
    <style type="text/css"></style>
</head>
<ul id="notyfy_container_top" class="notyfy_container navbar-fixed-top i-am-new"></ul>
<div class="navbar navbar-default navbar-fixed-top" role="navigation" id="top-nav" ng-controller="headerCtrl">
    <div class="progress top-progress" style="display: none">
        <div class="progress-bar progress-bar-success" id="top-progress-div" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>
    </div>
    <div class="container relative_pos">
        <div class="container header_to_re">
            <div id="wrap" style="display: none">
                <label id='sideMenuControl' for='sideToggle'>=</label>
            </div>
            <div class="navbar-header ">
                <button class="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
                    <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span>
                </button>
                <img class="hide" src="http://img.histarter.com/index/new_logo.png_fixhw300"/>
                <a class="navbar-brand navbar-brand-jobmain" href="/">
                    <img style="width: auto; height: 60px;" src="http://img.histarter.com/index/new_logo.png"/></a>
                <img style="display: none; width: 24px; height: 24px; margin-top: -2px; margin-bottom: 2px;" class="img-circle" src="http://img.histarter.com/upload/2015-09-12/06/36/34/9c746041e6ea47f795f3b253b85f373b/1442010994230/n2b2xv_fixhw28"/>
            </div>
            <div class="navbar-to-hide navbar-to-hider">
                <ul class="nav navbar-nav navbar-title">
                    <li style="display: none;"><a href="/page/company/list/1">团队列表</a>
                        <a href="/page/people/list">团队列表</a> <a href="/page/jobs/list">职位列表</a></li>
                    <li class="now"><a href="/" title="首页">首页</a></li>
                    <li><a href="/p/company/company_main" title="团队">团队</a></li>
                    <li><a href="/p/people/people_main" class="btn-action" title="人才">人才</a></li>
                    <li><a href="/p/jobs/job_main" title="职位">职位</a></li>
                    <li><a class="text-primary" href="/forum/list">社区</a> <span class="community_new" style="position: absolute; top: 10px; right: 0px;"><img src="http://img.histarter.com/index/NEW.png"> </span></li>
                    <li class="dropdown mrg25R"><a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">更多 <span class="caret"></span>
                    </a>
                        <ul class="dropdown-menu" role="menu">
                            <li><a href="/event/list" title="活动">活动</a></li>
                        </ul></li>
                    <li class="input-icon search-icon no_border"><i class="fa fa-search"></i> <input class="form-control form-searchkey" name="searchkey" data-toggle="dropdown" aria-expanded="false" popover-postion="left" maxlength="20" type="text" data-type="1" placeholder="搜索职位">
                        <ul class="dropdown-menu" role="menu" style="border: none;">
                            <li data-v="1" style="display: none;"><a class="btn ">切换职位搜索</a></li>
                            <li data-v="2"><a class="btn ">切换公司搜索</a></li>
                            <li data-v="3"><a class="btn ">切换人才搜索</a></li>
                        </ul></li>
                </ul>
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
                    <li class="dropdown "><a href="javascript:void(0);" class="dropdown-toggle " style="padding-bottom: 21px;" aria-expanded="true" data-toggle="dropdown"> <img style="width: 24px; height: 24px; margin-top: -2px; margin-bottom: 2px;" class="img-circle" src="http://img.histarter.com/upload/2015-09-12/06/36/34/9c746041e6ea47f795f3b253b85f373b/1442010994230/n2b2xv_fixhw28"/> wahaha
<span id="header-email" style="display: none"><span class="__cf_email__" data-cfemail="d0a7b1b8b1b8b1e2e0e9e990a9b5b1b8febeb5a4">[email&#160;protected]</span><script cf-hash='f9e31' type="text/javascript">
    /* <![CDATA[ */!function(){try{var t="currentScript"in document?document.currentScript:function(){for(var t=document.getElementsByTagName("script"),e=t.length;e--;)if(t[e].getAttribute("cf-hash"))return t[e]}();if(t&&t.previousSibling){var e,r,n,i,c=t.previousSibling,a=c.getAttribute("data-cfemail");if(a){for(e="",r=parseInt(a.substr(0,2),16),n=2;a.length-n;n+=2)i=parseInt(a.substr(n,2),16)^r,e+=String.fromCharCode(i);e=document.createTextNode(e),c.parentNode.replaceChild(e,c)}}}catch(u){}}();/* ]]> */</script></span>
                        <b class="caret"></b></a>
                        <div class="dropdown-menu box-sm float-right">
                            <div class="box-sm">
                                <div class="login-box clearfix">
                                    <div class="user-img">
                                        <a href="/p/people/people_setting?#general" title="" class="change-img">修改头像</a> <img src="http://img.histarter.com/upload/2015-09-12/06/36/34/9c746041e6ea47f795f3b253b85f373b/1442010994230/n2b2xv_fixhw80" alt="">
                                    </div>
                                    <div class="user-info">
<span> <span id="nav-username">wahaha</span>
<i>后端工程师&nbsp;</i>
</span> <a href="/people/7555" class="" title="Edit profile">个人主页</a>
                                    </div>
                                </div>
                                <div class="divider"></div>
                                <ul class="reset-ul mrg5B">
                                    <li><span style="margin-left: 15px; margin-right: 25px;">我的团队</span>
                                        <a class="text-success " href="/cy"> 全名创业
                                            <i class="fa float-right fa-caret-right"></i>
                                        </a><a style="color: #8da0aa;" class="pad5L" href="/p/jobs/job_main#job_my" title="View notifications">已发职位</a></li>
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
            </div>
        </div>
    </div>
</div>
<script type="text/x-jsrender" id="temp-search-div">
<div class="btn btn-neeed cb" data-s-v="{{>code}}">{{>value}}</div>
</script>
<input id='sessionUID' value='DC5ED8E5A65B8B620A7EDEEF7F346CCE' type="hidden"/>
<div ng-controller="people_get" ng-init="isCreator = true">
    <section class="panel">
        <div class="panel-heading  ush bg-gradient-5">
            <div class="container">
                <div class="controls">
                    <div class="edit_controls_container">
                        <div class=" dsss17 startups-show-sections fes1 edit_controls _a _jm">
                            <a class="btn btns1 btn-success  btn-edit-info" ng-init="peopleInfo.isShow=false" href="javascript:void(0)" style="display: inline-block;" ng-click="openEditInfo(peopleInfo)"> <i class="fa fa-edit"></i> 编辑
                            </a>
                        </div>
                    </div>
                </div>
                <div class="edit_div">
                    <input type="hidden" id="#pId" ng-init="userId = 7555" value="7555"/>
                    <div class="preview">
                        <div class="pull-left avatar-div ">
                            <a href="javascript:void(0)" title="" class="change-img btn-edit-info" ng-click="openEditInfo(peopleInfo)">修改头像</a>
                              <img src="http://img.histarter.com/upload/2015-09-12/06/36/34/9c746041e6ea47f795f3b253b85f373b/1442010994230/n2b2xv_fixhw100" alt=""/>
                        </div>
                        <div class="detail_head_info">
                            <a href="#">
                                <h1>
                                    <span class="hspan1">wahaha</span><span class="hspan2">「&nbsp;后端工程师
」
&nbsp;
<i class="fa fa-cloud text-success " style="font-size: 20px" data-toggle="tooltip" title="用户在线"></i>
</span> <span></span>
                                </h1>
                            </a>
                            <p>
                                创业帮助
                            </p>
                        </div>
                    </div>
                </div>
                <div class="actions">
                    <div class="tabs">
                        <span><a href="#/overview" class="tab" ng-class="{'active':selectedRouteName=='/overview'}">个人信息</a></span><span><a href="#/follow" class="tab fundraising" ng-class="{'active':selectedRouteName=='/follow'}">粉丝<span class="followCount" ng-if="fansCount>0">(<span ng-bind="fansCount"></span>)</span></a></span><span><a href="#/comment" class="tab intros " ng-class="{'active':selectedRouteName=='/comment'}">评论<span class="commentCount" ng-if="commentCount>0">(<span ng-bind="commentCount"></span>)</span></a></span><span><a href="#/resume" class="tab intros " ng-class="{'active':selectedRouteName=='/resume'}">简历</a></span><span><a href="#/visitor" class="tab intros" ng-class="{'active':selectedRouteName=='/visitor'}">谁看过他</a></span>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </section>
    <div class="container">
        <div class="row">
            <div class="col-xs-8">
                <div class="" id="content-liquid-full">
                    <div class="tab-content">
                        <div ng-cloak ng-include="selectedRoute.templateurl"></div>
                    </div>
                </div>
            </div>
            <div class="col-xs-4">
                <div class="title-info">
                    微信扫一扫<span>SCAN ME</span>
                </div>
                <div class="box-title" ng-init="edit.word = false">
                    <div class="box-title-bar">
                    </div>
                    <div class="box-title-content">
                        <div class="text-center mrg10B" style="height: 167px;">
                            <img src="http://img.histarter.com/upload/2015-09-12/06/36/34/9c746041e6ea47f795f3b253b85f373b/1442010994230/n2b2xv_fixhw40" style="  position: absolute;border: 2px solid #fff;left: 45%;height: 40px;width: 40px;top: 122px;"/>
                            <div id="peopleQrCode"></div>
                        </div>
                    </div>
                </div>
                <div class="title-info">
                    关键信息<span>HIGHLIGHT</span>
                </div>
                <div class="box-title">
                    <div class="box-title-bar">
                        基本资料
                        <button class="btn btn-xs btn-gray pull-right btn-edit-high-info" ng-click="openEditHighInfo()">编辑
                        </button>
                    </div>
                    <div class="box-title-content">
                        <div class="box-title-list">
                            <div class="box-title-list-line">
                                <span class="title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;性别</span><span class="desk">男</span>
                            </div>
                            <div class="box-title-list-line">
                                <span class="title">漫游目的</span><span class="desk">招募前期员工（招聘）</span>
                            </div>
                            <div class="box-title-list-line"><span class="title">身份角色</span><span class="desk">后端工程师</span>
                            </div>
                            <div class="box-title-list-line">
                                <span class="title">创业经验</span><span class="desk">
未填写</span>
                            </div>
                            <div class="box-title-list-line">
                                <span class="title">出生日期</span><span class="desk">未填写</span>
                            </div>
                            <div class="box-title-list-line">
                                <span class="title">所在城市</span><span class="desk">上海市-上海市
</span>
                            </div>
                            <div class="box-title-list-line">
                                <span class="title">工作年限</span><span class="desk">1年
</span>
                            </div>
                            <div class="box-title-list-line">
                                <span class="title">我的标签</span><span class="desk">
<span class="label label-default">创业帮助</span>
</span>
                            </div>
                        </div>
                    </div>
                    <div class="box-title-bar">我期望的团队特质</div>
                    <div class="box-title-content">
                        <div class="preview">
                            未填写
                        </div>
                    </div>
                </div>
                <div class="box-title">
                    <div class="box-title-bar">粉丝列表</div>
                    <div class="box-title-content">
                        <div class="f-u-list">
                            <div ng-repeat="user in fansList">
                                <div data-animation="am-flip-x" data-trigger="manual" data-placement="bottom" hoverable-popover data-content-template="tpl/user.hover.tpl.html">
                                    <a href="/people/{{user.userId}}" target="_blank">
                                        <img ng-src="{{user.avatar}}_fixhw28" class="img-circle"/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="pre-footer mrg15T">
    <div class="container text-center">
        <div class="row">

            <div class="col-xs-3 col-xs-6">
                <div class="pre-footer-title">星球介绍</div>
                <div class="pre-footer-item mrg10T">
                    <a href="/about#about_us">关于我们
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="/about#about_service"> 服务模式
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="/about#about_partner">合作伙伴
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="/about#about_contact">联系我们
                    </a>
                </div>
            </div>
            <div class="col-xs-3 col-xs-6">
                <div class="pre-footer-title">创业招聘</div>
                <div class="pre-footer-item mrg10T">
                    <a href="/p/company/company_main">团队列表
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="/p/jobs/job_main">职位列表
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="/p/people/people_main">人才列表
                    </a>
                    <div class="pre-footer-item mrg10T">
                        <a href="/30day">直招报名
                        </a>
                    </div>
                </div>
            </div>
            <div class="col-xs-3 col-xs-6">
                <div class="pre-footer-title">媒体报道</div>
                <div class="pre-footer-item mrg10T">
                    <a href="http://www.36kr.com/p/218208.html" target="_blank">36氪
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="http://www.pingwest.com/histarter-demo" target="_blank">PingWest
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="http://cn.technode.com/post/2014-12-22/histarter" target="_blank">动点科技
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="http://tech2ipo.com/93789" target="_blank">Tech2IPO
                    </a>
                </div>
                <div class="pre-footer-item mrg10T">
                    <a href="http://tech.ifeng.com/a/20150120/40950840_0.shtml" target="_blank">凤凰科技
                    </a>
                </div>
            </div>
            <div class="col-xs-3 col-xs-6">
                <div class="pre-footer-title">移动端下载</div>
                <div class="pre-footer-item mrg10T">
                    <a href="javascript:void(0);">
                        <img src="http://img.histarter.com/img/appstore.png" id="hiStarteriOSDownload" alt="hiStarter移动端下载"/>
                    </a>
                </div>
            </div>
        </div>
        <hr>
        <div class="row pad15B">
            <div class="col-xs-7" style="margin-left:7%;text-align: left;">
                © 2014-2015 HISTARTER.COM・沪ICP备13032488号 上海奇麦网络科技有限公司
            </div>
            <div class="col-xs-4 text-right">
                <a class="pre-footer-social" data-animation="am-flip-x" data-trigger="click" data-placement="top" bs-popover data-html="true" data-content="<img src='http://img.histarter.com/img/histarter_qrcode.jpg' width='150' height='150'/>" href=" javascript:void(0);"><i class="fa fa-wechat"></i></a>
                <a class="pre-footer-social" href="http://www.weibo.com/histarter" target="_blank"><i class="fa fa-weibo"></i></a>
                <a class="pre-footer-social" data-animation="am-flip-x" href="javascript:void(0);" data-trigger="click" data-placement="top" bs-popover data-html="true" data-content="官方QQ吐槽群:219507775"><i class="fa fa-qq"></i></a>
                <a class="pre-footer-social" href="/cdn-cgi/l/email-protection#c3b4acb483abaab0b7a2b1b7a6b1eda0acae"><i class="fa fa-envelope"></i></a>
            </div>
        </div>
    </div>
</div>
<script id="tmpl-dict" type="text/x-jsrender">
	<option value='{{>code}}' {{>selected}}>{{>value}}</option>
</script>
<script id="tmpl-dict-r" type="text/x-jsrender">
	<label class="radio-inline"> <input type="radio" name=""  value="{{>code}}">{{>value}}</label>
</script>
<script id="select-tmpl" type="text/x-jsrender">
    <option value='{{>value}}' {{>selected}}>{{>text}}</option>
</script>
<script type="text/javascript">

    function a(a, b) {
        var c = 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 15px;'
                + (a ? "font-weight: bold;" : "") + "color: " + b + ";";
        return c;
    }
    console.log("%c♥ 想加入我们吗 ? %c急招JAVA工程师,发送您的简历至%c--> wow@histarter.com", a(!0,
            "#d22"), a(!0, "#777"), a(!0, "#2b2")), window.joinUs = function() {
        return console.log("%cWe're excited to have you! %c☃", a(!1, "#d22"),
                a(!1, "#333")), window.location.href = "/_/_/about/careers/",
                "";
    };
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?1f61149eae43428c63d2907772a1e515";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
<script type="text/javascript">
    /* <![CDATA[ */
    (function(){try{var s,a,i,j,r,c,l=document.getElementsByTagName("a"),t=document.createElement("textarea");for(i=0;l.length-i;i++){try{a=l[i].getAttribute("href");if(a&&a.indexOf("/cdn-cgi/l/email-protection") > -1  && (a.length > 28)){s='';j=27+ 1 + a.indexOf("/cdn-cgi/l/email-protection");if (a.length > j) {r=parseInt(a.substr(j,2),16);for(j+=2;a.length>j&&a.substr(j,1)!='X';j+=2){c=parseInt(a.substr(j,2),16)^r;s+=String.fromCharCode(c);}j+=1;s+=a.substr(j,a.length-j);}t.innerHTML=s.replace(/</g,"&lt;").replace(/>/g,"&gt;");l[i].setAttribute("href","mailto:"+t.value);}}catch(e){}}}catch(e){}})();
    /* ]]> */
</script>
</body>
</html>