import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';

@Component({
  selector: 'app-roles-permisos',
  templateUrl: './roles-permisos.component.html',
  styleUrls: ['./roles-permisos.component.scss']
})
export class RolesPermisosComponent implements OnInit {
  customers1: Customer[];
  loading:boolean = true;
  display: boolean;
  constructor( private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;

      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
  });
  }

}
