package com.hoki.spring.record.domain;

import java.util.Date;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:下午 12:35
 */
public class Record {
    private long id;
    private String userid;
    private long score;
    private int appid;
    private String sn;

    public String getAward() {
        return award;
    }

    public void setAward(String award) {
        this.award = award;
    }

    private String award;
    private String creatTime;
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }



    public long getScore() {
        return score;
    }

    public void setScore(long score) {
        this.score = score;
    }

    public int getAppid() {
        return appid;
    }

    public void setAppid(int appid) {
        this.appid = appid;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    public String getCreatTime() {
        return creatTime;
    }

    public void setCreatTime(String creatTime) {
        this.creatTime = creatTime;
    }
}
