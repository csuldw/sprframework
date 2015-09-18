<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!-- 首页用到的box-->

<body style="background-color: #fff;" class="index_body wl"><!-- style="background-color: #fff;" class="index_body wl" -->
<%@ include file="header.jsp" %>



<div id="carousel-example-generic" class="carousel slide banner" data-ride="carousel" style=" margin-top:
        -40px;">
    <div class="carousel-inner list-box" role="listbox">
        <div class="item active">
            <div class="item-default">
                <img src="http://img.histarter.com/index/index-bg-title-1.png" class="item-default-title-img"
                     alt="即刻开启创业之旅"/>

                <div class="item-default-title-btngroup">
                    <button class="btn btn-hollow item-default-title-btn1 openLogModal" ng-click="openLogin()">快速注册
                    </button>
                    <a href="/30day" class="btn btn-white item-default-title-btn2">报名直招</a>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="item-30day">
                <div class="container">
                    <img src="http://img.histarter.com/zz/round.png" class="item-30day-title-img"/>

                    <div></div>
                    <div class="item-30day-title">三十天直招计划</div>
                    <div class="item-30day-title-intro">创业的快感，可能超乎你的想象</div>
                    <div><a type="button" href="/30day" class="btn btn-success item-30day-title-btn">了解更多</a></div>
                    <a href="/30day">
                        <img class="item-30day-appleWatch"
                             src="http://img.histarter.com/index/index-thirtyday-watch.png"
                             class=alt="入职成功即送苹果表(AppleWatch)"/>
                    </a>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="item-ceo">
                <div class="container">
                    <img src="http://img.histarter.com/upload/2015-05-07/ceo-bg-title.png" alt="ceo养成计划图片"
                         class="item-ceo-title-img">

                    <div class="item-ceo-title">握手创业公司CEO · 成为总裁不是梦</div>
                    <a type="button" href="/ceo" class="btn btn-primary item-ceo-title-btn">了解更多</a>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="item-flyme">
                <div class="container">
                    <div class="item-flyme-bg text-center">
                        <img class="item-flyme-title-img" src="http://img.histarter.com/img/flyme/body-1-title.png"
                             alt="">

                        <div class="item-flyme-title">hiStarter助推Flyme梦想基金计划</div>
                        <a href="/flyme" class="btn btn-hollow item-flyme-title-button">了解详情</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="item">
            <a href="http://www.cisexpo.com.cn/" target="_blank">
                <div class="item-ruanbo"
                     style="height: 540px;
        background-image:
        url('http://img.histarter.com//upload/2015-08-19/ruanbo_banner_bg-2.jpg');
        background-size: 100% 100%;margin-top: 0px;text-align: center;">
                    <div class="container">

                    </div>
                </div>
            </a>
        </div>
    </div>
    <!--箭头控制轮播 -->
    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
    </a>
    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
    </a>
</div>
<div class="container wl-content">
<div class="wl-event">
    <div class="wl-menu">
        <div class="wl-menu-title">推荐活动</div>
        <div class="wl-menu-btn">
        </div>
    </div>
    <div class="wl-event-list">

        <div class="col-md-4">
            <a href="http://www.histarter.com/forum/topic/get/470" target="_blank">
                <img src="http://img.histarter.com/upload/2015-08-19/shangxian_m.jpg" alt=""/>
            </a>
        </div>

        <div class="col-md-4">
            <a href="http://www.histarter.com/forum/topic/get/459" target="_blank">
                <img src="http://img.histarter.com/upload/2015-08-14/19/yidonghulianwang-2.jpg" alt=""/>
            </a>
        </div>
        <div class="col-md-4">
            <a href="http://www.histarter.com/forum/topic/get/132" target="_blank">
                <img src="http://img.histarter.com/index/bici_anli_big.png_fixhwindex" alt=""/>
            </a>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<div class="wl-job">
<div class="wl-menu">
    <div class="wl-menu-title">推荐职位</div>
    <div class="wl-menu-btn">
        <a type="button" class="btn btn-default btn-sm" href="/p/jobs/job_main">更多</a>
    </div>
</div>
<div class="wl-job-list rows">
    <div class="col-md-4">
        <div class="wl-job-item">
            <img src="http://img.histarter.com/index/job/enjoy.png" alt="">

            <div class="wl-job-item-details">
                <a href="http://www.histarter.com/jobs/1389" target="_blank">
                    <div class="wl-job-item-details-money">5K - 9K</div>
                    <div class="wl-job-item-details-job omit">新媒体运营</div>
                </a>
                <a href="http://www.histarter.com/ricebook" target="_blank">
                    <img class="wl-job-item-detail-logo"
                         src="http://img.histarter.com/upload/2015-05-22/test_logo.png" alt="">
                </a>
            </div>
            <div class="wl-job-item-company clearfix">
                <div class="rows">
                    <div class="col-md-5">
                        <a class="wl-job-item-company-name omit" href="http://www.histarter.com/ricebook"
                           target="_blank">
                            ENJOY
                        </a>

                        <div class="clearfix">
                        </div>
                        <img class="wl-job-item-company-avatar pull-left"
                             src="http://img.histarter.com/upload/2015-05-13/15/12/48/1bd12457e1424f1cb15d2ab0f84093a3/1431501168909/hr1jga_fixhw100"
                             alt="">
                        <a class="wl-job-item-company-user omit" href="http://www.histarter.com/people/4393"
                           target="_blank">
                            饭本
                        </a>
                    </div>
                    <div class="col-md-7 text-right">
                        <div class="wl-job-item-company-brief omit">
                            「 精选限量美食 」
                        </div>
                        <div class="wl-job-item-company-intro omit">
                            <i class="fa fa fa-map-marker"></i>&nbsp;北京市
                            <i class="fa fa-user mrg10L"></i>&nbsp;51 - 100人
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="wl-job-item">
            <img src="http://img.histarter.com/index/job/meiweishenghuo.png" alt="">

            <div class="wl-job-item-details">
                <a href="http://www.histarter.com/jobs/1402" target="_blank">
                    <div class="wl-job-item-details-money">8K - 16K</div>
                    <div class="wl-job-item-details-job omit">Android工程师</div>
                </a>
                <a href="http://www.histarter.com/meiwei" target="_blank">
                    <img class="wl-job-item-detail-logo"
                         src="http://img.histarter.com/upload/2015-05-15/17/34/20/90f5a4aadbf44a14887da249a9d382ee/1431682460922/cagssp_fixhw40"
                         alt="">
                </a>
            </div>
            <div class="wl-job-item-company clearfix">
                <div class="rows">
                    <div class="col-md-5">
                        <a class="wl-job-item-company-name omit" href="http://www.histarter.com/meiwei"
                           target="_blank">
                            美位生活
                        </a>

                        <div class="clearfix">
                        </div>
                        <img class="wl-job-item-company-avatar pull-left"
                             src="http://img.histarter.com/upload/2015-05-15/17/28/12/064a5d6bc19e4295a80d22c72b06f733/1431682092368/01apl4_fixhw40"
                             alt="">
                        <a class="wl-job-item-company-user omit" href="http://www.histarter.com/people/4480"
                           target="_blank">
                            yosin
                        </a>
                    </div>
                    <div class="col-md-7 text-right">
                        <div class="wl-job-item-company-brief omit">
                            「 您的私人生活管家 」
                        </div>
                        <div class="wl-job-item-company-intro omit">
                            <i class="fa fa fa-map-marker"></i>&nbsp;上海市
                            <i class="fa fa-user mrg10L"></i>&nbsp;15-50人
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="wl-job-item">
            <img src="http://img.histarter.com/index/job/ilegendsoft.png" alt="">

            <div class="wl-job-item-details">
                <a href="http://www.histarter.com/jobs/1367" target="_blank">
                    <div class="wl-job-item-details-money">10K - 15K</div>
                    <div class="wl-job-item-details-job omit">Android工程师</div>
                </a>
                <a href="http://www.histarter.com/ilegendsoft" target="_blank">
                    <img class="wl-job-item-detail-logo"
                         src="http://img.histarter.com/upload/2015-02-11/11/54/22/34f6f05f9e8c44f3865819ea7c4e4681/1423626862120/fa2grp_fixhw100"
                         alt="">
                </a>
            </div>
            <div class="wl-job-item-company clearfix">
                <div class="rows">
                    <div class="col-md-5">
                        <a class="wl-job-item-company-name omit" href="http://www.histarter.com/ilegendsoft"
                           target="_blank">
                            ilegendsoft
                        </a>

                        <div class="clearfix">
                        </div>
                        <img class="wl-job-item-company-avatar pull-left"
                             src="http://img.histarter.com/upload/2015-02-11/11/47/41/3100e2bdd2d94e5ebeab53f91d91ba2a/1423626461607/0cytro_fixhw80"
                             alt="">
                        <a class="wl-job-item-company-user omit" href="http://www.histarter.com/people/2081"
                           target="_blank">
                            ilegendsoft
                        </a>
                    </div>
                    <div class="col-md-7 text-right">
                        <div class="wl-job-item-company-brief omit">
                            「 信奉精英团队标准，成为顶级的互联网公司 」
                        </div>
                        <div class="wl-job-item-company-intro omit">
                            <i class="fa fa fa-map-marker"></i>&nbsp;上海市
                            <i class="fa fa-user mrg10L"></i>&nbsp;51 - 100人
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</div>
<div class="wl-job-list rows">
    <div class="col-md-4">
        <div class="wl-job-item">
            <img src="http://img.histarter.com/index/job/nice.png" alt="">

            <div class="wl-job-item-details">
                <a href="http://www.histarter.com/jobs/1014" target="_blank">
                    <div class="wl-job-item-details-money">18K - 28K</div>
                    <div class="wl-job-item-details-job omit">iOS研发工程师</div>
                </a>
                <a href="http://www.histarter.com/nice" target="_blank">
                    <img class="wl-job-item-detail-logo"
                         src="http://img.histarter.com/upload/2015-04-16/11/44/37/cf0b0eb3c6b74c358a0b3caf2ada11c3/1429155877581/ndiy2a_fixhw80"
                         alt="">
                </a>
            </div>
            <div class="wl-job-item-company clearfix">
                <div class="rows">
                    <div class="col-md-5">
                        <a class="wl-job-item-company-name omit" href="http://www.histarter.com/nice"
                           target="_blank">
                            nice
                        </a>

                        <div class="clearfix">
                        </div>
                        <img class="wl-job-item-company-avatar pull-left"
                             src="http://img.histarter.com/upload/2015-04-16/11/40/58/81f325bd087f446a90344ddd240ffd76/1429155658465/bzopz2_fixhw40"
                             alt="">
                        <a class="wl-job-item-company-user omit" href="http://www.histarter.com/people/3625"
                           target="_blank">
                            nice
                        </a>
                    </div>
                    <div class="col-md-7 text-right">
                        <div class="wl-job-item-company-brief omit">
                            「 标记生活的美好！ 」
                        </div>
                        <div class="wl-job-item-company-intro omit">
                            <i class="fa fa fa-map-marker"></i>&nbsp;北京市
                            <i class="fa fa-user mrg10L"></i>&nbsp;101 - 150人
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="wl-job-item">
            <img src="http://img.histarter.com/index/job/uber.png" alt="">

            <div class="wl-job-item-details">
                <a href="http://www.histarter.com/jobs/1371" target="_blank">
                    <div class="wl-job-item-details-money">1K - 2K</div>
                    <div class="wl-job-item-details-job omit">社交媒体维护实习生</div>
                </a>
                <a href="http://www.histarter.com/ubersh" target="_blank">
                    <img class="wl-job-item-detail-logo"
                         src="http://img.histarter.com/upload/2015-05-08/11/25/58/33eccb1df8c142eda50a035fc164e622/1431055558517/340lbh_fixhw40"
                         alt="">
                </a>
            </div>
            <div class="wl-job-item-company clearfix">
                <div class="rows">
                    <div class="col-md-5">
                        <a class="wl-job-item-company-name omit" href="http://www.histarter.com/ubersh"
                           target="_blank">
                            Uber
                        </a>

                        <div class="clearfix">
                        </div>
                        <img class="wl-job-item-company-avatar pull-left"
                             src="http://img.histarter.com/upload/2015-05-08/11/02/00/5cc14d9ed03d4b00a56eeb1d4c93b0fa/1431054120661/bme7g4_fixhw40"
                             alt="">
                        <a class="wl-job-item-company-user omit" href="http://www.histarter.com/people/4253"
                           target="_blank">
                            Mill
                        </a>
                    </div>
                    <div class="col-md-7 text-right">
                        <div class="wl-job-item-company-brief omit">
                            「 我们正在改变着世界 」
                        </div>
                        <div class="wl-job-item-company-intro omit">
                            <i class="fa fa fa-map-marker"></i>&nbsp;上海市
                            <i class="fa fa-user mrg10L"></i>&nbsp;101-150人
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="wl-job-item">
            <img src="http://img.histarter.com/index/job/histarter.png" alt="">

            <div class="wl-job-item-details">
                <a href="http://www.histarter.com/jobs/1573" target="_blank">
                    <div class="wl-job-item-details-money">10K - 20K</div>
                    <div class="wl-job-item-details-job omit">Android研发工程师</div>
                </a>
                <a href="http://www.histarter.com/kkh" target="_blank">
                    <img class="wl-job-item-detail-logo"
                         src="http://img.histarter.com/upload/2015-05-27/17/17/21/4827edda31db4c0193cae0862a5656f6/1432718241084/mowrbi_fixhw120"
                         alt="">
                </a>
            </div>
            <div class="wl-job-item-company clearfix">
                <div class="rows">
                    <div class="col-md-5">
                        <a class="wl-job-item-company-name omit" href="http://www.histarter.com/kkh"
                           target="_blank">
                            空空狐
                        </a>

                        <div class="clearfix">
                        </div>
                        <img class="wl-job-item-company-avatar pull-left"
                             src="http://img.histarter.com/upload/2015-05-27/17/12/23/b48b3bb89f9a4a589bc4d4cc690c5894/1432717943547/tbenug_fixhw100"
                             alt="">
                        <a class="wl-job-item-company-user omit" href="http://www.histarter.com/people/4843"
                           target="_blank">
                            维维Summer
                        </a>
                    </div>
                    <div class="col-md-7 text-right">
                        <div class="wl-job-item-company-brief omit">
                            「 史上甩货最快的女生闲置交易平台 」
                        </div>
                        <div class="wl-job-item-company-intro omit">
                            <i class="fa fa fa-map-marker"></i>&nbsp;北京市
                            <i class="fa fa-user mrg10L"></i>&nbsp;15人以下
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

</div>
</div>
<div class="clearfix"></div>
<div class="wl-company">
<div class="wl-menu">
    <div class="wl-menu-title">推荐团队</div>
    <div class="wl-menu-btn">
        <a href="/p/company/company_main" class="btn btn-default btn-sm">更多</a>
    </div>
</div>
<div class="wl-company-list">
<div class="rows">
    <div class="col-md-3">
        <div class="wl-company-item">
            <div class="wl-company-item-logo">
                <a href="/wedfairy" target="_blank">
                    <img src="http://img.histarter.com/index/bayinhe.png" alt="八音盒">
                </a>
            </div>
            <div class="wl-company-item-name">
                <a href="/wedfairy" target="_blank">
                    八音盒
                </a>
            </div>
            <div class="wl-company-item-user">
                <a href="http://www.histarter.com/people/40" target="_blank">
                    <img class="wl-company-item-user-avatar pull-left"
                         src="http://img.histarter.com/index/bayinhe.png" alt="八音盒"/>

                    <div class="wl-company-item-user-name">
                        ButuIIS
                    </div>
                </a>
            </div>
            <div class="wl-company-item-intro">
                我们创造一种爱的语言，让你与这个世界聊天
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="wl-company-item">
            <div class="wl-company-item-logo">
                <a href="http://www.histarter.com/honeyshare" target="_blank">
                    <img src="http://img.histarter.com/index/fengmibiji.png" alt="蜂蜜笔记">
                </a>
            </div>
            <div class="wl-company-item-name">
                <a href="http://www.histarter.com/honeyshare" target="_blank">
                    蜂蜜笔记
                </a>
            </div>
            <div class="wl-company-item-user">
                <a href="http://www.histarter.com/people/2888" target="_blank">
                    <img class="wl-company-item-user-avatar pull-left"
                         src="http://img.histarter.com/index/fengmibiji.png" alt="蜂蜜笔记"/>

                    <div class="wl-company-item-user-name">
                        蜂蜜笔记
                    </div>
                </a>
            </div>
            <div class="wl-company-item-intro">
                献给不甘肤浅的小伙伴儿
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="wl-company-item">
            <div class="wl-company-item-logo">
                <a href="http://www.histarter.com/kkh" target="_blank">
                    <img src="http://img.histarter.com/index/kkk.png" alt="">
                </a>
            </div>
            <div class="wl-company-item-name">
                <a href="http://www.histarter.com/kkh" target="_blank">
                    空空狐
                </a>
            </div>
            <div class="wl-company-item-user">
                <a href="http://www.histarter.com/people/4843" target="_blank">
                    <img class="wl-company-item-user-avatar pull-left"
                         src="http://img.histarter.com/upload/2015-05-27/17/12/23/b48b3bb89f9a4a589bc4d4cc690c5894/1432717943547/tbenug_fixhw100"
                         alt=""/>

                    <div class="wl-company-item-user-name">
                        维维Summer
                    </div>
                </a>
            </div>
            <div class="wl-company-item-intro">
                史上甩货最快的女生闲置交易平台
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="wl-company-item">
            <div class="wl-company-item-logo">
                <a href="http://www.histarter.com/7huoxing" target="_blank">
                    <img src="http://img.histarter.com/index/quhuoxing.png" alt="趣火星">
                </a>
            </div>
            <div class="wl-company-item-name">
                <a href="http://www.histarter.com/7huoxing" target="_blank">
                    趣火星
                </a>
            </div>
            <div class="wl-company-item-user">
                <a href="http://www.histarter.com/people/1195" target="_blank">
                    <img class="wl-company-item-user-avatar pull-left"
                         src="http://img.histarter.com/upload/2015-04-16/09/52/12/d1b39cd7a89542a0968b22f2870ed4fa/1429149132774/vpigcv_fixhw100"
                         alt="趣火星"/>

                    <div class="wl-company-item-user-name">
                        加饭
                    </div>
                </a>
            </div>
            <div class="wl-company-item-intro">
                科技青年の社区
            </div>
        </div>
    </div>

</div>
<div class="rows">
    <div class="col-md-3">
        <div class="wl-company-item">
            <div class="wl-company-item-logo">
                <a href="http://www.histarter.com/shiguang" target="_blank">
                    <img src="http://img.histarter.com/index/shiguangxiaoyuan.png" alt="时光校园">
                </a>
            </div>
            <div class="wl-company-item-name">
                <a href="http://www.histarter.com/shiguang" target="_blank">
                    时光校园
                </a>
            </div>
            <div class="wl-company-item-user">
                <a href="http://www.histarter.com/people/788" target="_blank">
                    <img class="wl-company-item-user-avatar pull-left"
                         src="http://img.histarter.com/upload/2015-01-02/16/04/23/7e3b75951659477fb8326b098a86c2c4/1420185863428/gzldl6_fixhw100"
                         alt="时光校园"/>

                    <div class="wl-company-item-user-name">
                        时光校园
                    </div>
                </a>
            </div>
            <div class="wl-company-item-intro">
                做未来最COOL的校园生活平台！
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="wl-company-item">
            <div class="wl-company-item-logo">
                <a href="http://www.histarter.com/jike" target="_blank">
                    <img src="http://img.histarter.com/index/jike.png" alt="足迹">
                </a>
            </div>
            <div class="wl-company-item-name">
                <a href="http://www.histarter.com/jike" target="_blank">
                    即刻
                </a>
            </div>
            <div class="wl-company-item-user">
                <a href="http://www.histarter.com/people/4709" target="_blank">
                    <img class="wl-company-item-user-avatar pull-left"
                         src="http://img.histarter.com/upload/2015-05-22/18/10/34/03a721d216b84701a8ed2cc4b975061c/1432289434058/57ewxw_fixhw100"
                         alt="即刻"/>

                    <div class="wl-company-item-user-name">
                        即刻
                    </div>
                </a>
            </div>
            <div class="wl-company-item-intro">
                你关心的, 即刻告诉你
            </div>
        </div>
    </div>

    <div class="col-md-3">
        <div class="wl-company-item">
            <div class="wl-company-item-logo">
                <a href="http://www.histarter.com/xigualicai" target="_blank">
                    <img src="http://img.histarter.com/index/xigualicai.png" alt="西瓜理财">
                </a>
            </div>
            <div class="wl-company-item-name">
                <a href="http://www.histarter.com/xigualicai" target="_blank">
                    西瓜理财
                </a>
            </div>
            <div class="wl-company-item-user">
                <a href="http://www.histarter.com/people/660" target="_blank">
                    <img class="wl-company-item-user-avatar pull-left"
                         src="http://img.histarter.com/upload/2015-01-27/22/41/42/491677e4120845e89398fa90957aeca6/1422369702454/8c5euv_fixhw100"
                         alt="西瓜理财"/>

                    <div class="wl-company-item-user-name">
                        Liu
                    </div>
                </a>
            </div>
            <div class="wl-company-item-intro">
                为用户提供最佳体验的互联网理财服务
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="wl-company-item">
            <div class="wl-company-item-logo">
                <a href="http://www.histarter.com/fotoplace" target="_blank">
                    <img src="http://img.histarter.com/index/zuji.png" alt="足迹">
                </a>
            </div>
            <div class="wl-company-item-name">
                <a href="http://www.histarter.com/fotoplace" target="_blank">
                    足迹
                </a>
            </div>
            <div class="wl-company-item-user">
                <a href="http://www.histarter.com/people/2418" target="_blank">
                    <img class="wl-company-item-user-avatar pull-left"
                         src="http://img.histarter.com/upload/2015-03-01/02/16/51/7c067dba7ec5480bae833c9b04774f11/1425147411187/3yk27n_fixhw100"
                         alt="足迹"/>

                    <div class="wl-company-item-user-name">
                        Mariana
                    </div>
                </a>
            </div>
            <div class="wl-company-item-intro">
                拍大片、游场景，像电影一样去生活
            </div>
        </div>
    </div>

</div>
</div>
</div>
<div class="clearfix"></div>
<div class="wl-people">
    <div class="wl-menu">
        <div class="wl-menu-title">推荐人才</div>
        <div class="wl-menu-btn">
            <a href="/p/people/people_main" class="btn btn-default btn-sm" type="button">更多</a>
        </div>
    </div>
    <div class="wl-people-list">
        <div class="rows">
            <div class="col-md-3">
                <div class="wl-people-item">
                    <a href="http://www.histarter.com/people/4517" target="_blank">
                        <img class="wl-people-item-avatar"
                             src="http://img.histarter.com/index/people/wangnima.png"
                             alt="王尼玛"/>
                    </a>
                    <a href="http://www.histarter.com/people/4517" target="_blank">
                        <div class="wl-people-item-name omit">王尼玛</div>
                    </a>
                    <hr/>
                    <div class="wl-people-item-city">北京市</div>
                    <div class="wl-people-item-job">后端工程师</div>
                    <div class="wl-people-item-intro">服务端开发，PHP</div>
                    <div class="wl-people-item-tags tags">
                        <div class="wl-people-item-tag label label-default">PHP</div>
                        <div class="wl-people-item-tag label label-default">Mysql</div>
                        <div class="wl-people-item-tag label label-default">Linux</div>
                        <div class="wl-people-item-tag label label-default">redis</div>
                        <div class="wl-people-item-tag label label-default">mongodb</div>
                        <div class="wl-people-item-tag label label-default">memcache</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="wl-people-item">
                    <a href="http://www.histarter.com/people/3548" target="_blank">
                        <img class="wl-people-item-avatar"
                             src="http://img.histarter.com/index/people/Mingyi.png"
                             alt="Mingyi"/>
                    </a>
                    <a href="http://www.histarter.com/people/3548" target="_blank">
                        <div class="wl-people-item-name omit">Mingyi</div>
                    </a>
                    <hr/>
                    <div class="wl-people-item-city">上海市</div>
                    <div class="wl-people-item-job">运营</div>
                    <div class="wl-people-item-intro">Have a nice day!</div>
                    <div class="wl-people-item-tags tags">
                        <div class="wl-people-item-tag label label-default">运动</div>
                        <div class="wl-people-item-tag label label-default">好奇心</div>
                        <div class="wl-people-item-tag label label-default">互联网</div>
                        <div class="wl-people-item-tag label label-default">体验</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="wl-people-item">
                    <a href="http://www.histarter.com/people/1423" target="_blank">
                        <img class="wl-people-item-avatar"
                             src="http://img.histarter.com/index/people/kenneth-chin.png"
                             alt="kenneth chin"/>
                    </a>
                    <a href="http://www.histarter.com/people/1423" target="_blank">
                        <div class="wl-people-item-name omit">kenneth chin</div>
                    </a>
                    <hr/>
                    <div class="wl-people-item-city">成都市</div>
                    <div class="wl-people-item-job">设计师</div>
                    <div class="wl-people-item-intro">UI/UX designer.</div>
                    <div class="wl-people-item-tags tags">
                        <div class="wl-people-item-tag label label-default">CSS3</div>
                        <div class="wl-people-item-tag label label-default">用户体验设计</div>
                        <div class="wl-people-item-tag label label-default">AfterEffects</div>
                        <div class="wl-people-item-tag label label-default">Photoshop</div>
                        <div class="wl-people-item-tag label label-default">Illustrator</div>
                        <div class="wl-people-item-tag label label-default">InDesign</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="wl-people-item">
                    <a href="http://www.histarter.com/people/2712" target="_blank">
                        <img class="wl-people-item-avatar"
                             src="http://img.histarter.com/index/people/90zhou.png"
                             alt="90zhou"/>
                    </a>
                    <a href="http://www.histarter.com/people/2712" target="_blank">
                        <div class="wl-people-item-name omit">90zhou</div>
                    </a>
                    <hr/>
                    <div class="wl-people-item-city">上海市</div>
                    <div class="wl-people-item-job">设计师</div>
                    <div class="wl-people-item-intro">应届小鲜肉一枚（2014）</div>
                    <div class="wl-people-item-tags tags">
                        <div class="wl-people-item-tag label label-default">ID</div>
                        <div class="wl-people-item-tag label label-default">UE</div>
                        <div class="wl-people-item-tag label label-default">UI</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rows">
            <div class="col-md-3">
                <div class="wl-people-item">
                    <a href="http://www.histarter.com/people/1977" target="_blank">
                        <img class="wl-people-item-avatar"
                             src="http://img.histarter.com/index/people/funny_miss.png"
                             alt="funny_miss"/>
                    </a>
                    <a href="http://www.histarter.com/people/1977" target="_blank">
                        <div class="wl-people-item-name omit">funny_miss</div>
                    </a>
                    <hr/>
                    <div class="wl-people-item-city">上海市</div>
                    <div class="wl-people-item-job">Android工程师</div>
                    <div class="wl-people-item-intro">Talk is cheap, don't shut up.</div>
                    <div class="wl-people-item-tags tags">
                        <div class="wl-people-item-tag label label-default">Android</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="wl-people-item">
                    <a href="http://www.histarter.com/people/2361" target="_blank">
                        <img class="wl-people-item-avatar"
                             src="http://img.histarter.com/index/people/foocoder.png"
                             alt="Mingyi"/>
                    </a>
                    <a href="http://www.histarter.com/people/2361" target="_blank">
                        <div class="wl-people-item-name omit">foocoder</div>
                    </a>
                    <hr/>
                    <div class="wl-people-item-city">杭州市</div>
                    <div class="wl-people-item-job">Android工程师</div>
                    <div class="wl-people-item-intro">从事云os系统服务的开发，包括数据收集服务，支付服务等。</div>
                    <div class="wl-people-item-tags tags">
                        <div class="wl-people-item-tag label label-default">Android</div>
                        <div class="wl-people-item-tag label label-default">Html5</div>
                        <div class="wl-people-item-tag label label-default">移动互联网</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="wl-people-item">
                    <a href="http://www.histarter.com/people/3185" target="_blank">
                        <img class="wl-people-item-avatar"
                             src="http://img.histarter.com/index/people/douziaiwenwan.png"
                             alt="kenneth chin"/>
                    </a>
                    <a href="http://www.histarter.com/people/3185" target="_blank">
                        <div class="wl-people-item-name omit">豆子爱文玩</div>
                    </a>
                    <hr/>
                    <div class="wl-people-item-city">成都市</div>
                    <div class="wl-people-item-job">iOS工程师</div>
                    <div class="wl-people-item-intro">没有不开张的油盐店</div>
                    <div class="wl-people-item-tags tags">
                        <div class="wl-people-item-tag label label-default">技术达人</div>
                        <div class="wl-people-item-tag label label-default">iOS</div>
                        <div class="wl-people-item-tag label label-default">Android</div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="wl-people-item">
                    <a href="http://www.histarter.com/people/2043" target="_blank">
                        <img class="wl-people-item-avatar"
                             src="http://img.histarter.com/index/people/sushezhainan.png"
                             alt="90zhou"/>
                    </a>
                    <a href="http://www.histarter.com/people/2043" target="_blank">
                        <div class="wl-people-item-name omit">宿舍宅男</div>
                    </a>
                    <hr/>
                    <div class="wl-people-item-city">北京市</div>
                    <div class="wl-people-item-job">iOS工程师</div>
                    <div class="wl-people-item-intro">半个产品半个ios工程师，在自我发展的道路上寻找自己成功的点</div>
                    <div class="wl-people-item-tags tags">
                        <div class="wl-people-item-tag label label-default">iOS技术</div>
                        <div class="wl-people-item-tag label label-default">半个产品</div>
                        <div class="wl-people-item-tag label label-default">移动互联网</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="clearfix"></div>
</div>
<div class="clearfix"></div>
<div class="wl-30day">
    <div class="container text-center">
        <div class="rows">
            <div class="col-md-6">
                <div class="wl-30day-title">三十天直招计划</div>
                <div class="wl-30day-intro">
                    <div>
                        迫不及待的希望加入一个创业团队？
                    </div>
                    <div>我们的直招专员将竭诚为您免费提供一对一服务。</div>
                </div>
                <a type="button" href="/30day" class="btn btn-hollow wl-30day-button">了解更多</a>
            </div>
            <div class="col-md-6">
                <img src="http://img.histarter.com/index/wl_30day_title.png_quality75" alt="三十天直招计划"/>
            </div>
        </div>
    </div>
</div>
<div class="container wl-service">
    <div class="rows">
        <div class="col-md-5 text-center pad0 ">
            <div class="wl-service-title mrg45T">创业团队</div>
            <div class="text-left">
                <ul>
                    <li>已获天使轮或以上融资</li>
                    <li>团队规模不超过50人</li>
                    <li>良好的团队氛围和发展前景</li>
                    <li>提供股权或期权激励计划</li>
                </ul>
            </div>
            <a type="button" href="/p/company/company_main" class="btn btn-white wl-service-company-btn">团队入口</a>
        </div>
        <div class="col-md-2 text-center">
            <img class="wl-service-hr" src="http://img.histarter.com/index/wl_hr.png" alt="HR"/>
        </div>
        <div class="col-md-5 text-center ">
            <div class="wl-service-title mrg45T">优质人才</div>
            <div class="text-left">
                <ul>
                    <li>对加入创业团队有强烈兴趣</li>
                    <li>具有开发、市场、产品运营等实战技能</li>
                    <li>具有团队协作或独立解决问题的能力</li>
                    <li>具有良好的抗压能力</li>
                </ul>
            </div>
            <a href="/30day" target="_blank" class="btn btn-success wl-service-30day-btn">参加直招</a>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="wl-service-intro">*本服务目前仅覆盖上海地区且不收取费用</div>
</div>

<!-- BEGIN PRE-FOOTER -->
<%@ include file="footer.jsp" %>