package com.dreamwork.spring.user.controller;

import com.dreamwork.spring.user.dao.UserDao;
import com.dreamwork.spring.user.session.SybUserSession;
import com.dreamwork.syb.domain.user.User;
import com.dreamwork.syb.domain.user.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by apple on 15/9/8.
 */
@Controller
public class IndexController {

    Logger log = LoggerFactory.getLogger(IndexController.class);

    @Resource
    UserDao userDao;

    @Autowired
    SybUserSession session;

    /** 定义需要在jsp中拦截的页面 */
    @RequestMapping(value = "/index")
    public String index(ModelAndView view , HttpServletRequest req){
        view.addObject("session" , session.getSessionUser(req));
        log.info("IndexController : 进入了该方法");
        return "index";
    }





}
