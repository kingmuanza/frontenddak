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
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TestConnexionComponent } from './composants/test-connexion/test-connexion.component';
import { MenuHautComponent } from './composants/menu-haut/menu-haut.component';
import { PointageSuiviComponent } from './pages/pointage/pointage-suivi/pointage-suivi.component';
import { ControleListComponent } from './pages/controle/controle-list/controle-list.component';
import { ControleViewComponent } from './pages/controle/controle-view/controle-view.component';
import { FormVigileComponent } from './_forms/form-vigile/form-vigile.component';
import { FormEquipementComponent } from './_forms/form-equipement/form-equipement.component';
import { FormCongeComponent } from './_forms/form-conge/form-conge.component';
import { RequiredComponent } from './composants/required/required.component';
import { EquipementListComponent } from './pages/equipement/equipement-list/equipement-list.component';
import { EquipementEditComponent } from './pages/equipement/equipement-edit/equipement-edit.component';
import { VigileComponent } from './_display/vigile/vigile.component';
import { DisplayPosteComponent } from './_display/display-poste/display-poste.component';
import { PosteViewComponent } from './pages/poste/poste-view/poste-view.component';
import { TableauAffectationsComponent } from './_tableaux/tableau-affectations/tableau-affectations.component';
import { DisplayBadgeComponent } from './_display/display-badge/display-badge.component';
import { VigileBadgeListComponent } from './pages/vigile/vigile-badge-list/vigile-badge-list.component';
import { DisplayEquipementComponent } from './_display/display-equipement/display-equipement.component';
import { ContratListComponent } from './pages/contrat/contrat-list/contrat-list.component';
import { ContratEditComponent } from './pages/contrat/contrat-edit/contrat-edit.component';
import { ContratViewComponent } from './pages/contrat/contrat-view/contrat-view.component';
import { DisplaySiteComponent } from './_display/display-site/display-site.component';
import { AffectationViewComponent } from './pages/affectation/affectation-view/affectation-view.component';
import { ImporterComponent } from './pages/importer/importer.component';
import { DisplayHistoriqueContratComponent } from './_display/display-historique-contrat/display-historique-contrat.component';
import { DisplayLignePourcentageComponent } from './_display/display-ligne-pourcentage/display-ligne-pourcentage.component';
import { SwitchViewComponent } from './pages/switch/switch-view/switch-view.component';
import { ResponsableListComponent } from './pages/responsable/responsable-list/responsable-list.component';
import { ResponsableViewComponent } from './pages/responsable/responsable-view/responsable-view.component';
import { ResponsableEditComponent } from './pages/responsable/responsable-edit/responsable-edit.component';
import { RecouvrementEditionComponent } from './pages/recouvrement/recouvrement-edition/recouvrement-edition.component';
import { RecouvrementEtatComponent } from './pages/recouvrement/recouvrement-etat/recouvrement-etat.component';
import { RecouvrementPerformanceComponent } from './pages/recouvrement/recouvrement-performance/recouvrement-performance.component';
import { RecouvrementEvaluationComponent } from './pages/recouvrement/recouvrement-evaluation/recouvrement-evaluation.component';
import { RecouvrementCreanceComponent } from './pages/recouvrement/recouvrement-creance/recouvrement-creance.component';
import { UtilisateurListComponent } from './pages/utilisateur/utilisateur-list/utilisateur-list.component';
import { UtilisateurEditComponent } from './pages/utilisateur/utilisateur-edit/utilisateur-edit.component';
import { UtilisateurViewComponent } from './pages/utilisateur/utilisateur-view/utilisateur-view.component';
import { VigileCongeEditComponent } from './pages/vigile/vigile-conge-edit/vigile-conge-edit.component';
import { CongeDashboardComponent } from './pages/conge/conge-dashboard/conge-dashboard.component';
import { CongeViewComponent } from './pages/conge/conge-view/conge-view.component';
import { AffectationCreateComponent } from './pages/affectation/affectation-create/affectation-create.component';
import { EnrolementListComponent } from './enrolement/enrolement-list/enrolement-list.component';
import { EnrolementEditComponent } from './enrolement/enrolement-edit/enrolement-edit.component';
import { EnrolementViewComponent } from './enrolement/enrolement-view/enrolement-view.component';
import { EnrolementWaitComponent } from './enrolement/enrolement-wait/enrolement-wait.component';

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
    SynchroniserComponent,
    TestConnexionComponent,
    MenuHautComponent,
    PointageSuiviComponent,
    ControleListComponent,
    ControleViewComponent,
    FormVigileComponent,
    FormEquipementComponent,
    FormCongeComponent,
    RequiredComponent,
    EquipementListComponent,
    EquipementEditComponent,
    VigileComponent,
    DisplayPosteComponent,
    PosteViewComponent,
    TableauAffectationsComponent,
    DisplayBadgeComponent,
    VigileBadgeListComponent,
    DisplayEquipementComponent,
    ContratListComponent,
    ContratEditComponent,
    ContratViewComponent,
    DisplaySiteComponent,
    AffectationViewComponent,
    ImporterComponent,
    DisplayHistoriqueContratComponent,
    DisplayLignePourcentageComponent,
    SwitchViewComponent,
    ResponsableListComponent,
    ResponsableViewComponent,
    ResponsableEditComponent,
    RecouvrementEditionComponent,
    RecouvrementEtatComponent,
    RecouvrementPerformanceComponent,
    RecouvrementEvaluationComponent,
    RecouvrementCreanceComponent,
    UtilisateurListComponent,
    UtilisateurEditComponent,
    UtilisateurViewComponent,
    VigileCongeEditComponent,
    CongeDashboardComponent,
    CongeViewComponent,
    AffectationCreateComponent,
    EnrolementListComponent,
    EnrolementEditComponent,
    EnrolementViewComponent,
    EnrolementWaitComponent,
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
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
