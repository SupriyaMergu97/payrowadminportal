import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginModel } from '../types/login';
import { Subject } from 'rxjs'; 
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  // checkLogin(model: LoginModel): Observable<any> {
  //   const result = users.filter(e=> e.email == model.emailAddress && e.password == model.password);
    
  //   if (result.length > 0) {
  //       return of(result[0]);
  //   }

  //   return of(null);
  // }

  private handleError(error: any): any {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent || error.error !== undefined) {
        // Get client-side error
        errorMessage = error.error.message || error.error.error.message || error.error.error;
    } else if (error.statusText && error.statusText === 'Unknown Error') {
        errorMessage = 'An error occurred while processing your request, please contact administrator!';
    } else if (error.error && error.error.error === 'Cannot read property \'NOT_FOUND\' of undefined') {
        errorMessage = 'Records not found!';
    } else {
        errorMessage = error.error.message || error.error.error.message || error.error.error;
    }

    return throwError(errorMessage);
  }
}

// const users = [
//     { name: 'Admin Payrow', email: 'admin@payrow.com', password: '123' },
//     { name: 'User Payrow', email: 'user@payrow.com', password: '123' },
//     { name: 'Arun Kumar', email: 'arun@payrow.com', password: '123' },
//     { name: 'Pavan Mallam', email: 'pavan@payrow.com', password: '123' },
//     { name: 'Ganim', email: 'ganim@payrow.com', password: '123' }
// ];