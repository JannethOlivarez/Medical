import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UrlServices } from './urls';
@Injectable()
export class OdontogramaService {
  // url = new UrlServices();
  // name_space = 'odontograma';
  // constructor(private _generalServices: GeneralService) {}
  // getByRem(remId): Observable<any> {
  //   // get para saber quepeticion se hace y endpoint  es la url del servico que  se quiere hacer la peticion

  //   return this._generalServices.getResources(
  //     'get',
  //     this.url.urlRemModulo(this.name_space, remId)
  //   );
  // }

  // save(medidasDatos): Observable<any> {
  //   return this._generalServices.getResources(
  //     'post',
  //     this.url.urlRemModulo(this.name_space),
  //     medidasDatos
  //   );
  // }

  // saveDocument(file, id): Observable<any> {
  //   var formData = new FormData();
  //   if (file != null) 
  //   formData.append('file', file[0]);
  //   formData.append('id', id);
  //   return this._generalServices.getResources(
  //     'postFile',
  //     this.url.urlSaveAnexo(this.name_space),
  //     formData
  //   );
  // }
  // getAnexo(id): Observable<any> {
  //   return this._generalServices.getResources(
  //     'getFile',
  //     this.url.urlSaveAnexo(this.name_space) + '/' + id
  //   );
  // }
}
