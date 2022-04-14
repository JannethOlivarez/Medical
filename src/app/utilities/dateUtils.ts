import { Injectable } from "@angular/core";

@Injectable()
export class DateUtils {



    constructor() {

    }

    formatoFecha(fecha) {
        var d = new Date(fecha),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [day, month,year].join('-');
    }
}