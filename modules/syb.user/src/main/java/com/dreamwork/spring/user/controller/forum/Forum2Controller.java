package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.spring.db.JDBCBaseDao;
import com.dreamwork.spring.db.pojos.PageInfo;
import com.dreamwork.spring.db.pojos.PaginationResult;
import com.dreamwork.spring.db.pojos.SQLCondition;
import com.dreamwork.spring.user.controller.SybResponse;
import com.dreamwork.spring.user.controller.forum.entity.Topic;
import com.dreamwork.spring.user.controller.forum.entity.TopicReply;
import com.dreamwork.spring.user.controller.forum.view.TopicView;
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
import java.util.LinkedList;
import java.util.List;

/**
 * Created by apple on 15/9/15.
 */
@Controller
@RequestMapping("forum")
public class Forum2Controller {

    @Autowired
    TopicRepository dao;

    @Autowired
    JDBCBaseDao jdbc;

    @ResponseBody
    @RequestMapping(value="topic/add" )
    public SybResponse add(Topic topic){

        Topic save = dao.save(topic);

        /**
         stype:2
         title:30hou nihao
         topicContent:
         */
        SybResponse s = new SybResponse();
        s.setStr(save.getId() + "");//返回成功的页面地址id
        s.setSuccess(true);
        return s;
    }

    /**获取帖子**/
    @RequestMapping(value="topic/get/{id}" )
    public ModelAndView add(@PathVariable Long id , ModelAndView model) {

        Topic topic = jdbc.queryById(Topic.class, id);

        List<SQLCondition> where = new LinkedList<SQLCondition>();
        where.add(new SQLCondition("topicId", id ));
        List<TopicReply> replys = jdbc.queryForPageOrderList(TopicReply.class, where, new PageInfo(0, 10), "order by id desc ");

        TopicView view= new TopicView();
        view.setTopic(topic);
        view.setReplys(replys);

        try {
            model.addObject("view" , view);
            model.addObject("view_json" , json.writeValueAsString(view ));
        } catch (IOException e) {
            log.error("forum add error",e);
        }
        model.setViewName("forum/topic");
        return model;
    }

    /**获取帖子**/
    @RequestMapping(value="topic_add" )
    public ModelAndView topicAdd(ModelAndView model) {
        model.setViewName("forum/topic_add");
        return model;
    }

    @RequestMapping(value="list")
    public ModelAndView list(Integer page , ModelAndView model){

        PaginationResult<Topic> topics = jdbc.queryForPage(Topic.class, null, new PageInfo((page == null ? 0 : page * 10), 10), "order by id desc");
        model.addObject("topics",topics);
        try {
            model.addObject("topics_json", json.writeValueAsString(topics));
        } catch (IOException e) {
            log.error("forum add error",e);
        }
        model.setViewName("forum/list");

        return  model ;
    }

    Logger log = LoggerFactory.getLogger(Forum2Controller.class);

    @Autowired
    ObjectMapper json;

    /**添加回复,后面改redis*/
    @ResponseBody
    @RequestMapping(value="topic/reply/add/{topicId}" )
    public SybResponse addReply(@PathVariable Long topicId , TopicReply reply ){
        SybResponse rsp = new SybResponse();
        rsp.setSuccess(true);
        reply.setTopic_id( topicId.intValue() );
        dao.save(reply);
        return rsp;
    }

}
