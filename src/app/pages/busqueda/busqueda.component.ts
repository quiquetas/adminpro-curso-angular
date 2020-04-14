import { Hospital } from './../../models/hospital.model';
import { Medico } from './../../models/medico.model';
import { Usuario } from './../../models/usuario.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    public route: ActivatedRoute,
    public http: HttpClient
  ) {
    this.route.params.subscribe(params => {
      const termino = params['termino'];
      this.buscar(termino);
    })
  }

  ngOnInit() {
  }

  buscar(termino: string) {
    this.http.get(`${environment.apiUrl}/busqueda/todo/${termino}`).subscribe(
      (resp: any) => {
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
      }
    );
  }

}
