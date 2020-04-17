-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 17 Nis 2020, 11:56:11
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
('Ali Alper', 'Sakar', 21401897, 'alper.sakar@bilkent.edu.tr', '123', 'academic');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `announcements`
--

DROP TABLE IF EXISTS `announcements`;
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `text` varchar(250) NOT NULL,
  `photopath` varchar(150) NOT NULL,
  `startdate` varchar(45) NOT NULL,
  `enddate` varchar(45) NOT NULL,
  `display` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

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
(8, 'Pool is closed', 'For your health, our pool is cleaned very Monday. Therefore, our pool will be closed every monday.', 'C:UsersBerkay KaraDesktopBackendpublicuploads', '2020/01/01', '2020/09/05', '1');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `deneme`
--

DROP TABLE IF EXISTS `deneme`;
CREATE TABLE IF NOT EXISTS `deneme` (
  `id` int(11) NOT NULL,
  `date1` varchar(45) NOT NULL,
  `date2` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `deneme`
--

INSERT INTO `deneme` (`id`, `date1`, `date2`) VALUES
(1, '2020/04/05', '2020/04/24'),
(2, '2019/02/24', '2020/02/24'),
(3, '2020/12/24', '2027/05/24'),
(4, '2004/12/24', '2019/05/24');

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
-- Tablo için tablo yapısı `p_badminton`
--

DROP TABLE IF EXISTS `p_badminton`;
CREATE TABLE IF NOT EXISTS `p_badminton` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `p_squash`
--

DROP TABLE IF EXISTS `p_squash`;
CREATE TABLE IF NOT EXISTS `p_squash` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `p_tabletennis`
--

DROP TABLE IF EXISTS `p_tabletennis`;
CREATE TABLE IF NOT EXISTS `p_tabletennis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentID` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `p_tennis`
--

DROP TABLE IF EXISTS `p_tennis`;
CREATE TABLE IF NOT EXISTS `p_tennis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bilkentId` int(11) NOT NULL,
  `email` varchar(45) NOT NULL,
  `ge` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

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
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
