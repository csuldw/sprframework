package com.hoki.spring.tianwei.controller;

import com.hoki.spring.tianwei.dao.CacheDao;
import com.hoki.spring.tianwei.dao.TianweiDao;
import com.hoki.spring.tianwei.domain.ResponseMsg;
import com.hoki.spring.tianwei.domain.TianweiRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.concurrent.ConcurrentMapCache;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import sun.misc.Cache;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ConcurrentSkipListSet;

/**
 * Created by martin on 2015/7/13.
 微信登陆
 点赞接口（控制一天一次）
 点赞排行？
 所有参加活动用户列表接口
 获取单用户参加活动详细信息接口
 图片上传
 */
@Controller
@RequestMapping(value = "/tianwei")
public class TianweiController {

    Logger log = LoggerFactory.getLogger(TianweiController.class);

    @Autowired
    TianweiDao dao;

    @Autowired
    CacheDao cache;

    @ResponseBody
    //@RequestMapping("/add")
    public ResponseMsg insertRecord(TianweiRecord r){;//String open_id , String phone_num , String old_pic, String new_pic , String blessing , String user_name){
        TianweiRecord exists = dao.queryByOpenId(r.getOpen_id());
        TianweiRecord o = null;
        if( exists == null) {
            o = dao.insertRecord(r);
            return returnObj(o);
        }else{
            boolean b = dao.updateRecord(r);
            if(b)
                return returnObj(r);
            else
                return returnObj(null);
        }
    }

    @ResponseBody
    @RequestMapping("/my")
    public ResponseMsg query(String open_id){;//String open_id , String phone_num , String old_pic, String new_pic , String blessing , String user_name){
        TianweiRecord exists = dao.queryByOpenId(open_id);
        return returnObj(exists);
    }

    //全部活动
    @ResponseBody
    @RequestMapping("/list")
    public ResponseMsg list(Integer sort , Integer start , Integer end){
        if(sort == null ) sort = 0;
        if(start == null ) start = 0;
        if(end == null || end > 4) end = 4;
        List rs = cache.queryList(sort , start , end);

        ResponseMsg r = new ResponseMsg();
        r.setRs(true);
        r.setData(rs);
        return r;
    }

    //点赞的cache
    HashMap<Integer , HashSet<String>> favourCache = new HashMap<Integer, HashSet<String>>();

    //点赞接口
    //op@ResponseBody
    //@RequestMapping("/{id}/favour")
    public ResponseMsg favour(@PathVariable Integer id , String open_id){
        if( open_id != null ) {
            if (favourCache.get(id) == null) {
                favourCache.put(id, new HashSet<String>());
            }

            if (!favourCache.get(id).contains(open_id)) {
                TianweiRecord o = dao.favour(id);
                favourCache.get(id).add(open_id);
                return returnObj(o);
            }
        }
        ResponseMsg r = new ResponseMsg();
        r.setRs(false);
        r.setMsg("您已经点赞过了");
        return r;
    }

    //查询单个用户
    @ResponseBody
    @RequestMapping("/{id}/detail")
    public ResponseMsg detail(@PathVariable Integer id){
       TianweiRecord o = dao.queryDetail(id);
       return returnObj(o);
    }

    private ResponseMsg returnObj(Object o){
        ResponseMsg r = new ResponseMsg();
        r.setRs(o!=null?true:false);
        r.setData(o);
        return r;
    }

    @Scheduled(cron="0 0 0 * * ?")   //每天0点触发
    public void clearCache(){
        log.info("清空点赞列表");
        favourCache.clear();
    }
}
