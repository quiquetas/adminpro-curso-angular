import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  tipo: string;
  id: string;

  ocultoClass = 'oculto';

  notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal upload service listo');
  }

  ocultarModal() {
    this.ocultoClass = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.ocultoClass = '';
    this.id = id;
    this.tipo = tipo;
  }
}
