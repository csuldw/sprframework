package com.dreamwork.spring.util;


import com.dreamwork.spring.auth.Auth;
import org.springframework.util.Assert;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;


/**
 * User： xin.fang
 * Date： 14-6-9 
 * Time： 下午4:32
 *
 */
public class SessionUtil {



    /**
     * 获取用户当前的权限列表
     * @author vic
     * @return
     */
    public static List<Auth> getCurrentUserAuth(){
        List<Auth> authList = (List<Auth>) getSession().getAttribute("SESSION_AUTH_LIST");
        Assert.notNull(authList, "获取用户当前的权限列表为Null！");
        return authList;
    }

    public static HttpSession getSession(){
        HttpSession session = getRequest().getSession();
        Assert.notNull(session, "获取HttpServletRequest为Null！");
        return session;
    }

    public static HttpServletRequest getRequest() {
        HttpServletRequest request = null;
        try{
            request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        }catch (Exception e) {
            return request;
        }
        return request;
    }


    public static String getUserName() {
        return null;
    }

    public static int getUserId() {
        return 0;
    }
}
