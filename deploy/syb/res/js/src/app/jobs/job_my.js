define(["app/home"],function(home){var $mask=$("#content-liquid-full");var initEvent=function(){$(".btn-del").click(function(){if(confirm("确定要删除吗?删除后不可恢复!")){home.mask($mask);var $b=$(this);var c=$b.html();home.lbtn($b);$.ajax({url:"/jobs/del/"
+ $(this).parent().parent().data("job-id"),type:"POST",data:{}}).done(function(data){if(data.success==true){home.success(data.message);loading();}else{home.error("删除失败");}
home.unmask($mask);home.cbtn($b,c);});}});};var loading=function(num){home.mask($mask);$.ajax({url:"/jobs/my/list",type:"POST",data:{page:num,rows:10}}).done(function(data){if(data.success==true&&data.responseData.records>0){$(".job-list").html($("#temp-jobs-list").render(data.responseData.rows));home.paging($(".all-pager"),data.responseData.total,data.responseData.page,loading,"small","left",$("body"));initEvent();}else{$(".job-list").html($("#temp-no-jobs-list").render({}));}
home.unmask($mask);});};return{init:function(){loading(1);}};});