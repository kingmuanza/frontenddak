import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getFirestore, query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { PosteCtrlService } from 'src/app/_services/poste-ctrl.service';
import { Affectation } from 'src/app/models/affectation.model';
import { Poste } from 'src/app/models/poste.model';
import { Vigile } from 'src/app/models/vigile.model';
import { ZoneDak } from 'src/app/models/zone.model';
import { JarvisService } from 'src/app/services/jarvis.service';
import * as bootstrap from 'bootstrap';
import { Suivi } from 'src/app/models/suivi.model';
import { VigileFromWeb } from 'src/app/_types/vigile.from.web';

@Component({
  selector: 'app-recap-zone',
  templateUrl: './recap-zone.component.html',
  styleUrls: ['./recap-zone.component.scss']
})
export class RecapZoneComponent implements OnInit {
  zone = new ZoneDak();
  debut = new Date();
  fin = new Date();
  app: any;
  affectations = new Array<Affectation>();
  pointages = new Array<any>();
  pointagesTotaux = new Array<any>();
  absences = new Array<any>();

  postes = new Array<Poste>();
  postesControles = new Array<any>();
  postesControlesUneFois = new Array<any>();
  postesControlesDeuxFois = new Array<any>();
  suivis = new Array<any>();

  nbVigiles = 0;
  nbVigilesQuiOntPointes = 0;
  nbVigilesQuiOntPointesDeuxFois = 0;
  vigiles = new Array<Vigile>();
  vigilesQuiOntPointes = new Array<string>();
  vigilesQuiOntPointesUneFois = new Array<string>();
  vigilesQuiOntPointesDeuxFois = new Array<string>()

  remplacements = new Array<any>();

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public vigilesBarChartLabels = ['Vigiles pointés 2 fois', 'Vigiles pointés une fois', 'Vigiles non pointés'];
  public postesBarChartLabels = ['Postes Contôlés 2 fois', 'Postes contrôlés une fois', 'Postes non contrôlés'];
  public barChartLegend = true;

  vigilesDataChart = [0, 0, 0,];
  postesDataChart = [0, 0, 0,];
  afficher = false;

  public vigilesBarChartData = [
    {
      data: this.vigilesDataChart,
      label: 'Pointages Vigiles',
      backgroundColor: ["green", '#E3B505', "#CE352C",],
      hoverBackgroundColor: ["darkgreen", '#E3B500', "darkred",],
      hoverBorderColor: "white"
    },
  ];

  public postesBarChartData = [
    {
      data: this.postesDataChart,
      label: 'Postes Contrôlés',
      backgroundColor: ["green", '#E3B505', "#CE352C",],
      hoverBackgroundColor: ["darkgreen", '#E3B500', "darkred",],
      hoverBorderColor: "white"
    },
  ];

  constructor(
    private affectationService: JarvisService<Affectation>,
    private zoneService: JarvisService<ZoneDak>,
    private route: ActivatedRoute,
    private posteService: PosteCtrlService,
  ) {
    const firebaseConfig = {
      apiKey: "AIzaSyCBdaLWw5PsGl13X_jtsHIhHepIZ2bUMrE",
      authDomain: "dak-security.firebaseapp.com",
      projectId: "dak-security",
      storageBucket: "dak-security.appspot.com",
      messagingSenderId: "448692904510",
      appId: "1:448692904510:web:216883edce596209e6276f",
      measurementId: "G-L0FKMS4EQH"
    };
    this.app = initializeApp(firebaseConfig);
  }

  setDates() {


    this.debut.setHours(6, 0, 0);
    this.fin.setDate(this.fin.getDate() + 1);
    this.fin.setHours(6, 0, 0);

  }

  ngOnInit(): void {

    this.setDates();
    this.getSwitchs().then((remplacements) => {
      this.remplacements = remplacements;
    });

    this.route.paramMap.subscribe((paramMap) => {
      const code = paramMap.get("code");
      if (code) {
        this.zoneService.getAll("zone").then((zones) => {
          if (code) {
            this.zone = this.getZoneByCode(code!, zones);
            console.log("code : " + code);
            this.zone.code = code;



            this.posteService.getPostesByZone(this.zone).then((postes) => {
              this.postes = postes;


              this.affectationService.getAll("affectation").then((affectations) => {
                this.affectations = affectations.filter((aff) => {
                  return aff.idposte.zone.code === code;
                });
                console.log("Nombre de affectations : " + this.affectations.length);

                const db = getFirestore(this.app);
                const q2 = query(collection(db, "switch"), where("date", "<=", this.fin), where("date", ">=", this.debut), orderBy("date", 'desc'));
                getDocs(q2).then((querySnapshots2) => {
                  querySnapshots2.forEach((doc) => {
                    let s = doc.data() as Suivi;

                    this.suivis.push(s);
                  });
                });
                const q = query(collection(db, "pointage"), where("date", "<=", this.fin), where("date", ">=", this.debut), orderBy("date", 'desc'));
                // const q = query(collection(db, "pointage"), orderBy("date", 'desc'));
                getDocs(q).then((querySnapshots) => {
                  querySnapshots.forEach((doc) => {
                    let pointage = doc.data() as any;
                    let aff = this.getAffection(pointage.matricule);
                    if (aff) {
                      let poste = aff.idposte;
                      if (poste) {
                        let zone = poste.zone as ZoneDak;
                        if (zone) {
                          if (zone.code === code.trim()) {
                            if (pointage.absence) {
                              this.absences.push(pointage);
                            } else {
                              this.pointages.push(pointage);
                            }
                            this.pointagesTotaux.push(pointage);
                          }
                        }
                      }
                    }
                  });

                  this.pointagesTotaux.forEach((p) => {
                    const code = this.getAffection(p.matricule)?.idposte?.zone?.code;

                  });


                  let pointagesString = this.pointages.map((p) => {
                    return p.matricule;
                  });
                  let findDuplicates = (arr: Array<string>) => arr.filter((item, index) => arr.indexOf(item) !== index)

                  this.vigilesQuiOntPointes = [...new Set(pointagesString)];
                  this.vigilesQuiOntPointesDeuxFois = [...new Set(findDuplicates(pointagesString))];
                  this.vigilesQuiOntPointesUneFois = this.vigilesQuiOntPointes.filter((v) => {
                    return this.vigilesQuiOntPointesDeuxFois.indexOf(v) === -1;
                  });

                  this.vigilesDataChart[0] = this.vigilesQuiOntPointesDeuxFois.length;
                  this.vigilesDataChart[1] = this.vigilesQuiOntPointes.length - this.vigilesQuiOntPointesDeuxFois.length;
                  this.vigilesDataChart[2] = this.affectations.length - this.vigilesQuiOntPointes.length - this.vigilesQuiOntPointesDeuxFois.length;

                  this.postesControles = [...new Set(this.getAffectations(this.vigilesQuiOntPointes))];
                  this.postesControlesDeuxFois = [...new Set(this.getAffectations(this.vigilesQuiOntPointesDeuxFois))];
                  this.postesControlesUneFois = this.postesControles.filter((p) => {
                    return this.postesControlesDeuxFois.indexOf(p) === -1;
                  });

                  this.postesDataChart[0] = this.postesControlesDeuxFois.length;
                  this.postesDataChart[1] = this.postesControles.length - this.postesControlesDeuxFois.length;
                  this.postesDataChart[2] = this.postes.length - this.postesControles.length - this.postesControlesDeuxFois.length;

                  this.afficher = true;
                });
              });
            });
          }
        });
      }
    });
  }

  getAffectations(ids: Array<string>): Array<string> {
    let affs = new Array<Affectation>();
    for (let index = 0; index < ids.length; index++) {
      const id = ids[index];
      let aff = this.getAffection(id);
      if (aff) {
        affs.push(aff);
      }
    }
    return affs.map((a) => {
      return a.idposte.idposte;
    });
  }

  getAffection(matricule: string): Affectation | undefined {
    let affectations = this.affectations.filter((aff) => {
      return aff.idvigile.matricule == matricule;
    })
    console.log(affectations[0])
    return affectations[0];
  }

  getAffectionByPoste(idposte: number): Affectation | undefined {
    let affectations = this.affectations.filter((aff) => {
      return aff.idposte?.idposte == idposte;
    })
    console.log(affectations[0])
    return affectations[0];
  }

  isPosteControlee(poste: Poste) {
    return this.postesControles.indexOf(poste.idposte) !== -1;
  }

  getZoneByCode(code: string, zones: Array<ZoneDak>): ZoneDak {
    return zones.filter((z) => {
      return z.code === code;
    })[0];
  }

  openModal(idElement: string) {
    console.log(`open modal ${idElement}`);
    const modale = document.getElementById(idElement);
    console.log(modale);
    if (modale != null) {
      const myModal = new bootstrap.Modal(modale);
      myModal.show();
    }

  }

  getSwitchs(): Promise<Array<any>> {
    console.log('getSwitchs');
    return new Promise((resolve, reject) => {
      const db = getFirestore(this.app);
      const q = query(collection(db, "changements"), where("date", "<=", this.fin), where("date", ">=", this.debut), orderBy("date", 'desc'));
      getDocs(q).then((querySnapshots) => {
        let remplacements = new Array<any>();
        querySnapshots.forEach((doc) => {
          let changement: any;
          changement = doc.data();
          remplacements.push(changement);
        });
        resolve(remplacements);
      });
    });
  }

  toDate(timestp: any): Date | undefined {
    if (timestp && timestp.seconds) {
      return new Date(timestp.seconds * 1000);

    } else {
      return undefined;
    }
  }

  getVigileOnPointages(matricule: string): any {
    const pointages = this.pointages.filter((p) => {
      return p.matricule === matricule;
    });
    console.log("getVigileOnPointages");
    console.log("pointages", pointages);
    if (pointages.length > 1) {
      const vigiles: Array<VigileFromWeb> = pointages
        .map((p) => {
          return {
            nomsVigile: p.nomsVigile,
            matricule: p.matricule,
            idvigile: p.idvigile,
            date: p.date,
            date2: p.date,
            nombre: 1,
          };
        });

      let vigile = vigiles[0];
      if (vigiles[1].date.toDate() > vigile.date2.toDate()) {
        vigile["date2"] = vigiles[1].date;
      } else {
        vigile.date2 = vigile.date;
        vigile.date = vigiles[1].date
      }
      let affectation = this.getAffection(vigile.matricule);
      vigile.nombre = pointages.length;
      vigile.poste = affectation?.idposte.libelle;
      vigile.zone = affectation?.idposte.zone.code;
      return vigile;
    } else {
      const vigiles: Array<VigileFromWeb> = pointages
        .map((p) => {
          return {
            nomsVigile: p.nomsVigile,
            matricule: p.matricule,
            idvigile: p.idvigile,
            date: p.date,
            date2: null,
            nombre: 1,
          };
        });
      let vigile = vigiles[0];
      let affectation = this.getAffection(vigile.matricule);
      vigile.nombre = pointages.length;
      vigile.poste = affectation?.idposte.libelle;
      vigile.zone = affectation?.idposte.zone.code;
      return vigile;
    }
  }

  getVigilesQuiOntPointes(): Array<any> {
    return this.vigilesQuiOntPointes.map((v) => {
      return this.getVigileOnPointages(v);
    })
  }

  getVigilesQuiOntPointesDeux(): Array<any> {
    return this.vigilesQuiOntPointesDeuxFois.map((v) => {
      return this.getVigileOnPointages(v);
    })
  }

  getVigilesQuiOntPointesUne(): Array<any> {
    return this.vigilesQuiOntPointesUneFois.map((v) => {
      return this.getVigileOnPointages(v);
    })
  }

}
