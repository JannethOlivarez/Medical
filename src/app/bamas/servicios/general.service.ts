import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private _http: HttpClient) { }

  getResources(tipo, url, body = null): Observable<any> {
    //let result;
    // if (body != null) {
    //   body["usuarioRegistro"] = localStorage.getItem('nombres')
    //   body["fechaRegistro"] = new Date()
    // }
    if (tipo === 'get') {
      return this._http.get(url);  
    } else if (tipo === 'post') {
      return this._http.post(url, body);   
    } else if (tipo === 'delete') {
      return this._http.delete(url);
    } else if (tipo === 'postFile') {
      return this._http.post(url, body)
    } else if (tipo === 'getFile') {
      return this._http.get(url)
    } else if (tipo === 'xml') {
      return this._http.get(url)
    }
    return null;
  }
}
