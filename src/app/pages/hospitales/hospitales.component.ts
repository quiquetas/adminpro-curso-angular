import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { HospitalService } from './../../services/service.index';
import { Hospital } from './../../models/hospital.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  hospitales: Hospital[];
  loading: boolean;

  desde = 0;
  totalRegistros = 0;

  notificationSubs: Subscription;

  constructor(
    public hospitalService: HospitalService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this.notificationSubs = this.modalUploadService.notificacion.subscribe(resp => this.cargarHospitales());
  }

  ngOnDestroy() {
    this.notificationSubs.unsubscribe();
  }

  cargarHospitales() {
    this.loading = true;

    this.hospitalService.cargarHospitales(this.desde).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.loading = false;
      }
    );
  }

  buscarHospitales(termino: string) {
    if (!termino.length) {
      return;
    }

    this.loading = true;

    this.hospitalService.buscarHospitales(termino).subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales;
      this.loading = false;
    });
  }

  cambiarDesde(num: number) {
    const nuevoDesde = this.desde + num;

    if (nuevoDesde < 0 || nuevoDesde >= this.totalRegistros) {
      return;
    }

    this.desde = nuevoDesde;

    this.cargarHospitales();
  }

  crearHospital() {
    Swal.fire({
      title: 'Crear hospital',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar el nombre';
        }
      }
    }).then((result: SweetAlertResult) => {
      if (!result.value) {
        return;
      }

      this.hospitalService.crearHospital(result.value).subscribe((
        hospital: Hospital) => {
          Swal.fire('Hospital creado', `Se creó el hospital ${hospital.nombre}`, 'success');
          this.cargarHospitales();
        }
      );
    });
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe(
      resp => Swal.fire('Hospital actualizado', '', 'success')
    );
  }

  borrarHospital(hospital: Hospital) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Se borrará el usuario ${hospital.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'blue',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.hospitalService.borrarHospital(hospital).subscribe(
          resp => {
            Swal.fire('Hospital eliminado', '', 'success');
            this.cargarHospitales();
          }
        );
      }
    });
  }
}
