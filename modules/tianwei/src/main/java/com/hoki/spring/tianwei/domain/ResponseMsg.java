package com.hoki.spring.tianwei.domain;

/**
 * Created by martin on 15/7/13.
 */
public class ResponseMsg {
    boolean rs;
    String msg;
    Object data;

    public void setRs(boolean rs) {
        this.rs = rs;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public boolean getRs(){return rs;};

    public String getMsg(){return msg;};

    public void setData(Object data) {
        this.data = data;
    }

    public Object getData() {
        return data;
    }
}
