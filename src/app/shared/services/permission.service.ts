import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {map} from "rxjs/operators";
import {IRole} from "../../layout/users/add-users-roles/Role";


const HTTP_OPTION = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('access_token')
    })
};

@Injectable()

export class permissionService {


    private RolesUrl = 'http://localhost/Spark_Workspace/new-project/public/index.php/roles/modif';


    constructor(private http:HttpClient) {
    }

    getPermissions(role_id):Observable<IRole[]>{
        return this.http.get<IRole[]>(`http://localhost/Spark_Workspace/new-project/public/index.php/permissions/modif?id=${role_id}`,HTTP_OPTION)
            .pipe(
                map(res => res));
    }

    getPermissions2(role_id):Observable<IRole[]>{
        return this.http.get<IRole[]>(`http://localhost/Spark_Workspace/new-project/public/index.php/permission/modif2?id=${role_id}`,HTTP_OPTION)
            .pipe(
                map(res => res));
    }

    getRoles():Observable<IRole[]>{
        return this.http.get<IRole[]>(this.RolesUrl,HTTP_OPTION)
            .pipe(
                map(res => res));
    }



}
