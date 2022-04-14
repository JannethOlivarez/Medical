import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { Familiar } from '../modelos/familiar';
import { FamiliarService } from '../servicios/familiar.service';

@Component({
  selector: 'app-familiares',
  templateUrl: './familiares.component.html',
  styleUrls: ['./familiares.component.scss']
})
export class FamiliaresComponent implements OnInit, OnChanges {

  customers1: Customer[];
  loading: boolean = true;
  display: boolean;
  registros = [];
  registro: Familiar;
  familiarSeleccionado: Familiar;
  familiares: Familiar[];

  @Input() persona;
  constructor(private _familiaService: FamiliarService) { }

  ngOnInit() { }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.persona && this.persona != null) {
      this.consultarFamiliares()
    }
  }
  dialogoNuevoFamiliar() {
    this.registro= new Familiar();
    this.display = true;
}
  consultarFamiliares() {
    this._familiaService.getFamiliares(this.persona.id)
      .subscribe((registros: any) => {
        this.registros = registros
        this.display = false;
        this.loading=false;
        console.log(registros);
      }, (err: any) => {
        console.log(err)
      });
  }
  editar(rowData) {
    this.registro = rowData
    this.display = true;
  }
  eliminar(rowData) {
    this._familiaService.delete(rowData.id)
      .subscribe((total: any) => {
        this.consultarFamiliares()
      }, (err: any) => {
        console.log(err)
      });
  }
  guardarFamiliar() {
    this.registro.personaId=this.persona.id
    this._familiaService.save(this.registro)
    .subscribe((total: any) => {
        this.consultarFamiliares()
        this.display=false;
    }, (err: any) => {
        console.log(err)
    });
}
  onRowSelect(event) {
    this.registro = this.cloneCar(event.data);
    this.display = true;
  }

  cloneCar(c: Familiar): Familiar {
    let familia;
    for (let prop in c) {
      familia[prop] = c[prop];
    }
    return familia;
  }

}
