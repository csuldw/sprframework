package com.hoki.spring.record.service.impl;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.hoki.spring.record.dao.RecordMapper;
import com.hoki.spring.record.domain.Rank;
import com.hoki.spring.record.domain.Record;
import com.hoki.spring.record.service.RecordService;
import jodd.datetime.JDateTime;
import jodd.datetime.format.JdtFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:下午 12:35
 */
@Service
public class RecordServiceImpl implements RecordService {
    @Autowired
    RecordMapper recordMapper;

    @Override
    public boolean saveScore(Record record) {
        if (recordMapper.saveScore(record) > 0) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<Rank> getRank(int appid, PageBounds pageBounds) {
        List<Rank> rs = recordMapper.getRank(appid, pageBounds);
        List<Rank> enrs = new ArrayList<Rank>();
        for (Rank r : rs) {
            r.setUserid(encodeUserId(appid, r.getUserid()));
            enrs.add(r);
        }
        return enrs;
    }

    @Override
    public List<Record> getRecord(String userid, int appid, PageBounds pageBounds) {
        List<Record> rs = recordMapper.getRecordByUserid(userid, appid, pageBounds);
        List<Record> enrs = new ArrayList<Record>();
        for (Record r : rs) {
            r.setUserid(encodeUserId(appid, userid));
            enrs.add(r);
        }
        return enrs;
    }

    public String encodeUserId(int appid,String userid) {
        if(appid!=3){
            StringBuffer sb = new StringBuffer();
            sb.append(userid.substring(0, 3));
            sb.append("****");
            sb.append(userid.substring(7, 11));
            return sb.toString();
        }else {
            return userid;
        }
    }

}
