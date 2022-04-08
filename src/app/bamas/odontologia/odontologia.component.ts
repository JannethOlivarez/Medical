import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { ConfirmationService, Message,MessageService } from 'primeng/api';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { Constantes } from '../constantes';


@Component({
    selector: 'app-odontologia',
    templateUrl: './odontologia.component.html',
    styleUrls: ['./odontologia.component.scss', '../../estilos/numeracion.css'],
    providers:[ConfirmationService, MessageService]
})
export class OdontologiaComponent implements OnInit {
    dientesArriba = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
    dientesAbajo = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
    tratamientosOdontograma = [
        { nombre: 'Sellante Necesario', imagen: 'necesario' },
        { nombre: 'Pérdida (otra causa)', imagen: 'otra_causa' },
        { nombre: 'Prótesis Total', imagen: 'total' },
        { nombre: 'Sellante Realizado', imagen: 'realizado' },
        { nombre: 'Endodoncia', imagen: 'endodoncia' },
        { nombre: 'Corona', imagen: 'corona' },
        { nombre: 'Extracción Indicada', imagen: 'extraccion_indicada' },
        { nombre: 'Prótesis Fija', imagen: 'fija' },
        { nombre: 'Obturado', imagen: 'obturado' },
        { nombre: 'Pérdida por caries', imagen: 'perdida_caries' },
        { nombre: 'Prótesis Removible', imagen: 'removible' },
        { nombre: 'Caries', imagen: 'caries' },
        { nombre: 'Implante Necesario', imagen: 'implante_necesario' },
        { nombre: 'Implante Realizado', imagen: 'implante_realizado' },
        { nombre: 'Carilla Necesaria', imagen: 'carilla_necesaria' },
        { nombre: 'Carilla Realizada', imagen: 'carilla_realizada' }
    ];

    cols = [
        { field: 'diente', header: 'Diente' },
        { field: 'nombre', header: 'Nombre Tratamiento/Diagnostico' }

    ];
    
    //Arrays u Objetos 
    listaObjArriba = [];
    listaObjAbajo = [];
    listaObjArribaTemp = [];
    listaObjAbajoTemp = [];
    listaTratamientosMostrar = []
    tratamientosSelecionado = []
    customers1: Customer[];
    msgs: Message[] = [];
    lados = { arriba: null, abajo: null, derecha: null, izquierda: null, centro: null };

    //Variables tipo Any
    ladoSelecionado:any;
    value5: any;
    tratamiento: any;
    dienteSeleccionadoAux: any;
    tratamientoSeleccionadoAux: any ;
    tratamientoSeleccionado: any;

    //Variables Bool
    banderaEditarTratamiento = false;
    agregarTratamientoBandera = false;
    agregarTramientoDesdeOdontograma = false;
    loading: boolean = true;
    display: boolean;

    colorSelecionado = "#FACC2E";
    REALIZADO = "obturado";
    NECESARIO = "caries";

    constructor(private customerService: CustomerService,private confirmationService: ConfirmationService, private messageService: MessageService) { }
    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
        this.generarDientesNuevo();
    }
    generarDientesNuevo() {
        this.dientesArriba.forEach(x => {
            let diente = {
                diente: x,
                tratamientos: []
            }
            this.listaObjArriba.push(diente)
        });
        this.dientesAbajo.forEach(x => {
            let diente = {
                diente: x,
                tratamientos: []
            }
            this.listaObjAbajo.push(diente)
        });
    }
    selecionarTratamiento(tratamiento) {
        this.tratamientosOdontograma.forEach(x => {
            x["seleccionado"] = null;
        });
        tratamiento["seleccionado"] = this.colorSelecionado
        this.tratamientoSeleccionado = tratamiento;
       
    }
    seleccionadoLado(lado) {
        this.lados = { arriba: null, abajo: null, derecha: null, izquierda: null, centro: null }
        this.ladoSelecionado = lado;
        this.lados[lado] = this.colorSelecionado;

    }
    establecerTratamiento(diente) {
        if (this.tratamientoSeleccionado != null && this.tratamientoSeleccionado.imagen != this.REALIZADO && this.tratamientoSeleccionado.imagen != this.NECESARIO) {
            let agregado = diente.tratamientos.find(x => x.imagen == this.tratamientoSeleccionado.imagen)
            if (agregado == undefined) {
                let tratamiento = Object.assign({}, this.tratamientoSeleccionado);
                tratamiento["index"] = diente.tratamientos.length + 1;
                this.agregarTratamiento(diente, tratamiento);
            }
        } else if (this.tratamientoSeleccionado != null && this.ladoSelecionado != null) {
            let agregado = diente.tratamientos.find(x => x.imagen == this.armarImagenSellante(diente))
            if (agregado == undefined) {
                let tratamiento = Object.assign({}, this.tratamientoSeleccionado);
                tratamiento["index"] = diente.tratamientos.length + 1;
                tratamiento.imagen = this.armarImagenSellante(diente);
                this.agregarTratamiento(diente, tratamiento);
            }
        }   
    }
    agregarTratamiento(diente = null, tratamiento = null, detalle = null) {
        this.banderaEditarTratamiento = false;
        this.dienteSeleccionadoAux = null
        this.tratamientoSeleccionadoAux = null
        this.agregarTramientoDesdeOdontograma = false;
        if (diente != null && tratamiento != null) {
            this.agregarTramientoDesdeOdontograma = true;
            this.dienteSeleccionadoAux = diente
            this.tratamientoSeleccionadoAux = tratamiento
        } else if (detalle != null) {
            let dienteLista;
            dienteLista = this.listaObjArriba.find(x => x.diente == detalle.diente);
            if (!dienteLista) {
                dienteLista = this.listaObjAbajo.find(x => x.diente == detalle.diente);
            };
            this.agregarTramientoDesdeOdontograma = true;
            this.dienteSeleccionadoAux = dienteLista
            this.tratamientoSeleccionadoAux = detalle.tratamiento;
            this.tratamientoSeleccionadoAux.editar = true;
        }
        this.guardarTratamientoDiente();
    }
    guardarTratamientoDiente() {
        if (this.tratamientoSeleccionadoAux.editar) {
            this.tratamientoSeleccionadoAux.editar = false;
        } else {
            this.dienteSeleccionadoAux.tratamientos.push(this.tratamientoSeleccionadoAux);
        }
        this.detalleTratamientosGeneral();
        this.agregarTratamientoBandera = false;
    }
    armarImagenSellante(diente) {
        let imagen = this.ladoSelecionado;
        if (this.tratamientoSeleccionado.imagen == this.NECESARIO) {
            imagen += "_rojo";
        } else {
            imagen += "_azul";
        }
        if (this.listaObjArriba.find(x => x.diente == diente.diente) || this.listaObjAbajo.find(x => x.diente == diente.diente)) {
            imagen += "_def";
        }
        return imagen;
    }
    detalleTratamientosGeneral() {
        let listaTratamientosMostrar = [];
        this.listaObjArriba.forEach(x => {
            x.tratamientos.forEach(element => {
                listaTratamientosMostrar.push(
                    {
                        diente: x.diente,
                        nombre: element.nombre,
                        tratamientos: element.tratamientos,
                        diagnostico: element.diagnostico,
                        tratamiento:element
                    }
                );
            });
        });
        this.listaObjAbajo.forEach(x => {
            x.tratamientos.forEach(element => {
                
                listaTratamientosMostrar.push(
                    {
                        diente: x.diente,
                        nombre: element.nombre,
                        tratamientos: element.tratamientos,
                        diagnostico: element.diagnostico,
                        tratamiento:element
                    }
                );
            });
        });
        this.listaTratamientosMostrar = listaTratamientosMostrar;
    }
    eliminarTratamientoOdontograma(diente) {
        let dienteLista;
        dienteLista = this.listaObjArriba.find(x => x.diente == diente.diente);
        if (!dienteLista) {
            dienteLista = this.listaObjAbajo.find(x => x.diente == diente.diente);
        };
        dienteLista.tratamientos = dienteLista.tratamientos.filter(x => x.imagen != diente.tratamiento.imagen);
        let listaTratamientosEstablecidos = this.listaTratamientosMostrar.filter(x => x != diente && x.tratamiento != diente.tratamiento);
        this.listaTratamientosMostrar = listaTratamientosEstablecidos;
    }
    confirmacionEliminacionTratamimento(diente){
            this.confirmationService.confirm({
                message: '¿Quieres eliminar este registro?',
                header: 'Confirmar Eliminación',
                icon: 'pi pi-info-circle',
                acceptLabel: 'Si',
                rejectLabel:'No',
                accept: () => {
                    this.eliminarTratamientoOdontograma(diente);
                },
                reject: () => {
                   //realizar cualquier accion al rechazar el eliminado.
                }
            });
    }
}
