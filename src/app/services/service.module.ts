import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import {
  LoginGuard,
  AdminGuard,
  VerificaTokenGuard,
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  HospitalService,
  MedicoService,
  SubirArchivoService
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    LoginGuard,
    AdminGuard,
    VerificaTokenGuard,
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    MedicoService,
    SubirArchivoService,
    ModalUploadService
  ]
})
export class ServiceModule { }
