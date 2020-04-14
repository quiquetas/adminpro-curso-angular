import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from './../../services/subir-archivo/subir-archivo.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;

  imagenTemp: string;

  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      this.imagenTemp = null;
      Swal.fire({ icon: 'error', title: 'Sólo imágenes', text: 'El archivo seleccionado no es una imagen'});
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result.toString();

  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.modalUploadService.ocultarModal();
  }

  subirImagen() {
    this.subirArchivoService.subirArchivo(this.imagenSubir, this.modalUploadService.tipo, this.modalUploadService.id)
      .then( resp => {
        console.log(resp);
        this.modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(console.log);
  }

}
