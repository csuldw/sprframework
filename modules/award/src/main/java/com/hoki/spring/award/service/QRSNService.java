package com.hoki.spring.award.service;

import com.hoki.spring.award.domain.CheckInfo;
import com.hoki.spring.award.domain.SN;

import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:上午 11:47
 */
public interface QRSNService {
    /**
     *验证sn
     * @return 0无效 1有效
     */
    public int validSN(String sn);
    /**
     * 生成sn
     * @param appid
     * @param awardScore
     * @param award
     * @param num
     * @return
     */
    public int createSN(int appid,long awardScore,String award,int num);

    /**
     * 获取指定活动状态的sn
     * @param appid
     * @param status
     * @return
     */
    public List<CheckInfo> getSNCheckList(int appid,int status);

    /**
     * 获取sn详情
     * @param sn
     * @return
     */
    public SN getSNInfo(String sn);

}
