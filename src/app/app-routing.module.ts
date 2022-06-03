import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningIncompletFicheComponent } from './etats/planning/planning-incomplet-fiche/planning-incomplet-fiche.component';
import { PlanningOperationnelFicheComponent } from './etats/planning/planning-operationnel-fiche/planning-operationnel-fiche.component';
import { AffectationEditComponent } from './pages/affectation/affectation-edit/affectation-edit.component';
import { AffectationListComponent } from './pages/affectation/affectation-list/affectation-list.component';
import { CongeEditComponent } from './pages/conge/conge-edit/conge-edit.component';
import { CongeListComponent } from './pages/conge/conge-list/conge-list.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
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
import { PosteEditComponent } from './pages/poste/poste-edit/poste-edit.component';
import { PosteListComponent } from './pages/poste/poste-list/poste-list.component';
import { QuartierEditComponent } from './pages/quartier/quartier-edit/quartier-edit.component';
import { QuartierListComponent } from './pages/quartier/quartier-list/quartier-list.component';
import { ReposGrapheComponent } from './pages/repos/repos-graphe/repos-graphe.component';
import { SanctionEditComponent } from './pages/sanction/sanction-edit/sanction-edit.component';
import { SanctionListComponent } from './pages/sanction/sanction-list/sanction-list.component';
import { StatutEditComponent } from './pages/statut/statut-edit/statut-edit.component';
import { StatutListComponent } from './pages/statut/statut-list/statut-list.component';
import { SwitchEditComponent } from './pages/switch/switch-edit/switch-edit.component';
import { SwitchListComponent } from './pages/switch/switch-list/switch-list.component';
import { VacantListComponent } from './pages/vacant/vacant-list/vacant-list.component';
import { VacantRemplacantCongeEditComponent } from './pages/vacant/vacant-remplacant-conge-edit/vacant-remplacant-conge-edit.component';
import { VacantRemplacantCongeListComponent } from './pages/vacant/vacant-remplacant-conge-list/vacant-remplacant-conge-list.component';
import { VacantRemplacantListComponent } from './pages/vacant/vacant-remplacant-list/vacant-remplacant-list.component';
import { VacantVigileListComponent } from './pages/vacant/vacant-vigile-list/vacant-vigile-list.component';
import { VigileEditComponent } from './pages/vigile/vigile-edit/vigile-edit.component';
import { VigileListComponent } from './pages/vigile/vigile-list/vigile-list.component';
import { VilleEditComponent } from './pages/ville/ville-edit/ville-edit.component';
import { VilleListComponent } from './pages/ville/ville-list/ville-list.component';
import { ZoneEditComponent } from './pages/zone/zone-edit/zone-edit.component';
import { ZoneListComponent } from './pages/zone/zone-list/zone-list.component';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'dashboard', component: DashboardComponent },

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

  { path: 'conge', component: CongeListComponent },
  { path: 'conge/edit', component: CongeEditComponent },
  { path: 'conge/edit/:id', component: CongeEditComponent },

  { path: 'sanction', component: SanctionListComponent },
  { path: 'sanction/edit', component: SanctionEditComponent },
  { path: 'sanction/edit/:id', component: SanctionEditComponent },

  { path: 'permission', component: PermissionListComponent },
  { path: 'permission/edit', component: PermissionEditComponent },
  { path: 'permission/edit/:id', component: PermissionEditComponent },

  { path: 'incident', component: IncidentListComponent },
  { path: 'incident/edit', component: IncidentEditComponent },
  { path: 'incident/edit/:id', component: IncidentEditComponent },

  { path: 'pointage', component: PointageListComponent },
  { path: 'pointage/edit', component: PointageEditComponent },
  { path: 'pointage/edit/:id', component: PointageEditComponent },

  { path: 'motif', component: MotifListComponent },
  { path: 'motif/edit', component: MotifEditComponent },
  { path: 'motif/edit/:id', component: MotifEditComponent },

  { path: 'nationalite', component: NationaliteListComponent },
  { path: 'nationalite/edit', component: NationaliteEditComponent },
  { path: 'nationalite/edit/:id', component: NationaliteEditComponent },

  { path: 'poste', component: PosteListComponent },
  { path: 'poste/edit', component: PosteEditComponent },
  { path: 'poste/edit/:id', component: PosteEditComponent },

  { path: 'statut', component: StatutListComponent },
  { path: 'statut/edit', component: StatutEditComponent },
  { path: 'statut/edit/:id', component: StatutEditComponent },

  { path: 'switch', component: SwitchListComponent },
  { path: 'switch/edit', component: SwitchEditComponent },
  { path: 'switch/edit/:id', component: SwitchEditComponent },

  { path: 'vigile', component: VigileListComponent },
  { path: 'vigile/edit', component: VigileEditComponent },
  { path: 'vigile/edit/:id', component: VigileEditComponent },
  { path: 'vigile/view/:id', component: VigileEditComponent },

  { path: 'ville', component: VilleListComponent },
  { path: 'ville/edit', component: VilleEditComponent },
  { path: 'ville/edit/:id', component: VilleEditComponent },

  { path: 'zone', component: ZoneListComponent },
  { path: 'zone/edit', component: ZoneEditComponent },
  { path: 'zone/edit/:id', component: ZoneEditComponent },

  { path: 'quartier', component: QuartierListComponent },
  { path: 'quartier/edit', component: QuartierEditComponent },
  { path: 'quartier/edit/:id', component: QuartierEditComponent },

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
