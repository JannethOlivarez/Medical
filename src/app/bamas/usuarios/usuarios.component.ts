import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { CatalogoService } from '../servicios/catalogo.services';
import { Constantes } from '../constantes';
import { LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { DateUtils } from 'src/app/utilities/dateUtils';
import { UsuariosService } from '../servicios/usuarios.service';
import { MinValidator } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RolService } from '../servicios/rol.service';
import { ThirdPartyDraggable } from '@fullcalendar/interaction';
import { Persona } from '../modelos/persona';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [DateUtils, MessageService]
})
export class UsuariosComponent implements OnInit, OnChanges {
  constantes = new Constantes();

  @Input() tipo;
  @Input() registro;
  @Input() banderaPadre = false;

  loading = false;
  display: boolean = false;
  segmentos: boolean = false;

  value5: any;
  fechaActual: any;
  fechaSeleccionada: any;
  fecha: any;
  edadCalculada: any;

  totalRegistros = 0;
  banderaEdicion = 0;

  registros = [];
  avionesAux = [];
  customers1: Customer[];
  estadoCivil: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];
  grado: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];
  especialidadVuelo: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];
  sexo: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];
  raza: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];
  materialVuelo: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];
  clasificacion: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];
  aviones: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];
  roles: SelectItem[] = [{ value: null, label: this.constantes.labelSeleccione }];

  constructor(
    private customerService: CustomerService,
    private catalogosService: CatalogoService,
    private _utilidades: DateUtils,
    private _usuariosService: UsuariosService,
    private route: ActivatedRoute,
    private _rolesService: RolService,
    public messageService: MessageService,
  ) { }
  ngOnInit() {
    this.getParams();
    this.cargarCatalogos();
    if (!this.banderaPadre) this.cargarCatalogos();
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.tipo && this.tipo != null) {
    }
    if (changes.registro && this.registro != null) {
      if (this.estadoCivil.length == 1)
        this.cargarCatalogos(1);
      else
        this.banderaEdicion = 1;
    }
  }
  getParams() {
    this.route.params.subscribe(params => {
      if (params['tipo'] && !this.banderaPadre) {
        this.tipo = params['tipo']; // (+) converts string 'id' to a number
        this.cargarUsuarios();
      }
    });
  }
  cargarUsuarios() {
    this.registros = [];
    this._usuariosService.getCantidadPersonaByTipo(this.tipo)
      .subscribe((total: any) => {
        this.totalRegistros = total;
        this.loadPersonaLazy({ first: 0, rows: this.constantes.tamanoPagina })
        this.banderaEdicion = 0;
      }, (err: any) => {
        console.log(err)
      });
  }
  guardar() {
    this._usuariosService.savePersona(this.tipo, this.registro)
      .subscribe((total: any) => {
        this.segmentos = false;
        this.cargarUsuarios();
        this.messageService.add({ severity: 'success', summary: this.constantes.mensajeExitoSummary, detail: this.constantes.mensajeExitoDetail });
      }, (err: any) => {
        this.messageService.add({ severity: 'error', summary: this.constantes.mensajeErrorSummary, detail: this.constantes.mensajeErrorDetail });
        console.log(err)
      });
  }
  editar(registro) {
    this.registro = registro;
    this.obtenerfechas() 
    if (this.tipo == 'militar')
        this.cargarAviones()
    this.segmentos = true;
}
  abrirModal(data) {
    this.registro = data;
    this.display = true;
  }
  loadPersonaLazy(event: LazyLoadEvent) {
    this.loading = true;
    if (this.tipo) {
      this._usuariosService.getPersonasPaginado(this.tipo, event.first / event.rows, event.rows)
        .subscribe((misRegitros: any) => {
          misRegitros.content.forEach(x => {
            if (x.sexo) x.sexoLabel = x.sexo.nombre
            if (x.estadoCivil) x.estadoCivilLabel = x.estadoCivil.nombre
            if (x.raza) x.razaLabel = x.raza.nombre
            if (x.fechaNacimiento) x.fechaNacimientoLabel = this._utilidades.formatoFecha(x.fechaNacimiento)
            if (x.fechaNacimiento) x.fechaNacimiento = new Date(x.fechaNacimiento)
            x.nombresLabel = x.nombres + " " + x.apellidoPaterno + " " + x.apellidoMaterno
            if (x.rol) x.rolLabel = x.rol.nombre
            if (x.grado) x.gradoLabel = x.grado.nombre
          });
          this.loading = false;
          this.registros = misRegitros.content;
        }, (err: any) => {
          console.log(err)
        });
    }
  }
  usuarioNuevo(myform) {
    myform.onReset();
    this.segmentos = true;
    this.registro = new Persona();
  }
  cancelarAccion() {
    this.segmentos = false;
  }
  consultarRolesPermisos() {
    this._rolesService.getAll()
      .subscribe((registros: any) => {
        registros.forEach(x => {
          this.roles.push({ label: x.nombre, value: x.id })
        });
      }, (err: any) => {
        console.log(err)
      });
  }
  cargarCatalogos(banderaEdicion = 0) {
    this.consultarRolesPermisos();
    this.catalogosService.getCatalogosByIds([this.constantes.catalogoIds.estadoCivil, this.constantes.catalogoIds.grado,
    this.constantes.catalogoIds.especialidadVuelo, this.constantes.catalogoIds.sexo, this.constantes.catalogoIds.raza,
    this.constantes.catalogoIds.materialVuelo, this.constantes.catalogoIds.alaFija, this.constantes.catalogoIds.alaRotatoria,
    this.constantes.catalogoIds.supersonico, this.constantes.catalogoIds.clasificacion])
      .subscribe((catalogos: any[]) => {
        this.estadoCivil = [{ value: null, label: this.constantes.labelSeleccione }];
        this.grado = [{ value: null, label: this.constantes.labelSeleccione }];
        this.especialidadVuelo = [{ value: null, label: this.constantes.labelSeleccione }];
        this.sexo = [{ value: null, label: this.constantes.labelSeleccione }];
        this.raza = [{ value: null, label: this.constantes.labelSeleccione }];
        this.materialVuelo = [{ value: null, label: this.constantes.labelSeleccione }];
        this.clasificacion = [{ value: null, label: this.constantes.labelSeleccione }];
        catalogos.filter(x => x.padreId == this.constantes.catalogoIds.estadoCivil).forEach(x => {
          this.estadoCivil.push({ label: x.nombre, value: x.id })
        });
        catalogos.filter(x => x.padreId == this.constantes.catalogoIds.grado).forEach(x => {
          this.grado.push({ label: x.nombre, value: x.id })
        });
        catalogos.filter(x => x.padreId == this.constantes.catalogoIds.especialidadVuelo).forEach(x => {
          this.especialidadVuelo.push({ label: x.nombre, value: x.id })
        });
        catalogos.filter(x => x.padreId == this.constantes.catalogoIds.sexo).forEach(x => {
          this.sexo.push({ label: x.nombre, value: x.id })
        });
        catalogos.filter(x => x.padreId == this.constantes.catalogoIds.raza).forEach(x => {
          this.raza.push({ label: x.nombre, value: x.id })
        });
        catalogos.filter(x => x.padreId == this.constantes.catalogoIds.materialVuelo).forEach(x => {
          this.materialVuelo.push({ label: x.nombre, value: x.id })
        });
        catalogos.filter(x => x.padreId == this.constantes.catalogoIds.clasificacion).forEach(x => {
          this.clasificacion.push({ label: x.nombre, value: x.id })
        });
        catalogos.filter(x => (x.padreId == this.constantes.catalogoIds.supersonico ||
          x.padreId == this.constantes.catalogoIds.alaFija ||
          x.padreId == this.constantes.catalogoIds.alaRotatoria)).forEach(x => {
            this.avionesAux.push(x)
          });
        this.banderaEdicion = banderaEdicion
      }, (err: any) => {
        console.log("Error al carga catalogos", err);
      });
  }
  cargarAviones(event = null) {
    console.log('entre evento', event);
    if (event) this.registro.materialVueloId = event
    if (this.registro && this.registro.materialVueloId) {
      this.aviones = [{ value: null, label: this.constantes.labelSeleccione }];
      switch (this.registro.materialVueloId) {
        case this.constantes.catalogoIds.alaFijaHijo:
          this.avionesAux.filter(x => x.padreId == this.constantes.catalogoIds.alaFija).forEach(x => {
            this.aviones.push({ label: x.nombre, value: x.id })
          });
          break;
        case this.constantes.catalogoIds.alaRotatoriaHijo:
          this.avionesAux.filter(x => x.padreId == this.constantes.catalogoIds.alaRotatoria).forEach(x => {
            this.aviones.push({ label: x.nombre, value: x.id })
          });
          break;
        case this.constantes.catalogoIds.supersonicoHijo:
          this.avionesAux.filter(x => x.padreId == this.constantes.catalogoIds.supersonico).forEach(x => {
            this.aviones.push({ label: x.nombre, value: x.id })
          });
          break;
        default:
          break;
      }
    }
  }
  obtenerfechas(event = null) {
    if (event) this.registro.fechaNacimiento = event
    this.fechaActual = new Date()
    // cogemos los valores actuales
    var ahora_ano = this.fechaActual.getYear();
    var ahora_mes = this.fechaActual.getMonth() + 1;
    var ahora_dia = this.fechaActual.getDate();
    this.fechaSeleccionada = new Date(this.registro.fechaNacimiento)
    var nac_ano = this.fechaSeleccionada.getYear();
    var nac_mes = this.fechaSeleccionada.getMonth() + 1;
    var nac_dia = this.fechaSeleccionada.getDate();
    // año
    var edad = ahora_ano - nac_ano;
    if (ahora_mes < nac_mes) {
      edad--;
    }
    if ((nac_mes == ahora_mes) && (ahora_dia < nac_dia)) {
      edad--;
    }
    if (edad > 1900) {
      edad -= 1900;
    }
    // calculamos los meses
    var meses = 0;
    if (ahora_mes > nac_mes && nac_dia > ahora_dia)
      meses = ahora_mes - nac_mes - 1;
    else if (ahora_mes > nac_mes)
      meses = ahora_mes - nac_mes
    if (ahora_mes < nac_mes && nac_dia < ahora_dia)
      meses = 12 - (nac_mes - ahora_mes);
    else if (ahora_mes < nac_mes)
      meses = 12 - (nac_mes - ahora_mes + 1);
    if (ahora_mes == nac_mes && nac_dia > ahora_dia)
      meses = 11;
    // calculamos los dias
    var dias = 0;
    if (ahora_dia > nac_dia)
      dias = ahora_dia - nac_dia;
    if (ahora_dia < nac_dia) {
      var ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
      dias = ultimoDiaMes.getDate() - (nac_dia - ahora_dia);
    }
    this.registro.edadCalculada = edad + " Año(s), " + meses + " Mes(es) y " + dias + " Día(s)"
  }
}
