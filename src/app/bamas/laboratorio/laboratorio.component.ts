import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laboratorio',
  templateUrl: './laboratorio.component.html',
  styleUrls: ['../../estilos/numeracion.css']
})
export class LaboratorioComponent implements OnInit {
  glucosa: string;
  aspecto: string;
  proteinas: string;
  constructor() { }

  ngOnInit(): void {
  }

}
