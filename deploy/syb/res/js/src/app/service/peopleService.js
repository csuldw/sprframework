define(["app"],function(app){app.service('peopleService',['$http',function(http){var url="/app/people";var getPeopleFansCount=function(id){return http.post(url+"/get/fans/count/"+ id);}
var getPeopleCommentCount=function(id){return http.post(url+"/get/comment/count/"+ id);}
var getPeopleCommentList=function(id,num){return http.post(url+"/get/comment/list/"+ id,$.param({page:num}));}
var getPeopleCommentCList=function(cid){return http.post(url+"/get/comment/c/list/"+ cid);}
var addPeopleCommentC=function(cid,content){return http.post(url+"/add/comment/c/"+ cid,$.param({content:content}));}
var getPeopleFansList=function(id,num,size){return http.post(url+"/get/follow/list/"+ id,$.param({page:num,rows:size}));}
var getPeopleInfo=function(id){return http.post(url+"/get/overview/info/"+ id);}
var getPeoplePortfolio=function(id){return http.post(url+"/portfolio/get/"+ id)}
var getCompanyByPeople=function(id){return http.post(url+"/get/founder/company/"+ id);}
var updatePeoplePortfolio=function(id,portfolio){return http.post(url+"/update/portfolio/"+ id,$.param(portfolio));}
var updatePeopleInfo=function(id,info){return http.post(url+"/update/info/"+ id,$.param(info));}
var getPeopleStageList=function(id,num,size){return http.post("/app/media/stage/list/user/"+ id,$.param({page:num,num:size}));}
var addPeopleComment=function(id,content){return http.post(url+"/add/comment/"+ id,$.param({content:content}))}
var getPeopleVisitorList=function(id){return http.post(url+"/get/visitor/list/"+ id);}
var addPeopleCommentUp=function(cid,commentC){return http.post(url+"/add/comment/up/"+ cid);}
var getPeopleResume=function(id){return http.post(url+"/get/resume/"+ id);}
var findPeopleByNickname=function(nickname){if(nickname&&nickname.length>1){return http.post('/app/people/findUserByNickname',$.param({nickname:nickname})).then(function(res){return res.data;});}};var getPeopleSendresume=function(id){return http.post("/resume/get/sendresume/"+ id);}
var getPeopleSendresumeYes=function(id){return http.post("/resume/yes/"+ id);}
var getPeopleSendresumeNo=function(id){return http.post("/resume/no/"+ id);}
var updatePeopleFollow=function(id){return http.post(url+"/update/follow/"+ id)}
var getPeopleHighInfo=function(id){return http.post(url+"/get/highMyInfo")}
var getPeopleEditInfo=function(){return http.post(url+"/get/editMyInfo")}
return{getPeopleFansCount:getPeopleFansCount,getPeopleCommentCount:getPeopleCommentCount,getPeopleCommentList:getPeopleCommentList,getPeopleCommentCList:getPeopleCommentCList,addPeopleCommentC:addPeopleCommentC,getPeopleFansList:getPeopleFansList,getPeopleInfo:getPeopleInfo,getPeoplePortfolio:getPeoplePortfolio,getCompanyByPeople:getCompanyByPeople,updatePeoplePortfolio:updatePeoplePortfolio,updatePeopleInfo:updatePeopleInfo,getPeopleStageList:getPeopleStageList,addPeopleComment:addPeopleComment,getPeopleVisitorList:getPeopleVisitorList,addPeopleCommentUp:addPeopleCommentUp,getPeopleResume:getPeopleResume,findPeopleByNickname:findPeopleByNickname,getPeopleSendresume:getPeopleSendresume,getPeopleSendresumeNo:getPeopleSendresumeNo,getPeopleSendresumeYes:getPeopleSendresumeYes,getPeopleEditInfo:getPeopleEditInfo,updatePeopleFollow:updatePeopleFollow,getPeopleHighInfo:getPeopleHighInfo};}])});