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
                    // {label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel']},
                    // {label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate']},
                    // {label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon'},
                    // {label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table']},
                    // {label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list']},
                    // {label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree']},
                    // {label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel']},
                    // {label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay']},
                    // {label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media']},
                    // {label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], preventExact: true},
                    // {label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message']},
                    // {label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file']},
                    // {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts']},
                    // {label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc']}
                ]
            },
            // {
            //     label:'Registro', icon:'pi pi-fw pi-prime', routerLink: ['/blocks'],
            //     items:[
            //         {label: 'Paciente', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks']},
            //         {label: 'Persona', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank'},
            //     ]
            // },
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
                    {label: 'Odontología', icon: 'pi pi-fw pi-prime', routerLink: ['utilities/icons']},
                    {label: 'Psicología', icon: 'pi pi-fw pi-prime', routerLink: ['psicologia']},
                    {label: 'Laboratorio clínico', icon: 'pi pi-fw pi-prime', routerLink: ['laboratorio']},
                ]
            },
            // {
            //     label: 'Pages', icon: 'pi pi-fw pi-copy', routerLink: ['/pages'],
            //     items: [
            //         {label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud']},
            //         {label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar']},
            //         {label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/pages/timeline']},
            //         { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
            //         { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'], target: '_blank' },
            //         { label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', routerLink: ['/error'], target: '_blank' },
            //         { label: '404', icon: 'pi pi-fw pi-times', routerLink: ['/404'], target: '_blank' },
            //         {label: 'Access Denied', icon: 'pi pi-fw pi-ban', routerLink: ['/accessdenied'], target: '_blank'},
            //         { label: 'Empty', icon: 'pi pi-fw pi-clone', routerLink: ['/pages/empty'] },
            //     ]
            // },
            // {
            //     label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Docs', icon: 'pi pi-fw pi-file', routerLink: ['/documentation']
            // },
            // {
            //     label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
            // }
        ];
    }

    onMenuClick() {
        this.appMain.menuClick = true;
    }
}
