package com.dreamwork.spring.user.controller;

import com.dreamwork.spring.user.dao.UserDao;
import com.dreamwork.spring.user.session.SybUserSession;
import com.dreamwork.syb.domain.user.User;
import com.dreamwork.syb.domain.user.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
/**
 * Created by apple on 15/9/7.
 */
@Controller
public class UserController {

    Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    UserDao dao;

    @Autowired
    SybUserSession session;

    @ResponseBody
    @RequestMapping("/login")
    public SybResponse login(String loginName , String password , String noteCheck, HttpServletRequest req){
        SybResponse rsp = new SybResponse();
        User user = null;
        try {
            user = dao.queryRecord(loginName, password);
//            user = queryRecord(loginName, password);
            session.setSessionUser(user, req);
        }catch (Exception e ){
            log.error("UserController查询user失败" , e);
        }
        rsp.setStr("/");
        rsp.setSuccess(user != null);
        rsp.setResponseData( user );
        rsp.setMessage( user == null ? "登录失败,请检查用户名或密码" : "登录成功" );
        return rsp;
    }

    @ResponseBody
    @RequestMapping("/user/register")
    public SybResponse registe(String loginName , String nickname , String password,String replypassword){
        SybResponse rsp = new SybResponse();
        rsp.setSuccess(false);
        if(!password.equals(replypassword)){
            rsp.setMessage("两次密码不一致,请重新输入");
            return rsp;
        }
        User user = new User();
        user.setEmail(loginName);
        user.setUsername(nickname);
        user.setPassword(password);
        dao.insertRecord(user);
        rsp.setStr("/");
        rsp.setSuccess(true);
        return rsp;
        //{"success":false,"message":"登录邮箱已被注册","str":null,"responseData":null,"flag":null}
    }

    /** 退出登录 */
    @RequestMapping(value = "/logout")
    public String logout(HttpServletRequest req){
        UserSession rsp = session.getSessionUser(req);
        if(rsp != null)
            rsp.setUser(null);
        return "redirect:/index";
    }
}
