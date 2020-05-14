-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 14 May 2020, 21:26:47
-- Sunucu sürümü: 10.4.10-MariaDB
-- PHP Sürümü: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `bilsportdb`
--

DELIMITER $$
--
-- Yordamlar
--
DROP PROCEDURE IF EXISTS `insertAccountProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAccountProcedure` (IN `_name` VARCHAR(45), IN `_surname` VARCHAR(45), IN `_bilkentId` INT, IN `_email` VARCHAR(45), IN `_password` VARCHAR(45), IN `_status` VARCHAR(45))  BEGIN
	INSERT INTO account
	VALUES (_name,_surname,_bilkentId,_email,_password,_status);
END$$

DROP PROCEDURE IF EXISTS `insertAnnouncementsProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAnnouncementsProcedure` (IN `_title` VARCHAR(150), IN `_text` VARCHAR(150), IN `_photopath` VARCHAR(150), IN `_startdate` VARCHAR(150), IN `_enddate` VARCHAR(150), IN `_display` VARCHAR(150))  BEGIN
	INSERT INTO announcements
	VALUES (_title,_text,_photopath,_startdate,_enddate,_display);
END$$

DROP PROCEDURE IF EXISTS `insertDenemeProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertDenemeProcedure` (IN `_id` INT, IN `_date1` DATE, IN `_date2` DATE)  BEGIN
	INSERT INTO deneme
	VALUES (_id, _date1 ,_date2);
END$$

DROP PROCEDURE IF EXISTS `insertFootballProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertFootballProcedure` (IN `_id` INT, IN `_field` VARCHAR(45), IN `_available` TINYINT(4))  BEGIN
	INSERT INTO football
	VALUES (_id,_field,_available);
END$$

DROP PROCEDURE IF EXISTS `insertPoolProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertPoolProcedure` (IN `_id` INT, IN `_lane` VARCHAR(45), IN `_quota` INT)  BEGIN
	INSERT INTO pool
	VALUES (_id,_lane,_quota);
END$$

DROP PROCEDURE IF EXISTS `insertRegisterProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertRegisterProcedure` (IN `_name` VARCHAR(45), IN `_surname` VARCHAR(45), IN `_bilkentId` INT, IN `_email` VARCHAR(45), IN `_password` VARCHAR(45), IN `_status` VARCHAR(45))  BEGIN
	INSERT INTO register
	VALUES (_name,_surname,_bilkentId,_email,_password,_status);
END$$

DROP PROCEDURE IF EXISTS `insertSquashProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertSquashProcedure` (IN `_id` INT, IN `_courtNo` VARCHAR(45), IN `_available` TINYINT(4))  BEGIN
	INSERT INTO squash
	VALUES (_id,_courtNo,_available);
END$$

DROP PROCEDURE IF EXISTS `insertStatisticProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertStatisticProcedure` (IN `_id` INT, IN `_km` DOUBLE, IN `_sett` INT)  BEGIN
	INSERT INTO statistics
	VALUES (_id,_km,_sett);
    
END$$

DROP PROCEDURE IF EXISTS `insertTennisProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertTennisProcedure` (IN `_id` INT, IN `_court` VARCHAR(45), IN `_campus` VARCHAR(45))  BEGIN
	INSERT INTO tennis
	VALUES (_id,_court,_campus);
END$$

DROP PROCEDURE IF EXISTS `updateAnnouncementProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAnnouncementProcedure` (IN `_id` VARCHAR(150), IN `_title` VARCHAR(150), IN `_text` VARCHAR(150), IN `_photopath` VARCHAR(150), IN `_startdate` VARCHAR(150), IN `_enddate` VARCHAR(150), IN `_display` VARCHAR(150))  BEGIN
	UPDATE announcements
	SET
    title = _title,    
	text = _text,
    photopath = _photopath,
    startdate = _startdate,
    enddate = _enddate,
    display = _display
    WHERE id = _id;
END$$

DROP PROCEDURE IF EXISTS `updateFootballProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateFootballProcedure` (IN `_id` INT, IN `_field` VARCHAR(45), IN `_available` TINYINT(4))  BEGIN
	UPDATE football
	SET
	field = _field,
    available = _available
	WHERE id = _id;
END$$

DROP PROCEDURE IF EXISTS `updatePoolProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePoolProcedure` (IN `_id` INT, IN `_lane` VARCHAR(45), IN `_quota` INT)  BEGIN
	UPDATE pool
	SET
	lane = _lane,
    quota = _quota
	WHERE id = _id;
END$$

DROP PROCEDURE IF EXISTS `updateSquashProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateSquashProcedure` (IN `_id` INT, IN `_courtNo` VARCHAR(45), IN `_available` TINYINT(4))  BEGIN
	UPDATE squash
	SET
	courtNo = _courtNo,
    available = _available
	WHERE id = _id;
END$$

DROP PROCEDURE IF EXISTS `updateStatisticProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateStatisticProcedure` (IN `_id` INT, IN `_km` DOUBLE, IN `_sett` INT)  BEGIN
	UPDATE statistics
	SET
	km = _km,
    sett = _sett
	WHERE id = _id;
END$$

DROP PROCEDURE IF EXISTS `updateTennisProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateTennisProcedure` (IN `_id` INT, IN `_court` VARCHAR(45), IN `_campus` VARCHAR(45))  BEGIN
	UPDATE tennis
	SET
	court = _court,
    campus = _campus
	WHERE id = _id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`bilkentId`,`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `account`
--

INSERT INTO `account` (`name`, `surname`, `bilkentId`, `email`, `password`, `status`) VALUES
('Berkay', 'Kara', 21502129, 'berkay.kara@ug.bilkent.edu.tr', '123', 'student'),
('Ahsen', 'Küçükdurmaz', 123, 'admin@bilkent.edu.tr', '123', 'admin'),
('Ali Alper', 'Sakar', 21401897, 'alper.sakar@bilkent.edu.tr', '123', 'academic'),
('Ahmet', 'Çakar', 111, 'abc@abc.com', '111', 'academic');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `announcements`
--

DROP TABLE IF EXISTS `announcements`;
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `photopath` varchar(150) NOT NULL,
  `startdate` varchar(45) NOT NULL,
  `enddate` varchar(45) NOT NULL,
  `display` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `text`, `photopath`, `startdate`, `enddate`, `display`) VALUES
(1, 'Corona Virus', 'Due to Corona Virus crisis our sports centers will be closed until 1 August.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2020/08/01', '1'),
(2, 'Towel Rule', 'In our sports center, users have to bring their towels. Otherwise they will not be accepted to sports center.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2030/08/01', '1'),
(3, 'Fitness Rule', 'When you train with weights, you have to bring them back to their places.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2030/08/01', '1'),
(4, 'Openning/Closing', 'Sports Center (Dormitories Sports Hall)\nWeekdays: 07:30 a.m. – 11:00 p.m.\nWeekends: 09:00 a.m. – 11:00 p.m.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2030/08/01', '1'),
(5, 'New Mini Football Pitch', 'As Bilkent University Sports Center we would like to inform you that, the new football pitch is opened. Its near our Dormitory Sports Hall. You can play there with maximum 10 people.', 'C:UsersBerkay KaraDesktopBackendpublicuploads', '2020/01/01', '2020/09/05', '1'),
(6, 'Career Fair', 'Due to career fair, Our main sports hall will be closed between 19 May and 23 May.', 'C:UsersBerkay KaraDesktopBackendpublicuploads', '2020/01/01', '2020/09/05', '1'),
(7, 'Zumba Event', 'There will be zumba event in dormitory sports center in 04 May Monday. Therefore basketball courts will be closed in 4th May', 'C:UsersBerkay KaraDesktopBackendpublicuploads', '2020/01/01', '2020/09/05', '1'),
(8, 'Pool is closed', 'For your health, our pool is cleaned very Monday. Therefore, our pool will be closed every monday.', 'C:UsersBerkay KaraDesktopBackendpublicuploads', '2020/01/01', '2020/09/05', '1'),
(9, 'Sports Centers', 'Sports Centers will be open in 19 June 2020', 'aa', '2019/02/02', '2028/10/15', '1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `badmintonmain1`
--

DROP TABLE IF EXISTS `badmintonmain1`;
CREATE TABLE IF NOT EXISTS `badmintonmain1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `basketballeast3`
--

DROP TABLE IF EXISTS `basketballeast3`;
CREATE TABLE IF NOT EXISTS `basketballeast3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `basketballeast5`
--

DROP TABLE IF EXISTS `basketballeast5`;
CREATE TABLE IF NOT EXISTS `basketballeast5` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `basketballmain3`
--

DROP TABLE IF EXISTS `basketballmain3`;
CREATE TABLE IF NOT EXISTS `basketballmain3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `basketballmain3`
--

INSERT INTO `basketballmain3` (`id`, `bilkentId`, `email`, `ge`, `team`) VALUES
(12, 11111, 'b1a11b@gmail.com', 0, 'AGRI1'),
(13, 111111, 'b1aa11b@gmail.com', 0, 'AGRI1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `course`
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `instructor` varchar(45) NOT NULL,
  `schedule` varchar(45) NOT NULL,
  `level` varchar(45) NOT NULL,
  `place` varchar(45) NOT NULL,
  `quota` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `course`
--

INSERT INTO `course` (`id`, `name`, `instructor`, `schedule`, `level`, `place`, `quota`) VALUES
(1, 'Streching', 'Yeliz Savas Dingler', 'Monday 5:40 – 6:30', 'Beginner', 'Dormitories Sports Hall', 28),
(2, 'Zumba', 'Seda Özsoy', 'Monday 6:40 – 7:30 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(3, 'Crunch', 'Yagmur Yeliz Doyan', 'Monday 7:40 – 8:10 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(4, 'Pilates', 'Yeliz Savas Dingler', 'Tuesday 4:40 – 5:30 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(5, 'Strong by Zumba', 'Seda Günaltay', 'Tuesday 5:40 – 6:30 p.m.', 'Intermediate', 'Dormitories Sports Hall', 30),
(6, 'Yoga', 'Seda Özsoy', 'Tuesday 6:40 – 7:40 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(7, 'Total Body Shape', 'Ahsen Küçükdurmaz', 'Wednesday 6:40 – 7:30 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(8, 'Pilates', 'Yeliz Savas Dingler', 'Wednesday 5:40 – 6:30 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(9, 'Pilates', 'Yeliz Savas Dingler', 'Wednesday 7:40 – 8:30 p.m.', 'Intermediate', 'Dormitories Sports Hall', 30),
(10, 'Strong by Zumba', 'Seda Günaltay', 'Thursday 5:40 – 6:30', 'Intermediate', 'Dormitories Sports Hall', 30),
(11, 'Leg Workout', 'Ahsen Küçükdurmaz', 'Thursday 6:40 – 7:30 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(12, 'Crunch', 'Yagmur Yeliz Doyan', 'Thursday 7:40 – 8:10 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(13, 'Strong by Zumba', 'Seda Günaltay', 'Friday 5:40 – 6:30 p.m.', 'Intermediate', 'Dormitories Sports Hall', 30),
(14, 'Yoga', 'Seda Günaltay', 'Friday 6:40 – 7:30 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(15, 'Yoga', 'Seda Günaltay', 'Sunday 11:00 – 11:50 p.m.', 'Intermediate', 'Dormitories Sports Hall', 30),
(16, 'Zumba', 'Seda Özsoy', 'Saturday 11:00 – 11:50 p.m.', 'Beginner', 'Dormitories Sports Hall', 30),
(17, 'Leg Workout', 'Seda Özsoy', 'Saturday 12:00 – 12:50 noon', 'Beginner', 'Dormitories Sports Hall', 30),
(18, 'Total Body Shape', 'Ahsen Küçükdurmaz', 'Monday 5:40 – 6:30 p.m.', 'Intermediate', 'Main Sports Hall', 30),
(19, 'Yoga', 'Seda Günaltay', 'Tuesday 12:00 – 1:00 noon', 'Beginner', 'Main Sports Hall', 30),
(20, 'Zumba', 'Yagmur Yeliz Doyan', 'Tuesday 5:40 – 6:30 p.m.', 'Intermediate', 'Main Sports Hall', 30),
(21, 'Yoga', 'Yeliz Savas Dingler', 'Tuesday 5:45 – 7:15 p.m', 'Intermediate', 'Main Sports Hall', 30),
(22, 'Stretching', 'Seda Özsoy', 'Wednesday 12:00 – 1:00 noon', 'Intermediate', 'Main Sports Hall', 30),
(23, 'Total Body Shape', 'Seda Günaltay', 'Wednesday 5:40 – 6:30 p.m.', 'Intermediate', 'Main Sports Hall', 30),
(24, 'Yoga', 'Seda Günaltay', 'Thursday 12:00 – 1:00 noon', 'Beginner', 'Main Sports Hall', 30),
(25, 'Yoga', 'Yeliz Savas Dingler', 'Thursday 5:45 – 7:15 p.m', 'Intermediate', 'Main Sports Hall', 30),
(26, 'Zumba', 'Seda Özsoy', 'Thursday 5:40 – 6:30', 'Intermediate', 'Main Sports Hall', 30),
(27, 'Tae Bo', 'Onur', 'Thursday 6:40 – 7:30 p.m.', 'Beginner', 'Main Sports Hall', 30),
(28, 'Total Body Shape', 'Ahsen Küçükdurmaz', 'Friday 5:40 – 6:30 p.m.', 'Beginner', 'Main Sports Hall', 30),
(29, 'AIKIDO', 'Mehmet Solmaz', 'Tuesday 7:30 – 9:00 p.m.', 'Beginner', 'Dormitories  Sports Hall', 30),
(30, 'AIKIDO', 'Mehmet Solmaz', 'Friday 7:30 – 9:00 p.m.', 'Beginner', 'Dormitories  Sports Hall', 30),
(31, 'Salsa', 'Yeliz Solmaz', 'Tuesday: 7:40 – 8:30 p.m', 'Beginner', 'Dormitories  Sports Hall', 30),
(32, 'Argentine Tango', 'Selin Kaya', 'Tuesday: 8:40 – 9:30 p.m.', 'Beginner', 'Dormitories  Sports Hall', 30),
(33, 'Argentine Tango', 'Selin Kaya', 'Tuesday: 9:40 – 10:30 p.m', 'Intermediate', 'Dormitories  Sports Hall', 30),
(34, 'Deneme', 'Berkay Kara', 'Tuesday: 9:40 – 10:30 p.m', 'Intermediate', 'Dormitories  Sports Hall', 0),
(35, 'Argentine Tango', 'Selin Kaya', 'Tuesday: 9:40 – 10:30 p.m', 'Intermediate', 'Dormitories  Sports Hall', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `coursestaken`
--

DROP TABLE IF EXISTS `coursestaken`;
CREATE TABLE IF NOT EXISTS `coursestaken` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `coursestaken`
--

INSERT INTO `coursestaken` (`id`, `bilkentId`, `courseId`) VALUES
(1, 21502129, 34),
(2, 21502229, 34),
(3, 21502120, 1),
(4, 21502120, 35),
(5, 21502121, 35),
(6, 21502122, 35);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `text` varchar(1000) NOT NULL,
  `photopath` varchar(150) NOT NULL,
  `startdate` varchar(45) NOT NULL,
  `enddate` varchar(45) NOT NULL,
  `display` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `events`
--

INSERT INTO `events` (`id`, `title`, `text`, `photopath`, `startdate`, `enddate`, `display`) VALUES
(1, 'Spring Run 2020, Spring', 'Date: Saturday, May 16, 2020 Time: 11:00 a.m. Distance: 2 k. (Walk & Run) Free of Charge Registration Deadline: Friday, May 15, 2020 All students, academic and administrative staff and their family members are welcome to participate in this special event. It is recommended that you train and get ready ahead of time. Trophies will be presented to the first three finishers in each category. Categories are according to age as follows: 11-15, 16-20, 21-25, 26-30, 31-35, 36-44, 45-54, 55-59, 60 and over.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2028/08/01', '1'),
(2, 'Zumba Master Class 2020, Spring', 'Date: March 3, Tuesday Time: 18:30 p.m.  Place : Main Sports Hall', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2028/08/01', '1'),
(3, 'Strong By Zumba 2020, Spring', 'Date: March 12, Thursday Time: 18:30 p.m. Place : Main Sports Hall', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2028/08/01', '1'),
(4, 'Fit Challenge 2020, Spring', 'Date:March 30 , Monday-  April 26, Sunday Place: Dormitories Sports Hall A 4-week work-out program which involves cardiovascular endurance and muscle strengthening exercises. If you wish to improve your heart and lung capacity, metabolic rate, muscle and bone density and moreover to direct the daily stresses positively while having fun, then you are welcome to join this challenging special event.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2028/08/01', '1'),
(5, 'Swim Challenge 2020, Spring', 'We invite all our members to participate to the event which takes 4 weeks with the aim of gaining regular exercise habit. During those 4 weeks who swim at least 3 times more than 45 minute will receive t-shirt and price with lottery. Women Date: March 31, Thursday – May 3, Sunday, Place: Swimming Pool. Men Date: March 31, Thursday – April 26 , Sunday Place: Swimming Pool.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2028/08/01', '1'),
(6, 'Indoor Triathlon 2020, Spring', 'Date: April 4, Saturday, Time: 10:30 a.m. Place: Swimming Pool We invite all Bilkent members to our new event in which you do swimming, cycling, and running back to back.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2028/08/01', '1'),
(7, 'Swimming Festival 2020, Spring', 'Date: March 28, Thursday Time: 6:30 p.m. With the participation of swimmers from all levels 50 meters swimming races will be made. We invite you to join us to have fun and release you stress to limped water in our swimming pool.', 'C:UsersBerkay KaraDesktopBackendpublicuploads635.jpg-.jpgg', '2005/01/01', '2028/08/01', '1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `file`
--

DROP TABLE IF EXISTS `file`;
CREATE TABLE IF NOT EXISTS `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `path` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `file`
--

INSERT INTO `file` (`id`, `name`, `path`) VALUES
(1, '635.jpg', 'public\\uploads\\635.jpg-.jpg'),
(2, 'm4.jpg', 'public\\uploads\\m4.jpg-.jpg'),
(3, 'm4.jpg', 'public\\uploads\\m4.jpg-.jpg');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `football`
--

DROP TABLE IF EXISTS `football`;
CREATE TABLE IF NOT EXISTS `football` (
  `id` int(11) NOT NULL,
  `field` varchar(45) NOT NULL,
  `available` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `football`
--

INSERT INTO `football` (`id`, `field`, `available`) VALUES
(1, 'East Campus 1', 1),
(2, 'East Campus 2', 0),
(3, 'Main Campus Holding', 1),
(4, 'Main Campus Mini Field ', 1),
(5, 'Main Campus Mini Field TESSSSST', 0),
(6, ' TESSSSST', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `footballeast6`
--

DROP TABLE IF EXISTS `footballeast6`;
CREATE TABLE IF NOT EXISTS `footballeast6` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `footballmain6`
--

DROP TABLE IF EXISTS `footballmain6`;
CREATE TABLE IF NOT EXISTS `footballmain6` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `pool`
--

DROP TABLE IF EXISTS `pool`;
CREATE TABLE IF NOT EXISTS `pool` (
  `id` int(11) NOT NULL,
  `lane` varchar(45) NOT NULL,
  `quota` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `pool`
--

INSERT INTO `pool` (`id`, `lane`, `quota`) VALUES
(1, 'Lane 1', 4),
(2, 'Lane 2', 4),
(3, 'Lane 3', 4),
(4, 'Lane 4', 4),
(5, 'Lane 5', 4),
(6, 'Lane 6', 4),
(17, 'berkay test', 20),
(8, '30', 5),
(9, '30', 5);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `register`
--

DROP TABLE IF EXISTS `register`;
CREATE TABLE IF NOT EXISTS `register` (
  `name` varchar(45) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`bilkentId`,`email`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `register`
--

INSERT INTO `register` (`name`, `surname`, `bilkentId`, `email`, `password`, `status`) VALUES
('Berkay', 'kara', 21524644, 'bkkaa@gmail.com', '123', 'academic'),
('Berkay', 'kara', 215246441, 'bkkaa@gmail.com', '123', 'academic'),
('berkay', 'kara', 1111, 'aa@gmail.com', '222', 'admin');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `squash`
--

DROP TABLE IF EXISTS `squash`;
CREATE TABLE IF NOT EXISTS `squash` (
  `id` int(11) NOT NULL,
  `courtNo` varchar(45) NOT NULL,
  `available` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `squash`
--

INSERT INTO `squash` (`id`, `courtNo`, `available`) VALUES
(1, 'Court 1', 1),
(2, 'Court 2', 0),
(3, 'Court 3', 1),
(5, 'Berkay test 22', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `statistics`
--

DROP TABLE IF EXISTS `statistics`;
CREATE TABLE IF NOT EXISTS `statistics` (
  `id` int(11) NOT NULL,
  `km` double DEFAULT NULL,
  `sett` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `statistics`
--

INSERT INTO `statistics` (`id`, `km`, `sett`) VALUES
(1, 150, 150),
(2, 50, 10),
(3, 50, 50),
(4, 50, 50),
(5, 50, 50),
(6, 50, 50),
(7, 50, 50),
(8, 150, 150),
(21502129, 123, 1),
(1212, 5, NULL);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tabletennismain1`
--

DROP TABLE IF EXISTS `tabletennismain1`;
CREATE TABLE IF NOT EXISTS `tabletennismain1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tennis`
--

DROP TABLE IF EXISTS `tennis`;
CREATE TABLE IF NOT EXISTS `tennis` (
  `id` int(11) NOT NULL,
  `court` varchar(45) NOT NULL,
  `campus` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `tennis`
--

INSERT INTO `tennis` (`id`, `court`, `campus`) VALUES
(1, 'Court 1', 'Main Campus'),
(2, 'Court 2', 'Main Campus'),
(3, 'Court 3', 'Main Campus'),
(4, 'Court 4', 'East Campus');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tennismain1`
--

DROP TABLE IF EXISTS `tennismain1`;
CREATE TABLE IF NOT EXISTS `tennismain1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tournaments`
--

DROP TABLE IF EXISTS `tournaments`;
CREATE TABLE IF NOT EXISTS `tournaments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `campus` varchar(45) NOT NULL,
  `teamquota` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `tournaments`
--

INSERT INTO `tournaments` (`id`, `name`, `campus`, `teamquota`) VALUES
(1, 'Basketball', 'Main', '3'),
(2, 'Badminton', 'Main', '1'),
(3, 'Volleyball', 'East', '6'),
(4, 'Basketball', 'East', '3'),
(5, 'Basketball', 'East', '5'),
(6, 'Football', 'East', '6'),
(7, 'Football', 'Main', '6'),
(8, 'Volleyball', 'Main', '6'),
(9, 'Tennis', 'Main', '1'),
(10, 'Tabletennis', 'Main', '1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_badminton`
--

DROP TABLE IF EXISTS `t_badminton`;
CREATE TABLE IF NOT EXISTS `t_badminton` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `t_badminton`
--

INSERT INTO `t_badminton` (`id`, `bilkentId`, `email`, `ge`) VALUES
(1, 21502129, 'berkaykara@ug.bilkent.edu.tr', 1),
(2, 21602121, 'ahmet@ug.bilkent.edu.tr', 1),
(3, 21001122, 'aa@gmail.com', 0),
(4, 21212233, 'aa@gmail.com', 1),
(5, 21001122, 'aa@gmail.com', 0),
(6, 21001122, 'aa@gmail.com', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_basketball3`
--

DROP TABLE IF EXISTS `t_basketball3`;
CREATE TABLE IF NOT EXISTS `t_basketball3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `t_basketball3`
--

INSERT INTO `t_basketball3` (`id`, `bilkentId`, `email`, `ge`, `team`) VALUES
(1, 21502129, 'berkay@ug.bilkent.edu.tr', 0, 'team1'),
(2, 21212121, 'ali@ug.bilkent.edu.tr', 1, 'team1'),
(3, 20204541, 'mehmet@ug.bilkent.edu.tr', 0, 'team1'),
(4, 20401425, 'mert@ug.bilkent.edu.tr', 1, 'team2'),
(6, 21502129, 'berkaykara@gmail.com', 0, 'team2'),
(8, 21902565, 'eray@gmail.com', 1, 'team2'),
(9, 21702565, 'haydar@gmail.com', 0, 'team3'),
(10, 21702565, 'muhammet@gmail.com', 0, 'team3'),
(11, 21702565, 'mehmet@gmail.com', 0, 'team3');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_basketball5`
--

DROP TABLE IF EXISTS `t_basketball5`;
CREATE TABLE IF NOT EXISTS `t_basketball5` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `t_basketball5`
--

INSERT INTO `t_basketball5` (`id`, `bilkentId`, `email`, `ge`, `team`) VALUES
(1, 21702565, 'ahmet@gmail.com', 0, 'team1'),
(2, 21702565, 'berkay@gmail.com', 0, 'team1'),
(3, 21702565, 'ali@gmail.com', 0, 'team1'),
(4, 21702565, 'mehmet@gmail.com', 0, 'team1'),
(5, 21702565, 'alper@gmail.com', 0, 'team1'),
(6, 21712565, 'eray@gmail.com', 0, 'team2'),
(7, 21722565, 'eray@gmail.com', 0, 'team2'),
(8, 21732565, 'eray@gmail.com', 0, 'team2'),
(9, 21742565, 'eray@gmail.com', 0, 'team2'),
(10, 21752565, 'eray@gmail.com', 0, 'team2');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_football6`
--

DROP TABLE IF EXISTS `t_football6`;
CREATE TABLE IF NOT EXISTS `t_football6` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `t_football6`
--

INSERT INTO `t_football6` (`id`, `bilkentId`, `email`, `ge`, `team`) VALUES
(1, 21502129, 'berkay@gmail.com', 0, 'team1'),
(2, 21501119, 'mete@gmail.com', 0, 'team1'),
(3, 21401219, 'alper@gmail.com', 1, 'team1'),
(4, 21601219, 'arca@gmail.com', 1, 'team1'),
(5, 21501219, 'mert@gmail.com', 1, 'team1'),
(6, 21402219, 'ozcan@gmail.com', 1, 'team1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_squash`
--

DROP TABLE IF EXISTS `t_squash`;
CREATE TABLE IF NOT EXISTS `t_squash` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `t_squash`
--

INSERT INTO `t_squash` (`id`, `bilkentId`, `email`, `ge`) VALUES
(1, 21212233, 'aa@gmail.com', 1),
(2, 21502129, 'berkaykara@gmail.com', 0),
(3, 21402129, 'berkaykara@gmail.com', 0),
(4, 21402129, 'berkaykara@gmail.com', 0),
(5, 21402129, 'berkaykara@gmail.com', 0),
(6, 21102129, 'berkaykqara@gmail.com', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_tabletennis`
--

DROP TABLE IF EXISTS `t_tabletennis`;
CREATE TABLE IF NOT EXISTS `t_tabletennis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentID` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `t_tabletennis`
--

INSERT INTO `t_tabletennis` (`id`, `bilkentID`, `email`, `ge`) VALUES
(1, 21502129, 'berkaykara@gmail.com', 0),
(2, 215012129, 'berkayakara@gmail.com', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_tennis`
--

DROP TABLE IF EXISTS `t_tennis`;
CREATE TABLE IF NOT EXISTS `t_tennis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `t_tennis`
--

INSERT INTO `t_tennis` (`id`, `bilkentId`, `email`, `ge`) VALUES
(1, 21502129, 'berkaykara@gmail.com', 0),
(2, 215002129, 'berkaykaara@gmail.com', 0);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_volleyball4`
--

DROP TABLE IF EXISTS `t_volleyball4`;
CREATE TABLE IF NOT EXISTS `t_volleyball4` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `t_volleyball4`
--

INSERT INTO `t_volleyball4` (`id`, `bilkentId`, `email`, `ge`, `team`) VALUES
(1, 21722565, 'berkay@gmail.com', 0, 'team1'),
(2, 211722565, 'berkaay@gmail.com', 0, 'team1'),
(3, 211712565, 'berkaaay@gmail.com', 0, 'team1'),
(4, 2117125265, 'bearkaaay@gmail.com', 0, 'team1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `t_volleyball6`
--

DROP TABLE IF EXISTS `t_volleyball6`;
CREATE TABLE IF NOT EXISTS `t_volleyball6` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `volleyballeast6`
--

DROP TABLE IF EXISTS `volleyballeast6`;
CREATE TABLE IF NOT EXISTS `volleyballeast6` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `volleyballmain6`
--

DROP TABLE IF EXISTS `volleyballmain6`;
CREATE TABLE IF NOT EXISTS `volleyballmain6` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  `team` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
