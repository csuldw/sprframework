package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.spring.db.JDBCBaseDao;
import com.dreamwork.spring.user.controller.forum.entity.Topic;
import com.dreamwork.spring.user.controller.forum.entity.TopicReply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

/**
 * Created by apple on 15/9/17.
 */
@Repository
public class TopicRepository {

    @Autowired
    JDBCBaseDao dao ;

    public Topic save(Topic topic){
        Integer save = dao.save(topic);
        topic.setId(save ) ;

        return topic;
    }

    public TopicReply save(TopicReply reply){
        Integer save = dao.save(reply);
        reply.setId(save);
        return reply;
    }

}
