import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentityService } from 'src/app/core/services/identity.service';

@Component({
    selector: 'error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ErrorComponent implements OnInit {
    errorCode: string;
    errorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private identity: IdentityService
    ) {
        this.errorCode = '';
        this.errorMessage = '';
    }

    ngOnInit(): void {
        this.errorCode = this.route.snapshot.paramMap.get('code') || '';

        switch (this.errorCode) {
            case '404':
                this.errorMessage = 'Sorry but we could not find the page you are looking for';
                break;

            case '500':
                this.errorMessage = 'Internal Server Error: Looks like we have an internal issue, please try again in couple minutes';
                break;

            case '502':
                this.errorMessage = 'Bad Gateway: ';
                break;

            case '401':
                this.errorMessage = 'You do not have a permission to acces this page.';
                break;

            default:
                this.errorMessage = 'You do not have a permission to acces this application.';
        }
    }

    logout(): void {
        this.identity.logout();
        this.router.navigate(['/login']);
    }
}

