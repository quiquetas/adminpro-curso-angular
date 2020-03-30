import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from './../shared/shared.module';

import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';
import { Graph1Component } from './graph1/graph1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// TODO mudar a modulo de componentes
import { IncrementorComponent } from '../components/incremetor/incrementor.component';
import { DoughnutChartComponent } from '../components/doughnut-chart/doughnut-chart.component';

import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component,
    IncrementorComponent,
    DoughnutChartComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component
  ]
})
export class PagesModule { }
