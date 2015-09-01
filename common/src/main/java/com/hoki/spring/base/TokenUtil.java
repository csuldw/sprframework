package com.hoki.spring.base;

import jodd.datetime.JDateTime;
import jodd.util.Base64;
import jodd.util.StringBand;
import jodd.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by Hoki.
 * Date:2015/3/26 0026
 * Time:上午 11:55
 */
@Component
public final class TokenUtil {
    //私钥
    private final static String PRIKEY="hokihoki";
    private final static String SPRI=",";
    //token失效时间为10分钟
    private final static long EXPIRE=600000;
    //token只可用一次

    public String getToken(long dateTime,String userID){
        StringBand stringBand = new StringBand();
        stringBand.append(dateTime).append(SPRI).append(userID).append(SPRI).append(PRIKEY).append(SPRI);
        return Base64.encodeToString(stringBand.toString());
    }

    public boolean validToken(String token,String  userID){
        String stringBand = Base64.decodeToString(token);
        String[] strs=stringBand.split(SPRI);
        long vaLong=Long.parseLong(strs[0]);
        long dateLong=new Date().getTime();
        if (strs.length>2&&StringUtil.equals(String.valueOf(userID),strs[1])&&StringUtil.equals(strs[2],PRIKEY)&&vaLong> dateLong-EXPIRE){
               return true;
        }else{
            return false;
        }
    }

}
