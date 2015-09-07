define(["app/home","app/main","lib/bootstrap-tags","lib/jquery-ui"],function(home,main){var loading=function(num){var isFollow=0;var isFilter;if($(".people_follow").parent().hasClass("active")==true){isFollow=1;}
if($(".people_xzcy").parent().hasClass("active")==true){isFilter=10002;}
if($(".people_zmqq").parent().hasClass("active")==true){isFilter=10003;}
if($(".people_tzkp").parent().hasClass("active")==true){isFilter=10004;}
if($(".people_jrcy").parent().hasClass("active")==true){isFilter=10001;}
if($(".people_sbgg").parent().hasClass("active")==true){isFilter=10005;}
var $mask=$(".people_list");var _keyWordList=home.getDatasStr($("#bt-lists").find("span[data-key='keyword']"),"value");var _province=home.getDatasStr($("#bt-lists").find("span[data-key='province']"),"value");var _city=home.getDatasStr($("#bt-lists").find("span[data-key='city']"),"value");var _role=home.getDatasStr($("#bt-lists").find("span[data-key='role']"),"value");var _startExp=home.getDatasStr($("#bt-lists").find("span[data-key='startExp']"),"value");var _workYear=home.getDatasStr($("#bt-lists").find("span[data-key='workYear']","value"),"value");home.mask($mask);$.ajax({url:"/people/list",type:"POST",data:{page:num,rows:30,isFollow:isFollow,keyWordList:_keyWordList,province:_province,city:_city,role:_role,startExp:_startExp,workYear:_workYear,isFilter:isFilter}}).done(function(data){if(data.success==true&&data.responseData.records>0){home.initList($(".people_list"),$("#temp-people-list").render(data.responseData.rows),$("#next-div"),loading,data.responseData.currPage,data.responseData.total,"到世界尽头了呢～");$(".user-avator").hover(function(){$(this).next().find(".extra").show(500);},function(){$(this).next().find(".extra").hide(500);})
home.unmask($mask);home.converHtml();}else{$(".people_list").html($("#temp-no-people-list").render({}));home.clearnext($("#next-div"),"到世界尽头了呢～");}});};var initEvent=function(){$(".message-i").click(function(){var $this=$(this);home.openMessageDiloag($this.data("id"));return false;});};return{init:function(){if($("#header_search").attr("data-init")!="true"){$(".dropdown-filter").hover(function(){$(this).find(".dropdown-box").show();},function(){$(this).find(".dropdown-box").hide();})
$("#slider-range").slider({range:true,min:0,max:20,values:[0,20],slide:function(event,ui){$("#search_workyear").html(+ui.values[0]
+"年 - "+ ui.values[1]+"年");},stop:function(event,ui){var salarySpan=$(".bootstrap-tagsinput").find("span[data-key='workYear']");if(salarySpan.length>0){salarySpan.html(ui.values[0]
+"年 - "
+ ui.values[1]
+"年"
+"<span data-role='remove'></span>");salarySpan.data("value",ui.values[0]+"-"
+ ui.values[1]);}else{$(".tagsinput").tagsinput("add",ui.values[0]+"年 - "
+ ui.values[1]+"年","workYear",ui.values[0]+"-"+ ui.values[1]);}
loading(1);}});var $tag=$(".tagsinput").tagsinput();$(".tagsinput").on('itemAdded',function(event){loading(1);});$(".tagsinput").on('itemRemoved',function(event){loading(1);});var areaSel=$(".area-sel").selectize({valueField:'code',labelField:'value',searchField:'value',options:[],create:false,render:{option:function(item,escape){return'<div>'
+'<span class="title">'
+'<span class="name"><i class="icon '
+(item.value?'fork':'source')
+'"></i>'+ escape(item.value)
+'</span>'+'</div>';}},load:function(query,callback){if(!query.length)
return callback();$.ajax({url:'/area/search/'
+ encodeURIComponent(query),type:'post',error:function(){callback();},success:function(res){callback(res.slice(0,10));}});},onChange:function(code){if(code.length==6){$(".tagsinput").tagsinput("add",$(".area-sel").next().find(".item").html(),"province",code);}else if(code.length==10){$(".tagsinput").tagsinput("add",$(".area-sel").next().find(".item").html(),"city",code);}
loading(1);areaSel[0].selectize.clear();}});$("#header_search-filters").find("div[data-s-type]").find("div").click(function(){var $this=$(this);var isSole=$(this).parent().data("sole");var name=$this.text();var dataT=$this.parent().data("s-type");var dataValue=$this.data("s-v");var soleSpan=$("#bt-lists").find("span[data-key='"+ dataT
+"']");if(isSole==1&&soleSpan.length>0){soleSpan.html(name
+"<span data-role='remove'></span>");soleSpan.attr("data-value",dataValue);loading(1);}else{$("#s_"+ dataT).val(dataValue);$(".tagsinput").tagsinput("add",name,dataT,dataValue);}});$(".btn-search").click(function(){loading(1);});}
loading(1);$("#header_search").attr("data-init","true");}};});