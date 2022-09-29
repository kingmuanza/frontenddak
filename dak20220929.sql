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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affectation`
--

LOCK TABLES `affectation` WRITE;
/*!40000 ALTER TABLE `affectation` DISABLE KEYS */;
INSERT INTO `affectation` VALUES (69,'2022-08-03',5,16,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(70,'2022-08-03',6,17,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(71,'2022-08-03',7,18,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(72,'2022-08-03',9,19,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(73,'2022-08-03',9,19,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(74,'2022-08-03',9,19,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(75,'2022-08-03',10,20,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(76,'2022-08-03',11,21,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(77,'2022-08-03',12,22,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(78,'2022-08-03',12,24,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(79,'2022-08-03',12,25,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(80,'2022-08-03',12,26,NULL,'',NULL,NULL,'',NULL,NULL,NULL),(81,'2022-08-03',14,27,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(82,'2022-08-03',15,28,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(83,'2022-08-03',16,29,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(84,'2022-08-03',18,31,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(85,'2022-08-03',17,30,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(86,'2022-08-03',18,32,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(87,'2022-08-03',19,33,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(88,'2022-08-03',20,34,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(89,'2022-08-03',20,35,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(90,'2022-08-03',20,36,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(91,'2022-08-03',21,37,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(92,'2022-08-03',21,38,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(93,'2022-08-03',22,39,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(94,'2022-08-03',23,40,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(95,'2022-08-03',24,41,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(96,'2022-08-03',25,42,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(97,'2022-08-03',27,43,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(98,'2022-08-03',28,44,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(99,'2022-08-03',30,45,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(100,'2022-08-03',31,46,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(101,'2022-08-03',32,47,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(102,'2022-08-03',33,48,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(103,'2022-08-03',34,49,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(104,'2022-08-03',35,50,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(105,'2022-08-01',1,1,NULL,'jour',NULL,4,'','2022-09-26',NULL,NULL),(106,'2022-09-26',35,1,NULL,'jour',NULL,4,'',NULL,NULL,NULL);
/*!40000 ALTER TABLE `affectation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrat`
--

DROP TABLE IF EXISTS `contrat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrat` (
  `idcontrat` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(45) DEFAULT NULL,
  `localisation` varchar(255) DEFAULT NULL,
  `date_signature` date DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `reference` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `nb_postes` int DEFAULT NULL,
  `nb_vigile_jour` int DEFAULT NULL,
  `nb_vigile_nuit` int DEFAULT NULL,
  `noms` varchar(45) DEFAULT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `prenom` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `raison_sociale` varchar(45) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `particulier` tinyint(1) DEFAULT NULL,
  `idparent` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`idcontrat`),
  KEY `fk_contrat_contrat_idx` (`idparent`),
  CONSTRAINT `fk_contrat_contrat` FOREIGN KEY (`idparent`) REFERENCES `contrat` (`idcontrat`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrat`
--

LOCK TABLES `contrat` WRITE;
/*!40000 ALTER TABLE `contrat` DISABLE KEYS */;
INSERT INTO `contrat` VALUES (1,'Premier contrat','Golf, Bastos','2022-01-01','2022-01-05','2023-01-05','Aucune référence','Aucune description',1,41,51,'Kangudie Muanza','Kangudie','Muanza','696543495','muanza.kangudie@gmail.com','123456789',NULL,'Kangudie',1,NULL,'2022-01-01'),(8,'Premier contrat','Golf, Bastos','2022-01-01','2022-01-05','2023-01-05','Aucune référence','Aucune description',1,41,51,'Kangudie Muanza','Kangudie','Muanza','696543495','muanza.kangudie@gmail.com','123456789',NULL,'Kangudie',1,1,'2022-09-29');
/*!40000 ALTER TABLE `contrat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrat_avenant`
--

DROP TABLE IF EXISTS `contrat_avenant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrat_avenant` (
  `idcontrat_avenant` int NOT NULL AUTO_INCREMENT,
  `idcontrat` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idcontrat_avenant`),
  KEY `fk_contratavenant_contrat_idx` (`idcontrat`),
  CONSTRAINT `fk_contratavenant_contrat` FOREIGN KEY (`idcontrat`) REFERENCES `contrat` (`idcontrat`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrat_avenant`
--

LOCK TABLES `contrat_avenant` WRITE;
/*!40000 ALTER TABLE `contrat_avenant` DISABLE KEYS */;
INSERT INTO `contrat_avenant` VALUES (1,1,'2022-05-05','Maintenant on veut 2 vigiles');
/*!40000 ALTER TABLE `contrat_avenant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipement`
--

DROP TABLE IF EXISTS `equipement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipement` (
  `idequipement` int NOT NULL AUTO_INCREMENT,
  `code` varchar(25) DEFAULT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `basique` tinyint(1) DEFAULT NULL,
  `defaut` int DEFAULT NULL,
  PRIMARY KEY (`idequipement`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipement`
--

LOCK TABLES `equipement` WRITE;
/*!40000 ALTER TABLE `equipement` DISABLE KEYS */;
INSERT INTO `equipement` VALUES (2,NULL,'Casquette',1,1),(3,NULL,'Porte Matraque',NULL,NULL),(4,NULL,'Pullover',1,1),(5,NULL,'Chemisette',NULL,NULL),(6,NULL,'Matraque',NULL,NULL),(7,NULL,'Manteau',NULL,NULL),(8,NULL,'Sifflet',1,1),(9,NULL,'Combinaison MC',NULL,NULL),(10,NULL,'Epaulettes',NULL,NULL),(11,NULL,'Pantalon',NULL,4),(12,'Veste','Veste',1,1),(13,NULL,'Fourragère',NULL,NULL);
/*!40000 ALTER TABLE `equipement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipement_vigile`
--

DROP TABLE IF EXISTS `equipement_vigile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipement_vigile` (
  `idequipement_vigile` varchar(255) NOT NULL,
  `idvigile` int DEFAULT NULL,
  `idequipement` int DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `restituee` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idequipement_vigile`),
  KEY `fk_equipementvigile_vigile_idx` (`idvigile`),
  KEY `fk_equipementvigile_equipement_idx` (`idequipement`),
  CONSTRAINT `fk_equipementvigile_equipement` FOREIGN KEY (`idequipement`) REFERENCES `equipement` (`idequipement`),
  CONSTRAINT `fk_equipementvigile_vigile` FOREIGN KEY (`idvigile`) REFERENCES `vigile` (`idvigile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipement_vigile`
--

LOCK TABLES `equipement_vigile` WRITE;
/*!40000 ALTER TABLE `equipement_vigile` DISABLE KEYS */;
INSERT INTO `equipement_vigile` VALUES ('1-10',1,10,9,NULL),('1-11',1,11,10,NULL),('1-12',1,12,11,NULL),('1-13',1,13,12,NULL),('1-2',1,2,1,NULL),('1-3',1,3,2,NULL),('1-4',1,4,3,NULL),('1-5',1,5,4,NULL),('1-6',1,6,5,NULL),('1-7',1,7,6,NULL),('1-8',1,8,7,NULL),('1-9',1,9,8,NULL),('49-10',49,10,0,NULL),('49-11',49,11,0,NULL),('49-12',49,12,0,NULL),('49-13',49,13,0,NULL),('49-2',49,2,1,NULL),('49-3',49,3,0,NULL),('49-4',49,4,0,NULL),('49-5',49,5,0,NULL),('49-6',49,6,0,NULL),('49-7',49,7,0,NULL),('49-8',49,8,0,NULL),('49-9',49,9,0,NULL),('50-10',50,10,0,NULL),('50-11',50,11,0,NULL),('50-12',50,12,0,NULL),('50-13',50,13,0,NULL),('50-2',50,2,2,NULL),('50-3',50,3,1,NULL),('50-4',50,4,0,NULL),('50-5',50,5,0,NULL),('50-6',50,6,1,NULL),('50-7',50,7,0,NULL),('50-8',50,8,0,NULL),('50-9',50,9,0,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `idpermission` int NOT NULL AUTO_INCREMENT,
  `idvigile` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  `commentaire` longtext,
  PRIMARY KEY (`idpermission`),
  KEY `fk_permission_vigile_idx` (`idvigile`),
  CONSTRAINT `fk_permission_vigile` FOREIGN KEY (`idvigile`) REFERENCES `vigile` (`idvigile`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,1,'2022-05-27','2022-05-28','2022-06-15','Deuil Familial'),(2,2,'2022-05-27','2022-05-28','2022-05-30','Deuil Familial');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
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
  `organisme` tinyint(1) DEFAULT NULL,
  `idcontrat` int DEFAULT NULL,
  `numero` int DEFAULT NULL,
  PRIMARY KEY (`idposte`),
  KEY `fk_poste_zone_idx` (`zone`),
  KEY `fk_poste_quartier_idx` (`idquartier`),
  KEY `fk_poste_contrat_idx` (`idcontrat`),
  CONSTRAINT `fk_poste_contrat` FOREIGN KEY (`idcontrat`) REFERENCES `contrat` (`idcontrat`),
  CONSTRAINT `fk_poste_quartier` FOREIGN KEY (`idquartier`) REFERENCES `quartier` (`idquartier`),
  CONSTRAINT `fk_poste_zone` FOREIGN KEY (`zone`) REFERENCES `zone` (`idzone`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poste`
--

LOCK TABLES `poste` WRITE;
/*!40000 ALTER TABLE `poste` DISABLE KEYS */;
INSERT INTO `poste` VALUES (1,'3201','POSTE1',1,NULL,NULL,'ENCOURS','2017-11-21','2022-03-18',1,3,1,1,1,NULL,'696857412',1,'P1',1,NULL,3.8638261,11.5111298,NULL,NULL,NULL),(2,'466N','POSTE2',2,NULL,NULL,'ENCOURS','2022-01-04',NULL,4,1,NULL,NULL,NULL,NULL,NULL,1,NULL,2,NULL,3.887676,11.509713,NULL,NULL,NULL),(3,'POSTE3','POSTE 3',3,NULL,NULL,'ENCOURS','2006-01-03','2022-03-03',2,1,0,0,1,'','',0,'P3',6,0,3.8611762,11.513189,NULL,NULL,NULL),(4,'POSTE4','POSTE 4',1,NULL,NULL,'ENCOURS','2022-03-01','2022-03-15',1,1,0,0,0,'','',1,'P4',1,0,NULL,NULL,NULL,NULL,NULL),(5,'EURO WORLD','EURO WORLD',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(6,'CHANT MERLIN CAME','CHANT MERLIN CAME',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(7,'IRC','IRC',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(8,'PCIE BASTOS','PCIE BASTOS',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(9,'V. GHETANG','V. GHETANG',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(10,'APPT CHIRAGANE','APPT CHIRAGANE',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(11,'V. IROKOSE','V. IROKOSE',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(12,'NHPC','NHPC',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(13,'V. TSOUNGUI','V. TSOUNGUI',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(14,'APPT SLEPER HCR','APPT SLEPER HCR',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(15,'CUSO','CUSO',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(16,'CABINET PROF. MBOND','CABINET PROF. MBOND',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(17,'COMM-VILLES','COMM-VILLES',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(18,'CTRE MEDICAL','CTRE MEDICAL',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(19,'ECOLE 123 SOLEIL','ECOLE 123 SOLEIL',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(20,'HCR EX SNV','HCR EX SNV',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(21,'IMM. ETOGA','IMM. ETOGA',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(22,'JAHAL REBESEAHELA ','JAHAL REBESEAHELA ',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(23,'LWF','LWF',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(24,'TERRAIN SCB','TERRAIN SCB',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(25,'TURKISH AIRWAYS','TURKISH AIRWAYS',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(26,'V. AUMAILLEY','V. AUMAILLEY',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(27,'V. AYAMAR SOME','V. AYAMAR SOME',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(28,'VCA 123 SOLEIL','VCA 123 SOLEIL',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(30,'V. DG CHC','V. DG CHC',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(31,'V. EDING','V. EDING',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(32,'V. MAZIMPAKA WCS','V. MAZIMPAKA WCS',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(33,'V. NJOH MOUELLE','V. NJOH MOUELLE',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(34,'V. PANTAZE CATALIN','V. PANTAZE CATALIN',NULL,NULL,NULL,'En ','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,NULL,NULL,NULL),(35,'V. REP. OCHA','V. REP. OCHA',NULL,NULL,NULL,'ENCOURS','2022-08-03','2022-08-03',0,0,0,0,0,'','',1,'',NULL,0,0,0,1,1,NULL);
/*!40000 ALTER TABLE `poste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poste_equipement`
--

DROP TABLE IF EXISTS `poste_equipement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poste_equipement` (
  `idposte_equipement` int NOT NULL AUTO_INCREMENT,
  `idposte` int DEFAULT NULL,
  `idequipement` int DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `version_contrat` int DEFAULT NULL,
  PRIMARY KEY (`idposte_equipement`),
  KEY `fk_posteequipement_poste_idx` (`idposte`),
  KEY `fk_posteequipement_equipement_idx` (`idequipement`),
  KEY `fk_posteequipement_avenant_idx` (`version_contrat`),
  CONSTRAINT `fk_posteequipement_avenant` FOREIGN KEY (`version_contrat`) REFERENCES `contrat_avenant` (`idcontrat_avenant`),
  CONSTRAINT `fk_posteequipement_equipement` FOREIGN KEY (`idequipement`) REFERENCES `equipement` (`idequipement`),
  CONSTRAINT `fk_posteequipement_poste` FOREIGN KEY (`idposte`) REFERENCES `poste` (`idposte`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poste_equipement`
--

LOCK TABLES `poste_equipement` WRITE;
/*!40000 ALTER TABLE `poste_equipement` DISABLE KEYS */;
INSERT INTO `poste_equipement` VALUES (1,35,6,10,1),(2,35,8,2,1),(3,34,6,2,1),(4,35,9,5,1);
/*!40000 ALTER TABLE `poste_equipement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poste_vigile`
--

DROP TABLE IF EXISTS `poste_vigile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poste_vigile` (
  `idposte_vigile` int NOT NULL AUTO_INCREMENT,
  `idposte` int DEFAULT NULL,
  `type_vigile` varchar(45) DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `version_contrat` int DEFAULT NULL,
  `horaire` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idposte_vigile`),
  KEY `fk_postevigile_poste_idx` (`idposte`),
  KEY `fk_poste_vigile_avenant_idx` (`version_contrat`),
  CONSTRAINT `fk_poste_vigile_avenant` FOREIGN KEY (`version_contrat`) REFERENCES `contrat_avenant` (`idcontrat_avenant`),
  CONSTRAINT `fk_postevigile_poste` FOREIGN KEY (`idposte`) REFERENCES `poste` (`idposte`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poste_vigile`
--

LOCK TABLES `poste_vigile` WRITE;
/*!40000 ALTER TABLE `poste_vigile` DISABLE KEYS */;
INSERT INTO `poste_vigile` VALUES (1,35,'AGENT',2,1,'jour'),(2,35,'AGENT',1,1,'nuit'),(3,34,'AGENT',1,1,'jour'),(4,35,'MAITRECHIEN',1,1,'nuit');
/*!40000 ALTER TABLE `poste_vigile` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statut`
--

LOCK TABLES `statut` WRITE;
/*!40000 ALTER TABLE `statut` DISABLE KEYS */;
INSERT INTO `statut` VALUES (1,NULL,'Absent[e]'),(2,NULL,'Actif[ve]'),(3,NULL,'Licencié[e]'),(4,NULL,'Standby'),(5,NULL,'Suspendu[e]'),(6,NULL,'Demissionné[e]'),(7,NULL,'Décédé[e]'),(8,'Bizarre','Bizarre');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suivi_poste`
--

LOCK TABLES `suivi_poste` WRITE;
/*!40000 ALTER TABLE `suivi_poste` DISABLE KEYS */;
INSERT INTO `suivi_poste` VALUES (5,'2022-09-25','',50,NULL,'',NULL,NULL,NULL,'2',NULL,NULL,'Absence',NULL,'','2022-09-25');
/*!40000 ALTER TABLE `suivi_poste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `switch`
--

DROP TABLE IF EXISTS `switch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `switch` (
  `idswitch` int NOT NULL AUTO_INCREMENT,
  `idaffectation` int DEFAULT NULL,
  `idvigile_base` int DEFAULT NULL,
  `idvigile_switch` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `statut` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idswitch`),
  KEY `fk_switch_affectation_idx` (`idaffectation`),
  KEY `fk_switch_vigile_base_idx` (`idvigile_base`),
  KEY `fk_switch_vigile_switch_idx` (`idvigile_switch`),
  CONSTRAINT `fk_switch_affectation` FOREIGN KEY (`idaffectation`) REFERENCES `affectation` (`idaffectation`),
  CONSTRAINT `fk_switch_vigile_base` FOREIGN KEY (`idvigile_base`) REFERENCES `vigile` (`idvigile`),
  CONSTRAINT `fk_switch_vigile_switch` FOREIGN KEY (`idvigile_switch`) REFERENCES `vigile` (`idvigile`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `switch`
--

LOCK TABLES `switch` WRITE;
/*!40000 ALTER TABLE `switch` DISABLE KEYS */;
/*!40000 ALTER TABLE `switch` ENABLE KEYS */;
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
  `parrain` int DEFAULT NULL,
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
  `idremplacant_conge` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `dette_conges` int DEFAULT NULL,
  `badge` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idvigile`),
  KEY `fk_vigile_ville_idx` (`ville`),
  KEY `fk_vigile_nationalite_idx` (`nationalite`),
  KEY `fk_vigile_zone_idx` (`zone`),
  KEY `fk_vigile_quartier_idx` (`quartier`),
  KEY `fk_vigile_remplancant_conge_idx` (`idremplacant_conge`),
  CONSTRAINT `fk_vigile_nationalite` FOREIGN KEY (`nationalite`) REFERENCES `nationalite` (`idnationalite`),
  CONSTRAINT `fk_vigile_quartier` FOREIGN KEY (`quartier`) REFERENCES `quartier` (`idquartier`),
  CONSTRAINT `fk_vigile_remplancant_conge` FOREIGN KEY (`idremplacant_conge`) REFERENCES `vigile` (`idvigile`),
  CONSTRAINT `fk_vigile_ville` FOREIGN KEY (`ville`) REFERENCES `ville` (`idville`),
  CONSTRAINT `fk_vigile_zone` FOREIGN KEY (`zone`) REFERENCES `zone` (`idzone`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vigile`
--

LOCK TABLES `vigile` WRITE;
/*!40000 ALTER TABLE `vigile` DISABLE KEYS */;
INSERT INTO `vigile` VALUES (1,'320N','2361','VIGILE1 ',NULL,NULL,NULL,'1994-08-02','123456789',1,1,'696857412','AGENT','2021-11-22','2022-08-19','2022-11-22','2022-12-12','',3,2,NULL,NULL,NULL,NULL,'VIGILE1',NULL,NULL,6,3,NULL,'jour',0,NULL,'https://firebasestorage.googleapis.com/v0/b/dak-security.appspot.com/o/pp%2F1%2F623187biya.jpg?alt=media&token=84251eba-b1c0-4724-a3e9-51fe129fa2a0',NULL,NULL),(2,'912N','2953','VIGILE2 ',NULL,NULL,NULL,'1996-03-25','963258741',2,3,NULL,'MAITRECHIEN','2022-03-17',NULL,'2022-11-17',NULL,NULL,4,3,NULL,NULL,NULL,NULL,'VIGILE2',NULL,NULL,NULL,NULL,NULL,'jour',0,NULL,NULL,NULL,NULL),(3,'NUM123456','MAT123456','VIGILE 3 ',NULL,NULL,NULL,'1990-03-17','CNI123456',1,1,'TEL123456','AGENT','2020-06-09','2022-03-08','2022-03-08','2022-03-08','',7,17,NULL,NULL,NULL,NULL,'VIGILE 3',NULL,NULL,NULL,NULL,NULL,'nuit',0,NULL,NULL,NULL,NULL),(4,'REMPL1','REM','REMPLACANT 1',NULL,NULL,NULL,'1997-03-24','174852369',1,1,'698745632','AGENT','2019-07-09',NULL,'2023-07-09','2023-07-30','2',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,'jour',NULL,NULL,NULL,NULL,NULL),(5,'REMPL2','REMP2','REMPLACANT 2',NULL,NULL,NULL,NULL,'',1,1,'','AGENT','2022-08-18',NULL,NULL,NULL,'2',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,2,2,1,'nuit',NULL,NULL,NULL,NULL,NULL),(6,'145N','AFG','Eric Atangana',NULL,NULL,NULL,'2022-03-24','',1,1,'','AGENT','2022-10-20','2022-03-24','2022-03-24','2022-03-24','',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,3,1,1,'nuit',0,NULL,NULL,NULL,NULL),(7,'14777NN','12334','Francois Eric Camadi',NULL,NULL,NULL,'2022-03-24','',1,NULL,'','AGENT','2022-12-15','2022-03-24','2022-03-24','2022-03-24','',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,4,1,0,'nuit',NULL,NULL,NULL,NULL,NULL),(8,'147N','147','Abdel Karim',NULL,NULL,NULL,'2022-03-24','',1,1,'','AGENT','2022-03-24','2022-03-24','2022-07-21','2022-03-24','',1,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,7,3,0,'nuit',NULL,NULL,NULL,NULL,NULL),(9,'258JJJ','258','Rebo Tchulo',NULL,NULL,NULL,'2022-03-24','',1,NULL,'','AGENT','2022-08-18','2022-03-24','2022-03-24','2022-03-24','',2,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,6,3,0,'jour',NULL,NULL,NULL,NULL,NULL),(10,'963N','963','Charlito Probo',NULL,NULL,NULL,'2022-03-24','',1,1,'','AGENT','2022-05-24','2022-03-24','2022-03-24','2022-03-24','',3,1,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,1,0,'nuit',NULL,NULL,NULL,NULL,NULL),(11,'1234UI','1234UI','Youssoupha Amampia ',NULL,NULL,NULL,NULL,'',1,NULL,'','AGENT','2022-05-06',NULL,'2023-05-06','2023-05-25','',4,1,NULL,NULL,NULL,NULL,'Youssoupha Amampia',NULL,NULL,1,1,0,'jour',0,1,NULL,NULL,NULL),(12,'456N','STRM','Maes Trorwan ',NULL,NULL,NULL,NULL,'1478523369',1,1,'','AGENT','2022-05-20',NULL,NULL,NULL,'',5,1,NULL,NULL,NULL,NULL,'Maes Trorwan',NULL,NULL,1,1,1,'nuit',0,NULL,NULL,NULL,NULL),(13,'789JFJF','EJIO','Mekanga Paul',NULL,NULL,NULL,'2022-03-24','DDG14856632',1,2,'','AGENT','2022-03-25','2022-03-24','2022-03-24','2022-03-24','',6,1,NULL,NULL,NULL,NULL,'Mekanga','Paul',NULL,2,2,0,'jour',1,NULL,NULL,NULL,NULL),(14,'15484894','OJVJSQJIVC','Jean Alain Seni ',NULL,NULL,NULL,NULL,'',1,1,'','AGENT','2022-05-26',NULL,'2023-05-26','2023-06-15','',1,1,NULL,NULL,NULL,NULL,'Jean Alain Seni',NULL,NULL,5,2,0,'jour',0,13,NULL,NULL,NULL),(15,'GSHYS','1247885','Wangue Bruce ',NULL,NULL,NULL,'1995-01-27','147852369',1,1,'','ENTRETIEN','2021-08-25','2022-05-09','2022-05-09','2022-05-27','2',1,14,NULL,NULL,NULL,NULL,'Wangue','Bruce ',NULL,6,3,0,'jour',0,NULL,NULL,NULL,NULL),(16,'','','NGOA BILLY ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'NGOA BILLY','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(17,'','','NJI JAPHET KUM ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'NJI JAPHET KUM','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(18,'','','ANGO BELINGA CHEDID ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'ANGO BELINGA CHEDID','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(19,'','','HEMOKREO FALKAGOU ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'HEMOKREO FALKAGOU','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(20,'','','BELIMINA ANATOLE LAZARE ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'BELIMINA ANATOLE LAZARE','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(21,'','','KENMONGE GEORGES ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'KENMONGE GEORGES','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(22,'','','BASKIA HINA ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'BASKIA HINA','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(24,'','','DJIVITA ROSE ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'DJIVITA ROSE','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(25,'','','NJIKI TEBA ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'NJIKI TEBA','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(26,'','','ZING EMANA JULES FRANK ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'ZING EMANA JULES FRANK','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(27,'','','KOAGA WARAI ALBERT ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'KOAGA WARAI ALBERT','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(28,'','','KOUNTCHOU JOSEPH FLORIEN ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'KOUNTCHOU JOSEPH FLORIEN','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(29,'','','DJAKBA DJAKDJING LAURENT ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'DJAKBA DJAKDJING LAURENT','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(30,'','','WANGSO DANGWE ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'WANGSO DANGWE','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(31,'','','BOROK DJEBEN SOULEYMAN ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'BOROK DJEBEN SOULEYMAN','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(32,'','','GBETKOM MAH POUAMOUN DAOUDA ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'GBETKOM MAH POUAMOUN DAOUDA','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(33,'','','MBAITOLOUM ALFRED ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'MBAITOLOUM ALFRED','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(34,'','','BUNG FUEH ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'BUNG FUEH','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(35,'','','MANGA RYANG ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'MANGA RYANG','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(36,'','','ONGTOTOK ROSE NINA ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'ONGTOTOK ROSE NINA','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(37,'','','JOSEPH MYLAH ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'JOSEPH MYLAH','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(38,'','','OWONA JOSEPH ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'OWONA JOSEPH','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(39,'','','LAMWE JEAN ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'LAMWE JEAN','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(40,'','','ONGONO FOUDA ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'ONGONO FOUDA','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(41,'','','MBAIAOUBE REMY ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'MBAIAOUBE REMY','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(42,'','','EBODE WENDELIN ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'EBODE WENDELIN','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(43,'','','ETSINDA MBITI SEBASTIEN YANNICK ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'ETSINDA MBITI SEBASTIEN YANNICK','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(44,'','','MDIKWE SYLVESTRE ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'MDIKWE SYLVESTRE','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(45,'','','AVOULOU YANNICK ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'AVOULOU YANNICK','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(46,'','','SOLGUE BARTHELEMY ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'SOLGUE BARTHELEMY','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(47,'','','ALLAH MOSE NATHAN ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'ALLAH MOSE NATHAN','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(48,'','','TEINGUE MICHEL ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'TEINGUE MICHEL','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(49,'','','ELOBO OTTOU MARCELLIN ',NULL,NULL,NULL,'2022-08-03','',NULL,NULL,'','','2022-08-03','2022-08-03','2022-08-03','2022-08-03','',0,NULL,NULL,NULL,NULL,NULL,'ELOBO OTTOU MARCELLIN','',NULL,NULL,NULL,0,'',0,NULL,NULL,NULL,NULL),(50,'','123456789','AZIZ  GADJI',NULL,NULL,NULL,'1996-08-03','123456',NULL,NULL,'695748254','AGENT','2022-08-03','2022-08-03','2023-08-06','2023-08-24','',2,NULL,NULL,NULL,NULL,NULL,'AZIZ ','GADJI',NULL,NULL,NULL,0,'',0,NULL,'https://firebasestorage.googleapis.com/v0/b/dak-security.appspot.com/o/pp%2F50%2F94234essomba.jpg?alt=media&token=2e193bea-3589-4f0a-b964-2abab3856560',NULL,1);
/*!40000 ALTER TABLE `vigile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vigile_conge`
--

DROP TABLE IF EXISTS `vigile_conge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vigile_conge` (
  `idvigile_conge` int NOT NULL AUTO_INCREMENT,
  `idvigile` int DEFAULT NULL,
  `date_debut` date DEFAULT NULL,
  `date_fin` date DEFAULT NULL,
  PRIMARY KEY (`idvigile_conge`),
  KEY `fk_vigileconge_vigile_idx` (`idvigile`),
  CONSTRAINT `fk_vigileconge_vigile` FOREIGN KEY (`idvigile`) REFERENCES `vigile` (`idvigile`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vigile_conge`
--

LOCK TABLES `vigile_conge` WRITE;
/*!40000 ALTER TABLE `vigile_conge` DISABLE KEYS */;
INSERT INTO `vigile_conge` VALUES (1,1,'2022-09-01','2022-09-05'),(2,1,'2021-09-01','2021-09-17'),(4,50,'2022-05-21','2022-06-02'),(5,50,'2022-09-26','2022-09-30');
/*!40000 ALTER TABLE `vigile_conge` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone`
--

LOCK TABLES `zone` WRITE;
/*!40000 ALTER TABLE `zone` DISABLE KEYS */;
INSERT INTO `zone` VALUES (1,'1','PGA','Nuit',1),(2,'2','PGB','Nuit',NULL),(3,'3','PGC','Nuit',NULL),(4,'4','PGD','Nuit',NULL),(5,'5','PGE','Nuit',NULL),(6,'6','PGF','Nuit',NULL),(7,'7','PGI','Nuit',NULL),(8,'8','PGJ','Nuit',NULL),(9,'9','PGK','Jour',NULL),(17,'14','Quatorze','nuit',NULL),(18,'13','Treize','jour',NULL),(19,'PGT','PGT','',1);
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

-- Dump completed on 2022-09-29 13:29:42
