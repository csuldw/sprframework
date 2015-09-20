package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.spring.db.JDBCBaseDao;
import com.dreamwork.spring.user.controller.SybResponse;
import com.dreamwork.spring.user.controller.forum.entity.Topic;
import com.dreamwork.spring.user.controller.forum.entity.TopicReply;
import org.codehaus.jackson.map.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.io.IOException;

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
    public ModelAndView add(@PathVariable Long id , ModelAndView model) {

        Topic topic = jdbc.queryById(Topic.class, id);

        try {
            model.addObject("topic" , topic);
            model.addObject("topic_json" , json.writeValueAsString(topic ));
        } catch (IOException e) {
            log.error("forum add error",e);
        }
        model.setViewName("forum/topic");
        return model;
    }


    Logger log = LoggerFactory.getLogger(Forum2Controller.class);

    @Autowired
    ObjectMapper json;

    @ResponseBody
    @RequestMapping(value="/forum/topic/reply/add/{topicId}" )
    public SybResponse addReply(@PathVariable Long topicId , TopicReply reply ){
        SybResponse rsp = new SybResponse();
        rsp.setSuccess(true);
        reply.setTopic_id( topicId.intValue() );
        dao.save(reply);
        return rsp;
    }
//    166
    /**
     * content:<p>adsfasdf <br>
     zx <br>
     cv <br>
     xz <br>
     cv <br>
     zx <br>
     v
     */
}
