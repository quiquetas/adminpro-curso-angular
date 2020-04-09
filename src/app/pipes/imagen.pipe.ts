import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuario'): any {
    let url = `${environment.apiUrl}/img`;

    if (!imagen) {
      return url + '/usuarios/xxx';
    }

    if (imagen.indexOf('https') >= 0) {
      return imagen;
    }

    switch (tipo) {
      case 'usuario':
        url = url + '/usuarios/' + imagen;
        break;

      case 'medico':
        url = url + '/medicos/' + imagen;
        break;

      case 'hospital':
        url = url + '/hospitales/' + imagen;
        break;

      default:
        url = url + '/usuarios/xxx';
        console.log('Tipo de imagen no existe');
    }

    return url;
  }

}
