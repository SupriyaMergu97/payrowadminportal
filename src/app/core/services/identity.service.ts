import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class IdentityService {

    onLoginChanged: Subject<any>;
    onLogout: Subject<any>;
    onThemeChange: Subject<any>;
    onTenantChange: Subject<any>;
    onTokenChange: Subject<any>;

    constructor(
    ) {
        this.onLoginChanged = new Subject();
        this.onLogout = new Subject();
        this.onThemeChange = new Subject();
        this.onTenantChange = new Subject();
        this.onTokenChange = new Subject();
    }

    login(username: string, password: string): void {
        
    }

    setToken(token: any): void {
        if (token != null) {
            localStorage.setItem('auth_token', JSON.stringify(token));
        }
    }

    getToken(): any {
        //return JSON.parse(localStorage.getItem('auth_token') || '');
    }

    removeToken(): void {
        localStorage.removeItem('auth_token');
    }

    getJwtToken(): string {
        const token = this.getToken();

        return token != null ? token.idToken.jwtToken : '';
    }

    getUserName(): string {
        const token = this.getToken();

        return token != null ? token.idToken.payload.given_name : '';
    }

    getUserEmail(): string {
        const token = this.getToken();

        return token != null ? token.idToken.payload.email : '';
    }

    logout(): boolean {
        this.removeToken();
        return true;
    }

    isAdministrator(): boolean {
        const token = this.getToken();

        return true;
    }

    getUserId(): string {
        const token = this.getToken();

        if (token) {
            return token.idToken.payload.sub;
        }

        return '';
    }

    get UserId(): any {
        return localStorage.getItem('UserId');
    }

    set UserId(val: any) {
        localStorage.setItem('UserId', val);
    }

    get EmailAddress(): any {
        return localStorage.getItem('EmailAddress');
    }

    set EmailAddress(val: any) {
        localStorage.setItem('EmailAddress', val);
    }

    get UserName(): any {
        return localStorage.getItem('UserName');
    }

    set UserName(val: any) {
        localStorage.setItem('UserName', val);
    }
}
