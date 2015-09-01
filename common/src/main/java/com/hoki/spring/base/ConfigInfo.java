package com.hoki.spring.base;


import com.hoki.spring.dbutil.JdbcUtils;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;

/**
 * Created by Hoki.
 * Date:2015/4/10 0010
 * Time:下午 11:42
 */
@Component
public class ConfigInfo implements InitializingBean{


    @Value("${app.url}")
    public String appUrl;

    public String getAppUrl() {
        return appUrl;
    }

    public void setAppUrl(String appUrl) {
        this.appUrl = appUrl;
    }

    @Autowired
    DataSource dataSource;

    /**
     * 初始化数据库jdbcUtil
     * @throws Exception
     */
    @Override
    public void afterPropertiesSet() throws Exception {
        JdbcUtils.initDatasource(dataSource);
    }
}
