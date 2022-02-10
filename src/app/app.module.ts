import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ZoneListComponent } from './pages/zone/zone-list/zone-list.component';
import { ZoneEditComponent } from './pages/zone/zone-edit/zone-edit.component';
import { PointageListComponent } from './pages/pointage/pointage-list/pointage-list.component';
import { PointageEditComponent } from './pages/pointage/pointage-edit/pointage-edit.component';
import { VigileListComponent } from './pages/vigile/vigile-list/vigile-list.component';
import { VigileEditComponent } from './pages/vigile/vigile-edit/vigile-edit.component';
import { PosteListComponent } from './pages/poste/poste-list/poste-list.component';
import { PosteEditComponent } from './pages/poste/poste-edit/poste-edit.component';
import { AffectationListComponent } from './pages/affectation/affectation-list/affectation-list.component';
import { AffectationEditComponent } from './pages/affectation/affectation-edit/affectation-edit.component';
import { IncidentListComponent } from './pages/incident/incident-list/incident-list.component';
import { IncidentEditComponent } from './pages/incident/incident-edit/incident-edit.component';
import { VigileViewComponent } from './pages/vigile/vigile-view/vigile-view.component';
import { PosteVacantFicheComponent } from './etats/poste/poste-vacant-fiche/poste-vacant-fiche.component';
import { VigileStandbyFicheComponent } from './etats/vigile/vigile-standby-fiche/vigile-standby-fiche.component';
import { PlanningOperationnelFicheComponent } from './etats/planning/planning-operationnel-fiche/planning-operationnel-fiche.component';
import { PlanningIncompletFicheComponent } from './etats/planning/planning-incomplet-fiche/planning-incomplet-fiche.component';
import { NationaliteListComponent } from './pages/nationalite/nationalite-list/nationalite-list.component';
import { NationaliteEditComponent } from './pages/nationalite/nationalite-edit/nationalite-edit.component';
import { VilleEditComponent } from './pages/ville/ville-edit/ville-edit.component';
import { VilleListComponent } from './pages/ville/ville-list/ville-list.component';
import { StatutListComponent } from './pages/statut/statut-list/statut-list.component';
import { StatutEditComponent } from './pages/statut/statut-edit/statut-edit.component';
import { MotifEditComponent } from './pages/motif/motif-edit/motif-edit.component';
import { MotifListComponent } from './pages/motif/motif-list/motif-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    DashboardComponent,
    ZoneListComponent,
    ZoneEditComponent,
    PointageListComponent,
    PointageEditComponent,
    VigileListComponent,
    VigileEditComponent,
    PosteListComponent,
    PosteEditComponent,
    AffectationListComponent,
    AffectationEditComponent,
    IncidentListComponent,
    IncidentEditComponent,
    VigileViewComponent,
    PosteVacantFicheComponent,
    VigileStandbyFicheComponent,
    PlanningOperationnelFicheComponent,
    PlanningIncompletFicheComponent,
    NationaliteListComponent,
    NationaliteEditComponent,
    VilleEditComponent,
    VilleListComponent,
    StatutListComponent,
    StatutEditComponent,
    MotifEditComponent,
    MotifListComponent
  ],
  imports: [
    BrowserModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10,

        },
      }
    }),
    DataTablesModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
