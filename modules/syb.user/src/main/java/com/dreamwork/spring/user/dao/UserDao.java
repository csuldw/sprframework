package com.dreamwork.spring.user.dao;

import com.dreamwork.syb.domain.user.User;
import com.hoki.spring.dbutil.JdbcUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

/**
 * Created by apple on 15/9/7.
 */
@Repository
public class UserDao {

    Logger log = LoggerFactory.getLogger(UserDao.class);

    String TABLE_NAME = "t_syb_user";

    /**
     * insert 用dbutil ,方便返回自增id
     */
    public User insertRecord(User r){
        String s = "insert into %s( username , password ,email) values(?,? , ?)";
        String sql = JdbcUtils.fixTableName(s, TABLE_NAME);

        Object[]ids = new Object[0];
        try {
            ids = JdbcUtils.insert(sql, r.getUsername(), r.getPassword(), r.getEmail());
            if(ids!= null && ids.length > 0){
                r.setId((Long)ids[0]);
                return r;
            }
        } catch (SQLException e) {
            log.error("插入用户失败",e);
        }
        return null;
    }

    BeanPropertyRowMapper<User> argTypes = new BeanPropertyRowMapper<User>(User.class);

    public User queryRecord(String username , String password){
        String s = "select * from %s where email = ? and password = ?";

        List<User> query = JdbcUtils.query(JdbcUtils.fixTableName(s, TABLE_NAME),
                argTypes, username, password
        );

        if(query != null){
            log.info("query user list : {}" , query.size());
            return query.get(0);
        }
        log.info("query user list : 0" );

        return null;
    }


}
