package com.dreamwork.spring.user.controller;

/**
 * Created by apple on 15/9/8.
 */
public class SybResponse {

    //"{\"success\":false,\"message\":\"没有找到此用户\",\"str\":null,\"responseData\":null,\"flag\":null}"

    boolean success;
    String message ;
    String str ;            //页面跳转url
    Object responseData;
    String flag;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStr() {
        return str;
    }

    public void setStr(String str) {
        this.str = str;
    }

    public Object getResponseData() {
        return responseData;
    }

    public void setResponseData(Object responseData) {
        this.responseData = responseData;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }
}
