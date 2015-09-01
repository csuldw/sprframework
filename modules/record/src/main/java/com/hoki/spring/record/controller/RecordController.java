package com.hoki.spring.record.controller;

import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.hoki.spring.award.service.ActivityService;
import com.hoki.spring.award.service.QRSNService;
import com.hoki.spring.base.TokenUtil;
import com.hoki.spring.record.domain.Rank;
import com.hoki.spring.record.domain.Record;
import com.hoki.spring.record.service.RecordService;
import jodd.datetime.JDateTime;
import jodd.util.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:下午 12:34
 */
@Controller
@RequestMapping("/record")
public class RecordController {
    @Autowired
    TokenUtil tokenUtil;
    @Autowired
    RecordService recordService;
    @Autowired
    ActivityService activityService;
    @Autowired
    QRSNService qrsnService;
    @ResponseBody
    @RequestMapping(value ="/s")
    public boolean saveScore(@RequestParam(value = "es",required = true)String enscore,
                             @RequestParam(value = "t",required = true)String token,
                             @RequestParam(required=true,value = "appid") Integer appid,
                             @RequestParam(value = "u",required = true)String userId,HttpServletRequest request,
                             HttpServletResponse response){
        if(tokenUtil.validToken(token,userId)){
            JDateTime date =new JDateTime();
            long score= Long.parseLong(Base64.decodeToString(enscore));
            //保存数据库
            Record record = new Record();
            String sn=activityService.getAwardSn(appid, score, date.convertToDate());
            record.setSn(sn);
            record.setAppid(appid);
            record.setScore(score);
            record.setUserid(userId);
            record.setCreatTime(date.toString("YYYY-MM-DD hh:mm:ss"));
            return  recordService.saveScore(record);
        }
        return false;
    }
    @ResponseBody
    @RequestMapping("/top")
    public List<Rank> getRank(@RequestParam(value = "topn",required = false)Integer topn,@RequestParam(value = "appid",required = true)Integer appid,HttpServletRequest request,
                              HttpServletResponse response){
        PageBounds pageBounds= new PageBounds(1,topn);
        return recordService.getRank(appid, pageBounds);
    }

    @ResponseBody
    @RequestMapping("/user/{userid}")
    public List<Record> getMyRecord(@PathVariable String userid,@RequestParam(value = "topn",required = false)Integer topn,@RequestParam(value = "appid",required = true)Integer appid,HttpServletRequest request,
                                HttpServletResponse response){
        PageBounds pageBounds= new PageBounds(1,topn, Order.formString("score.desc"));
        return recordService.getRecord(userid,appid,pageBounds);
    }

}
