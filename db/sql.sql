-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 26 Şub 2020, 20:09:09
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
DROP PROCEDURE IF EXISTS `insertAnnouncementProcedure`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertAnnouncementProcedure` (IN `_text` VARCHAR(150), IN `_date` DATE)  BEGIN
	INSERT INTO announcements(text,date)
	VALUES (_text,_date);
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateAnnouncementProcedure` (IN `_id` INT, IN `_text` VARCHAR(150), IN `_date` DATE)  BEGIN
	UPDATE announcements
	SET
	text = _text,
	date = _date
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
  `id` int(11) NOT NULL,
  `password` varchar(45) NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `account`
--

INSERT INTO `account` (`id`, `password`, `status`) VALUES
(21502129, '123', 'admin'),
(21401897, '123', 'student');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `announcements`
--

DROP TABLE IF EXISTS `announcements`;
CREATE TABLE IF NOT EXISTS `announcements` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` varchar(150) NOT NULL,
  `date` date NOT NULL,
  KEY `id` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Tablo döküm verisi `announcements`
--

INSERT INTO `announcements` (`id`, `text`, `date`) VALUES
(1, 'yagmur', '2012-12-12'),
(2, 'arca', '2012-12-12'),
(3, 'yagmur', '2012-12-12'),
(5, 'berkay', '2012-12-11'),
(6, 'yagmur', '2012-12-11'),
(7, 'yagmur', '2012-12-11'),
(8, 'berkay', '2012-12-11'),
(9, 'berkay', '2012-12-11'),
(10, 'berkay kara deneme', '2012-12-20'),
(11, 'TEAM 8 MEETING', '2012-12-20');

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
(17, 'berkay test', 20);

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
(21502129, 123, 1);

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
