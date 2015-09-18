package com.dreamwork.spring.user.controller.forum;

import com.dreamwork.spring.db.annotation.PrimaryKey;

/**
 * Created by apple on 15/9/16.
 */
public class Topic {

    @PrimaryKey
    Integer id ;

    int userId;
    int stype;
    String title;
    String topicContent;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getStype() {
        return stype;
    }

    public void setStype(int stype) {
        this.stype = stype;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTopicContent() {
        return topicContent;
    }

    public void setTopicContent(String topicContent) {
        this.topicContent = topicContent;
    }
}
