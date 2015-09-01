package com.hoki.spring.record.dao;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.hoki.spring.record.domain.Rank;
import com.hoki.spring.record.domain.Record;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:下午 12:34
 */
@Repository(value="recordMapper")
public interface RecordMapper {
    public int saveScore(Record record);
    public List<Rank> getRank(@Param("appid")int appid,PageBounds pageBounds);
    public List<Record> getRecordByUserid(@Param("userid")String userid,@Param("appid")int appid,PageBounds pageBounds);
}
