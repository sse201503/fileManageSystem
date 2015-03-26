# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.1.63)
# Database: fileManage
# Generation Time: 2015-03-26 10:57:49 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table department
# ------------------------------------------------------------

CREATE TABLE `department` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` text,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `setupUserID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table file
# ------------------------------------------------------------

CREATE TABLE `file` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `auth` int(11) DEFAULT NULL,
  `name` text,
  `location` text,
  `status` int(11) DEFAULT NULL,
  `md5` text,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;



# Dump of table test
# ------------------------------------------------------------

CREATE TABLE `test` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `text` text,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;

INSERT INTO `test` (`id`, `text`, `time`)
VALUES
	(1,'hello','2015-03-22 03:24:18'),
	(2,'hello','2015-03-22 03:24:18'),
	(3,'hello','2015-03-22 03:24:18'),
	(4,'hello','2015-03-22 03:24:18'),
	(5,'hello2','2015-03-22 03:24:18'),
	(6,'hello2','2015-03-22 03:24:42'),
	(7,'hello2','2015-03-22 03:24:43'),
	(8,'hello2','2015-03-22 03:25:02'),
	(9,'hello2','2015-03-22 03:29:05'),
	(10,'hello2','2015-03-22 03:54:32');

/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` text COMMENT '即工号(学号)',
  `workId` text,
  `passwd` text,
  `idCard` text,
  `name` text,
  `email` text,
  `regTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `auth` int(11) DEFAULT NULL COMMENT '-1是总管理员(校领导)，0是新申请的无权限用户，其他对应部门表',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `workId`, `passwd`, `idCard`, `name`, `email`, `regTime`, `auth`)
VALUES
	(1,'2012212033',NULL,'19b6e90e515fb149ca05bd11850f3cf1','410802199403010099','朱泓睿','me@hurray0.com','2015-03-23 21:12:16',0),
	(2,'2012212035',NULL,'96e79218965eb72c92a549dd5a330112','410802199403010099','朱泓睿','i@i.i','2015-03-23 21:17:54',0),
	(3,'2012212034',NULL,'e10adc3949ba59abbe56e057f20f883e','410802199403010099','朱泓睿','i@i.i','2015-03-23 21:19:39',0),
	(4,'2012212055',NULL,'e10adc3949ba59abbe56e057f20f883e','410802199403010099','朱泓睿','i@i.i','2015-03-23 21:20:02',0),
	(5,'2012212005',NULL,'e10adc3949ba59abbe56e057f20f883e','410802199403011000','小红心','1@1.2','2015-03-23 21:33:54',0),
	(6,'2912212999',NULL,'e10adc3949ba59abbe56e057f20f883e','410802199403010099','朱泓睿','i@i.i','2015-03-23 21:38:53',0),
	(7,'2012226966',NULL,'e10adc3949ba59abbe56e057f20f883e','123456789123456781','小红帽','1@11.1','2015-03-23 21:39:39',0),
	(8,'2121212122',NULL,'e10adc3949ba59abbe56e057f20f883e','123456789123456789','小红','1@1.1','2015-03-23 21:40:46',0),
	(9,'2012212000',NULL,'e10adc3949ba59abbe56e057f20f883e','123456789123456789','小红','1@1.1','2015-03-23 21:43:29',0),
	(10,'2012212004',NULL,'e10adc3949ba59abbe56e057f20f883e','410802199403010099','销售','1@1.1','2015-03-23 21:46:18',0),
	(11,'456789',NULL,'e35cf7b66449df565f93c607d5a81d09','123456789123456789','这些','1@1.1','2015-03-23 21:48:26',0),
	(12,'1234567',NULL,'e10adc3949ba59abbe56e057f20f883e','123456789123456789','现在','1@1.1','2015-03-23 21:50:46',0),
	(13,'2012212',NULL,'e10adc3949ba59abbe56e057f20f883e','123456789123456789','在是','1@1.1','2015-03-23 22:28:11',0),
	(14,'12345678',NULL,'25d55ad283aa400af464c76d713c07ad','410802199403010099','朱泓睿','i@i.i','2015-03-24 09:10:42',0),
	(15,'Hurray','2012212033','19b6e90e515fb149ca05bd11850f3cf1','410802199403010099','朱泓睿','me@hurray0.com','2015-03-25 19:42:16',999);

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
