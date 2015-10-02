package com.dreamwork.spring.user.controller.forum.entity;

import com.dreamwork.spring.db.annotation.PrimaryKey;

import java.util.Date;

/**
 * Created by apple on 15/9/16.
 */
public class Topic {

    @PrimaryKey
    Integer id ;

    int userId;
    int stype;
    String userName;        //发帖的username
    String title;
    String topicContent;
    Date createDate;

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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
