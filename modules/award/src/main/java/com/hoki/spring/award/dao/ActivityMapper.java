package com.hoki.spring.award.dao;

import com.hoki.spring.award.domain.Activity;
import com.hoki.spring.award.domain.SN;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/11 0011
 * Time:上午 12:31
 */
@Repository
public interface ActivityMapper {
    public int insertAct(List<Activity> list);
    public Activity getActByAppId(@Param("appid")int appid);
    public  int updateAct(Activity appid);
    public List<Activity> getActByUserid(@Param("userid")String  userid);
}
