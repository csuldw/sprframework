define(["app"],function(app){app.service('hiUtils',function(){var maskSpinnerInner=function(eLement){eLement.html($("<i class='fa fa-spinner fa-spin'></i>"));eLement.attr("disabled","disabled");}
var unMaskSpinnerInner=function(eLement,text){eLement.html(text);eLement.removeAttr("disabled");}
var error=function(msg,hideTime){if(!hideTime){hideTime=3000;}
if(!msg){msg="时间过了太久页面失效了，刷新下试试吧！";}
var notyfy=$("#notyfy_container_top").notyfy({layout:'top',type:"error",timeout:true,speed:500,dismissQueue:true,text:""+ msg+""});window.setTimeout(function(){notyfy.close();},hideTime);return false;};var success=function(msg,hideTime){if(!hideTime){hideTime=3000;}
if(!msg){msg="时间过了太久页面失效了，刷新下试试吧！";}
var notyfy=$("#notyfy_container_top").notyfy({layout:'top',type:"success",timeout:true,speed:500,dismissQueue:true,text:""+ msg+""});window.setTimeout(function(){notyfy.close();},hideTime);return false;};return{maskSpinnerInner:maskSpinnerInner,unMaskSpinnerInner:unMaskSpinnerInner,success:success,error:error}})});