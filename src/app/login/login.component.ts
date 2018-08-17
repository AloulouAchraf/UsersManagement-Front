import {Component, OnInit, ViewChild} from '@angular/core';
import { routerTransition } from '../router.animations';
import {NgForm} from "@angular/forms";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";

import { Router } from '@angular/router';
import {AuthenticationService} from "../shared/services/authentication.service";


const HTTP_OPTION = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    @ViewChild('f') name:NgForm;


    constructor(private service: AuthenticationService, private router: Router) {}

    ngOnInit() {
        localStorage.setItem('access_token',null);
    }


    onSubmit() {
        this.service.authenticate( this.name.value.username,this.name.value.password)
            .subscribe(
                data =>{
                    localStorage.setItem('access_token',data['access_token']);
                    this.router.navigate(['']);
                }
            );
        localStorage.setItem('username',this.name.value.username);
    }




}
