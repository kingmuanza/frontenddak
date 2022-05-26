CREATE DATABASE  IF NOT EXISTS `dak` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dak`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: dak
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `affectation`
--

DROP TABLE IF EXISTS `affectation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affectation` (
  `idaffectation` int NOT NULL AUTO_INCREMENT,
  `date_affectation` date DEFAULT NULL,
  `idposte` int DEFAULT NULL,
  `idvigile` int DEFAULT NULL,
  `qualite` varchar(45) DEFAULT NULL,
  `horaire` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `remplacant` int DEFAULT NULL,
  `jour_repos` varchar(45) DEFAULT NULL,
  `arret` date DEFAULT NULL,
  `placement` int DEFAULT NULL,
  `jour_pl` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idaffectation`),
  KEY `fk_affectation_poste_idx` (`idposte`),
  KEY `fk_affectation_vigile_idx` (`idvigile`),
  KEY `fk_affectation_remplacant_idx` (`remplacant`),
  KEY `fk_affectation_placement_idx` (`placement`),
  CONSTRAINT `fk_affectation_placement` FOREIGN KEY (`placement`) REFERENCES `vigile` (`idvigile`),
  CONSTRAINT `fk_affectation_poste` FOREIGN KEY (`idposte`) REFERENCES `poste` (`idposte`),
  CONSTRAINT `fk_affectation_remplacant` FOREIGN KEY (`remplacant`) REFERENCES `vigile` (`idvigile`),
  CONSTRAINT `fk_affectation_vigile` FOREIGN KEY (`idvigile`) REFERENCES `vigile` (`idvigile`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affectation`
--

LOCK TABLES `affectation` WRITE;
/*!40000 ALTER TABLE `affectation` DISABLE KEYS */;
INSERT INTO `affectation` VALUES (54,'2022-05-07',4,10,NULL,'nuit',NULL,5,'','2022-05-07',NULL,NULL),(55,'2022-05-07',3,8,NULL,'nuit',NULL,5,'','2022-05-07',NULL,NULL),(56,'2022-05-07',3,9,NULL,'jour',NULL,4,'','2022-05-07',NULL,NULL),(57,'2022-05-07',4,1,NULL,'jour',NULL,4,'','2022-05-07',NULL,NULL),(58,'2022-05-07',2,13,NULL,'jour',NULL,4,'','2022-05-07',NULL,NULL),(59,'2022-05-07',2,2,NULL,'jour',NULL,4,'','2022-05-07',NULL,NULL),(60,'2022-05-07',2,11,NULL,'jour',NULL,4,'','2022-05-07',NULL,NULL),(61,'2022-05-07',3,8,NULL,'nuit',NULL,12,'',NULL,NULL,NULL),(62,'2022-05-07',3,9,NULL,'jour',NULL,12,'',NULL,NULL,NULL),(63,'2022-05-07',4,1,NULL,'jour',NULL,12,'',NULL,NULL,NULL),(64,'2022-05-07',2,11,NULL,'jour',NULL,12,'',NULL,NULL,NULL),(65,'2022-05-07',2,13,NULL,'jour',NULL,12,'',NULL,NULL,NULL),(66,'2022-05-07',4,10,NULL,'nuit',NULL,6,'',NULL,NULL,NULL),(67,'2022-05-07',2,2,NULL,'jour',NULL,6,'',NULL,NULL,NULL),(68,'2022-05-07',2,3,NULL,'nuit',NULL,5,'',NULL,NULL,NULL);
/*!40000 ALTER TABLE `affectation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipement`
--

DROP TABLE IF EXISTS `equipement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipement` (
  `idequipement` int NOT NULL AUTO_INCREMENT,
  `date_affection` int DEFAULT NULL,
  `poste` int DEFAULT NULL,
  `matricule` varchar(45) DEFAULT NULL,
  `arret` date DEFAULT NULL,
  `qualite` varchar(45) DEFAULT NULL,
  `horaire` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `remplacant` varchar(45) DEFAULT NULL,
  `jour` varchar(45) DEFAULT NULL,
  `placement` varchar(45) DEFAULT NULL,
  `jour_pl` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idequipement`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipement`
--

LOCK TABLES `equipement` WRITE;
/*!40000 ALTER TABLE `equipement` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipement_vigile`
--

DROP TABLE IF EXISTS `equipement_vigile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipement_vigile` (
  `idequipement_vigile` int NOT NULL AUTO_INCREMENT,
  `idvigile` int DEFAULT NULL,
  `casquette` int DEFAULT NULL,
  `chemisette` int DEFAULT NULL,
  `sifflet` int DEFAULT NULL,
  `pantalon` int DEFAULT NULL,
  `porte_matraque` int DEFAULT NULL,
  `matraque` int DEFAULT NULL,
  `combinaison` int DEFAULT NULL,
  `veste` int DEFAULT NULL,
  `pullover` int DEFAULT NULL,
  `manteau` int DEFAULT NULL,
  `epaulettes` int DEFAULT NULL,
  PRIMARY KEY (`idequipement_vigile`),
  KEY `fk_equipementvigile_vigile_idx` (`idvigile`),
  CONSTRAINT `fk_equipementvigile_vigile` FOREIGN KEY (`idvigile`) REFERENCES `vigile` (`idvigile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipement_vigile`
--

LOCK TABLES `equipement_vigile` WRITE;
/*!40000 ALTER TABLE `equipement_vigile` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipement_vigile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motif`
--

DROP TABLE IF EXISTS `motif`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motif` (
  `idmotif` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `tarif` double DEFAULT NULL,
  PRIMARY KEY (`idmotif`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motif`
--

LOCK TABLES `motif` WRITE;
/*!40000 ALTER TABLE `motif` DISABLE KEYS */;
INSERT INTO `motif` VALUES (1,'1','Aucun',NULL),(2,'2','Deuil',NULL),(3,'3','Maladie',NULL),(4,'4','Personnel',NULL);
/*!40000 ALTER TABLE `motif` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nationalite`
--

DROP TABLE IF EXISTS `nationalite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nationalite` (
  `idnationalite` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idnationalite`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nationalite`
--

LOCK TABLES `nationalite` WRITE;
/*!40000 ALTER TABLE `nationalite` DISABLE KEYS */;
INSERT INTO `nationalite` VALUES (1,'1','Camerounaise'),(2,'2','Gabonnaise'),(3,'3','Sénégalaise');
/*!40000 ALTER TABLE `nationalite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poste`
--

DROP TABLE IF EXISTS `poste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poste` (
  `idposte` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `zone` int DEFAULT NULL,
  `zone_jour` int DEFAULT NULL,
  `zone_nuit` int DEFAULT NULL,
  `contrat` varchar(45) DEFAULT NULL,
  `debut_contrat` date DEFAULT NULL,
  `fin_contrat` date DEFAULT NULL,
  `nombre_vigile_jour` int DEFAULT NULL,
  `nombre_vigile_nuit` int DEFAULT NULL,
  `nombre_MC` int DEFAULT NULL,
  `nombre_ESC` int DEFAULT NULL,
  `nombre_radio` int DEFAULT NULL,
  `contact` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `prime` tinyint(1) DEFAULT NULL,
  `abrege` varchar(45) DEFAULT NULL,
  `idquartier` int DEFAULT NULL,
  `note` int DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  PRIMARY KEY (`idposte`),
  KEY `fk_poste_zone_idx` (`zone`),
  KEY `fk_poste_quartier_idx` (`idquartier`),
  CONSTRAINT `fk_poste_quartier` FOREIGN KEY (`idquartier`) REFERENCES `quartier` (`idquartier`),
  CONSTRAINT `fk_poste_zone` FOREIGN KEY (`zone`) REFERENCES `zone` (`idzone`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poste`
--

LOCK TABLES `poste` WRITE;
/*!40000 ALTER TABLE `poste` DISABLE KEYS */;
INSERT INTO `poste` VALUES (1,'3201','POSTE1',1,NULL,NULL,'ENCOURS','2017-11-21','2022-03-18',1,3,1,1,1,NULL,'696857412',1,'P1',1,NULL,3.8638261,11.5111298),(2,'466N','POSTE2',2,NULL,NULL,'ENCOURS','2022-01-04',NULL,4,1,NULL,NULL,NULL,NULL,NULL,1,NULL,2,NULL,3.887676,11.509713),(3,'POSTE3','POSTE 3',3,NULL,NULL,'ENCOURS','2006-01-03','2022-03-03',2,1,0,0,1,'','',0,'P3',6,0,3.8611762,11.513189),(4,'POSTE4','POSTE 4',1,NULL,NULL,'ENCOURS','2022-03-01','2022-03-15',1,1,0,0,0,'','',1,'P4',1,0,NULL,NULL);
/*!40000 ALTER TABLE `poste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quartier`
--

DROP TABLE IF EXISTS `quartier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quartier` (
  `idquartier` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `idzone` int DEFAULT NULL,
  PRIMARY KEY (`idquartier`),
  KEY `fk_quartier_zone_idx` (`idzone`),
  CONSTRAINT `fk_quartier_zone` FOREIGN KEY (`idzone`) REFERENCES `zone` (`idzone`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quartier`
--

LOCK TABLES `quartier` WRITE;
/*!40000 ALTER TABLE `quartier` DISABLE KEYS */;
INSERT INTO `quartier` VALUES (1,'Etoa Meki','Etoa Meki',1),(2,'BASTOS','Bastos',2),(3,'ELIG','Elig Essono',1),(4,'EDZOA','Elig-Edzoa',1),(5,'GOLF','Bastos Golf',2),(6,'BA','Biyem Assi',3),(7,'DAMAS','Damas',3);
/*!40000 ALTER TABLE `quartier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statut`
--

DROP TABLE IF EXISTS `statut`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statut` (
  `idstatut` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idstatut`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statut`
--

LOCK TABLES `statut` WRITE;
/*!40000 ALTER TABLE `statut` DISABLE KEYS */;
INSERT INTO `statut` VALUES (1,NULL,'Absent[e]'),(2,NULL,'Actif[ve]'),(3,NULL,'Licencié[e]'),(4,NULL,'Standby'),(5,NULL,'Suspendu[e]'),(6,NULL,'Demissionné[e]'),(7,NULL,'Décédé[e]');
/*!40000 ALTER TABLE `statut` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suivi_poste`
--

DROP TABLE IF EXISTS `suivi_poste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suivi_poste` (
  `idsuivi_poste` int NOT NULL AUTO_INCREMENT,
  `date_suivi` date DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `idvigile` int DEFAULT NULL,
  `poste` int DEFAULT NULL,
  `horaire` varchar(45) DEFAULT NULL,
  `zone` int DEFAULT NULL,
  `statut` varchar(45) DEFAULT NULL,
  `pl` varchar(45) DEFAULT NULL,
  `nombre_absence` varchar(45) DEFAULT NULL,
  `motif_absence` varchar(45) DEFAULT NULL,
  `nombre_sanction` varchar(45) DEFAULT NULL,
  `motif_sanction` varchar(45) DEFAULT NULL,
  `montant_sanction` varchar(45) DEFAULT NULL,
  `commentaire` longtext,
  `date_effet` date DEFAULT NULL,
  PRIMARY KEY (`idsuivi_poste`),
  KEY `fk__suivi_poste__zone_idx` (`zone`),
  KEY `fk__suivi_poste__poste_idx` (`poste`),
  KEY `fk__suivi_poste__vigile_idx` (`idvigile`),
  CONSTRAINT `fk__suivi_poste__poste` FOREIGN KEY (`poste`) REFERENCES `poste` (`idposte`),
  CONSTRAINT `fk__suivi_poste__vigile` FOREIGN KEY (`idvigile`) REFERENCES `vigile` (`idvigile`),
  CONSTRAINT `fk__suivi_poste__zone` FOREIGN KEY (`zone`) REFERENCES `zone` (`idzone`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suivi_poste`
--

LOCK TABLES `suivi_poste` WRITE;
/*!40000 ALTER TABLE `suivi_poste` DISABLE KEYS */;
INSERT INTO `suivi_poste` VALUES (1,'2012-01-01','320N',1,1,'jour',6,NULL,NULL,'1',NULL,NULL,'Absence',NULL,'Sommeil profond','2022-03-17'),(2,'2022-03-17','320N',2,2,'jour',6,NULL,NULL,'2',NULL,NULL,'Absence',NULL,'Absent[e] ne pas faire signer','2022-03-17');
/*!40000 ALTER TABLE `suivi_poste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vigile`
--

DROP TABLE IF EXISTS `vigile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vigile` (
  `idvigile` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(45) DEFAULT NULL,
  `matricule` varchar(45) DEFAULT NULL,
  `noms` varchar(45) DEFAULT NULL,
  `ref_paie0` varchar(45) DEFAULT NULL,
  `ref_paie` varchar(45) DEFAULT NULL,
  `statut_paie` varchar(45) DEFAULT NULL,
  `dte_nce` date DEFAULT NULL,
  `mum_cni` varchar(45) DEFAULT NULL,
  `ville` int DEFAULT NULL,
  `nationalite` int DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `fonction` varchar(45) DEFAULT NULL,
  `date_entree` date DEFAULT NULL,
  `date_sortie` date DEFAULT NULL,
  `debut_conge` date DEFAULT NULL,
  `fin_conge` date DEFAULT NULL,
  `statut` varchar(45) DEFAULT NULL,
  `jour_repos` int DEFAULT NULL,
  `parrain` varchar(45) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `poste` int DEFAULT NULL,
  `sommeil` varchar(45) DEFAULT NULL,
  `motif` varchar(45) DEFAULT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `note` int DEFAULT NULL,
  `quartier` int DEFAULT NULL,
  `zone` int DEFAULT NULL,
  `est_remplacant` tinyint(1) DEFAULT NULL,
  `horaire` varchar(45) DEFAULT NULL,
  `est_remplacant_conge` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idvigile`),
  KEY `fk_vigile_ville_idx` (`ville`),
  KEY `fk_vigile_nationalite_idx` (`nationalite`),
  KEY `fk_vigile_zone_idx` (`zone`),
  KEY `fk_vigile_quartier_idx` (`quartier`),
  CONSTRAINT `fk_vigile_nationalite` FOREIGN KEY (`nationalite`) REFERENCES `nationalite` (`idnationalite`),
  CONSTRAINT `fk_vigile_quartier` FOREIGN KEY (`quartier`) REFERENCES `quartier` (`idquartier`),
  CONSTRAINT `fk_vigile_ville` FOREIGN KEY (`ville`) REFERENCES `ville` (`idville`),
  CONSTRAINT `fk_vigile_zone` FOREIGN KEY (`zone`) REFERENCES `zone` (`idzone`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vigile`
--

LOCK TABLES `vigile` WRITE;
/*!40000 ALTER TABLE `vigile` DISABLE KEYS */;
INSERT INTO `vigile` VALUES (1,'320N','2361','VIGILE1',NULL,NULL,NULL,'2022-03-31','123456789',1,1,'696857412','AGENT','2022-05-15',NULL,'2022-05-04','2022-05-24','',3,'Aucun',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jour',1),(2,'912N','2953','VIGILE2',NULL,NULL,NULL,'1996-03-25','963258741',2,3,NULL,'MAITRECHIEN','2022-03-17',NULL,'2022-11-17',NULL,NULL,4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'jour',NULL),(3,'NUM123456','MAT123456','VIGILE 3',NULL,NULL,NULL,'1990-03-17','CNI123456',1,1,'TEL123456','AGENT','2020-06-09','2022-03-08','2022-03-08','2022-03-08','',7,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'nuit',NULL),(4,'REMPL1','REM','REMPLACANT 1',NULL,NULL,NULL,'1997-03-24','174852369',1,1,'698745632','AGENT','2019-07-09',NULL,'2023-07-09','2023-07-30','2',1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'jour',NULL),(5,'REMPL2','REMP2','REMPLACANT 2',NULL,NULL,NULL,NULL,'',1,1,'','AGENT','2022-08-18',NULL,NULL,NULL,'2',2,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,'nuit',NULL),(6,'145N','AFG','Eric Atangana',NULL,NULL,NULL,'2022-03-24','',1,1,'','AGENT','2022-10-20','2022-03-24','2022-03-24','2022-03-24','',2,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,1,1,'nuit',0),(7,'14777NN','12334','Francois Eric Camadi',NULL,NULL,NULL,'2022-03-24','',1,NULL,'','AGENT','2022-12-15','2022-03-24','2022-03-24','2022-03-24','',3,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,1,0,'nuit',NULL),(8,'147N','147','Abdel Karim',NULL,NULL,NULL,'2022-03-24','',1,1,'','AGENT','2022-03-24','2022-03-24','2022-07-21','2022-03-24','',1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,3,0,'nuit',NULL),(9,'258JJJ','258','Rebo Tchulo',NULL,NULL,NULL,'2022-03-24','',1,NULL,'','AGENT','2022-08-18','2022-03-24','2022-03-24','2022-03-24','',2,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,3,0,'jour',NULL),(10,'963N','963','Charlito Probo',NULL,NULL,NULL,'2022-03-24','',1,1,'','AGENT','2022-05-24','2022-03-24','2022-03-24','2022-03-24','',3,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0,'nuit',NULL),(11,'1234UI','1234UI','Youssoupha Amampia',NULL,NULL,NULL,NULL,'',1,NULL,'','AGENT','2022-05-06',NULL,NULL,NULL,'',4,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0,'jour',0),(12,'456N','STRM','Maes Trorwan',NULL,NULL,NULL,NULL,'1478523369',1,1,'','AGENT','2022-05-20',NULL,NULL,NULL,'',5,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,1,'nuit',NULL),(13,'789JFJF','EJIO','Paul Mekanga',NULL,NULL,NULL,'2022-03-24','DDG14856632',1,2,'','AGENT','2022-03-25','2022-03-24','2022-03-24','2022-03-24','',6,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,0,'jour',NULL),(14,'15484894','OJVJSQJIVC','Jean Alain Seni',NULL,NULL,NULL,NULL,'',1,1,'','AGENT','2022-05-26',NULL,NULL,NULL,'',1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,5,2,0,'jour',0),(15,'GSHYS','1247885','Bruce Wangue',NULL,NULL,NULL,'1995-01-27','147852369',1,1,'','AGENT','2021-08-25','2022-05-09','2022-05-09','2022-05-27','2',1,'',NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,3,0,'jour',0);
/*!40000 ALTER TABLE `vigile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ville`
--

DROP TABLE IF EXISTS `ville`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ville` (
  `idville` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idville`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ville`
--

LOCK TABLES `ville` WRITE;
/*!40000 ALTER TABLE `ville` DISABLE KEYS */;
INSERT INTO `ville` VALUES (1,'YDE','Yaoundé'),(2,'KRB','Kribi'),(3,'DLA','Douala');
/*!40000 ALTER TABLE `ville` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zone`
--

DROP TABLE IF EXISTS `zone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zone` (
  `idzone` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `horaire` varchar(45) DEFAULT NULL,
  `idville` int DEFAULT NULL,
  PRIMARY KEY (`idzone`),
  KEY `fk_zone_ville_idx` (`idville`),
  CONSTRAINT `fk_zone_ville` FOREIGN KEY (`idville`) REFERENCES `ville` (`idville`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone`
--

LOCK TABLES `zone` WRITE;
/*!40000 ALTER TABLE `zone` DISABLE KEYS */;
INSERT INTO `zone` VALUES (1,'1','PGA','Nuit',1),(2,'2','PGB','Nuit',NULL),(3,'3','PGC','Nuit',NULL),(4,'4','PGD','Nuit',NULL),(5,'5','PGE','Nuit',NULL),(6,'6','PGF','Nuit',NULL),(7,'7','PGI','Nuit',NULL),(8,'8','PGJ','Nuit',NULL),(9,'9','PGK','Jour',NULL),(17,'14','Quatorze','nuit',NULL),(18,'13','Treize','jour',NULL);
/*!40000 ALTER TABLE `zone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-26 12:51:01
