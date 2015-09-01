package com.hoki.spring.tianwei.controller;

import com.hoki.spring.tianwei.domain.QiniuToken;
import com.hoki.spring.tianwei.domain.ResponseMsg;
import com.qiniu.util.Auth;
import com.qiniu.util.StringMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by martin on 15/7/16.
 * 创建客户端上传的token
 */
@Controller
@RequestMapping(value = "/qiniu")
public class QiNiuController {

    String ACCESS_KEY = "VEY_f42Tf3lEIpeqkfb_6ZBhTGbkMwb3i39D15Wz";

    String SECRET_KEY = "CaE5Vf6Eoxv6SQ1laanO03FDCB3MUay8nxC-SpBd";

    Auth auth = Auth.create(ACCESS_KEY, SECRET_KEY);

    Logger log = LoggerFactory.getLogger(QiNiuController.class);

    // 简单上传，使用默认策略
    @ResponseBody
    @RequestMapping("/token")
    public QiniuToken getUpToken0(){

        String token = null;
        try {
            token = auth.uploadToken("tianwei");
        }catch (Exception e ){
            log.error("获取七牛token失败" ,e );
        }
        QiniuToken msg = new QiniuToken();
        msg.setUptoken(token);
        return msg;
    }

    // 覆盖上传
    private String getUpToken1(){
        return auth.uploadToken("bucket", "key");
    }

    // 设置指定上传策略
    private String getUpToken2(){
        return auth.uploadToken("bucket", null, 3600, new StringMap()
                .put("callbackUrl", "call back url").putNotEmpty("callbackHost", "")
                .put("callbackBody", "key=$(key)&hash=$(etag)"));
    }

}
