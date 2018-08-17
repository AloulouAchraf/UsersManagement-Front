import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {map} from "rxjs/operators";

import {IPermission} from "../../layout/components/sidebar/permission";


@Injectable()

export class PermissionsService {


    constructor(private http:HttpClient) {
    }


    getPermissions(username):Observable<IPermission[]>{
        return this.http.get<IPermission[]>(`http://localhost/Spark_Workspace/new-project/public/index.php/GetUserPermissions?username=${username}`)
            .pipe(
                map(res => res));
    }



}
