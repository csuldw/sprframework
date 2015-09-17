package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.syb.domain.user.User;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

/**
 * Created by apple on 15/9/17.
 */
public interface TopicRepository extends CrudRepository {

    List<User> findByEmailAndPassword(String email , String password);

}
