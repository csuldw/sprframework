

CREATE DATABASE `tianwei` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

use tianwei;

#create the t_tianwei_record
create table t_tianwei_record (
	id int AUTO_INCREMENT,
	open_id varchar(100),
    phone_num varchar(13),
    old_pic varchar(200) comment '七牛返回的url',
    new_pic varchar(200) comment '七牛返回的url',
    blessing varchar(500) comment '祝福',
    user_name varchar(100),
    favour int DEFAULT 0 comment '赞',
    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

