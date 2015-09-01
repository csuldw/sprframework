package com.hoki.spring.dbutil;

import java.sql.Connection;
import java.sql.SQLException;
import javax.sql.DataSource;


/**
 * martin
 * 来自：http://blog.csdn.net/luyuncsd123/article/details/8444671
 * 此类为静态类,注意使用顺序,datasource在ConfigInfo中注入
 */
public class JdbcUtils {
    private static DataSource ds;

    private static ThreadLocal<Connection> tl = new ThreadLocal<Connection>();  //map

    /**
     * 初始化数据库连接
     */
    public static void initDatasource(DataSource dataSource){
        ds = dataSource;
    }

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
}