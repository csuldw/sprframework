package com.hoki.spring.award.dao;

import com.hoki.spring.award.domain.CheckInfo;
import com.hoki.spring.award.domain.SN;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:下午 2:32
 */
@Repository(value="snPoolMapper")
public interface SnPoolMapper {
    public int insertSn(List<SN> list);
    public int updateSnStatus(@Param("sn")String sn,@Param("status")int status);
    public int getCount(String sn);
    public List<CheckInfo> getSNCheck(@Param("appid")int appid,@Param("status")int status);
    public SN getSNInfo(@Param("sn")String sn);
    public String getMaxScoreSN(@Param("appid")int appid,@Param("score")long score);
}
