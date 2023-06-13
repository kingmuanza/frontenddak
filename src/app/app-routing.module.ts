import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningIncompletFicheComponent } from './etats/planning/planning-incomplet-fiche/planning-incomplet-fiche.component';
import { PlanningOperationnelFicheComponent } from './etats/planning/planning-operationnel-fiche/planning-operationnel-fiche.component';
import { AffectationEditComponent } from './pages/affectation/affectation-edit/affectation-edit.component';
import { AffectationListComponent } from './pages/affectation/affectation-list/affectation-list.component';
import { CongeEditComponent } from './pages/conge/conge-edit/conge-edit.component';
import { CongeListComponent } from './pages/conge/conge-list/conge-list.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { ContratEditComponent } from './pages/contrat/contrat-edit/contrat-edit.component';
import { ContratListComponent } from './pages/contrat/contrat-list/contrat-list.component';
import { ContratViewComponent } from './pages/contrat/contrat-view/contrat-view.component';
import { ControleListComponent } from './pages/controle/controle-list/controle-list.component';
import { ControleViewComponent } from './pages/controle/controle-view/controle-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EquipementEditComponent } from './pages/equipement/equipement-edit/equipement-edit.component';
import { EquipementListComponent } from './pages/equipement/equipement-list/equipement-list.component';
import { IncidentEditComponent } from './pages/incident/incident-edit/incident-edit.component';
import { IncidentListComponent } from './pages/incident/incident-list/incident-list.component';
import { MotifEditComponent } from './pages/motif/motif-edit/motif-edit.component';
import { MotifListComponent } from './pages/motif/motif-list/motif-list.component';
import { NationaliteEditComponent } from './pages/nationalite/nationalite-edit/nationalite-edit.component';
import { NationaliteListComponent } from './pages/nationalite/nationalite-list/nationalite-list.component';
import { PermissionEditComponent } from './pages/permission/permission-edit/permission-edit.component';
import { PermissionListComponent } from './pages/permission/permission-list/permission-list.component';
import { PointageEditComponent } from './pages/pointage/pointage-edit/pointage-edit.component';
import { PointageListComponent } from './pages/pointage/pointage-list/pointage-list.component';
import { PointageSuiviComponent } from './pages/pointage/pointage-suivi/pointage-suivi.component';
import { PosteEditComponent } from './pages/poste/poste-edit/poste-edit.component';
import { PosteListComponent } from './pages/poste/poste-list/poste-list.component';
import { PosteViewComponent } from './pages/poste/poste-view/poste-view.component';
import { QuartierEditComponent } from './pages/quartier/quartier-edit/quartier-edit.component';
import { QuartierListComponent } from './pages/quartier/quartier-list/quartier-list.component';
import { ReposGrapheComponent } from './pages/repos/repos-graphe/repos-graphe.component';
import { SanctionEditComponent } from './pages/sanction/sanction-edit/sanction-edit.component';
import { SanctionListComponent } from './pages/sanction/sanction-list/sanction-list.component';
import { StatutEditComponent } from './pages/statut/statut-edit/statut-edit.component';
import { StatutListComponent } from './pages/statut/statut-list/statut-list.component';
import { SwitchEditComponent } from './pages/switch/switch-edit/switch-edit.component';
import { SwitchListComponent } from './pages/switch/switch-list/switch-list.component';
import { SynchroniserComponent } from './pages/synchroniser/synchroniser.component';
import { VacantListComponent } from './pages/vacant/vacant-list/vacant-list.component';
import { VacantRemplacantCongeEditComponent } from './pages/vacant/vacant-remplacant-conge-edit/vacant-remplacant-conge-edit.component';
import { VacantRemplacantCongeListComponent } from './pages/vacant/vacant-remplacant-conge-list/vacant-remplacant-conge-list.component';
import { VacantRemplacantListComponent } from './pages/vacant/vacant-remplacant-list/vacant-remplacant-list.component';
import { VacantVigileListComponent } from './pages/vacant/vacant-vigile-list/vacant-vigile-list.component';
import { VigileBadgeListComponent } from './pages/vigile/vigile-badge-list/vigile-badge-list.component';
import { VigileEditComponent } from './pages/vigile/vigile-edit/vigile-edit.component';
import { VigileListComponent } from './pages/vigile/vigile-list/vigile-list.component';
import { VigileViewComponent } from './pages/vigile/vigile-view/vigile-view.component';
import { VilleEditComponent } from './pages/ville/ville-edit/ville-edit.component';
import { VilleListComponent } from './pages/ville/ville-list/ville-list.component';
import { ZoneEditComponent } from './pages/zone/zone-edit/zone-edit.component';
import { ZoneListComponent } from './pages/zone/zone-list/zone-list.component';
import { AffectationViewComponent } from './pages/affectation/affectation-view/affectation-view.component';
import { ImporterComponent } from './pages/importer/importer.component';
import { SwitchViewComponent } from './pages/switch/switch-view/switch-view.component';
import { ResponsableEditComponent } from './pages/responsable/responsable-edit/responsable-edit.component';
import { ResponsableListComponent } from './pages/responsable/responsable-list/responsable-list.component';
import { ResponsableViewComponent } from './pages/responsable/responsable-view/responsable-view.component';
import { RecouvrementEditionComponent } from './pages/recouvrement/recouvrement-edition/recouvrement-edition.component';
import { RecouvrementCreanceComponent } from './pages/recouvrement/recouvrement-creance/recouvrement-creance.component';
import { RecouvrementEtatComponent } from './pages/recouvrement/recouvrement-etat/recouvrement-etat.component';
import { RecouvrementPerformanceComponent } from './pages/recouvrement/recouvrement-performance/recouvrement-performance.component';
import { RecouvrementEvaluationComponent } from './pages/recouvrement/recouvrement-evaluation/recouvrement-evaluation.component';
import { UtilisateurEditComponent } from './pages/utilisateur/utilisateur-edit/utilisateur-edit.component';
import { UtilisateurListComponent } from './pages/utilisateur/utilisateur-list/utilisateur-list.component';
import { UtilisateurViewComponent } from './pages/utilisateur/utilisateur-view/utilisateur-view.component';
import { CongeDashboardComponent } from './pages/conge/conge-dashboard/conge-dashboard.component';
import { CongeViewComponent } from './pages/conge/conge-view/conge-view.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'importer', component: ImporterComponent },

  { path: 'repos', component: ReposGrapheComponent },

  { path: 'vacant/poste', component: VacantListComponent },
  { path: 'vacant/poste/:idzone', component: VacantListComponent },

  { path: 'vacant/vigile', component: VacantVigileListComponent },
  { path: 'vacant/remplacant', component: VacantRemplacantListComponent },
  { path: 'vacant/remplacant-conges', component: VacantRemplacantCongeListComponent },
  { path: 'vacant/remplacant-conges/edit/:id', component: VacantRemplacantCongeEditComponent },

  { path: 'affectation', component: AffectationListComponent },
  { path: 'affectation/edit', component: AffectationEditComponent },
  { path: 'affectation/edit/:id', component: AffectationEditComponent },
  { path: 'affectation/view/:id', component: AffectationViewComponent },

  { path: 'conge-dashboard', component: CongeDashboardComponent },
  { path: 'conge', component: CongeListComponent },
  { path: 'conge/edit', component: CongeEditComponent },
  { path: 'conge/edit/:id', component: CongeEditComponent },
  { path: 'conge/view/:id', component: CongeViewComponent },

  { path: 'contrat', component: ContratListComponent },
  { path: 'contrat/edit', component: ContratEditComponent },
  { path: 'contrat/edit/:id', component: ContratEditComponent },
  { path: 'contrat/view/:id', component: ContratViewComponent },

  { path: 'equipement', component: EquipementListComponent },
  { path: 'equipement/edit', component: EquipementEditComponent },
  { path: 'equipement/edit/:id', component: EquipementEditComponent },

  { path: 'incident', component: IncidentListComponent },
  { path: 'incident/edit', component: IncidentEditComponent },
  { path: 'incident/edit/:id', component: IncidentEditComponent },

  { path: 'pointage', component: PointageListComponent },
  { path: 'pointage/edit', component: PointageEditComponent },
  { path: 'pointage/edit/:id', component: PointageEditComponent },

  { path: 'pointagesuivi', component: PointageSuiviComponent },

  { path: 'controle', component: ControleListComponent },
  { path: 'controle/view/:id', component: ControleViewComponent },

  { path: 'motif', component: MotifListComponent },
  { path: 'motif/edit', component: MotifEditComponent },
  { path: 'motif/edit/:id', component: MotifEditComponent },

  { path: 'nationalite', component: NationaliteListComponent },
  { path: 'nationalite/edit', component: NationaliteEditComponent },
  { path: 'nationalite/edit/:id', component: NationaliteEditComponent },

  { path: 'permission', component: PermissionListComponent },
  { path: 'permission/edit', component: PermissionEditComponent },
  { path: 'permission/edit/:id', component: PermissionEditComponent },

  { path: 'poste', component: PosteListComponent },
  { path: 'poste/edit', component: PosteEditComponent },
  { path: 'poste/edit/:id', component: PosteEditComponent },
  { path: 'poste/view/:id', component: PosteViewComponent },

  { path: 'sanction', component: SanctionListComponent },
  { path: 'sanction/edit', component: SanctionEditComponent },
  { path: 'sanction/edit/:id', component: SanctionEditComponent },

  { path: 'statut', component: StatutListComponent },
  { path: 'statut/edit', component: StatutEditComponent },
  { path: 'statut/edit/:id', component: StatutEditComponent },

  { path: 'switch', component: SwitchListComponent },
  { path: 'switch/edit', component: SwitchEditComponent },
  { path: 'switch/edit/:id', component: SwitchEditComponent },
  { path: 'switch/view/:id', component: SwitchViewComponent },

  { path: 'synchroniser', component: SynchroniserComponent },

  { path: 'recouvrement/edition', component: RecouvrementEditionComponent },
  { path: 'recouvrement/etat', component: RecouvrementEtatComponent },
  { path: 'recouvrement/performance', component: RecouvrementPerformanceComponent },
  { path: 'recouvrement/evaluation', component: RecouvrementEvaluationComponent },
  { path: 'recouvrement/creance', component: RecouvrementCreanceComponent },

  { path: 'utilisateur', component: UtilisateurListComponent },
  { path: 'utilisateur/edit', component: UtilisateurEditComponent },
  { path: 'utilisateur/edit/:id', component: UtilisateurEditComponent },
  { path: 'utilisateur/view/:id', component: UtilisateurViewComponent },

  { path: 'vigile', component: VigileListComponent },
  { path: 'vigile/edit', component: VigileEditComponent },
  { path: 'vigile/edit/:id', component: VigileEditComponent },
  { path: 'vigile/view/:id', component: VigileViewComponent },

  { path: 'vigile-badge', component: VigileBadgeListComponent },

  { path: 'ville', component: VilleListComponent },
  { path: 'ville/edit', component: VilleEditComponent },
  { path: 'ville/edit/:id', component: VilleEditComponent },

  { path: 'zone', component: ZoneListComponent },
  { path: 'zone/edit', component: ZoneEditComponent },
  { path: 'zone/edit/:id', component: ZoneEditComponent },

  { path: 'quartier', component: QuartierListComponent },
  { path: 'quartier/edit', component: QuartierEditComponent },
  { path: 'quartier/edit/:id', component: QuartierEditComponent },

  { path: 'responsable', component: ResponsableListComponent },
  { path: 'responsable/edit', component: ResponsableEditComponent },
  { path: 'responsable/edit/:id', component: ResponsableEditComponent },
  { path: 'responsable/view/:id', component: ResponsableViewComponent },

  { path: 'fiche/planning-incomplet', component: PlanningIncompletFicheComponent },
  { path: 'fiche/planning-incomplet/:idzone', component: PlanningIncompletFicheComponent },
  { path: 'fiche/planning-operationnel', component: PlanningOperationnelFicheComponent },
  { path: 'fiche/pointage', component: PlanningOperationnelFicheComponent },
  { path: 'fiche/poste-vacant', component: PlanningOperationnelFicheComponent },
  { path: 'fiche/vigile-standby', component: PlanningOperationnelFicheComponent },

  { path: '**', redirectTo: 'connexion' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
