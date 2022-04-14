import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general.service';
import { UrlServices } from './urls';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  url = new UrlServices();
  constructor(private _generalServices: GeneralService) { }

  getCantidadPersonaByTipo(tipo): Observable<any> {
    return this._generalServices.getResources('get', this.url.urlCantidad(tipo))
  }
  getPersonasPaginado(tipo, number, size): Observable<any> {
    return this._generalServices.getResources('get', this.url.urlPaginado(tipo, number, size))
  }
  savePersona(tipo, persona): Observable<any> {
    return this._generalServices.getResources('post', this.url.urlSave(tipo), persona)
  }
  getPersonaByCedula(cedula): Observable<any> {
    return this._generalServices.getResources('get', this.url.personaByCedula + cedula)
  }
}
