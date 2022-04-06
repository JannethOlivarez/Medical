import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[];
    constructor(public appMain: AppMainComponent) {}

    ngOnInit() {

        this.model = [
            {label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/']},
            {
                label: 'Administración', icon: 'pi pi-fw pi-star-fill', routerLink: ['/uikit'],
                items: [
                    {
                        label: 'Usuarios', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
                        items: [
                            {label: 'Pacientes', icon: 'pi pi-fw pi-prime', routerLink: ['usuarios']},
                            {label: 'Especialistas', icon: 'pi pi-fw pi-prime', routerLink: ['usuarios']},
                        ]
                    },
                    {label: 'Roles y permisos', icon: 'pi pi-fw pi-check-square', routerLink: ['/roles-permisos']},
                ]
            },
            {
                label: 'Clínico', icon: 'pi pi-fw pi-compass', routerLink: ['/utilities'],
                items: [
                    {label: 'Rep. exámenes médicos', icon: 'pi pi-fw pi-prime', routerLink: ['clinico']},
                    {
                             label: 'Med. y otros datos', icon: 'pi pi-fw pi-sitemap',
                             items: [
                                 {
                                     label: 'Enfermería', icon: 'pi pi-fw pi-sign-in', routerLink: ['medidasYotrosDatos']
                                 },
                                 {
                                     label: 'Oftalmología', icon: 'pi pi-fw pi-sign-in', routerLink: ['medidasYotrosDatos']
                                 },
                                 {
                                    label: 'Audiometría', icon: 'pi pi-fw pi-sign-in', routerLink: ['medidasYotrosDatos']
                                }
                             ]
                         },
                    {label: 'Otorrinolaringología', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons']},
                    {label: 'Traumatología', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank'},
                    {label: 'Medicina General', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons']},
                    {label: 'Odontología', icon: 'pi pi-fw pi-prime', routerLink: ['odontologia']},
                    {label: 'Psicología', icon: 'pi pi-fw pi-prime', routerLink: ['psicologia']},
                    {label: 'Laboratorio clínico', icon: 'pi pi-fw pi-prime', routerLink: ['laboratorio']},
                ]
            },
        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
