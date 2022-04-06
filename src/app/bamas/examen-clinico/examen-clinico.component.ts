import { Component, OnInit } from '@angular/core';
import { Constantes } from '../constantes';
@Component({
  selector: 'app-examen-clinico',
  templateUrl: './examen-clinico.component.html',
  styleUrls: ['../../estilos/numeracion.css']
})
export class ExamenClinicoComponent implements OnInit {
  contantes = new Constantes();
  nombresExamenesClinicos = this.contantes.nombresExamenesClinicos;
  nomExaCliOtorrino = this.contantes.nomExaCliOtorrino;
  nomExaOftalmologico = this.contantes.nomExaOftalmologico;
  nomExaMedGeneral1 = this.contantes.nomExaMedGeneral1;
  nomExaTraumatologia = this.contantes.nomExaTraumatologia;
  nomExaMedGeneral2 = this.contantes.nomExaMedGeneral2;
  glucosa: string;
  constructor() { }

  ngOnInit(): void {
  }

}
