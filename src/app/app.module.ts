import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';
import { NgChartsModule } from 'ng2-charts';

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
import { ReposListComponent } from './pages/repos/repos-list/repos-list.component';
import { ReposGrapheComponent } from './pages/repos/repos-graphe/repos-graphe.component';
import { SanctionListComponent } from './pages/sanction/sanction-list/sanction-list.component';
import { SanctionEditComponent } from './pages/sanction/sanction-edit/sanction-edit.component';
import { VacantListComponent } from './pages/vacant/vacant-list/vacant-list.component';
import { VacantVigileListComponent } from './pages/vacant/vacant-vigile-list/vacant-vigile-list.component';
import { QuartierListComponent } from './pages/quartier/quartier-list/quartier-list.component';
import { QuartierEditComponent } from './pages/quartier/quartier-edit/quartier-edit.component';
import { VacantRemplacantListComponent } from './pages/vacant/vacant-remplacant-list/vacant-remplacant-list.component';
import { MenuGaucheComponent } from './composants/menu-gauche/menu-gauche.component';
import { CongeListComponent } from './pages/conge/conge-list/conge-list.component';
import { CongeEditComponent } from './pages/conge/conge-edit/conge-edit.component';
import { PermissionListComponent } from './pages/permission/permission-list/permission-list.component';
import { PermissionEditComponent } from './pages/permission/permission-edit/permission-edit.component';
import { VacantRemplacantCongeListComponent } from './pages/vacant/vacant-remplacant-conge-list/vacant-remplacant-conge-list.component';
import { VacantRemplacantCongeEditComponent } from './pages/vacant/vacant-remplacant-conge-edit/vacant-remplacant-conge-edit.component';
import { SwitchListComponent } from './pages/switch/switch-list/switch-list.component';
import { SwitchEditComponent } from './pages/switch/switch-edit/switch-edit.component';
import { SynchroniserComponent } from './pages/synchroniser/synchroniser.component';

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
    MotifListComponent,
    ReposListComponent,
    ReposGrapheComponent,
    SanctionListComponent,
    SanctionEditComponent,
    VacantListComponent,
    VacantVigileListComponent,
    QuartierListComponent,
    QuartierEditComponent,
    VacantRemplacantListComponent,
    MenuGaucheComponent,
    CongeListComponent,
    CongeEditComponent,
    PermissionListComponent,
    PermissionEditComponent,
    VacantRemplacantCongeListComponent,
    VacantRemplacantCongeEditComponent,
    SwitchListComponent,
    SwitchEditComponent,
    SynchroniserComponent
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
    NgChartsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
