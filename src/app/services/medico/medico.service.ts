import { Medico } from './../../models/medico.model';
import { UsuarioService } from './../usuario/usuario.service';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class MedicoService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  cargarMedico(id: string) {
    return this.http.get(`${environment.apiUrl}/medico/${id}`).pipe(
      map((resp: any) => resp.medico)
    );
  }
  cargarMedicos(desde: number = 0) {
    return this.http.get(`${environment.apiUrl}/medico?desde=${desde}`);
  }

  buscarMedicos(termino: string) {
    return this.http.get(`${environment.apiUrl}/busqueda/coleccion/medicos/${termino}`).pipe(
      map((resp: any) => resp.medicos)
    );
  }

  crearMedico(nombre: string, hospitalId: string) {
    return this.http.post(`${environment.apiUrl}/medico?token=${this.usuarioService.token}`, {nombre, hospitalId}).pipe(
      map((resp: any) => resp.medico)
    );
  }

  actualizarMedico(medico: Medico) {
    return this.http.put(`${environment.apiUrl}/medico/${medico._id}?token=${this.usuarioService.token}`, { nombre: medico.nombre, hospitalId: medico.hospital });
  }

  borrarMedico(medico: Medico) {
    return this.http.delete(`${environment.apiUrl}/medico/${medico._id}?token=${this.usuarioService.token}`);
  }
}
