import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService {
    uri = 'http://localhost:8088/catalogo/hijos/lista';

  constructor( private http: HttpClient) { }
  getCatalogos(ids: any[]){
      return this.http.post(`${this.uri}`, ids);
  }
}
