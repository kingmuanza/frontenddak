CREATE TABLE `dak`.`jour_pris` (
  `idjour_pris` INT NOT NULL AUTO_INCREMENT,
  `idsuivi_poste` INT NULL,
  `date` DATE NULL,
  `consommee` TINYINT(1) NULL,
  PRIMARY KEY (`idjour_pris`)
);

ALTER TABLE
  `dak`.`jour_pris`
ADD
  INDEX `fk_jourpris_sanction_idx` (`idsuivi_poste` ASC) VISIBLE;

;

ALTER TABLE
  `dak`.`jour_pris`
ADD
  CONSTRAINT `fk_jourpris_sanction` FOREIGN KEY (`idsuivi_poste`) REFERENCES `dak`.`suivi_poste` (`idsuivi_poste`) ON DELETE NO ACTION ON UPDATE NO ACTION;