package com.dreamwork.spring.eqs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by apple on 15/9/13.
 */
@Controller
public class EqsSceneTypeController {

    @ResponseBody
    @RequestMapping(value="/base/class/scene_type" , produces = "application/json")
    public String list(){
        return "{\"success\":true,\"code\":200,\"msg\":\"operation successfully completed\",\"obj\":null,\"map\":null,\"list\":[{\"id\":16633,\"name\":\"行业\",\"value\":\"101\",\"type\":\"scene_type\",\"sort\":1,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"},{\"id\":16634,\"name\":\"个人\",\"value\":\"102\",\"type\":\"scene_type\",\"sort\":2,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"},{\"id\":16635,\"name\":\"企业\",\"value\":\"103\",\"type\":\"scene_type\",\"sort\":3,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"},{\"id\":16636,\"name\":\"节假\",\"value\":\"104\",\"type\":\"scene_type\",\"sort\":4,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"},{\"id\":16637,\"name\":\"风格\",\"value\":\"105\",\"type\":\"scene_type\",\"sort\":5,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"},{\"id\":26830,\"name\":\"品牌\",\"value\":\"106\",\"type\":\"scene_type\",\"sort\":6,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"}]}";
    }
}
