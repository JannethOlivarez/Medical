export class UrlServices {
  
  servidor = 'http://localhost';
  proxy = this.servidor + ':8088/';
  catalogosHijos = this.proxy + 'catalogo/hijos/lista';
  personaByCedula=this.proxy+"militar/cedula/";
  paginado=this.proxy+"{name_space}/paginacion?pageNumber=?1&pageSize=?2";
  cantidad=this.proxy+"{name_space}/count";
  save=this.proxy+"{name_space}/";
  familiaresByPersonaId=this.proxy+"familia/persona/";
  
  constructor() {}
  
  
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
  urlPaginado(name_space,pageNumber,pageSize){
    let url =this.paginado.replace("{name_space}",name_space).replace("?1",pageNumber).replace("?2",pageSize)
    return url
  }
  urlCantidad(name_space){
    let url =this.cantidad.replace("{name_space}",name_space)
    return url
  }
}
