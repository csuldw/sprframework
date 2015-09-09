package com.dreamwork.spring.user.controller;

import com.dreamwork.syb.domain.user.User;
import com.dreamwork.syb.domain.user.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by apple on 15/9/8.
 */
@Controller
public class IndexController {

    Logger log = LoggerFactory.getLogger(IndexController.class);

    /** 定义需要在jsp中拦截的页面 */
    @RequestMapping(value = "/index")
    public String index(){
        log.info("IndexController : 进入了该方法");
        return "index";
    }

    /** 给当前页面添加session变量 */
    @ModelAttribute("session")
    public UserSession getSession(HttpServletRequest request ){
        HttpSession session = request.getSession();
        Object user = session.getAttribute("session");
        if(user != null ) {
            return (UserSession) user;
        }
        return null;
    }



}
