import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'progress', component: ProgressComponent},
      { path: 'graph1', component: Graph1Component},
      { path: 'account-settings', component: AccountSettingsComponent},
      { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
