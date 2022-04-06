export class UrlServices {
  servidor = 'http://localhost';
  proxy = this.servidor + ':8088/';
  catalogosHijos = this.proxy + 'catalogo/hijos/lista';
  constructor() {}
}
