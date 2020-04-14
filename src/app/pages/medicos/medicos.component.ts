import { Medico } from './../../models/medico.model';
import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { MedicoService } from './../../services/medico/medico.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  medicos: Medico[];
  loading: boolean;

  desde = 0;
  totalRegistros = 0;

  notificationSubs: Subscription;

  constructor(
    public medicoService: MedicoService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();

    this.notificationSubs = this.modalUploadService.notificacion.subscribe(resp => this.cargarMedicos());
  }

  ngOnDestroy() {
    this.notificationSubs.unsubscribe();
  }

  cargarMedicos() {
    this.loading = true;

    this.medicoService.cargarMedicos(this.desde).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
        this.loading = false;
      }
    );
  }

  buscarMedicos(termino: string) {
    if (!termino.length) {
      return;
    }

    this.loading = true;

    this.medicoService.buscarMedicos(termino).subscribe((medicos: Medico[]) => {
      this.medicos = medicos;
      this.loading = false;
    });
  }

  cambiarDesde(num: number) {
    const nuevoDesde = this.desde + num;

    if (nuevoDesde < 0 || nuevoDesde >= this.totalRegistros) {
      return;
    }

    this.desde = nuevoDesde;

    this.cargarMedicos();
  }

  mostrarModal(id: string) {
    this.modalUploadService.mostrarModal('medicos', id);
  }

  guardarMedico(medico: Medico) {
    this.medicoService.actualizarMedico(medico).subscribe(
      resp => Swal.fire('Medico actualizado', '', 'success')
    );
  }

  borrarMedico(medico: Medico) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Se borrará el usuario ${medico.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: 'red',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: 'blue',
      focusCancel: true
    }).then((result) => {
      if (result.value) {
        this.medicoService.borrarMedico(medico).subscribe(
          resp => {
            Swal.fire('Medico eliminado', '', 'success');
            this.cargarMedicos();
          }
        );
      }
    });
  }
}
