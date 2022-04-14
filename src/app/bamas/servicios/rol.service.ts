import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general.service';
import { UrlServices } from './urls';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url = new UrlServices();
  NAME_SPACE="rol"
  constructor(private _generalServices: GeneralService) {}

  save(persona): Observable<any> {
      return this._generalServices.getResources('post', this.url.urlSave(this.NAME_SPACE),persona)
  }

  getAll():Observable<any>{
      return this._generalServices.getResources('get', this.url.urlSave(this.NAME_SPACE))      
  }

  delete(id): Observable<any> {
      return this._generalServices.getResources('delete', this.url.urlSave(this.NAME_SPACE)+id)
  }

}
