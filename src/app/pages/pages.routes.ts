import { VerificaTokenGuard } from './../services/guards/verifica-token.guard';
import { AdminGuard } from './../services/guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
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
    { path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: { title: 'Dashboard' } },
    { path: 'progress', component: ProgressComponent, data: { title: 'Progress' } },
    { path: 'graph1', component: Graph1Component, data: { title: 'Gráficas' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes' } },
    { path: 'profile', component: ProfileComponent, data: { title: 'Peril de usuario' } },
    { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { title: 'Buscador' } },
    // Mantenimientos
    { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: { title: 'Mantenimiento de usuarios' } },
    { path: 'hospitales', component: HospitalesComponent, data: { title: 'Mantenimiento de hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { title: 'Mantenimiento de médicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { title: 'Actualizar médico' } },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
