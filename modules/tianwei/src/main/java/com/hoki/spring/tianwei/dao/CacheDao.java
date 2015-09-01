package com.hoki.spring.tianwei.dao;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;


/**
 * Created by martin on 2015/7/20.
 */
@Component
public class CacheDao implements InitializingBean{

    Logger log = LoggerFactory.getLogger(CacheDao.class);
    @Autowired
    TianweiDao dao;

    List favourList;
    List byIdList;
    List newList;

    /**
     * 按点赞数排列
     */
        //每隔30秒查询数据库,降低查询压力
    @Scheduled(fixedRate=10000)
    public void queryByFavor(){
        log.info("更新查询列表task执行中");
        favourList = dao.queryList( 0 , 0 , 80);
        byIdList = dao.queryList(1 , 0 , 80);
        newList = dao.queryList(2 , 0 , 80);
    }

    /*** 查询全部结果集    */
    public List queryList(Integer sort , Integer start , Integer end){
       List rs = favourList;

        //排序切换sql语句
        switch (sort){
            case 1:{
                rs = byIdList;
                break;
            }case 2:{
                rs = newList;
                break;
            }
        }
        if(rs.size() > start + end){                    //缓存命中，返回
            return rs.subList(start , start + end );
        }else{
            return dao.queryList(sort , start , end );  //缓存没命中，直接查数据库
        }
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        queryByFavor();
    }
}
