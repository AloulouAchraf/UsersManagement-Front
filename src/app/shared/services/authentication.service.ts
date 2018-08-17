import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from "rxjs/operators";


const HTTP_OPTION = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

@Injectable()

export class AuthenticationService {


    constructor(private http:HttpClient) {}


    authenticate(username: any,password:any) {

        return this.http
            .post(`http://localhost/Spark_Workspace/new-project/public/index.php/oauth/v2/token`,
                JSON.stringify(
                    {
                        "grant_type": "password",
                        "client_id": "7_67y91wy2ho4cocsw8c0os0sksksswsgkg80kgcw4s0ccswo4kk",
                        "client_secret": "3qmd0qm8hv6s080kc0kokcsscs8ogc4wowwg4s8c484w0swk0o",
                        "username": "" + username,
                        "password": "" + password
                    }
                ),
                HTTP_OPTION)
            .pipe(
                map(response =>response)
            );
    }




}
