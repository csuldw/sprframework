define(["app"],function(app){app.service('jobService',['$http',function(http){var getCompanyByJob=function(id){return http.post("/app/company/get/getByJob",$.param({jobId:id}));}
var getJobMore=function(id){return http.post("/jobs/get/"+ id);}
var updateJobInfo=function(id,jobInfo){return http.post("/jobs/update/"+ id,$.param(jobInfo));}
var updateJobFollow=function(id){return http.post("/jobs/follow",$.param({jobId:id}));}
var addSendResume=function(id,sendResume){return http.post("/jobs/send/resume/"+ id,$.param(sendResume))}
var addJobs=function(job){return http.post("/jobs/create",$.param(job))}
return{getCompanyByJob:getCompanyByJob,getJobMore:getJobMore,updateJobInfo:updateJobInfo,updateJobFollow:updateJobFollow,addSendResume:addSendResume,addJobs:addJobs};}])})