/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : tianwei

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2015-08-11 19:03:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_tianwei_donghu
-- ----------------------------
DROP TABLE IF EXISTS `t_tianwei_donghu`;
CREATE TABLE `t_tianwei_donghu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `child_name` varchar(50) DEFAULT NULL,
  `child_age` int(11) DEFAULT NULL,
  `parent` varchar(50) DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `attend` int(11) DEFAULT NULL COMMENT '参与人数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_tianwei_donghu
-- ----------------------------
