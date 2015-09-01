package com.hoki.spring.tianwei.dao;

import com.hoki.spring.dbutil.JdbcUtils;
import com.hoki.spring.tianwei.domain.TianweiRecord;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by martin on 2015/7/13.
 */
@Repository
public class TianweiDao {

    Logger log = LoggerFactory.getLogger(TianweiDao.class);

    String TABLE_NAME = "t_tianwei_record";

    /**
     * 报名参加
     * open_id
     * phone_num
     * old_pic
     * new_pic
     * blessing 祝福
     * user_name
     * favour
     */
    public TianweiRecord insertRecord(TianweiRecord r){
        String s = "insert into %s(open_id , phone_num , old_pic , new_pic , blessing , user_name , favour) values(?,?,?,?,?,?,0)";
        String sql = JdbcUtils.fixTableName(s , TABLE_NAME);

        Object[]ids = insert(sql , r.getOpen_id() , r.getPhone_num() , r.getOld_pic() , r.getNew_pic() , r.getBlessing() , r.getUser_name());
        if(ids!= null && ids.length > 0){
            r.setId((Long)ids[0]);
            return r;
        }
        return null;
    }

    //更新内容
    public boolean updateRecord(TianweiRecord r){
        String s = "update %s set phone_num=?, old_pic=?, new_pic=?, blessing =?, user_name =? where open_id = ?";
        String sql = JdbcUtils.fixTableName(s , TABLE_NAME);

        return update(sql , r.getPhone_num() , r.getOld_pic() , r.getNew_pic() , r.getBlessing() , r.getUser_name() , r.getOpen_id() );
    }

    /*** 查询全部结果集    */
    public List queryList(Integer sort , Integer start , Integer end){
        String s1 = "select * from %s order by favour desc limit ? , ?";//点赞最多
        String s2 = "select * from %s limit ? , ?";//编号排序
        String s3 = "select * from %s order by id desc limit ? , ?";//最新上传

        //排序切换sql语句
        String sql = s1;
        switch (sort){
            case 1:{
                sql = s2;
                break;
            }case 2:{
                sql = s3;
                break;
            }
        }

        sql = JdbcUtils.fixTableName(sql , TABLE_NAME);

        try {
            QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
            List list = runner.query(sql,new ArrayListHandler(), start , end );//如需要实体映射,参考new BeanListHandler(User.class)
            return list;
        }catch (Exception e ){
           log.error("查询天威数据库报错",e);
        }
        return new ArrayList();
    }

    /*** 查询单个用户  */
    public TianweiRecord queryDetail(Integer id ){
        String sql = JdbcUtils.fixTableName("select * from %s where id = ?", TABLE_NAME);
        return queryOne( sql , id );
    }

    /*** 根据open_id查询 */
    public TianweiRecord queryByOpenId(String open_id){
        String sql = String.format("select * from %s where open_id = ?", TABLE_NAME );
        return queryOne( sql , open_id);
    }

    /*** 点赞  */
    public TianweiRecord favour(Integer id){
        TianweiRecord r = queryDetail(id);
        String s = "update %s set favour = ? where id = ?";
        String sql = JdbcUtils.fixTableName(s , TABLE_NAME);
        update(sql , (r.getFavour()+1) , id);

        r.setFavour(r.getFavour()+1);
        return r;
    }

    /**插入*/
    public Object[] insert(String sql , Object ... params){
        try {
            QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());

            Object[] update = runner.insert(sql,new ArrayHandler(), params);
            return update;
        }catch (Exception e) {
            log.error("插入天威数据库错误",e);
        }
        return null;
    }

    /**更新*/
    protected boolean update(String sql , Object ... params){
        try {
            QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());

            int update = runner.update(sql, params);
            if(update > 0 )
                return true;
        }catch (Exception e) {
            log.error("插入天威数据库错误",e);
        }
        return false;
    }

    /*** 通过sql查询  */
    protected TianweiRecord queryOne(String sql , Object ... param){
        try {
            QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
            TianweiRecord rs= (TianweiRecord)runner.query(sql,new BeanHandler(TianweiRecord.class) , param);//如需要实体映射,参考new BeanListHandler(User.class)
            return rs;
        }catch (Exception e ){
            log.error("查询天威数据库报错",e);
        }
        return null;
    }

}
