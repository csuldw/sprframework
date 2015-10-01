package com.dreamwork.spring.user.session;

import com.dreamwork.syb.domain.user.User;
import com.dreamwork.syb.domain.user.UserSession;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by apple on 15/10/1.
 */
@Service
public class SybUserSession {

    /** 给当前页面添加session变量 */
    public UserSession getSessionUser(HttpServletRequest request ){
        HttpSession session = request.getSession();
        Object user = session.getAttribute("session");
        if(user != null ) {
            return (UserSession) user;
        }
        return null;
    }

    /**
     * 登录成功,设置登录用户
     * @param user
     * @param req
     */
    public void setSessionUser(User user , HttpServletRequest req){
        UserSession session = new UserSession();
        session.setUser(user);
        req.getSession().setAttribute("session" , session );
    }
}
