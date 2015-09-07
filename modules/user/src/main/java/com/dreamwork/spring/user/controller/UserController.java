package com.dreamwork.spring.user.controller;

import com.dreamwork.spring.user.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by apple on 15/9/7.
 */
@Controller
public class UserController {

    @Autowired
    UserDao dao;

    public void registe(){

    }

    @ResponseBody
    @RequestMapping("login")
    public String login(String loginName , String password , String noteCheck){
        try {
            dao.queryRecord(loginName, password);
        }catch (Exception e ){
            e.printStackTrace();
        }
        return "{\"success\":false,\"message\":\"没有找到此用户\",\"str\":null,\"responseData\":null,\"flag\":null}";
    }

}
