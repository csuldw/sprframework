define(["app/home","app/valid","lib/jquery.fileupload","lib/bootstrap-tags"],function(home,v){return{init:function(){home.converHtml();$(".doCreateBtn").click(function(){var $form=$("#createJobForm");if(v.doValidForm($form)){var $b=$(this);var c=$b.html();home.lbtn($b);home.mask($(".breadcrumbs"));$.ajax({url:"/jobs/create",type:"POST",data:home.generateFormData($form)}).done(function(data){if(data.success==true){home.success(data.message);location.href="/jobs/"
+ data.str;home.goTop();}else{home.error(data.message);}
home.cbtn($b,c);home.unmask((".breadcrumbs"));});}
return false;});$("#jobTags").tagsinput();var it=$(".input-touchspin");var itinput=it.find("input");it.find(".leftbtn").click(function(){var v=parseInt(itinput.data("value"));if(v>0){itinput.val(v- 1);itinput.data("value",v- 1);}});it.find(".rightbtn").click(function(){var v=parseInt(itinput.data("value"));if(v<10){itinput.val(v+ 1);itinput.data("value",v+ 1);}});}};});