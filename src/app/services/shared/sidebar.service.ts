import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any[] = [];

  constructor(
    public usuarioService: UsuarioService
  ) {}

  cargarMenu() {
    this.menu = this.usuarioService.menu;
  }

}
