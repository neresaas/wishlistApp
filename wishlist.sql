-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         11.3.2-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para wishlist
CREATE DATABASE IF NOT EXISTS `wishlist` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `wishlist`;

-- Volcando estructura para tabla wishlist.friends
CREATE TABLE IF NOT EXISTS `friends` (
  `emailMainUser` varchar(50) DEFAULT NULL,
  `emailFriend` varchar(50) DEFAULT NULL,
  KEY `FK_friends_users` (`emailMainUser`),
  CONSTRAINT `FK_friends_users` FOREIGN KEY (`emailMainUser`) REFERENCES `users` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla wishlist.friends: ~16 rows (aproximadamente)
INSERT INTO `friends` (`emailMainUser`, `emailFriend`) VALUES
	('d@d.com', 'c@c.com'),
	('d@d.com', 'b@b.com'),
	('a@a.com', 'b@b.com'),
	('a@a.com', 'c@c.com'),
	('b@b.com', 'a@a.com'),
	('a@a.com', 'd@d.com'),
	('d@d.com', 'a@a.com'),
	('d@d.com', 'e@e.com'),
	('f@f.com', 'd@d.com'),
	('a@a.com', 'e@e.com'),
	('e@e.com', 'c@c.com'),
	('c@c.com', 'b@b.com'),
	('b@b.com', 'e@e.com'),
	('f@f.com', 'a@a.com'),
	('d@d.com', 'f@f.com'),
	('a@a.com', 'f@f.com');

-- Volcando estructura para tabla wishlist.presents
CREATE TABLE IF NOT EXISTS `presents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `chosenBy` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_presents_users` (`userId`),
  CONSTRAINT `FK_presents_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla wishlist.presents: ~7 rows (aproximadamente)
INSERT INTO `presents` (`id`, `userId`, `name`, `description`, `url`, `price`, `chosenBy`) VALUES
	(1, 1, 'Auriculares', 'Auriculares Xiaomi', 'https://www.amazon.es/Redmi-Buds-Lite-Auriculares-inal%C3%A1mbricos/dp/B0BTSXHNN1/?_encoding=UTF8&pd_rd_w=38KVf&content-id=amzn1.sym.4bd6cc52-b915-4988-8bf3-dc562b80b258&pf_rd_p=4bd6cc52-b915-4988-8bf3-dc562b80b258&pf_rd_r=XM0TXDW7C45K9BNYZGF0&pd_rd_wg=Dryhv&pd_rd_r=ad30df0f-5a20-44dd-a691-308d9193efad&ref_=pd_gw_glx_wl_gw_glx_0', 17, 'd@d.com'),
	(2, 4, 'Auriculares', 'Auriculares Xiaomi', 'https://www.amazon.es/Redmi-Buds-Lite-Auriculares-inal%C3%A1mbricos/dp/B0BTSXHNN1/?_encoding=UTF8&pd_rd_w=38KVf&content-id=amzn1.sym.4bd6cc52-b915-4988-8bf3-dc562b80b258&pf_rd_p=4bd6cc52-b915-4988-8bf3-dc562b80b258&pf_rd_r=XM0TXDW7C45K9BNYZGF0&pd_rd_wg=Dryhv&pd_rd_r=ad30df0f-5a20-44dd-a691-308d9193efad&ref_=pd_gw_glx_wl_gw_glx_0', 17, 'a@a.com'),
	(3, 5, 'Libro', 'Libro Nutrición', 'https://www.amazon.es/Eat-Pretty-Jolene-Hart/dp/1452123667/ref=pd_rhf_gw_s_pd_crcd_d_sccl_1_2/261-7282410-4502829?pd_rd_w=GnVkM&content-id=amzn1.sym.09801950-5e05-490a-a4a2-44fc5919454c&pf_rd_p=09801950-5e05-490a-a4a2-44fc5919454c&pf_rd_r=G9H7508S5S99J69NTFHD&pd_rd_wg=qafhb&pd_rd_r=d82b4632-aa02-4b86-8e18-6f75158db297&pd_rd_i=1452123667&psc=1', 13.25, 'c@c.com'),
	(4, 3, 'Pulsera', 'Pulsera personalizable', 'https://www.amazon.es/personalizada-Pulseras-personalizadas-interior-ajustable/dp/B0BHDY7NHZ/?_encoding=UTF8&pd_rd_w=KBJcn&content-id=amzn1.sym.e840d5e1-13c5-4f57-b545-cff67fed4621%3Aamzn1.symc.36bd837a-d66d-47d1-8457-ffe9a9f3ddab&pf_rd_p=e840d5e1-13c5-4f57-b545-cff67fed4621&pf_rd_r=TVTY1BYFK7ESHQQDJWRN&pd_rd_wg=mPCaz&pd_rd_r=40ec134d-6e76-4bd5-b4eb-4587eb21d858&ref_=pd_gw_ci_mcx_mr_hp_atf_m&th=1', 19, 'b@b.com'),
	(5, 2, 'Crema solar', 'Crema solar Singuladerm', 'https://www.amazon.es/Singuladerm-XPERTSUN-Urban-50-ml/dp/B094NGFWJZ/?_encoding=UTF8&pd_rd_w=Nfegm&content-id=amzn1.sym.5c14c208-5aeb-45cb-a8e7-3632120898fe&pf_rd_p=5c14c208-5aeb-45cb-a8e7-3632120898fe&pf_rd_r=22RXBGVCKNDSEVVA3JK9&pd_rd_wg=4Gh7q&pd_rd_r=841f0c38-7f24-4b31-a2a1-ea7ecfa0b441&ref_=pd_gw_p13ncc_b_sbp', 15.75, 'e@e.com'),
	(6, 4, 'Mesa', 'Mesa de madera', 'https://www.amazon.es/IDMarket-comedor-Georgia-personas-imitaci%C3%B3n/dp/B09MJR8MWG/ref=sr_1_7?dib=eyJ2IjoiMSJ9.ivh9DNvheeKwvosaJkm7_UCsthwdPk2TTteF_w3pK8FN6NNBcjbYMn1Mgu4gvlMagB0NVYnN47Y1iuhmVxsVGG-h4yrpp-Gmsc6pUHc0dn7N7Lp693FelZC64Df48sdQH0f5mZ1m0MLsOEsaTHgNsh2l1niowFH7JjzzP0jznnix3qkOSB6vmGbPCTA8ssYagI0Ow2iXlQ60PIO3cPf_udQUAU0xmrWLrC2HO8T_-QqyeNv4gSYkoa8U1boCZg-2A6BiaL5rgzvv0NXgIjfAuJ2eW5XUhngCKYo9djzATyw.-c9fnNpmmq3uKAtOEycCt5IVDHnIWfPHmNW4kuHr3Rc&dib_tag=se&keywords=mesa+comedor+de+madera&qid=1713041598&sr=8-7&ufe=app_do%3Aamzn1.fos.5e544547-1f8e-4072-8c08-ed563e39fc7d', 85, 'f@f.com'),
	(7, 6, 'Pizarra', 'Pizarra verde', 'https://www.amazon.es/Pizarra-q-connect-madera-120x90-repisa/dp/B00G46KO0K/ref=sr_1_5?dib=eyJ2IjoiMSJ9.l6u9VKAOrkR9hALoy_NZAx88X6tq9uTL3ztFhuyxR5Xbr8k31JlVDNi0ag4cpqShawaVIK5LIIUScQnqP8UAGZD5c6GNdMUYCE-h9BqlGwusMT1y8JEm_WzBCGPmQhjGkyKrlA3NCsHJKbqVySPeWQpgikWIku6nY7e_mZMijf4kWjqQn9f4uG16QqPIBCDXEHF2yKBnYgxzrn0gMWjSOfPoqFRM8EVm8TNANWOOxph3qmNyOUY2EsbAxB4R-z9rHc3aitX_cOEpPNS-y858t8Wy2p46v5bbEKUC2Fwghuo.E-6D5CKZnetUoeGjKw-RVvVStjjT-XwoZTjBf3ESrTk&dib_tag=se&keywords=pizarra+verde+tiza&qid=1713128436&sr=8-5', 47, 'a@a.com');

-- Volcando estructura para tabla wishlist.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Volcando datos para la tabla wishlist.users: ~6 rows (aproximadamente)
INSERT INTO `users` (`id`, `email`, `name`, `password`) VALUES
	(1, 'a@a.com', 'aa', 'aaaaa'),
	(2, 'b@b.com', 'bb', 'bbbbb'),
	(3, 'c@c.com', 'cc', 'ccccc'),
	(4, 'd@d.com', 'dd', 'ddddd'),
	(5, 'e@e.com', 'ee', 'eeeee'),
	(6, 'f@f.com', 'ff', 'fffff');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
