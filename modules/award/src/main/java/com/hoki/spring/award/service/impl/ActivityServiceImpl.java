package com.hoki.spring.award.service.impl;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.google.common.collect.Lists;
import com.hoki.spring.award.dao.ActivityMapper;
import com.hoki.spring.award.dao.SnPoolMapper;
import com.hoki.spring.award.domain.Activity;
import com.hoki.spring.award.service.ActivityService;
import jodd.datetime.JDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/11 0011
 * Time:上午 12:20
 */
@Service
public class ActivityServiceImpl implements ActivityService {

    @Autowired
    ActivityMapper activityMapper;
    @Autowired
    SnPoolMapper snPoolMapper;
    @Override
    public String getAwardSn(int appid, long score, Date date) {
        Activity activity = activityMapper.getActByAppId(appid);
        long awardScore = 20;
        long start = new JDateTime(activity.getStart()).getTimeInMillis();
        long end = new JDateTime(activity.getEnd()).getTimeInMillis();
        if (date.getTime() >= start && date.getTime() <= end) {
             String sn =snPoolMapper.getMaxScoreSN(appid, score);
            if(sn!=null){
                snPoolMapper.updateSnStatus(sn,0);
            }
            return sn;
        } else {
            return null;
        }

    }

    @Override
    public int createAct(Activity activity) {
        List<Activity> activities = Lists.newArrayList();
        activities.add(activity);
        return activityMapper.insertAct(activities);
    }

    @Override
    public int updateAct(Activity activity) {
        return activityMapper.updateAct(activity);
    }

    @Override
    public List<Activity> getActivities(String userid, PageBounds pageBounds) {

        return activityMapper.getActByUserid(userid);
    }


}
