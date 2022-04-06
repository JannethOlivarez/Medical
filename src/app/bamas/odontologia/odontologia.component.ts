import { Component, Input, OnInit, SimpleChange } from '@angular/core';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { Constantes } from '../constantes';


@Component({
    selector: 'app-odontologia',
    templateUrl: './odontologia.component.html',
    styleUrls: ['./odontologia.component.scss', '../../estilos/numeracion.css']
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
    customers1: Customer[];
    loading: boolean = true;
    display: boolean;
    value5: any;
    constructor(private customerService: CustomerService) { }
    ngOnInit() {
        this.customerService.getCustomersLarge().then(customers => {
            this.customers1 = customers;
            this.loading = false;

            // @ts-ignore
            this.customers1.forEach(customer => customer.date = new Date(customer.date));
        });
    }
}
