package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.spring.cache.impl.BaseCacheDaoImpl;
import org.springframework.stereotype.Service;

/**
 * Created by wujinyuan on 2015/9/17.
 */
@Service
public class TopicCache extends BaseCacheDaoImpl{


    /**
     * 返回topic对应数据库的id
     * @param data
     * @return
     */
    @Override
    public String generateDataCacheDataKey(Object data) {
        return "1";
    }
}
