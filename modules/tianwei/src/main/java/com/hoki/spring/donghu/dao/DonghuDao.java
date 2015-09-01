package com.hoki.spring.donghu.dao;

import com.hoki.spring.dbutil.JdbcUtils;
import com.hoki.spring.donghu.domain.DonghuRecord;
import com.hoki.spring.tianwei.dao.TianweiDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by martin on 2015/8/11.
 */
@Repository
public class DonghuDao {

    @Autowired
    TianweiDao dao;

    String TABLE_NAME = "t_tianwei_donghu";

    public DonghuRecord addRecord(DonghuRecord r){
        try {
            String s = "insert into %s(child_name , child_age , parent , mobile , attend ) values(?,?,?,?,?)";
            String sql = JdbcUtils.fixTableName(s, TABLE_NAME);

            Object[] ids = dao.insert(sql, r.getChild_name(), r.getChild_age(), r.getParent(), r.getMobile(), r.getAttend());
            if (ids != null && ids.length > 0) {
                r.setId((Long) ids[0]);
                return r;
            }
        }catch (Exception e ){

        }
        return null;
    }


}
