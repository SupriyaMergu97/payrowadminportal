import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import {ToastrService} from 'ngx-toastr'

@Injectable()
export class AppManagerService {

    constructor(
        private httpClient: HttpClient,private toastr:ToastrService
    ) {

    }

    showSuccess(message:any, title:any){
        this.toastr.success(message, title)
    }

    showError(message:any, title:any){
        this.toastr.error(message, title)
    }

    showInfo(message:any, title:any){
        this.toastr.info(message, title)
    }

    showWarning(message:any, title:any){
        this.toastr.warning(message, title)
    }

    convertToTitleCase(value: string): string {

        if (value === null || value === '') {
            return value;
        }

        const words = value.toLowerCase().split('_');

        for (let ii = 0; ii < words.length; ii++) {
            words[ii] = words[ii].charAt(0).toUpperCase() + words[ii].slice(1);
        }

        return words.join(' ');
    }

    toCamelCase(val: string): string {
        if (val && val.trim() != "") {
            return val.substr(0, 1).toLowerCase() + val.substr(1);
        }
        
        return val;
    }

    get ShowReportDate(): any {
        return localStorage.getItem('ShowReportDate') || 'true';
    }

    set ShowReportDate(val: any) {
        localStorage.setItem('ShowReportDate', val);
    } 

    //#region | Private Functions |

    private errorHandler(error: any): any {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Message: ${error.error.error}`;
        }

        return throwError(errorMessage);
    }

    //#endregion
}
