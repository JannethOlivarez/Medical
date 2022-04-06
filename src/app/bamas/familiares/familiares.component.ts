import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';

@Component({
  selector: 'app-familiares',
  templateUrl: './familiares.component.html',
  styleUrls: ['./familiares.component.scss']
})
export class FamiliaresComponent implements OnInit {

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
