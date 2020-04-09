import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProfileComponent } from './profile/profile.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PromisesComponent } from './promises/promises.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { LoginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
      { path: 'graph1', component: Graph1Component, data: { title: 'Gráficas' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Peril de usuario' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      // Mantenimientos
      { path: 'usuarios', component: UsuariosComponent, data: { title: 'Mantenimiento de usuarios' } },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
