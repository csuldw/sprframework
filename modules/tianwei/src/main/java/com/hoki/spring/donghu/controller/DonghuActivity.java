package com.hoki.spring.donghu.controller;

import com.hoki.spring.donghu.dao.DonghuDao;
import com.hoki.spring.donghu.domain.DonghuRecord;
import com.hoki.spring.tianwei.domain.ResponseMsg;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by martin on 2015/8/11.
 *
 * 东湖湖东报名
 */
@Controller
public class DonghuActivity {

    @Autowired
    DonghuDao dao ;

    Logger log = LoggerFactory.getLogger(DonghuActivity.class);

    @RequestMapping("/donghu/add")
    @ResponseBody
    public ResponseMsg add(DonghuRecord r){
        ResponseMsg msg = new ResponseMsg();
        try {
            DonghuRecord donghuRecord = dao.addRecord(r);
            msg.setRs(donghuRecord != null);
            msg.setData(donghuRecord);
        }catch (Exception e ){
            log.error("东湖报名出错",e);
            msg.setRs(false);
            msg.setMsg("数据库错误" + e.getMessage());
        }
        return msg;
    }

}
