import { Usuario } from './../../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';

import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return !!this.token;
  }

  loginGoogle(token: string) {
    return this.http.post(`${environment.apiUrl}/login/google`, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this.http.post(`${environment.apiUrl}/login`, { email: usuario.email, password: usuario.password }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);

        return true;
      }),
      catchError((err: any) => {
        Swal.fire('Error', err.error.message, 'error');
        return Observable.throw(err);
      })
    );
  }

  logout() {
    this.usuario = null;
    this.token = null;
    this.menu = null;

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.token = token;
    this.usuario = usuario;
    this.menu = menu;
  }

  cargarStorage() {
    this.token = localStorage.getItem('token');
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    this.menu = JSON.parse(localStorage.getItem('menu'));
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${environment.apiUrl}/usuario`, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso'
        });

        return resp;
      }),
      catchError((err: any) => {
        Swal.fire('Error', err.error.errors.message, 'error');
        return Observable.throw(err);
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    return this.http.put(`${environment.apiUrl}/usuario/${usuario._id}?token=${this.token}`, usuario).pipe(
      map((resp: any) => {
        // Si el usuario que se está actualizando es el usuario logueado, actualizo
        // el local Storage.
        if (usuario._id === this.usuario._id) {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
        }

        Swal.fire({ icon: 'success', title: 'Usuario actualizado'});

        return true;
      }),
      catchError((err: any) => {
        Swal.fire('Error', err.error.errors.message, 'error');
        return Observable.throw(err);
      })
    );
  }

  cambiarImagen(archivo: File) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', this.usuario._id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        this.guardarStorage(this.usuario._id, this.token, this.usuario, this.menu);

        Swal.fire({ icon: 'success', title: 'Imagen actualizada' });
      })
      .catch(console.log);
  }

  cargarUsuarios(desde: number = 0) {
    return this.http.get(`${environment.apiUrl}/usuario?desde=${desde}`);
  }

  buscarUsuarios(termino: string) {
    return this.http.get(`${environment.apiUrl}/busqueda/coleccion/usuarios/${termino}`).pipe(
      map((resp: any) => resp.usuarios)
    );
  }

  borrarUsuario(usuario: Usuario) {
    return this.http.delete(`${environment.apiUrl}/usuario/${usuario._id}?token=${this.token}`);
  }
}
