package com.hoki.spring.award.service.impl;

import com.google.common.collect.Lists;
import com.hoki.spring.award.dao.SnPoolMapper;
import com.hoki.spring.award.domain.CheckInfo;
import com.hoki.spring.award.domain.SN;
import com.hoki.spring.award.service.QRSNService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:上午 11:47
 */
@Service
public class QRSNserviceImpl implements QRSNService {

    @Autowired
    SnPoolMapper snPoolMapper;
    @Override
    public int validSN(String sn) {
        int count=snPoolMapper.getCount(sn);
        if (count==1){
            snPoolMapper.updateSnStatus(sn, -1);
            return 1;
        }else{
            return 0;
        }
    }

    @Override
    public int createSN(int appid,long awardScore,String award,int num) {
        List<SN> sns=new ArrayList<SN>();
        for (int i = 0; i <num; i++) {
            SN sn= new SN();
            sn.setAppid(appid);
            sn.setStatus(1);
            sn.setAwardScore(awardScore);
            sn.setAward(award);
            sn.setSn(UUID.randomUUID().toString());
            sns.add(sn);
        }
        return  snPoolMapper.insertSn(sns);
    }

    @Override
    public List<CheckInfo> getSNCheckList(int appid, int status) {
        return snPoolMapper.getSNCheck(appid,status);
    }

    @Override
    public SN getSNInfo(String sn) {
        return snPoolMapper.getSNInfo(sn);
    }


}
