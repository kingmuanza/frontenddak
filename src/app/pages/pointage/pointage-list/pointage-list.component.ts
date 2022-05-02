import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';

@Component({
  selector: 'app-pointage-list',
  templateUrl: './pointage-list.component.html',
  styleUrls: ['./pointage-list.component.scss']
})
export class PointageListComponent implements OnInit {

  affectations = new Array<any>();
  date = new Date();
  jourDeLaSemaine = -1;
  horaire = "";
  zones = new Array<any>();
  zone: any;
  recherche = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jarvisService: JarvisService<Affectation>,
    private zoneService: JarvisService<Zone>,
  ) { }

  ngOnInit(): void {
    this.getZones().then((zones) => {
      this.zones = zones;
      this.route.paramMap.subscribe((paramMap) => {
        const idzone = paramMap.get('idzone');
        if (idzone) {
          this.zones.forEach((zone) => {
            if (zone.idzone == idzone) {
              this.zone = zone;
              this.rechercher();
            }
          });
        } else {
          this.rechercher();
        }
      });
    });
  }

  getZones(): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.zoneService.getAll('zone').then((zones) => {
        console.log('zones');
        console.log(zones);
        resolve(zones);
      });
    });
  }

  rechercher() {
    if (this.date) {
      this.recherche = true;
      this.jourDeLaSemaine = new Date(this.date).getDay();
      this.jarvisService.getAll('affectation').then((data) => {
        console.log('data');
        console.log(data);
        this.affectations = [];
        data.forEach((aff) => {
          if (this.zone) {
            if (aff.idposte.zone?.idzone === this.zone.idzone) {
              if (!this.horaire || (this.horaire && aff.horaire === this.horaire)) {
                if (!aff.arret) {
                  this.affectations.push(aff);
                }
                if (aff.arret) {
                  if (new Date(aff.arret).getTime() > new Date(this.date).getTime()) {
                    this.affectations.push(aff);
                  }
                }
              }
            }
          } else {
            if (!this.horaire || (this.horaire && aff.horaire === this.horaire)) {
              if (!aff.arret) {
                this.affectations.push(aff);
              }
              if (aff.arret) {
                if (new Date(aff.arret).getTime() > new Date(this.date).getTime()) {
                  this.affectations.push(aff);
                }
              }
            }
          }
        });
      });
    } else {
      alert('Veuillez remplir le formulaire');
    }
  }

  edit(id: string) {
    this.router.navigate(['affectation', 'edit', id]);
  }

  jourSemaine(jour: number) {
    if (jour == 1)
      return "Lundi";
    if (jour == 2)
      return "Mardi";
    if (jour == 3)
      return "Mercredi";
    if (jour == 4)
      return "Jeudi";
    if (jour == 5)
      return "Vendredi";
    if (jour == 6)
      return "Samedi";
    if (jour == 7)
      return "Dimanche";

    return "" + jour ? jour : "";
  }

  exportAsPDF() {
    console.log('exportAsPDF');
    let data = document.getElementById('fiche');
    console.log(data);
    if (data) {
      html2canvas(data).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
        let pdf = new jsPDF('p', 'cm', 'a4'); //Generates PDF in landscape mode
        // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 21, 29.7);
        pdf.save('Filename.pdf');
      });
    }
  }
}
