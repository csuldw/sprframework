package com.hoki.spring.award.controller;

import com.hoki.spring.award.domain.CheckInfo;
import com.hoki.spring.award.domain.SN;
import com.hoki.spring.award.service.QRSNService;
import com.hoki.spring.base.ConfigInfo;
import net.glxn.qrgen.core.image.ImageType;
import net.glxn.qrgen.javase.QRCode;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:上午 11:13
 */
@Controller
public class QRSNController {

    private static final Logger LOGGER= org.slf4j.LoggerFactory.getLogger(QRSNController.class);
    @Autowired
    QRSNService qrsnService;
    @Autowired
    ConfigInfo configInfo;
    @RequestMapping(value = "/qrcode", method = RequestMethod.GET)
    public void getQRcode(@RequestParam(required = true, value = "sn") String sn, HttpServletRequest request,
                           HttpServletResponse response) {
        String urlPrfix=configInfo.getAppUrl()+"/sn/validation?sn=";
        ByteArrayOutputStream out = QRCode.from(urlPrfix+sn).to(ImageType.JPG).stream();
        OutputStream os = null;
        try {
            os = response.getOutputStream();
            response.setContentType("image/JPG");
            response.setContentLength(out.size());
            os.write(out.toByteArray());
            os.flush();
        } catch (IOException e) {
            LOGGER.error("/qrcode has error:{}",e);
        } finally {
            try {
                os.close();
            } catch (IOException e) {
                LOGGER.error("os.close :{}",e);
            }

        }
    }
    @ResponseBody
    @RequestMapping(value = "/sn/validation")
    public String validSN(@RequestParam(required = true, value = "sn") String sn, HttpServletRequest request,
                         HttpServletResponse response) {
        int rs=qrsnService.validSN(sn);
        SN s = qrsnService.getSNInfo(sn);
        if(rs==1){
            return "已经成功兑换奖品: "+s.getAward();
        }else{
            return "奖品已经失效";
        }

    }


    @ResponseBody
    @RequestMapping(value = "/sn/generation", method = RequestMethod.POST)
    public int createSN(@RequestParam(required = true, value = "appid") Integer appid,
                        @RequestParam(required = true, value = "awardScore") Long awardScore,
                        @RequestParam(required = true, value = "award") String award,
                        @RequestParam(required = true, value = "num") Integer num, HttpServletRequest request,
                        HttpServletResponse response) {

        return qrsnService.createSN(appid, awardScore,award,num);

    }

    @ResponseBody
    @RequestMapping(value = "/sn/checkInfo", method = RequestMethod.GET)
    public List<CheckInfo> getCheckInfo(@RequestParam(required = true, value = "appid") Integer appid,
                                        @RequestParam(required = true, value = "status") Integer status, HttpServletRequest request,
                        HttpServletResponse response) {
        return qrsnService.getSNCheckList(appid, status);
    }

}
