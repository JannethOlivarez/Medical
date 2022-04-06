import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { CatalogoService } from '../servicios/catalogo.services';
import { Constantes } from '../constantes';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  constantes = new Constantes();
  customers1: Customer[];
  loading = true;
  display: boolean;
  value5: any;
  constructor(
    private customerService: CustomerService,
    private catalogosService: CatalogoService
  ) { }

  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;
    });
    this.cargarCatalogos();
  }
  cargarCatalogos() {
   this.catalogosService.getCatalogos([1]).subscribe(
     res => {
        console.log('RESP', res);
     }
    );
  }

}
