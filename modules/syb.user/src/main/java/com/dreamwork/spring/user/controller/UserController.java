package com.dreamwork.spring.user.controller;

import com.dreamwork.spring.user.dao.UserDao;
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

    public void registe(){

    }

    @ResponseBody
    @RequestMapping("login")
    public SybResponse login(String loginName , String password , String noteCheck, HttpServletRequest req){
        SybResponse rsp = new SybResponse();
        User user = null;
        try {
            user = dao.queryRecord(loginName, password);
            loginSuccess(user , req);
        }catch (Exception e ){
            log.error("UserController查询user失败" , e);
        }
        rsp.setStr("/");
        rsp.setSuccess(user != null);
        rsp.setResponseData( user );
        rsp.setMessage( user == null ? "登录失败,请检查用户名或密码" : "登录成功" );
        return rsp;
    }

    /**
     * 登录成功,设置session
     */
    private void loginSuccess(User user , HttpServletRequest req){
        UserSession session = new UserSession();
        session.setUser(user);
        req.getSession().setAttribute("session" , session );
    }

}
