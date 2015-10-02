<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ include file="../header.jsp" %>


<script>
    appId = 'forum/topic_get';

    var gg_topic = ${view_json};

</script>
<div class="container" ng-controller="topicController">
<div class="row">
<div class="col-xs-9 to_full">
<div>
    <ul class="breadcrumbs">
        <li><a href="#"><i class="fa fa-home"></i></a></li>
        <li><a href="/forum/list">吐槽社区</a></li>
        <li><a href="#">招聘</a></li>
    </ul>
</div>

<div class="title-info " style="font-weight: 600;">{{view.topic.title}}</div>
<div class="box pad15A">
    <input type="hidden" id="pId" ng-model="pId" value="${view.topic.id}"/>
    <div class="tzinfo" style="border: 0px;">
        <a href="/people/${view.topic.userId}" target="_blank" class="av"><img src="http://img.histarter.com/upload/2014-12-22/23/18/00/a0d2b2d625b1403995106a985dd86470/1419261480623/IMG_05360.jpg_fixhw80" alt="Steam" class="lsavatar img-circle"></a>
        <div class="u-av-info">
            <a href="/people/${view.topic.userId}" target="_blank" class="Username phuser ">${view.topic.userName}</a>
            [合伙人]
            <div class="cb mrg5T"></div>
            <i class="fa fa-clock-o"></i> ${view.topic.createDate}
        </div>
        <div class="cb"></div>
        <div class="topic-content">${view.topic.topicContent}</div>
    </div>
</div>
<div class="box-reply">
    <i class="fa fa-comments oil"></i>
    <div class="oili">回复（${view.counts}）</div>
</div>
<div class="cb"></div>
<div class="comment-list box pad15A">

<c:if test="${view.counts == 0 }" >
    <div class="box-title text-center"><h4>暂无回复</h4></div>
</c:if>

<c:forEach items="${view.replys}" var="reply">
<div class="tzinfo">
    <div class="pull-right">
        <button class="btn btn-default btn-sm reply-user" data-nickname="${reply.user_name}" data-id="1054">回复</button>
    </div>
    <a href="/people/${reply.user_id}" target="_blank" class="av"><img src="http://img.histarter.com/upload/2015-01-14/10/56/58/52cc83d8d3c843a7aff2694df317c873/1421204218571/wrh69z_fixhw80" alt="Steam" class="lsavatar img-circle"></a>
    <div class="u-av-info">
        <a href="/people/${reply.user_id}" target="_blank" class="Username phuser ">${reply.user_name}</a>
        [其他]
        <div class="cb mrg5T"></div>
        <i class="fa fa-clock-o"></i> ${reply.createDate}
    </div>
    <div class="cb"></div>
    <div class="topic-content">
        ${reply.content}
    </div>
    <div class="cb"></div>
</div>
</c:forEach>

</div>
<div class="theme-pager text-right">
    <ul class="reply-pager"></ul>
</div>
<div class="cb"></div>

<c:if test="${session != null && session.ISLOGIN}" >
<div class="reply-widget box-title">
    <div class="box-title-bar mrg0A">添加一条新回复</div>
    <div class="aw-mod aw-editor-box">
        <div class="mod-head">
            <div class="wmd-panel">
                <div id="wmd-button-bar"></div>
                <textarea class="wmd-input form-control autosize" id="wmd-input" rows="15" name="topicContent" style="overflow: hidden; word-wrap: break-word; resize: none; height: 312px;"></textarea>
            </div>
        </div>
        <div class="mod-body"></div>
        <div class="mod-footer">
            <div id="wmd-preview" class="wmd-panel wmd-preview"></div>
        </div>
    </div>
    <div class="cb"></div>
    <div class="text-right mrg5T">
        <button class="btn btn-lg btn-success doReplyBtn" type="button">
            &nbsp;&nbsp;&nbsp;&nbsp;回 复&nbsp;&nbsp;&nbsp;&nbsp;</i>
        </button>
    </div>
</div>
</c:if>

<c:if test="${session == null || !session.ISLOGIN}" >
    <div class="box-title text-center">
        <h4>
            您还没有登录,请<a class="btn-action" href="javascript:void(0)">登录</a>后回复
        </h4>
    </div>
</c:if>

</div>

<div class="col-xs-3 to_full">
    <aside class="widget-info forum-l-info ">
        <h2 class="h4 title">吐槽社区</h2>
        <p>在吐槽社区聊话题，聊工作、找团队、找合伙人、认识更多朋友。</p>
        <div class="add-topic">
            <a href="/forum/topic_add" class="btn btn-lg btn-block btn-success btn-action pad5T pad5B">发表话题</a>
        </div>
    </aside>
</div>
</div>
</div>
<script id="temp-reply-item" type="text/x-jsrender">
<div class="tzinfo">
						<a href="/vanillaorigami/profile/1/Steam" class="av"><img
							src="{{>avatar}}_fixhw80" alt="Steam" class="lsavatar img-circle"></a>
						<div class="u-av-info">
							<a href="/people/{{:id}}"
								class="Username phuser ">{{>nickname}}</a><div class="cb mrg5T"></div> <i
								class="fa fa-clock-o"></i> {{>createDateView}}
						</div>
<div class="cb"></div>
						<div class="topic-content">{{>content}}</div>
				<div class="cb"></div>
					</div>
	</script>
<script id="temp-c-reply-item" type="text/x-jsrender">
	<div class="row">
	<div class="col-xs-2">
		<div class="c-r-un">
					<a href="page_ready_user_profile.php"> <strong>{{>nickname}}：</strong></a>
		</div>
	</div>
	<div class="col-xs-9">
		<div class="c-reply-content">{{>content}}</div>
		<div class="c-reply-info">
			<p>
				发表于 <a href="/notebooks/219722/latest"> <i
					class="icon-book"></i>
				</a> {{>createDateView}}
			</p>
		</div>
	</div>
</div>
	</script>
<script id="temp-no-login" type="text/x-jsrender">
	<div class="box-title text-center"><h4>您还没有登录,请登录后回复</h4></div>
	</script>
<script id="temp-no-reply" type="text/x-jsrender">
	<div class="box-title text-center"><h4>暂无回复</h4></div>
	</script>
<script id="insertImgDiv" type="text/x-jsrender">
	<ul class="nav nav-tabs" role="tablist">
		<li class="active"><a href="#localPic" role="tab"
			data-toggle="tab">本地上传</a></li>
		<li class=""><a href="#remotePic" role="tab" data-toggle="tab">远程地址获取</a></li>
	</ul>
	<div class="tab-content">
		<div class="tab-pane fade pt20 form-horizontal active in"
			id="localPic">
			<div class=" form-group pad15L">
				<span type="button"
											class="btn btn-default fileinput-button"> <span>上传图片</span> <input id="avatar"
											type="file">
										</span>
			</div>
<p>图片大小最大不能大于5M,请等待上传完成后插入图片,如上传等待时间过长请取消后重新打开再试！</p>
		</div>
		<div class="tab-pane fade pad20T" id="remotePic">
		</div>
	</div>
	</script>

<jsp:include page="../footer.jsp"/>
