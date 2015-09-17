package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.spring.user.controller.SybResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by apple on 15/9/15.
 */
@Controller
public class Forum2Controller {

    @ResponseBody
    @RequestMapping(value="/forum/topic/add" )
    public SybResponse add(Topic topic){


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
}
