package com.dreamwork.spring.user.controller;

import com.dreamwork.spring.db.JDBCBaseDao;
import com.dreamwork.spring.db.annotation.ChooseDataSource;
import com.dreamwork.spring.db.pojos.SQLCondition;
import com.dreamwork.syb.domain.user.User;
import com.dreamwork.syb.domain.user.UserSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by wujinyuan on 2015/9/16.
 */

@Controller
@ChooseDataSource(mainType = "db_", bizType = "service")
public class TestDymicDB {

    @ResponseBody
    @RequestMapping("login")
    public SybResponse login(String loginName , String password , String noteCheck, HttpServletRequest req){
        SybResponse rsp = new SybResponse();
        User user = null;
        try {
            user = queryRecord(loginName, password);
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

    @Autowired
    JDBCBaseDao baseDao;

    private User queryRecord(String loginName, String password) {
        List<SQLCondition> list = new ArrayList<SQLCondition>();
        list.add(new SQLCondition("email", loginName));
        list.add(new SQLCondition("password", password));
        List<User> id = baseDao.queryList(User.class, list, "order by id");
        if(id != null )
        return id.get(0);
        return null;
    }


    /**
     * 登录成功,设置session
     */
    private void loginSuccess(User user , HttpServletRequest req){
        UserSession session = new UserSession();
        session.setUser(user);
        req.getSession().setAttribute("session" , session );
    }

    Logger log = LoggerFactory.getLogger(UserController.class);
}
