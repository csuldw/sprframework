<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@ include file="../header.jsp" %>


<script>
    appId = 'forum/topic_add';

//    var gg_topic = ${view_json};

</script>

<body class="bg-white">
<div class="container ">

    <div class="title-info">
        发布话题<span>PUBLISH</span>
    </div>
    <div class=" boxed">
        <div class="">
            <form method="post" action="#" class="form-horizontal" id="createTopicForm" onsubmit="return false;">
                <div class="row">
                    <div class="col-xs-2 select-top">
                        <select class="form-control input-lg pad0T pad0R pad0B pad15L" name="stype" style="font-size: 16px;">
                            <option value="1">话题讨论</option>
                            <option value="2">求职区</option>
                            <option value="3">组队创业</option>
                            <option value="4">产品反馈/BUG</option>
                            <option value="5">其他</option>
                        </select>
                    </div>
                    <div class="col-xs-10 caption-top">
                        <input type="text" name="title" class="form-control input-lg" popover-position="bottom" require="require" style="font-size: 16px;" require-message="请输入话题标题,长度为5到40字" maxlength="40" value="" placeholder="请输入您想聊的话题">
                    </div>
                </div>
                <div class="aw-mod aw-editor-box mrg25T ">
                    <div class="mod-head">
                        <div class="wmd-panel">
                            <div id="wmd-button-bar"></div>
                            <textarea class="wmd-input form-control autosize" id="wmd-input" rows="15" name="topicContent" style="overflow: hidden; word-wrap: break-word; resize: none; height: 312px;"></textarea>
                        </div>
                    </div>
                    <div class="mod-body"></div>
                    <div class="mod-footer">
                        <div id="wmd-preview" class="wmd-panel wmd-preview"></div>
                        <div class="wmd-helper"></div>
                    </div>
                </div>
                <div class="cb mrg25B"></div>
                <div class="text-right">
                    <a class="btn btn-lg btn-default" href="/forum/list"'>让我回去</a>
                    <button class="btn btn-lg btn-success doReplyBtn mrg15L"
                            type="button">走你</button>
                </div>
        </div>
    </div>
</div>
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