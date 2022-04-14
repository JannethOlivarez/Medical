import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GeneralService } from './general.service';
import { UrlServices } from './urls';

@Injectable({
  providedIn: 'root'
})
export class FamiliarService {

  url = new UrlServices();
  NAME_SPACE="familia"

  constructor(private _generalServices: GeneralService) {}

  save(persona): Observable<any> {
      return this._generalServices.getResources('post', this.url.urlSave(this.NAME_SPACE),persona)
  }

  getFamiliares(personaId):Observable<any>{
      return this._generalServices.getResources('get', this.url.familiaresByPersonaId+personaId)      
  }

  delete(id): Observable<any> {
      return this._generalServices.getResources('delete', this.url.urlSave(this.NAME_SPACE)+id)
  }
}
