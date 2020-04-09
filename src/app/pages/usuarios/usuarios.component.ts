import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { UsuarioService } from './../../services/service.index';
import { Usuario } from './../../models/usuario.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  usuarios: Usuario[];

  loading: boolean;

  desde = 0;
  totalRegistros = 0;

  constructor(
    public usuarioService: UsuarioService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this.modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  ngOnDestroy() {
    this.modalUploadService.notificacion.unsubscribe();
  }

  cargarUsuarios() {
    this.loading = true;

    this.usuarioService.cargarUsuarios(this.desde).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.loading = false;
      }
    );
  }

  cambiarDesde(num: number) {
    const nuevoDesde = this.desde + num;

    if (nuevoDesde < 0 || nuevoDesde >= this.totalRegistros) {
      return;
    }

    this.desde = nuevoDesde;

    this.cargarUsuarios();
  }

  buscarUsuarios(termino: string) {
    if (!termino.length) {
      return;
    }

    this.loading = true;

    this.usuarioService.buscarUsuarios(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.loading = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Se borrará el usuario ${usuario.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'blue',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.usuarioService.borrarUsuario(usuario).subscribe(
          ok => {
            Swal.fire('Usuario borrado', '', 'success');
            this.cargarUsuarios();
          },
          err => Swal.fire('Error', 'Error al borrar el usuario', 'error')
        );
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('usuarios', id);
  }

}
