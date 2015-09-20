package com.dreamwork.spring.user.controller.forum.view;

import com.dreamwork.spring.user.controller.forum.entity.Topic;
import com.dreamwork.spring.user.controller.forum.entity.TopicReply;
import com.dreamwork.syb.domain.user.User;

import java.util.List;

/**
 * Created by apple on 15/9/20.
 */
public class TopicView {
    Topic topic ;
    User user;
    List<TopicReply> comments;
    int counts; //评论数
}
