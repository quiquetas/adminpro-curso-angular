import { UsuarioService } from './../usuario/usuario.service';
import { Hospital } from './../../models/hospital.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class HospitalService {

  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) { }

  cargarHospitales(desde: number = 0) {
    return this.http.get(`${environment.apiUrl}/hospital?desde=${desde}`);
  }

  cargarHospital(id: string) {
    return this.http.get(`${environment.apiUrl}/hospital/${id}`).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  buscarHospitales(termino: string) {
    return this.http.get(`${environment.apiUrl}/busqueda/coleccion/hospitales/${termino}`).pipe(
      map((resp: any) => resp.hospitales)
    );
  }

  crearHospital(nombre: string) {
    return this.http.post(`${environment.apiUrl}/hospital?token=${this.usuarioService.token}`, {nombre}).pipe(
      map((resp: any) => resp.hospital)
    );
  }

  actualizarHospital(hospital: Hospital) {
    return this.http.put(`${environment.apiUrl}/hospital/${hospital._id}?token=${this.usuarioService.token}`, hospital);
  }

  borrarHospital(hospital: Hospital) {
    return this.http.delete(`${environment.apiUrl}/hospital/${hospital._id}?token=${this.usuarioService.token}`);
  }
}
