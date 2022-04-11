import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general.service';

import { UrlServices } from './urls';
@Injectable()
export class OdontogramaService {
  url = new UrlServices();
  name_space = 'odontograma';

  constructor(private _generalServices: GeneralService) {}

  getByRem(remId): Observable<any> {
    return this._generalServices.getResources(
      'get',
      this.url.urlRemModulo(this.name_space, remId)
    );
  }
  save(medidasDatos): Observable<any> {
    return this._generalServices.getResources(
      'post',
      this.url.urlRemModulo(this.name_space),
      medidasDatos
    );
  }
}
