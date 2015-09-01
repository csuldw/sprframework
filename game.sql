-- --------------------------------------------------------
-- 主机:                           104.160.33.216
-- 服务器版本:                        10.0.17-MariaDB - MariaDB Server
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  9.1.0.4867
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 test.activity 结构
CREATE TABLE IF NOT EXISTS `activity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '开始时间',
  `end` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '结束时间',
  `rule` text NOT NULL COMMENT '游戏规则说明',
  `title` varchar(50) NOT NULL COMMENT '活动标题',
  `image_url` varchar(50) NOT NULL COMMENT '活动图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。


-- 导出  表 test.record 结构
CREATE TABLE IF NOT EXISTS `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(20) NOT NULL COMMENT '用户ID',
  `score` bigint(20) NOT NULL DEFAULT '0' COMMENT '用户积分',
  `sn` varchar(50) DEFAULT NULL COMMENT 'sn码',
  `appid` bigint(20) NOT NULL COMMENT '应用ID',
  `createTime` varchar(30) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。


-- 导出  表 test.sn_pool 结构
CREATE TABLE IF NOT EXISTS `sn_pool` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sn` varchar(50) NOT NULL DEFAULT '0' COMMENT 'sn码',
  `appid` bigint(20) NOT NULL DEFAULT '0' COMMENT '应用id',
  `status` int(2) NOT NULL COMMENT '状态',
  `award_score` bigint(20) NOT NULL COMMENT '奖励分数条件',
  `award` varchar(50) NOT NULL COMMENT '奖励物品',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。


-- 导出  表 test.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(50) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `phone` bigint(20) DEFAULT NULL,
  `sex` tinyint(2) DEFAULT NULL,
  `age` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
