/**
 * Created by Administrator on 2015/3/22 0022.
 */
window.onload = function(){
    cc.game.onStart = function(){

        //load resources
        cc.LoaderScene.preload(g_resources, function () {
            //启动场景
            var StartScene = cc.Scene.extend({
                onEnter : function () {
                    this._super();
                    cc.spriteFrameCache.addSpriteFrames("res/common.plist","res/common.png");
                    startLayer = new StartLayer();
                    this.addChild(startLayer);

                }
            });
            //启游戏主场景
            var GameScene = cc.Scene.extend({
                onEnter : function () {
                    this._super();
                    multiLayer = new cc.LayerMultiplex(new GameLayer(), new EndLayer(), new ShareLayer());
                    multiLayer.switchTo(0);
                    this.addChild(multiLayer);
                }
            });
             //首屏
            var StartLayer = cc.Layer.extend({
                ctor : function () {
                    this._super();
                    // bg= new cc.LabelTTF("这个是厂商自定页面","微软雅黑",20);
                    //bg.setPosition(cc.winSize.width/2,cc.winSize.height/2);
                    bg=cc.Sprite.create("res/1.png");
                    bg.setPosition(cc.winSize.width/2,cc.winSize.height/2);
                    bg.setAnchorPoint(0.5,0.5);
                    this.addChild(bg);

                    rank=cc.Sprite.create("res/2.png");
                    rank.setAnchorPoint(0.5,0.5);
                    rank.setPosition(-9999,-9999);
                    var rankLabel= new cc.LabelTTF("这个是排行榜页面","微软雅黑",20);
                    rankLabel.setPosition(rank.getContentSize().width/2,rank.getContentSize().height/2);
                    rankLabel.setAnchorPoint(0.5,0.5);
                    rank.addChild(rankLabel);
                    this.addChild(rank);

                    rule=cc.Sprite.create("res/3.png");
                    rule.setAnchorPoint(0.5,0.5);
                    rule.setPosition(-9999,-9999);
                    var ruleLabel= new cc.LabelTTF("这个是规则页面","微软雅黑",20);
                    ruleLabel.setPosition(rule.getContentSize().width/2,rule.getContentSize().height/2);
                    rankLabel.setAnchorPoint(0.5,0.5);
                    rule.addChild(ruleLabel);
                    this.addChild(rule);

                },
                onEnter : function () {
                    this._super();
                    var itemMenu = cc.Menu.create(); //创建菜单对象

                    var startBtnSprite1=cc.Sprite.create("#kaishiyouxi.png");
                    var startBtnSprite2= cc.Sprite.create("#kaishiyouxi.png");
                    var startBtnSprite3=cc.Sprite.create("#kaishiyouxi.png");
                    var startBtn =cc.MenuItemSprite.create(startBtnSprite1,startBtnSprite2,startBtnSprite3, function(){
                        cc.director.runScene(new GameScene());
                    }, this);
                    startBtn.setScale(0.7,0.7);
                    var rankBtnSprite1=cc.Sprite.create("#chengjiuban.png");
                    var rankBtnSprite2= cc.Sprite.create("#chengjiuban.png");
                    var rankBtnSprite3=cc.Sprite.create("#chengjiuban.png");
                    var rankBtn =cc.MenuItemSprite.create(rankBtnSprite1,rankBtnSprite2,rankBtnSprite3, function(){
                        rank.setPosition(cc.winSize.width/2,cc.winSize.height/2);
                        rule.setPosition(-9999,-9999);
                        bg.setPosition(-9999,-9999);
                    }, this);
                    rankBtn.setScale(0.7,0.7);

                    var ruleBtnSprite1=cc.Sprite.create("#guizeshuoming.png");
                    var ruleBtnSprite2= cc.Sprite.create("#guizeshuoming.png");
                    var ruleBtnSprite3=cc.Sprite.create("#guizeshuoming.png");
                    var ruleBtn =cc.MenuItemSprite.create(ruleBtnSprite1,ruleBtnSprite2,ruleBtnSprite3, function(){
                        rule.setPosition(cc.winSize.width/2,cc.winSize.height/2);
                        rank.setPosition(-9999,-9999);
                        bg.setPosition(-9999,-9999);
                    }, this);
                    ruleBtn.setScale(0.7,0.7);
                    itemMenu.addChild(rankBtn);
                    itemMenu.addChild(startBtn);
                    itemMenu.addChild(ruleBtn);
                    itemMenu.alignItemsHorizontallyWithPadding(50);
                    itemMenu.setPosition(cc.winSize.width/2,60);
                    this.addChild(itemMenu);

                }
            });
            //游戏层
            var GameLayer = cc.Layer.extend({
                ctor : function () {
                    this._super();
                    var size = cc.director.getWinSize();
                    //随机血魔
                    cc.spriteFrameCache.addSpriteFrames("res/xuemo.plist","res/xuemo.png");
                    spriteHero = cc.Sprite.create(cc.spriteFrameCache.getSpriteFrame("#fly_043血魔_01.png"));
                    spriteHero.setPosition(size.width / 2, size.height / 2);
                    spriteHero.setScale(0.5,0.5);
                    this.addChild(spriteHero,1);
                    //时间倒数
                    timeSprite = new cc.LabelTTF("时间: 30秒","微软雅黑",20);
                    timeSprite.setPosition(60,size.height-50 );
                    this.addChild(timeSprite,8);
                    //得分
                    scoreSprite = new cc.LabelTTF("得分: 0","微软雅黑",20);
                    scoreSprite.setPosition(size.width-50,size.height-50 );
                    this.addChild(scoreSprite,2);

                },
                onEnter : function () {
                    var score=0;
                    multiLayer.setUserData(score);
                    var time=30;
                    var isStop=false;
                    this._super();
                    // 创建一个事件监听器 OneByOne 为单点触摸
                    var listener1 = cc.EventListener.create({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
                        onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
                            var target = event.getCurrentTarget();  // 获取事件所绑定的 target
                            // 获取当前点击点所在相对按钮的位置坐标
                            var locationInNode = target.convertToNodeSpace(touch.getLocation());
                            var s = target.getContentSize();
                            var rect = cc.rect(0, 0, s.width, s.height);
                            if (cc.rectContainsPoint(rect, locationInNode)) {       // 点击范围判断检测
                                score++;
                                scoreSprite.setString("得分: " + score, "微软雅黑", 20);
                                multiLayer.setUserData(score);
                                return true;
                            }
                            return false;
                        }
                    });
                    cc.eventManager.addListener(listener1, spriteHero);
                    //动画定时器
                        this.schedule(function () {
                            if (!isStop&&time == 0) {
                                //cc.log("时间到");

                                isStop = true;
                                cc.eventManager.removeAllListeners();
                                multiLayer.switchTo(1);

                            } else if (!isStop&&time > 0.4) {
                                var frame1 = cc.spriteFrameCache.getSpriteFrame("fly_043血魔_02.jpg");
                                var frame2 = cc.spriteFrameCache.getSpriteFrame("fly_043血魔_04.jpg");
                                var frame3 = cc.spriteFrameCache.getSpriteFrame("fly_043血魔_03.jpg");
                                var frame4 = cc.clone(frame3);
                                var frames = [frame1, frame2, frame3, frame4];
                                var animation = cc.Animation.create(frames, 0.1);
                                var animate = cc.animate(animation);
                                var moveAction = cc.moveTo(0, 60 + cc.random0To1() * 300, 60 + cc.random0To1() * 400);
                                spriteHero.runAction(cc.sequence(cc.spawn(animate, moveAction), cc.delayTime(20)));
                                time = time - 0.5;
                                if (parseInt(time) == time) {
                                    timeSprite.setString("时间: " + time + "秒", "微软雅黑", 20)
                                }
                            }
                        }, 0.5);
                }
            });
            //游戏结束层
            var EndLayer = cc.Layer.extend({
                ctor : function () {
                    this._super();
                },
                onEnter : function () {
                    this._super();
                    var score=multiLayer.getUserData();
                    //分数榜
                    var gameover=cc.Sprite.create("#game_over.png");
                    gameover.setAnchorPoint(0.5,0.5);
                    gameover.setPosition(cc.winSize.width/2,cc.winSize.height/2);
                    var gameEndInfo = new cc.LabelTTF(score+"分","微软雅黑",60);
                    gameEndInfo.setAnchorPoint(0.5,0.5);
                    gameEndInfo.setColor(cc.color(0,0,0,255));
                    gameEndInfo.setPosition(gameover.getContentSize().width/2,gameover.getContentSize().height/2);
                    gameover.addChild(gameEndInfo);
                    this.addChild(gameover);

                    var itemMenu = cc.Menu.create(); //创建菜单对象

                    var reStartBtnSprite1=cc.Sprite.create("#chongxingkaishi.png");
                    var reStartBtnSprite2= cc.Sprite.create("#chongxingkaishi.png");
                    var reStartBtnSprite3=cc.Sprite.create("#chongxingkaishi.png");
                    var reStartBtn =cc.MenuItemSprite.create(reStartBtnSprite1,reStartBtnSprite2,reStartBtnSprite3, function(){
                        cc.director.runScene(new GameScene());
                    }, this);
                    var shareBtnSprite1=cc.Sprite.create("#xuanyaoyixia.png");
                    var shareBtnSprite2= cc.Sprite.create("#xuanyaoyixia.png");
                    var shareBtnSprite3=cc.Sprite.create("#xuanyaoyixia.png");

                    var shareBtn =cc.MenuItemSprite.create(shareBtnSprite1,shareBtnSprite2,shareBtnSprite3, function(){
                        //修改 标题
                        document.title="请叫我手速帝，30秒我得了"+score+"分";
                        //发送分数
                        var xhr = cc.loader.getXMLHttpRequest();
                        xhr.open("GET", "http://localhost:8080/a?id="+18617034884, true);
                        xhr.onreadystatechange = function () {
                            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                                var token = xhr.responseText;
                                //cc.log(token);
                                xhr.open("POST", "http://localhost:8080/rank/s");
                                xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                                xhr.onreadystatechange = function () {
                                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                                        var httpStatus = xhr.statusText;
                                        var response = xhr.responseText;
                                        cc.log(response);
                                    }
                                };
                                var str = Base64.encode(score);
                                xhr.send("t="+encodeURIComponent(token)+"&appid="+1+"&es="+encodeURIComponent(str)+"&u="+18617034884);
                            }
                        };
                        xhr.send(null);

                        //var subItemMenu = cc.Menu.create(); //创建菜单对象
                        //var subBtnSprite1=cc.Sprite.create("#chongxingkaishi.png");
                        //var subBtnSprite2= cc.Sprite.create("#chongxingkaishi.png");
                        //var subBtnSprite3=cc.Sprite.create("#chongxingkaishi.png");
                        //var submitBtn =cc.MenuItemSprite.create(subBtnSprite1,subBtnSprite2,subBtnSprite3, function(){
                        //
                        //}, this);

                        //切换到分享引导页面
                        multiLayer.switchTo(2);
                    }, this);
                    itemMenu.addChild(reStartBtn);
                    itemMenu.addChild(shareBtn);
                    itemMenu.setPosition(cc.winSize.width/2,120);
                    itemMenu.alignItemsHorizontallyWithPadding(100);
                    this.addChild(itemMenu);



                }
            });
            //游戏分享层
            var ShareLayer = cc.Layer.extend({
                ctor : function () {
                    this._super();
                    var shareHero= cc.Sprite.create("#share.png");
                    shareHero.setPosition(cc.winSize.width/2,cc.winSize.height-80);
                    shareHero.setAnchorPoint(0.5,0.5);
                    shareHero.setScale(0.5,0.5);
                    this.addChild(shareHero);
                },
                onEnter : function () {
                    this._super();
                    var listener1 = cc.EventListener.create({
                        event: cc.EventListener.TOUCH_ONE_BY_ONE,
                        swallowTouches: true,                       // 设置是否吞没事件，在 onTouchBegan 方法返回 true 时吞没
                        onTouchBegan: function (touch, event) {     //实现 onTouchBegan 事件回调函数
                            var target = event.getCurrentTarget();  // 获取事件所绑定的 target
                            multiLayer.switchTo(1);
                            return true;
                        }
                    });
                    cc.eventManager.addListener(listener1, this);
                }
            });
            cc.director.runScene(new StartScene());
        }, this);
    };

    cc.game.run("gameCanvas");
};

