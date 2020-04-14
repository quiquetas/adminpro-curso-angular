import { Usuario } from './../models/usuario.model';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';

import Swal from 'sweetalert2';

declare function initPlugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recordar = false;

  auth2: any;

  constructor(
    private router: Router,
    public usuarioService: UsuarioService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    initPlugins();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recordar = true;
    }

    this.googleInit();
  }

  googleInit() {
    this.ngZone.runOutsideAngular(() => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '453515735443-2qlb5tiu47cefp2anav5p46pk3vpups5.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        this.attachSignin(document.getElementById('btnGoogle'));
      });
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => this.ngZone.run(() => {
      const token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token).subscribe(
        ok => this.router.navigate(['/dashboard']),
        error => Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al autenticar'
        })
      );
    }));
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El formulario tiene errores'
      })
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.usuarioService.login(usuario, forma.value.recordar).subscribe(
      ok => this.router.navigate(['/dashboard']));
  }

}
