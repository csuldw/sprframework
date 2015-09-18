package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.spring.db.JDBCBaseDao;
import com.dreamwork.syb.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by apple on 15/9/17.
 */
@Repository
public class TopicRepository extends JDBCBaseDao{

//    @Autowired
//    JDBCBaseDao dao ;

    public Topic save(Topic topic){
        Integer save = super.save(topic);
        topic.setId(save ) ;

        return topic;
    }

}
