import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from './general.service';
import { UrlServices } from './urls'

@Injectable({
  providedIn: 'root'
})


export class CatalogoService {
  url = new UrlServices();
    uri = 'http://localhost:8088/catalogo/hijos/lista';
  constructor( private http: HttpClient, private _generalServices: GeneralService) { }
  getCatalogos(ids: any[]){
      return this.http.post(`${this.uri}`, ids);
  }
  getCatalogosByIds(ids): Observable<any> {
    return this._generalServices.getResources('post', this.url.catalogosHijos,ids)
}
}
