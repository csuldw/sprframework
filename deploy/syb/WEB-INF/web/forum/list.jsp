<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ include file="../header.jsp" %>


<script>
    appId = 'forum/forum_main';

    var gg_topics = ${topics_json};

</script>


<div class="container">
<div class="row">
<div class="col-xs-9 to_full">
<div class="" id="content-liquid-full mh500">
<div class="tab-content" id="mainContain">
<h4 class="mrg20B" style="color: #b5b5b5; font-size: 16px">梦想是什么，梦想就是一种让你感到坚持就是幸福的东西。&nbsp;&nbsp;&nbsp;&nbsp;-《中国合伙人》</h4>
<ul id="myTab" class="nav clearfix nav-tabs">
    <li class="active"><a href="/forum/list">全部</a></li><%--
    <li class=""><a href="/forum/list?sid=1">话题讨论</a></li>
    <li class=""><a href="/forum/list?sid=2">求职区</a></li>
    <li class=""><a href="/forum/list?sid=3">组队创业</a></li>
    <li class=""><a href="/forum/list?sid=4">产品反馈/BUG</a></li>
    <li class=""><a href="/forum/list?sid=5">其他</a></li>--%>
</ul>
<div class="aw-mod aw-explore-list bg-white">
<div class="mod-body">
<div class="aw-common-list">


<c:forEach items="${topics.resultList}" var="topic">
<div class="aw-item active" data-topic-id="">
    <a class="aw-user-name data-popover-f-u" data-placement="bottom" data-container="body" data-trigger="hover" href="/people/288" rel="nofollow">
    <img target="_blank" class="img-circle" src="http://img.histarter.com/upload/2014-12-22/23/18/00/a0d2b2d625b1403995106a985dd86470/1419261480623/IMG_05360.jpg_fixhw80" alt="Tony84">
        <div class="hide ">
            <div class="user-info-popover">
                <img src="http://img.histarter.com/upload/2014-12-22/23/18/00/a0d2b2d625b1403995106a985dd86470/1419261480623/IMG_05360.jpg_fixhw80" class="img-circle">
                <h3 class="meta-heading">Tony84</h3>
                <h4 class="meta-subheading">
                    创业=创新+商业
                </h4>
            </div>
        </div></a>
    <div class="aw-question-content">
        <h4>
            「
            话题讨论
            」
            <a class='isTop' href="/forum/topic/get/${topic.id}" target="_blank"> ${topic.title}
            </a>
            <img class="" style="margin-top: -5px;" src="http://img.histarter.com/img/forum/zd.gif" alt="置顶">
        </h4>
        <p>
            • <a href="/people/288" target="_blank" class="aw-user-name">Tony84</a> •<span class="text-color-999">合伙人 <span class="text-color-999 to_hide">发起的话题 •
1896 次围观 • 前天17:17:27
• 最后回复人： <a style="color: #999;" href="/people/288">Tony84</a>
</span>
        </p>
    </div>
    <div class="topic-right-info ">
        <a href="/forum/topic/get/166" target="_blank" class="hint-comm-article"><span class="a">47</span><span class="b">吐槽</span></a>
    </div>
</div>
</c:forEach>

</div>
</div>
<div class="mod-footer mrg25T">
    <a class="btn btn-lg btn-default pad5T pad5B pull-right" href="/forum/list?page=2&sid=">下一页</a>
</div>
</div>
</div>
</div>
</div>
<div class="col-xs-3 to_full">
    <aside class="widget-info forum-l-info">
        <h2 class="h4 title">吐槽社区</h2>
        <p>在吐槽社区聊话题，聊工作、找团队、找合伙人、认识更多朋友。</p>
        <div class="add-topic">
            <a href="/p/forum/topic_add" class="btn btn-lg btn-block btn-action btn-success pad5T pad5B">发表话题</a>
        </div>
    </aside>
</div>
</div>
</div>

<jsp:include page="../footer.jsp"/>