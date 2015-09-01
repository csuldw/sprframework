package com.hoki.spring.award.domain;

import java.util.Date;

/**
 * Created by Hoki.
 * Date:2015/4/11 0011
 * Time:上午 12:26
 */
public class Activity {
    private long id;
    private String start;
    private String end;
    private String rule;
    private String title;
    private String imageUrl;
    public Activity() {

    }
    public Activity(String start, String end, String rule, String title, String imageUrl) {
        this.start = start;
        this.end = end;
        this.rule = rule;
        this.title = title;
        this.imageUrl = imageUrl;
    }

    public Activity(long id, String start, String end, String rule, String title, String imageUrl) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.rule = rule;
        this.title = title;
        this.imageUrl = imageUrl;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }


    public String getRule() {
        return rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
