package com.dreamwork.spring.user.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by apple on 15/9/11.
 */
@Controller
public class PeopleController {

    @ResponseBody
    @RequestMapping("/people/updateInfo")
    public SybResponse updateInfo(String isPerFect){
        /**
         userType:10001
         avatar:
         gender:1
         province:100103
         city:100129
         userRole:10003
         signature:你好
         skilltags:阿斯蒂芬
         brief:阿斯顿飞
         workYears:1
         education:阿斯顿发斯蒂芬
         workBrief:阿斯顿飞
         tel:
         telcode:
         */
        //返回内容：{"success":true,"message":"修改成功","str":"7191","responseData":null,"flag":null}

        SybResponse rsp = new SybResponse();
        rsp.setSuccess(true);
        return rsp;

    }

    @ResponseBody
    @RequestMapping("/note/bind/user")
    public SybResponse bindUser(String tel){
        SybResponse rsp = new SybResponse();
        rsp.setSuccess(true);
        return rsp;
    }

    /**
     * 用户页面
     * @param pid
     * @return
     */
    @RequestMapping("/people/{pid}")
    public String peopleInfo(Long pid){
        return "people/people";
    }


}
