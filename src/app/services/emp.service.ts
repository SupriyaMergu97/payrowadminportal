import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment'
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class EmpService {

    constructor(private http: HttpClient) { }
    //create department
    createDept(body: any, headers: any): Observable<any> {
        return this.http.post(`${environment.Admin_URL}/dept`, body, { headers }).pipe(catchError(error => of(error)));
    }
    //update department
    updateDept(body: any, headers: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/dept/update`, body, { headers }).pipe(catchError(error => of(error)));
    }
    //get all departments
    getAllDept(headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/dept`, { headers }).pipe(catchError(err => of(err)));
    }
    getDeptbyId(deptId: any, headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/dept/${deptId}`, { headers }).pipe(catchError(err => of(err)));
    }

    //emp Creation
    // createEmp(body:an,headers:anyy):Observable<any>{
    //     return this.http.post(`${environment.Admin_URL}/dept`,body,{headers}).pipe(catchError(error => of(error)));
    // }


    getEmpbydeptId(deptId: any, headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/emp/bydept/${deptId}`, { headers }).pipe(catchError(err => of(err)));
    }

    empCreation(formData: any, headers: any, empId?: any): Observable<any> {
        if (empId) {
            return this.http.put(`${environment.Admin_URL}/emp/creation/${empId}`, formData, { headers }).pipe(catchError(error => of(error)));
        } else {
            return this.http.put(`${environment.Admin_URL}/emp/creation`, formData, { headers }).pipe(catchError(error => of(error)));
        }

    };
    updateEmp(body: any, headers: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/emp/update`, body, { headers }).pipe(catchError(error => of(error)));
    }
    getAllEmp(headers: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/emp/employees`, { headers }).pipe(catchError(err => of(err)));
    }
    getEmpbyId(headers: any, empId: any): Observable<any> {
        return this.http.get(`${environment.Admin_URL}/emp/employees/${empId}`, { headers }).pipe(catchError(err => of(err)));
    }
    wpsDetails(body: any, empId: any, headers: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/emp/wps/${empId}`, body, { headers }).pipe(catchError(err => of(err)));
    }
    applyLeavs(body: any, headers: any): Observable<any> {
        return this.http.put(`${environment.Admin_URL}/emp/leaves`, body, { headers }).pipe(catchError(err => of(err)));
    }
}
