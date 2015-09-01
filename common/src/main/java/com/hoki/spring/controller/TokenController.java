package com.hoki.spring.controller;

import com.google.common.base.Strings;
import com.hoki.spring.base.TokenUtil;
import jodd.datetime.JDateTime;
import jodd.util.Base64;
import jodd.util.StringBand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 * Created by Hoki.
 * Date:2015/3/25 0025
 * Time:下午 5:07
 */
@Controller
public class TokenController {

    @Autowired
    TokenUtil tokenUtil;
    @ResponseBody
    @RequestMapping(value = "/a",method = RequestMethod.GET )
    public String getToken( @RequestParam(required=true,value = "id") String userID,HttpServletRequest request,
                            HttpServletResponse response) {
        return tokenUtil.getToken(new Date().getTime(), userID);
    }

}
