package com.dreamwork.spring.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by apple on 15/9/11.
 * 对应/dict/types/list
 */
@Controller
@RequestMapping("/area")
public class AreaController {

    @ResponseBody
    @RequestMapping(value = "/list",produces="application/json;charset=UTF-8")
    public String typeList(String code){
        //@TODO , 此处需要根据code,如code = 100 返回以下
        return "[{\"id\":34,\"code\":\"100103\",\"value\":\"浙江省\",\"num\":5,\"zhixia\":0},{\"id\":430,\"code\":\"100132\",\"value\":\"上海市\",\"num\":4,\"zhixia\":0},{\"id\":428,\"code\":\"100129\",\"value\":\"北京市\",\"num\":3,\"zhixia\":0},{\"id\":152,\"code\":\"100111\",\"value\":\"广东省\",\"num\":2,\"zhixia\":0},{\"id\":20,\"code\":\"100102\",\"value\":\"江苏省\",\"num\":1,\"zhixia\":0},{\"id\":2,\"code\":\"100100\",\"value\":\"安徽省\",\"zhixia\":0},{\"id\":366,\"code\":\"100125\",\"value\":\"四川省\",\"zhixia\":0},{\"id\":326,\"code\":\"100124\",\"value\":\"台湾\",\"zhixia\":0},{\"id\":318,\"code\":\"100123\",\"value\":\"澳门\",\"zhixia\":0},{\"id\":299,\"code\":\"100122\",\"value\":\"香港\",\"zhixia\":0},{\"id\":289,\"code\":\"100121\",\"value\":\"吉林省\",\"zhixia\":0},{\"id\":388,\"code\":\"100126\",\"value\":\"西藏\",\"zhixia\":0},{\"id\":396,\"code\":\"100127\",\"value\":\"新疆\",\"zhixia\":0},{\"id\":415,\"code\":\"100128\",\"value\":\"内蒙古\",\"zhixia\":0},{\"id\":432,\"code\":\"100134\",\"value\":\"天津市\",\"zhixia\":0},{\"id\":434,\"code\":\"100136\",\"value\":\"重庆市\",\"zhixia\":0},{\"id\":436,\"code\":\"100137\",\"value\":\"贵州省\",\"zhixia\":0},{\"id\":446,\"code\":\"100138\",\"value\":\"青海省\",\"zhixia\":0},{\"id\":274,\"code\":\"100120\",\"value\":\"辽宁省\",\"zhixia\":0},{\"id\":260,\"code\":\"100119\",\"value\":\"黑龙江\",\"zhixia\":0},{\"id\":46,\"code\":\"100104\",\"value\":\"山西\",\"zhixia\":0},{\"id\":58,\"code\":\"100105\",\"value\":\"河北省\",\"zhixia\":0},{\"id\":70,\"code\":\"100106\",\"value\":\"山东省\",\"zhixia\":0},{\"id\":88,\"code\":\"100107\",\"value\":\"河南省\",\"zhixia\":0},{\"id\":107,\"code\":\"100108\",\"value\":\"湖北省\",\"zhixia\":0},{\"id\":125,\"code\":\"100109\",\"value\":\"湖南省\",\"zhixia\":0},{\"id\":140,\"code\":\"100110\",\"value\":\"江西省\",\"zhixia\":0},{\"id\":174,\"code\":\"100112\",\"value\":\"广西省\",\"zhixia\":0},{\"id\":189,\"code\":\"100113\",\"value\":\"海南省\",\"zhixia\":0},{\"id\":203,\"code\":\"100114\",\"value\":\"云南省\",\"zhixia\":0},{\"id\":218,\"code\":\"100115\",\"value\":\"福建省\",\"zhixia\":0},{\"id\":228,\"code\":\"100116\",\"value\":\"陕西省\",\"zhixia\":0},{\"id\":239,\"code\":\"100117\",\"value\":\"甘肃省\",\"zhixia\":0},{\"id\":254,\"code\":\"100118\",\"value\":\"宁夏省\",\"zhixia\":0},{\"id\":455,\"code\":\"100139\",\"value\":\"美国\",\"zhixia\":0}]";
    }

}
