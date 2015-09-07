define(["app/home","app/people/people_main_find"],function(home){var hasLink=false;var prefix="people_main_";var links=["find","follow","xzcy","jrcy","zmqq","tzkp","sbgg"];var checkLoad=function(md){$(links).each(function(){if(md==this.toString()){hasLink=true;}});}
return{init:function(){var md=window.location.hash.toString().replace("#","");checkLoad(md);if(!hasLink){md="find";}
if(md=="follow"||md=="xzcy"||md=="jrcy"||md=="tzkp"||md=="zmqq"||md=="sbgg"){home.menuLoad("/p/people/people_main_find","people/people_main_find");}else{home.menuLoad("/p/people/"+ prefix+ md,"people/"+ prefix
+ md);}
$(".tabs").find("a[data-ajaxlink='"+ md+"']").parent().addClass("active");$('.tabs').find("a[data-ajaxlink]").click(function(){if($(this).parent().hasClass("active")){return;}
var md=$(this).data("ajaxlink");$(".tabs li").removeClass("active");checkLoad(md);if(!hasLink){md="find";}
if(md=="follow"||md=="xzcy"||md=="jrcy"||md=="tzkp"||md=="zmqq"||md=="sbgg"){home.menuLoad("/p/people/people_main_find","people/people_main_find");}else{home.menuLoad("/p/people/"+ prefix+ md,"people/"
+ prefix+ md);}
$(this).parent().addClass("active");});if(ISPERFECT=="false"){var userName=$("#nav-username").html();var notyfy=$("#notyfy_container_top").notyfy({layout:'top',type:"error",closeWith:"",timeout:true,speed:500,dismissQueue:true,text:"亲爱的"
+ userName
+"，您需要完善个人资料才能被别人发现并发送站内信～ <a class='btn btn-xs btn-success' href='/p/people/people_info_perfect' style='margin-top:-3px;'>点击完善</a> "});}}};});