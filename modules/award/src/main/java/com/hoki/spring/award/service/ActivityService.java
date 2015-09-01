package com.hoki.spring.award.service;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.hoki.spring.award.domain.Activity;
import com.hoki.spring.award.domain.SN;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/11 0011
 * Time:上午 12:19
 */
public interface ActivityService {
    /**
     * 获取满足活动奖励奖励sn码
     * @param appid
     * @param score
     * @param date
     * @return
     */
    public String getAwardSn(int appid,long score,Date date);


    /**
     * 创建活动
     * @param activity
     * @return
     */
    public int createAct(Activity activity);

    /**
     * 修改活动
     * @param activity
     * @return
     */
    public int updateAct(Activity activity);

    /**
     * 活动列表
     *  @param userid
     * @return
     */
    public List<Activity> getActivities(String userid,PageBounds pageBounds);

}
