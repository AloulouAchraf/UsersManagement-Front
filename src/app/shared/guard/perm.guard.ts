import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable()
export class PermGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate() {

        let permission:boolean = false;

        let item = JSON.parse(localStorage.getItem('permissions'));

        for (let i = 0; i < item.length; i++) {
            if (item[i]['name'] == "Edit-Permission") {
               permission=true;
            }
        }

        if (permission==true) {
            return true;
        }
        else{
            this.router.navigate(['/access-denied']);
            return false;
        }

    }
}
