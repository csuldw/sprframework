package com.hoki.spring.tianwei.domain;

/**
 * Created by apple on 15/7/14.
 */
public class TianweiRecord {

    long id;
    String open_id;
    String phone_num;
    String old_pic;
    String new_pic;
    String blessing;//祝福
    String user_name;
    int favour;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getOpen_id() {
        return open_id;
    }

    public void setOpen_id(String open_id) {
        this.open_id = open_id;
    }

    public String getPhone_num() {
        return phone_num;
    }

    public void setPhone_num(String phone_num) {
        this.phone_num = phone_num;
    }

    public String getOld_pic() {
        return old_pic;
    }

    public void setOld_pic(String old_pic) {
        this.old_pic = old_pic;
    }

    public String getNew_pic() {
        return new_pic;
    }

    public void setNew_pic(String new_pic) {
        this.new_pic = new_pic;
    }

    public String getBlessing() {
        return blessing;
    }

    public void setBlessing(String blessing) {
        this.blessing = blessing;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public int getFavour() {
        return favour;
    }

    public void setFavour(int favour) {
        this.favour = favour;
    }
}
