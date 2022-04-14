import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/demo/domain/customer';
import { CustomerService } from 'src/app/demo/service/customerservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RolService } from '../servicios/rol.service';
import { Constantes } from '../constantes';

@Component({
  selector: 'app-roles-permisos',
  templateUrl: './roles-permisos.component.html',
  styleUrls: ['./roles-permisos.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class RolesPermisosComponent implements OnInit {
  constantes = new Constantes();
  customers1: Customer[];
  registros = [];
  loading: boolean = true;
  disabledEraser: boolean;
  displayDialog: boolean = false;
  registro: any;
  permisos = this.constantes.permisosPantallas;
  constructor(private customerService: CustomerService, private _rolService: RolService, public messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => {
      this.customers1 = customers;
      this.loading = false;

      // @ts-ignore
      this.customers1.forEach(customer => customer.date = new Date(customer.date));
      this.consultarRolesPermisoses();
    });
  }
  showDialogToAdd() {
    this.registro = {};
    this.disabledEraser = true;
    this.displayDialog = true;
  }
  consultarRolesPermisoses() {
    this._rolService.getAll()
      .subscribe((registros: any) => {
        registros.forEach(x => {
          try {
            x.permisos = JSON.parse(x.permisos)
          } catch (error) {
            x.permisos = []
          }
        });
        this.registros = registros
        this.displayDialog = false;
      }, (err: any) => {
        console.log(err)
      });
  }
  guardarRolesPermisos() {
    let registro = this.clone(this.registro)
    registro["permisos"] = JSON.stringify(registro["permisos"])
    this._rolService.save(registro)
      .subscribe((total: any) => {
        this.consultarRolesPermisoses()
        this.displayDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha creado satisfactoriamente' });
      }, (err: any) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'A ocurrido un error' });
      });
  }
  clone(c) {
    let familia = {};
    for (let prop in c) {
      familia[prop] = c[prop];
    }
    return familia;
  }
  editar(rowData) {
    this.registro = rowData
    //this.disabledEraser=false;
    this.displayDialog = true;
  }
  confirmarEliminacion(data) {
    this.confirmationService.confirm({
      message: '¿Quieres eliminar este registro?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.eliminar(data);
      },
      reject: () => {
        //realizar cualquier accion al rechazar el eliminado.
      }
    });
  }
  eliminar(rowData) {
    this._rolService.delete(rowData.id)
      .subscribe((total: any) => {
        this.consultarRolesPermisoses()
        this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Se ha eliminado el registro' });
      }, (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'A ocurrido un error' });
        console.log(err)
      });
  }

}
