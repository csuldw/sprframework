define(["app/home"],function(home){var hasLink=false;var prefix="company_main_";var links=["find","follow","zhhr","zyg"];var checkLoad=function(md){$(links).each(function(){if(md==this.toString()){hasLink=true;}});};return{init:function(){var md=window.location.hash.toString().replace("#","");checkLoad(md);if(!hasLink){md="find";}
if(md=="follow"||md=="zhhr"||md=="zyg"){home.menuLoad("/p/company/company_main_find","company/company_main_find");}else{home.menuLoad("/p/company/"+ prefix+ md,"company/"+ prefix
+ md);}
$(".tabs").find("a[data-ajaxlink='"+ md+"']").parent().addClass("active");$('.tabs').find("a[data-ajaxlink]").click(function(){if($(this).parent().hasClass("active")){return;}
var md=$(this).data("ajaxlink");$(".tabs li").removeClass("active");checkLoad(md);if(!hasLink){md="find";}
if(md=="follow"||md=="zhhr"||md=="zyg"){home.menuLoad("/p/company/company_main_find","company/company_main_find");}else{home.menuLoad("/p/company/"+ prefix+ md,"company/"
+ prefix+ md);}
$(this).parent().addClass("active");});$(".toCreateCompany").click(function(){home.error("您需要先完善个人信息  <a class='btn btn-success btn-xs' style='margin-top:-3px;' href='/p/people/people_info_perfect'>去完善</a>",10000)});}};});