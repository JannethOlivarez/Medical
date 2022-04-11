export class UrlServices {
  servidor = 'http://localhost';
  proxy = this.servidor + ':8088/';
  catalogosHijos = this.proxy + 'catalogo/hijos/lista';
  
  constructor() {}
  
  save=this.proxy+"{name_space}/"
  rem_modulo=this.proxy+"{name_space}/rem"

  urlSave(name_space){
    let url =this.save.replace("{name_space}",name_space)
    return url
  } 
  urlRemModulo(name_space,id=null){
    let url =this.rem_modulo.replace("{name_space}",name_space)
    if (id){
      return url+"/"+id
    }else{
      return url
    }
  }
}
