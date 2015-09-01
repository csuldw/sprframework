package com.hoki.spring.award.domain;

/**
 * Created by Hoki.
 * Date:2015/4/11 0011
 * Time:上午 1:29
 */
public class CheckInfo {
    private String sn;
    private int appid;
    private int status;
    private String award;
    private String userid;

    public String getSn() {
        return sn;
    }

    public void setSn(String sn) {
        this.sn = sn;
    }

    public int getAppid() {
        return appid;
    }

    public void setAppid(int appid) {
        this.appid = appid;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getAward() {
        return award;
    }

    public void setAward(String award) {
        this.award = award;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }
}
