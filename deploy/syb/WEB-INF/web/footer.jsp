<%--
  Created by IntelliJ IDEA.
  User: apple
  Date: 15/9/16
  Time: 上午12:15
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- BEGIN PRE-FOOTER -->
<div class="pre-footer mrg15T">
    <div class="container text-center">
        <div class="row">
            <!-- BEGIN BOTTOM ABOUT BLOCK -->
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
                        <img src="http://img.histarter.com/img/appstore.png" id="hiStarteriOSDownload"
                             alt="hiStarter移动端下载"/>
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
                <a class="pre-footer-social" data-animation="am-flip-x" data-trigger="click"
                   data-placement="top" bs-popover data-html="true"
                   data-content="<img src='http://img.histarter.com/img/histarter_qrcode.jpg' width='150' height='150'/>"
                   href=" javascript:void(0);"><i class="fa fa-wechat"></i></a>
                <a class="pre-footer-social" href="http://www.weibo.com/histarter" target="_blank"><i
                        class="fa fa-weibo"></i></a>
                <a class="pre-footer-social" data-animation="am-flip-x" href="javascript:void(0);" data-trigger="click"
                   data-placement="top" bs-popover data-html="true"
                   data-content="官方QQ吐槽群:219507775"><i
                        class="fa fa-qq"></i></a>
                <a class="pre-footer-social" href="/cdn-cgi/l/email-protection#64130b13240c0d171005161001164a070b09"><i
                        class="fa fa-envelope"></i></a>
            </div>
        </div>
    </div>
</div>
<script id="tmpl-dict" type="text/x-jsrender">
        <option value='{{>code}}' {{>selected}}>{{>value}}</option>



</script>
<script id="tmpl-dict-r" type="text/x-jsrender">
        <label class="radio-inline"> <input type="radio" name="" value="{{>code}}">{{>value}}</label>



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
            "#d22"), a(!0, "#777"), a(!0, "#2b2")), window.joinUs = function () {
        return console.log("%cWe're excited to have you! %c☃", a(!1, "#d22"),
                a(!1, "#333")), window.location.href = "/_/_/about/careers/",
                "";
    };
    /*
     var _hmt = _hmt || [];
     (function () {
     var hm = document.createElement("script");
     hm.src = "//hm.baidu.com/hm.js?1f61149eae43428c63d2907772a1e515";
     var s = document.getElementsByTagName("script")[0];
     s.parentNode.insertBefore(hm, s);
     })();
     */
</script>


<script type="text/javascript">
    /* <![CDATA[ */
    (function () {
        try {
            var s, a, i, j, r, c, l = document.getElementsByTagName("a"),
                    t = document.createElement("textarea");
            for (i = 0; l.length - i; i++) {
                try {
                    a = l[i].getAttribute("href");
                    if (a && a.indexOf("/cdn-cgi/l/email-protection") > -1 && (a.length > 28)) {
                        s = '';
                        j = 27 + 1 + a.indexOf("/cdn-cgi/l/email-protection");
                        if (a.length > j) {
                            r = parseInt(a.substr(j, 2), 16);
                            for (j += 2; a.length > j && a.substr(j, 1) != 'X'; j += 2) {
                                c = parseInt(a.substr(j, 2), 16) ^ r;
                                s += String.fromCharCode(c);
                            }
                            j += 1;
                            s += a.substr(j, a.length - j);
                        }
                        t.innerHTML = s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                        l[i].setAttribute("href", "mailto:" + t.value);
                    }
                } catch (e) {
                }
            }
        } catch (e) {
        }
    })();
    /* ]]> */
</script>
</body>
</html>
