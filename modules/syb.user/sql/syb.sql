


CREATE DATABASE `db_syb` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use db_syb;

#create the t_syb_user
create table t_syb_user (
	  id integer AUTO_INCREMENT,
	  open_id varchar(100) comment '微信id',
	  sex varchar (1),
	  age varchar (3),
    phone varchar(13),
    pic varchar(200) comment '七牛返回的url',
    username varchar(100),
    password varchar(100) comment '密码',
    email varchar(100) ,
    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

#create the t_topic
create table t_topic (
	  id integer AUTO_INCREMENT,
	  user_id integer comment 'user id ',
    stype varchar (1),
	  title varchar (100),
    topicContent text,
    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

