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
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affectation`
--

LOCK TABLES `affectation` WRITE;
/*!40000 ALTER TABLE `affectation` DISABLE KEYS */;
INSERT INTO `affectation` VALUES (145,'2022-01-01',39,57,NULL,'jour',NULL,58,'','2022-11-07',NULL,NULL),(146,'2022-01-01',43,59,NULL,'jour',NULL,58,'',NULL,NULL,NULL),(147,'2022-01-01',43,60,NULL,'jour',NULL,61,'',NULL,NULL,NULL),(148,'2022-11-07',46,63,NULL,'jour',NULL,58,'',NULL,NULL,NULL),(149,'2022-11-07',39,57,NULL,'jour',NULL,NULL,'',NULL,NULL,NULL),(150,'2022-11-07',47,64,NULL,'nuit',NULL,58,'',NULL,NULL,NULL),(151,'2022-11-07',48,62,NULL,'jour',NULL,66,'',NULL,NULL,NULL),(152,'2022-11-07',49,65,NULL,'nuit',NULL,66,'',NULL,NULL,NULL);
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
  `bon` tinyint(1) DEFAULT NULL,
  `montant` double DEFAULT NULL,
  `ir` double DEFAULT NULL,
  `representant` varchar(45) DEFAULT NULL,
  `statut` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcontrat`),
  KEY `fk_contrat_contrat_idx` (`idparent`),
  CONSTRAINT `fk_contrat_contrat` FOREIGN KEY (`idparent`) REFERENCES `contrat` (`idcontrat`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrat`
--

LOCK TABLES `contrat` WRITE;
/*!40000 ALTER TABLE `contrat` DISABLE KEYS */;
INSERT INTO `contrat` VALUES (18,'Contrat CAMI TOYOTA','','2022-10-25','2022-10-30',NULL,'','Dispose d\'une case de gardien',2,2,2,'CAMI TOYOTA ','CAMI TOYOTA','','696543495','','',NULL,'Yaoundé, Cameroun',0,NULL,'2022-11-02',0,0,NULL,'Muanza Kangudie','CREE'),(23,'Contrat CAMI TOYOTA','','2022-10-25','2022-10-30',NULL,'','Dispose d\'une case de gardien',3,4,7,'CAMI TOYOTA ','CAMI TOYOTA','','696543495','','',NULL,'Yaoundé, Cameroun',0,18,'2022-10-27',0,0,NULL,'Muanza Kangudie',NULL),(24,'Contrat CAMI TOYOTA','','2022-10-25','2022-10-30',NULL,'','Dispose d\'une case de gardien',2,4,4,'CAMI TOYOTA ','CAMI TOYOTA','','696543495','','',NULL,'Yaoundé, Cameroun',0,18,'2022-10-27',0,0,NULL,'Muanza Kangudie',NULL),(25,'CRTV','','2022-10-31','2022-11-03',NULL,'','',2,3,3,'CRTV ','CRTV','','69875555','','',NULL,'Dragage',0,NULL,'2022-11-10',0,0,NULL,'Edgar Ze','CREATION'),(26,'CRTV','','2022-10-31','2022-11-03',NULL,'','',2,2,2,'CRTV ','CRTV','','69875555','','',NULL,'Dragage',0,25,'2022-10-31',0,0,NULL,'Edgar Ze','CREATION'),(27,'CRTV','','2022-10-31','2022-11-03',NULL,'','',1,1,1,'CRTV ','CRTV','','69875555','','',NULL,'Dragage',0,25,'2022-11-01',0,0,NULL,'Edgar Ze','CREE'),(28,'CRTV','','2022-10-31','2022-11-03',NULL,'','',2,2,2,'CRTV ','CRTV','','69875555','','',NULL,'Dragage',0,25,'2022-11-01',0,0,NULL,'Edgar Ze','CREE'),(29,'CRTV','','2022-10-31','2022-11-03',NULL,'','',1,1,1,'CRTV ','CRTV','','69875555','','',NULL,'Dragage',0,25,'2022-11-01',0,0,NULL,'Edgar Ze','PARFAIT'),(30,'CRTV','','2022-10-31','2022-11-03',NULL,'','',2,2,2,'CRTV ','CRTV','','69875555','','',NULL,'Dragage',0,25,'2022-11-01',0,0,NULL,'Edgar Ze','PARFAIT'),(31,'Contrat CAMI TOYOTA','','2022-10-25','2022-10-30',NULL,'','Dispose d\'une case de gardien',2,6,4,'CAMI TOYOTA ','CAMI TOYOTA','','696543495','','',NULL,'Yaoundé, Cameroun',0,18,'2022-10-27',0,0,NULL,'Muanza Kangudie','CREE'),(32,'CONTRAT SIA TECHNOLOGY GROUP','','2022-11-05','2022-11-07','2023-11-07','','',2,2,2,'SIA TECHNOLOGY GROUP ','SIA TECHNOLOGY GROUP','','652367897','salaohassan@gmail.com','',NULL,'Titi Garage',0,NULL,'2022-11-07',0,0,NULL,'KABIROU SALAO','PARFAIT'),(33,'CRTV','','2022-10-31','2022-11-03',NULL,'','',1,2,2,'CRTV ','CRTV','','69875555','','',NULL,'Dragage',0,25,'2022-11-01',0,0,NULL,'Edgar Ze','CREE');
/*!40000 ALTER TABLE `contrat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrat_site`
--

DROP TABLE IF EXISTS `contrat_site`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrat_site` (
  `idcontrat_site` int NOT NULL AUTO_INCREMENT,
  `idcontrat` int DEFAULT NULL,
  `nom` varchar(45) DEFAULT NULL,
  `description` longtext,
  `localisation` varchar(45) DEFAULT NULL,
  `personne` varchar(45) DEFAULT NULL,
  `tel` varchar(45) DEFAULT NULL,
  `idquartier` int DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  PRIMARY KEY (`idcontrat_site`),
  KEY `fk_contratsite_contrat_idx` (`idcontrat`),
  KEY `fk_contratsite_quartier_idx` (`idquartier`),
  CONSTRAINT `fk_contratsite_contrat` FOREIGN KEY (`idcontrat`) REFERENCES `contrat` (`idcontrat`),
  CONSTRAINT `fk_contratsite_quartier` FOREIGN KEY (`idquartier`) REFERENCES `quartier` (`idquartier`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrat_site`
--

LOCK TABLES `contrat_site` WRITE;
/*!40000 ALTER TABLE `contrat_site` DISABLE KEYS */;
INSERT INTO `contrat_site` VALUES (12,18,'CAMI Mvan','Dispose d\'une guérite et d\'un endroit sécurisé','','Ismaél Carma','696543475',12,NULL,NULL),(14,18,'CAMI TOYOTA Ngousso','','','','',14,NULL,NULL),(15,25,'CRTV Dragage','Entrée à gauche','','Ebenzer','677889900',10,NULL,NULL),(17,32,'Siège social SIA TECHNOLOGY GROUP','En Face Caserne des meubles','','Mr KABIROU SALAO','694454594',15,NULL,NULL),(18,32,'Délégation  régionale','En face TOTAL','','MUANZA KANGUDIE','694454584',9,NULL,NULL);
/*!40000 ALTER TABLE `contrat_site` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contrat_site_vigile`
--

DROP TABLE IF EXISTS `contrat_site_vigile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contrat_site_vigile` (
  `idcontrat_site_vigile` int NOT NULL AUTO_INCREMENT,
  `idcontratsite` int DEFAULT NULL,
  `quantite` int DEFAULT NULL,
  `type_vigile` varchar(45) DEFAULT NULL,
  `horaire` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcontrat_site_vigile`),
  KEY `fk_contratsitevigile_contratsite_idx` (`idcontratsite`),
  CONSTRAINT `fk_contratsitevigile_contratsite` FOREIGN KEY (`idcontratsite`) REFERENCES `contrat_site` (`idcontrat_site`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contrat_site_vigile`
--

LOCK TABLES `contrat_site_vigile` WRITE;
/*!40000 ALTER TABLE `contrat_site_vigile` DISABLE KEYS */;
INSERT INTO `contrat_site_vigile` VALUES (20,15,2,'AGENT','jour'),(22,12,1,'AGENT','jour'),(23,12,1,'AGENT','nuit'),(24,14,1,'AGENT','jour'),(25,14,1,'AGENT','nuit'),(26,15,2,'AGENT','nuit'),(30,17,1,'AGENT','jour'),(31,17,1,'AGENT','nuit'),(32,18,1,'AGENT','jour'),(33,18,1,'AGENT','nuit');
/*!40000 ALTER TABLE `contrat_site_vigile` ENABLE KEYS */;
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
/*!40000 ALTER TABLE `equipement_vigile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facture`
--

DROP TABLE IF EXISTS `facture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facture` (
  `idfacture` int NOT NULL AUTO_INCREMENT,
  `idcontrat` int DEFAULT NULL,
  `montant` double DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `mois` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idfacture`),
  KEY `fk_facture_contrat_idx` (`idcontrat`),
  CONSTRAINT `fk_facture_contrat` FOREIGN KEY (`idcontrat`) REFERENCES `facture` (`idfacture`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facture`
--

LOCK TABLES `facture` WRITE;
/*!40000 ALTER TABLE `facture` DISABLE KEYS */;
/*!40000 ALTER TABLE `facture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `facture_ligne`
--

DROP TABLE IF EXISTS `facture_ligne`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `facture_ligne` (
  `idfacture_ligne` int NOT NULL AUTO_INCREMENT,
  `idfacture` int DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  `montant` double DEFAULT NULL,
  `justificatif` longtext,
  PRIMARY KEY (`idfacture_ligne`),
  KEY `fk_factureligne_facture_idx` (`idfacture`),
  CONSTRAINT `fk_factureligne_facture` FOREIGN KEY (`idfacture`) REFERENCES `facture` (`idfacture`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `facture_ligne`
--

LOCK TABLES `facture_ligne` WRITE;
/*!40000 ALTER TABLE `facture_ligne` DISABLE KEYS */;
/*!40000 ALTER TABLE `facture_ligne` ENABLE KEYS */;
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
  `numero` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `bon` tinyint(1) DEFAULT NULL,
  `idcontratsite` int DEFAULT NULL,
  `horaire` varchar(45) DEFAULT NULL,
  `statut` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idposte`),
  KEY `fk_poste_zone_idx` (`zone`),
  KEY `fk_poste_quartier_idx` (`idquartier`),
  KEY `fk_poste_contratsite_idx` (`idcontratsite`),
  CONSTRAINT `fk_poste_contratsite` FOREIGN KEY (`idcontratsite`) REFERENCES `contrat_site` (`idcontrat_site`),
  CONSTRAINT `fk_poste_quartier` FOREIGN KEY (`idquartier`) REFERENCES `quartier` (`idquartier`),
  CONSTRAINT `fk_poste_zone` FOREIGN KEY (`zone`) REFERENCES `zone` (`idzone`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poste`
--

LOCK TABLES `poste` WRITE;
/*!40000 ALTER TABLE `poste` DISABLE KEYS */;
INSERT INTO `poste` VALUES (39,'CAMI Mvan','CAMI Mvan',21,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'Ismaél Carma','696543475',1,'CAMI Mvan',12,0,0,0,0,NULL,'Dispose d\'une guérite et d\'un endroit sécurisé',1,12,'jour',NULL),(40,'CAMIMvan-N','CAMI Mvan Nuit',22,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'Ismaél Carma','696543475',1,'CAMIMvan-N',12,0,0,0,0,NULL,'Dispose d\'une guérite et d\'un endroit sécurisé',1,12,'nuit',NULL),(41,'CAMITOYOTANgoussoNUIT','CAMI TOYOTA Ngousso NUIT',22,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'','',1,'CAMITOYOTANgoussoNUIT',14,0,0,0,0,NULL,'',1,14,'nuit',NULL),(42,'Postenoncontractuel1JOUR','Poste non contractuel 1 JOUR',21,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'Eric Garcia','69868686',1,'Postenoncontractuel1JOUR',8,0,0,0,0,NULL,'Etoa Meki : Foir des bonnes affaires',1,NULL,'jour',NULL),(43,'CRTVDragageJOUR','CRTV Dragage JOUR',21,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'Ebenzer','677889900',1,'CRTVDragageJOUR',10,0,0,0,0,NULL,'Entrée à gauche',1,15,'jour',NULL),(44,'CRTVDragageNUIT','CRTV Dragage NUIT',22,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'Ebenzer','677889900',1,'CRTVDragageNUIT',10,0,0,0,0,NULL,'Entrée à gauche',1,15,'nuit',NULL),(45,'CAMITOYOTANgoussoJOUR','CAMI TOYOTA Ngousso JOUR',21,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'Ulrich Batang','695744444',1,'CAMITOYOTANgoussoJOUR',14,0,0,0,0,NULL,'',1,14,'jour',NULL),(46,'SiègesocialSIATECHNOLOGYGROUPJOUR','Siège social SIA TECHNOLOGY GROUP JOUR',21,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'Mr KABIROU SALAO','694454594',1,'SiègesocialSIATECHNOLOGYGROUPJOUR',15,0,0,0,0,NULL,'En Face Caserne des meubles',1,17,'jour',NULL),(47,'SiègesocialSIATECHNOLOGYGROUPNUIT','Siège social SIA TECHNOLOGY GROUP NUIT',22,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'Mr KABIROU SALAO','694454594',1,'SiègesocialSIATECHNOLOGYGROUPNUIT',15,0,0,0,0,NULL,'En Face Caserne des meubles',1,17,'nuit',NULL),(48,'DélégationrégionaleJOUR','Délégation  régionale JOUR',21,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'MUANZA KANGUDIE','694454584',1,'DélégationrégionaleJOUR',9,0,0,0,0,NULL,'En face TOTAL',1,18,'jour',NULL),(49,'DélégationrégionaleNUIT','Délégation  régionale NUIT',22,NULL,NULL,'En ',NULL,NULL,0,0,0,0,0,'MUANZA KANGUDIE','694454584',1,'DélégationrégionaleNUIT',9,0,0,0,0,NULL,'En face TOTAL',1,18,'nuit',NULL);
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
  PRIMARY KEY (`idposte_equipement`),
  KEY `fk_posteequipement_poste_idx` (`idposte`),
  KEY `fk_posteequipement_equipement_idx` (`idequipement`),
  CONSTRAINT `fk_posteequipement_equipement` FOREIGN KEY (`idequipement`) REFERENCES `equipement` (`idequipement`),
  CONSTRAINT `fk_posteequipement_poste` FOREIGN KEY (`idposte`) REFERENCES `poste` (`idposte`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poste_equipement`
--

LOCK TABLES `poste_equipement` WRITE;
/*!40000 ALTER TABLE `poste_equipement` DISABLE KEYS */;
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
  `horaire` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idposte_vigile`),
  KEY `fk_postevigile_poste_idx` (`idposte`),
  CONSTRAINT `fk_postevigile_poste` FOREIGN KEY (`idposte`) REFERENCES `poste` (`idposte`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poste_vigile`
--

LOCK TABLES `poste_vigile` WRITE;
/*!40000 ALTER TABLE `poste_vigile` DISABLE KEYS */;
/*!40000 ALTER TABLE `poste_vigile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestation`
--

DROP TABLE IF EXISTS `prestation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestation` (
  `idprestation` int NOT NULL AUTO_INCREMENT,
  `code` varchar(45) DEFAULT NULL,
  `libelle` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idprestation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestation`
--

LOCK TABLES `prestation` WRITE;
/*!40000 ALTER TABLE `prestation` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestation` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quartier`
--

LOCK TABLES `quartier` WRITE;
/*!40000 ALTER TABLE `quartier` DISABLE KEYS */;
INSERT INTO `quartier` VALUES (8,NULL,'Etoa Meki',NULL),(9,NULL,'Bastos',NULL),(10,NULL,'Dragage',NULL),(11,NULL,'Tsinga',NULL),(12,'','Mvan',NULL),(13,'','Olembé',NULL),(14,'','Ngousso',NULL),(15,'','Titi garage',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vigile`
--

LOCK TABLES `vigile` WRITE;
/*!40000 ALTER TABLE `vigile` DISABLE KEYS */;
INSERT INTO `vigile` VALUES (57,'','123456789','Muanza Kangudie',NULL,NULL,NULL,'1989-10-31','123456789',1,1,'696543495','AGENT','2019-10-27','2050-06-15','2022-10-27','2022-11-16','',4,NULL,NULL,NULL,NULL,NULL,'Muanza','Kangudie',NULL,8,NULL,0,'jour',0,NULL,'',NULL,0),(58,'','147852369','Eric Garcia ',NULL,NULL,NULL,'2001-11-04','123456789',1,1,'698754215','AGENT','2022-10-31','2050-06-15','2023-10-31','2023-11-27','',6,NULL,NULL,NULL,NULL,NULL,'Eric Garcia','',NULL,8,NULL,1,'journuit',0,NULL,'',5,0),(59,'','147852369','Fogne Jean Pierre',NULL,NULL,NULL,'2002-10-06','123456789',1,1,'677889944','AGENT','2022-11-01','2050-06-15','2023-11-01','2023-11-21','2',5,57,NULL,NULL,NULL,NULL,'Fogne','Jean Pierre',NULL,12,NULL,0,'jour',0,NULL,'',0,0),(60,'','147','Tientcheu Larry Jordan',NULL,NULL,NULL,'2002-06-02','123456789',1,1,'633225544','AGENT','2022-11-01','2050-06-15','2023-11-01','2023-11-21','',4,NULL,NULL,NULL,NULL,NULL,'Tientcheu','Larry Jordan',NULL,10,NULL,0,'jour',0,NULL,'',0,0),(61,'','147','Ledanjo Robert',NULL,NULL,NULL,'2001-11-05','123456789',1,1,'696543495','AGENT','2022-11-01','2050-06-15','2023-11-01','2023-11-21','1',2,NULL,NULL,NULL,NULL,NULL,'Ledanjo','Robert',NULL,13,NULL,1,'',0,NULL,'',0,0),(62,'','002','SALAO HASSAN',NULL,NULL,NULL,'1992-11-05','25225211156',1,1,'652367897','AGENT','2022-11-07','2050-06-15','2023-11-07','2023-11-27','2',5,57,NULL,NULL,NULL,NULL,'SALAO','HASSAN',NULL,10,NULL,0,'jour',0,NULL,'',0,0),(63,'','445','KAMENI JOSE ANTHONY MBARGA',NULL,NULL,NULL,'1992-08-11','125521425',1,2,'675184296','AGENT','2022-11-07','2050-06-15','2023-11-07','2023-11-27','2',1,57,NULL,NULL,NULL,NULL,'KAMENI JOSE ANTHONY','MBARGA',NULL,8,NULL,0,'jour',0,NULL,'',0,0),(64,'','663','ALILOU OUMAROU OUMAROU',NULL,NULL,NULL,'2004-11-11','365896654',1,1,'696541236','AGENT','2022-11-07','2050-06-15','2023-11-07','2023-11-27','2',4,62,NULL,NULL,NULL,NULL,'ALILOU OUMAROU','OUMAROU',NULL,15,NULL,0,'nuit',0,NULL,'',0,0),(65,'','212','TAPKO KEVIN',NULL,NULL,NULL,'2004-11-11','2565748945',1,1,'658996445','AGENT','2022-11-07','2050-06-15','2023-11-07','2023-11-27','2',3,64,NULL,NULL,NULL,NULL,'TAPKO','KEVIN',NULL,11,NULL,0,'nuit',0,NULL,'',0,0),(66,'','1454','Gounoko Younous ',NULL,NULL,NULL,'2004-11-11','145544855',2,1,'6589645236','AGENT','2022-11-07','2050-06-15','2023-11-07','2023-11-27','2',7,62,NULL,NULL,NULL,NULL,'Gounoko Younous','',NULL,13,NULL,1,'journuit',0,NULL,'',0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zone`
--

LOCK TABLES `zone` WRITE;
/*!40000 ALTER TABLE `zone` DISABLE KEYS */;
INSERT INTO `zone` VALUES (21,'PGA','PGA','jour',1),(22,'PGB','PGB','nuit',1),(23,'PGC','PGC','nuit',1),(24,'PGE','PGE','jour',1);
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

-- Dump completed on 2022-11-10  8:00:05
