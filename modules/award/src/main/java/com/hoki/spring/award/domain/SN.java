package com.hoki.spring.award.domain;

/**
 * Created by Hoki.
 * Date:2015/4/8 0008
 * Time:下午 3:06
 */
public class SN {
    private String sn;
    private int appid;
    private int status;
    private String award;

    public long getAwardScore() {
        return awardScore;
    }

    public void setAwardScore(long awardScore) {
        this.awardScore = awardScore;
    }

    private long awardScore;
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
}
