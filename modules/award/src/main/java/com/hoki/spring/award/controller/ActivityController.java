package com.hoki.spring.award.controller;

import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.hoki.spring.award.domain.Activity;
import com.hoki.spring.award.service.ActivityService;
import com.hoki.spring.award.service.QRSNService;
import com.hoki.spring.base.ConfigInfo;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/11 0011
 * Time:上午 12:14
 */
@Controller
@RequestMapping(value = "/activity")
public class ActivityController {

    private static final Logger LOGGER= org.slf4j.LoggerFactory.getLogger(ActivityController.class);
    @Autowired
    ActivityService activityService;
    @Autowired
    ConfigInfo configInfo;

    @ResponseBody
    @RequestMapping(value = "/generation",method = RequestMethod.POST)
    public int createAct(
                         @RequestParam(required = true, value = "start")String start,
                         @RequestParam(required = true, value = "end")String end,
                         @RequestParam(required = true, value = "rule")String rule,
                         @RequestParam(required = true, value = "title") String title,
                         @RequestParam(required = true, value = "imageUrl") String imageUrl,
                          HttpServletRequest request,
                          HttpServletResponse response) {
                    Activity activity = new Activity( start,end, rule, title, imageUrl);
        return activityService.createAct(activity);
    }


    @ResponseBody
    @RequestMapping(value = "/list",method = RequestMethod.GET)
    public List<Activity> list(
            @RequestParam(required = true, value = "userid")String userid,
            @RequestParam(required = false, value = "page")int page,
            @RequestParam(required = false, value = "limit")int limit,
            HttpServletRequest request,
            HttpServletResponse response) {
        PageBounds pageBounds= new PageBounds(page,limit);
        return activityService.getActivities(userid,pageBounds);
    }

    @ResponseBody
    @RequestMapping(value = "/updation",method = RequestMethod.POST)
    public int updateAct(
                           @RequestParam(required = true, value = "id")long id,
                           @RequestParam(required = true, value = "start")String start,
                           @RequestParam(required = true, value = "end")String end,
                           @RequestParam(required = true, value = "rule")String rule,
                           @RequestParam(required = true, value = "title") String title,
                           @RequestParam(required = true, value = "imageUrl") String imageUrl,
                           HttpServletRequest request,
                           HttpServletResponse response
            ){
        Activity activity = new Activity( id,start,end, rule, title, imageUrl);
        return activityService.updateAct(activity);
    }
}
