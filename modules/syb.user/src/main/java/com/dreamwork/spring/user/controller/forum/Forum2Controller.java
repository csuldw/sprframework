package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.spring.db.JDBCBaseDao;
import com.dreamwork.spring.user.controller.SybResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by apple on 15/9/15.
 */
@Controller
public class Forum2Controller {

    @Autowired
    TopicRepository dao;

    @Autowired
    JDBCBaseDao jdbc;

    @ResponseBody
    @RequestMapping(value="/forum/topic/add" )
    public SybResponse add(Topic topic){

        Topic save = dao.save(topic);

        /**
         stype:2
         title:30hou nihao
         topicContent:
         */
        SybResponse s = new SybResponse();
        s.setStr("166");//返回成功的页面地址id
        s.setSuccess(true);
        return s;
    }

    @RequestMapping(value="/forum/topic/get/{id}" )
    public String add(Long id , ModelAndView model) {

        Topic topic = jdbc.queryById(Topic.class, id);
        model.addObject("topic",topic);
        return "forum/topic";
    }

}
