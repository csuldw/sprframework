package com.dreamwork.spring.eqs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by apple on 15/9/13.
 */
@Controller
public class TplPageController {

    @ResponseBody
    @RequestMapping(value="/base/class/tpl_page", produces = "application/json;charset=UTF-8")
    public String tplPage(){
        return "{\"success\":true,\"code\":200,\"msg\":\"operation successfully completed\",\"obj\":null,\"map\":null,\"list\":[{\"id\":16630,\"name\":\"版式\",\"value\":\"1101\",\"type\":\"tpl_page\",\"sort\":1,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"},{\"id\":16632,\"name\":\"风格\",\"value\":\"1103\",\"type\":\"tpl_page\",\"sort\":2,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"},{\"id\":16631,\"name\":\"互动\",\"value\":\"1102\",\"type\":\"tpl_page\",\"sort\":3,\"status\":1,\"remark\":null,\"lang\":\"zh_CN\",\"scope\":\"all\"}]}";
    }

}
