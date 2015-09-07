package com.hoki.spring.dbutil;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import javax.annotation.Resource;
import javax.sql.DataSource;


/**
 * martin
 * 来自：http://blog.csdn.net/luyuncsd123/article/details/8444671
 * 此类为静态类,注意使用顺序,datasource在ConfigInfo中注入
 */
public class JdbcUtils {
    private static DataSource ds;
    private static JdbcTemplate jdbcTemplate;
    private static ThreadLocal<Connection> tl = new ThreadLocal<Connection>();  //map

    /**
     * 初始化数据库连接
     */
    public static void initDatasource(DataSource dataSource){
        ds = dataSource;
    }

    public static void initJdbcTemplate(JdbcTemplate template ){ jdbcTemplate = template ; };

    public static DataSource getDataSource(){
        return ds;
    }

    public static Connection getConnection() throws SQLException{
        try{
            //得到当前线程上绑定的连接
            Connection conn = tl.get();
            if(conn==null){  //代表线程上没有绑定连接
                conn = ds.getConnection();
                tl.set(conn);
            }
            return conn;
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public static void startTransaction(){
        try{
            //得到当前线程上绑定连接开启事务
            Connection conn = tl.get();
            if(conn==null){  //代表线程上没有绑定连接
                conn = ds.getConnection();
                tl.set(conn);
            }
            conn.setAutoCommit(false);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public static void commitTransaction(){
        try{
            Connection conn = tl.get();
            if(conn!=null){
                conn.commit();
            }
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static void closeConnection(){
        try{
            Connection conn = tl.get();
            if(conn!=null){
                conn.close();
            }
        }catch (Exception e) {
            throw new RuntimeException(e);
        }finally{
            tl.remove();   //千万注意，解除当前线程上绑定的链接（从threadlocal容器中移除对应当前线程的链接）
        }
    }

    /**
     * 替换sql中的table name
     */
    public static String fixTableName(String sql , String tableName){
        return String.format(sql , tableName);
    }

    /**
     * 公共方法 start - 开始
     */
    /**插入*/
    public static Object[] insert(String sql , Object ... params) throws SQLException {
        QueryRunner runner = new QueryRunner(JdbcUtils.getDataSource());
        Object[] update = runner.insert(sql,new ArrayHandler(), params);
        return update;
    }

    /**查询**/
    public static List query(String sql , RowMapper mapper , Object ... params ){
        List query = jdbcTemplate.query(sql, params, mapper);
        return query;
    }
    /**
     * 公共方法end
     */

}