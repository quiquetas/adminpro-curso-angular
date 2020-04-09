import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    public usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (!this.usuarioService.estaLogueado()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
