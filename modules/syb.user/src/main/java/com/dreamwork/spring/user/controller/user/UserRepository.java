package com.dreamwork.spring.user.controller.user;

import com.dreamwork.syb.domain.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by apple on 15/9/17.

public interface UserRepository extends CrudRepository<User , Long> {

    List<com.dreamwork.syb.domain.user.User> findByEmailAndPassword(String email , String password);

} */
