import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Affectation } from 'src/app/models/affectation.model';
import { JarvisService } from 'src/app/services/jarvis.service';

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-planning-incomplet-fiche',
  templateUrl: './planning-incomplet-fiche.component.html',
  styleUrls: ['./planning-incomplet-fiche.component.scss']
})
export class PlanningIncompletFicheComponent implements OnInit {

  affectations = new Array<any>();
  date = new Date();
  jourDeLaSemaine = -1;
  horaire = "jour";
  zones = new Array<any>();
  zone: any;
  recherche = false;

  constructor(
    private router: Router,
    private jarvisService: JarvisService<Affectation>,
    private zoneService: JarvisService<Zone>,
  ) { }

  ngOnInit(): void {
    this.getZones().then((zones) => {
      this.zones = zones;
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
    if (this.zone && this.date && this.horaire) {
      this.recherche = true;
      this.jourDeLaSemaine = new Date(this.date).getDay();
      this.jarvisService.getAll('affectation').then((data) => {
        console.log('data');
        console.log(data);
        this.affectations = [];
        data.forEach((aff) => {
          if (aff.idposte.zone?.idzone === this.zone.idzone) {
            if (aff.horaire === this.horaire) {
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
