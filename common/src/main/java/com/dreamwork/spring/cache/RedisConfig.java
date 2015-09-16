package com.dreamwork.spring.cache;

import com.dreamwork.spring.util.PropertiesUtil;

import java.io.IOException;
import java.util.Properties;

/**
 * Created by xin.fang on 15-1-22.
 */
public class RedisConfig {

    private static Properties properties;

    static {
        try {
            properties = PropertiesUtil.loadProperties("classpath:redis.properties");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static String getConfig(String key) {
        return properties.getProperty(key);
    }


}
