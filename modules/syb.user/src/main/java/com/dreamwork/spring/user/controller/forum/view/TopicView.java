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
    List<TopicReply> replys;
    int counts; //评论数

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getCounts() {
        return counts;
    }

    public void setCounts(int counts) {
        this.counts = counts;
    }

    public List<TopicReply> getReplys() {
        return replys;
    }

    public void setReplys(List<TopicReply> replys) {
        this.replys = replys;
    }
}
