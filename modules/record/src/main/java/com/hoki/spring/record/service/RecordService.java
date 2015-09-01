package com.hoki.spring.record.service;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.hoki.spring.record.domain.Rank;
import com.hoki.spring.record.domain.Record;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:下午 12:35
 */
public interface RecordService {
    /**
     * 保存得分
     * @param record
     * @return
     */
    public boolean saveScore(Record record);

    /**
     * 获取比赛排行
     * @param appid
     * @param pageBounds
     * @return
     */
    public List<Rank> getRank(int appid,PageBounds pageBounds);


    /**
     * 获取比赛记录
     * @param userid
     * @param appid
     * @param pageBounds
     * @return
     */
    public List<Record> getRecord(String userid,int appid,PageBounds pageBounds);
}
