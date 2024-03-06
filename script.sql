CREATE TABLE `dak`.`affectation_controleur` (
  `idaffectation_controleur` INT NOT NULL AUTO_INCREMENT,
  `idcontroleur` INT NULL,
  `idzone` INT NULL,
  `debut` DATE NULL,
  `arret` DATE NULL,
  PRIMARY KEY (`idaffectation_controleur`)
);

ALTER TABLE
  `dak`.`affectation_controleur`
ADD
  INDEX `fk_affectationcontroleur_vigile_idx` (`idcontroleur` ASC) VISIBLE,
ADD
  INDEX `fk_affectationcontroleur_zone_idx` (`idzone` ASC) VISIBLE;

;

ALTER TABLE
  `dak`.`affectation_controleur`
ADD
  CONSTRAINT `fk_affectationcontroleur_vigile` FOREIGN KEY (`idcontroleur`) REFERENCES `dak`.`vigile` (`idvigile`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD
  CONSTRAINT `fk_affectationcontroleur_zone` FOREIGN KEY (`idzone`) REFERENCES `dak`.`zone` (`idzone`) ON DELETE NO ACTION ON UPDATE NO ACTION;