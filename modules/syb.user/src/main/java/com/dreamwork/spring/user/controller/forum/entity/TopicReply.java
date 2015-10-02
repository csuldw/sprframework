package com.dreamwork.spring.user.controller.forum.entity;

import com.dreamwork.spring.db.annotation.PrimaryKey;

import java.util.Date;

/**
 * Created by apple on 15/9/20.
 */
public class TopicReply {

    @PrimaryKey
    Integer id;// integer AUTO_INCREMENT,

    Integer topic_id;// integer comment 'topic id ',
    Integer user_id ;//integer comment 'reply user id ',
    String user_name ;//varchar(100) comment '冗余字段',
    String content ;//text,
    Date createDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTopic_id() {
        return topic_id;
    }

    public void setTopic_id(Integer topic_id) {
        this.topic_id = topic_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
