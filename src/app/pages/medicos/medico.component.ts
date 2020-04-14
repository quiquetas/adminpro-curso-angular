import { ModalUploadService } from './../../components/modal-upload/modal-upload.service';
import { Hospital } from './../../models/hospital.model';
import { HospitalService } from './../../services/hospital/hospital.service';
import { Medico } from './../../models/medico.model';
import { MedicoService } from './../../services/medico/medico.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit, OnDestroy {

  medico: Medico;
  hospital: Hospital;
  hospitales: Hospital[] = [];
  loading: boolean;

  notificationSubs: Subscription;

  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public route: ActivatedRoute,
    public router: Router,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.cargarHospitales();

    if (id === 'nuevo') {
      this.loading = false;
      this.medico = new Medico('', '', '', null);
      this.hospital = new Hospital('');
    } else {
      this.cargarMedico(id);
    }

    this.notificationSubs = this.modalUploadService.notificacion.subscribe(resp => this.medico.img = resp.medico.img);
  }

  ngOnDestroy() {
    this.notificationSubs.unsubscribe();
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales().subscribe((resp: any) => this.hospitales = resp.hospitales);
  }

  cargarMedico(id) {
    this.loading = true;
    this.medicoService.cargarMedico(id).subscribe(medico => {
      this.medico = medico;
      this.loading = false;
      this.hospitalService.cargarHospital(medico.hospital).subscribe(hospital => this.hospital = hospital);
    });
  }

  cambioHospital(id) {
    if (!id) {
      return;
    }
    this.hospitalService.cargarHospital(id).subscribe(
      hospital => this.hospital = hospital
    );
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    if (this.medico._id) {
      this.medicoService.actualizarMedico(this.medico).subscribe(
        resp => Swal.fire('Médico actualizado', '', 'success')
      );
    } else {
      this.medicoService.crearMedico(this.medico.nombre, this.medico.hospital).subscribe(
        (medico: Medico) => {
          Swal.fire('Médico creado', '', 'success');
          this.medico._id = medico._id;
          this.router.navigate(['/medico', medico._id]);
        }
      );
    }

  }

  cambiarFoto() {
    this.modalUploadService.mostrarModal('medicos', this.medico._id);
  }
}
