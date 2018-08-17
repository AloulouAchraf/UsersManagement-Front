import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {map} from "rxjs/operators";
import {IRole} from "../../layout/users/add-users-roles/Role";
import {IClient} from "../../layout/users/add-users-roles/Client";


const HTTP_OPTION = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('access_token')
    })
};


@Injectable()

export class roleService {


  private RolesUrl = 'http://localhost/Spark_Workspace/new-project/public/index.php/roles/modif1';
  private UsersUrl = 'http://localhost/Spark_Workspace/new-project/public/index.php/users/modif';

  constructor(private http:HttpClient) {
  }

  getRoles(user_id):Observable<IRole[]>{
    return this.http.get<IRole[]>(`http://localhost/Spark_Workspace/new-project/public/index.php/roles/modif1?id=${user_id}`,HTTP_OPTION)
      .pipe(
        map(res => res));
  }

    getRoles2(user_id):Observable<IRole[]>{
        return this.http.get<IRole[]>(`http://localhost/Spark_Workspace/new-project/public/index.php/roles/modif2?id=${user_id}`,HTTP_OPTION)
            .pipe(
                map(res => res));
    }

  getUsers():Observable<IClient[]>{
    return this.http.get<IClient[]>(this.UsersUrl)
      .pipe(
        map(res => res));
  }



}
