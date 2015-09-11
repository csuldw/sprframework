package com.dreamwork.spring.user.controller;

import com.dreamwork.spring.user.dao.UserDao;
import com.dreamwork.syb.domain.user.User;
import com.dreamwork.syb.domain.user.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    /** 定义需要在jsp中拦截的页面 */
    @RequestMapping(value = "/index")
    public String index(ModelAndView view , HttpServletRequest req){
        view.addObject("session" , getSession(req));
        log.info("IndexController : 进入了该方法");
        return "index";
    }

    /** 退出登录 */
    @RequestMapping(value = "/logout")
    public String logout(HttpServletRequest req){
        UserSession session = getSession(req);
        if(session != null)
        session.setUser(null);
        return "redirect:/index";
    }

    /** 给当前页面添加session变量 */
    //@ModelAttribute("session")
    public UserSession getSession(HttpServletRequest request ){
        HttpSession session = request.getSession();
        Object user = session.getAttribute("session");
        if(user != null ) {
            return (UserSession) user;
        }
        return null;
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
        userDao.insertRecord(user);
        rsp.setStr("/");
        rsp.setSuccess(true);
        return rsp;
        //{"success":false,"message":"登录邮箱已被注册","str":null,"responseData":null,"flag":null}
    }

}
