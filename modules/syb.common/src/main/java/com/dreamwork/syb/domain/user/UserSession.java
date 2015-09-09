package com.dreamwork.syb.domain.user;

/**
 * Created by apple on 15/9/9.
 */
public class UserSession {

    /**
     * index页面使用到的变量
     */
    boolean ISLOGIN = false;
    boolean ISACTIVE = true;
    boolean ISPERFECT = true;
    boolean ISCOMPANY = false;

    /**
     * 页面相关的信息,这个待抽离到其他类里面
     */
    String path = "";
    String ctxRoot = "";
    String appId = "page/welcome";

    User user ;

    public void setUser(User user ){
        this.user = user ;
        ISLOGIN = user != null;
    }

    public boolean isISLOGIN() {
        return ISLOGIN;
    }

    public void setISLOGIN(boolean ISLOGIN) {
        this.ISLOGIN = ISLOGIN;
    }

    public boolean isISACTIVE() {
        return ISACTIVE;
    }

    public void setISACTIVE(boolean ISACTIVE) {
        this.ISACTIVE = ISACTIVE;
    }

    public boolean isISPERFECT() {
        return ISPERFECT;
    }

    public void setISPERFECT(boolean ISPERFECT) {
        this.ISPERFECT = ISPERFECT;
    }

    public boolean isISCOMPANY() {
        return ISCOMPANY;
    }

    public void setISCOMPANY(boolean ISCOMPANY) {
        this.ISCOMPANY = ISCOMPANY;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getCtxRoot() {
        return ctxRoot;
    }

    public void setCtxRoot(String ctxRoot) {
        this.ctxRoot = ctxRoot;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public User getUser() {
        return user;
    }
}
