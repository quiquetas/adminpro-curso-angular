import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import {
  LoginGuard,
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
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
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirArchivoService,
    ModalUploadService
  ]
})
export class ServiceModule { }
