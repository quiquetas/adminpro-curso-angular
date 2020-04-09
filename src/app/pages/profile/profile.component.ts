import { SubirArchivoService } from './../../services/subir-archivo/subir-archivo.service';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/service.index';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;

  imagenTemp: string;

  constructor(
    public usuarioServie: UsuarioService,
    public subirArchivoService: SubirArchivoService
  ) { }

  ngOnInit() {
    this.usuario = this.usuarioServie.usuario;
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    this.usuario.nombre = forma.value.nombre;

    if (!this.usuario.google) {
      this.usuario.email = forma.value.email;
    }

    this.usuarioServie.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      this.imagenTemp = null;
      Swal.fire({ icon: 'error', title: 'Sólo imágenes', text: 'El archivo seleccionado no es una imagen'});
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {
    if (!this.imagenSubir) {
      return;
    }

    this.usuarioServie.cambiarImagen(this.imagenSubir);
  }
}
