import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public sidebar: SidebarService,
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

}
