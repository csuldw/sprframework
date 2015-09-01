天威活动模块

后端:
微信登陆
点赞接口（控制一天一次）
点赞排行？
所有参加活动用户列表接口
获取单用户参加活动详细信息接口
图片上传
#1
报名接口：http://localhost:8080/tianwei/add?open_id=123&phone_num=124&old_pic=125&new_pic=126&blessing=%E4%BD%A0%E5%A5%BD%E5%90%97&user_name=%E5%A4%A7%E8%99%BE
参数：open_id , phone_num , old_pic , new_pic , blessing , user_name
返回值：{"rs":true,"msg":null,"data":{"id":11,"open_id":"123","phone_num":"124","old_pic":"125","new_pic":"126","blessing":"你好吗","user_name":"大虾","favour":0}}

#2
报名列表接口：http://localhost:8080/tianwei/list
可选参数：http://localhost:8080/tianwei/list?sort=1&start=0&end=10
sort
0:点赞最多
1:id排序
2:id倒序

返回值：{"rs":true,"msg":null,"data":[[1,"123","124","125","126","你好吗","大虾",0]]}
返回data参数：open_id , phone_num , old_pic , new_pic , blessing , user_name

#3
查询单个：http://localhost:8080/tianwei/1/detail
参数在url中是报名id
返回：{"rs":true,"msg":null,"data":{"id":1,"open_id":"123","phone_num":"124","old_pic":"125","new_pic":"126","blessing":"你好吗","user_name":"大虾","favour":null}}

#4
点赞：http://localhost:8080/tianwei/1/favour?open_id=123
参数在url中是报名id
返回：{"rs":true,"msg":null,"data":{"id":1,"open_id":"123","phone_num":"124","old_pic":"125","new_pic":"126","blessing":"你好吗","user_name":"大虾","favour":5}}
#5
查询某个open_id对应的报名信息
地址：http://kaasworld.com:8080/tianwei/my?open_id=123
参数open_id
返回
{"rs":true,"msg":null,"data":{"id":1,"open_id":"123","phone_num":"124","old_pic":"125","new_pic":"126","blessing":"大虾","user_name":"大虾","favour":0}}

#6
七牛token
http://kaasworld.com:8080/qiniu/token
返回
{"uptoken":"VEY_f42Tf3lEIpeqkfb_6ZBhTGbkMwb3i39D15Wz:Tc3L9D-3lT7-MF6Dl431fzbkYIU=:eyJzY29wZSI6ImJ1Y2tldCIsImRlYWRsaW5lIjoxNDM3MTQ2NDUzfQ=="}
