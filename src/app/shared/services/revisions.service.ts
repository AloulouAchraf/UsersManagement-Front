import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import {Subject} from "rxjs/Rx";
import {GridDataResult} from "@progress/kendo-angular-grid";

const HTTP_OPTION = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};

@Injectable()
export class RevisionsService extends BehaviorSubject<GridDataResult> {

    myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();


    constructor(private http: HttpClient) {
        super(null);
        this.myMethod$ = this.myMethodSubject.asObservable();
    }

    private state:any;

    myMethod(data) {
        this.state=data;
        this.myMethodSubject.next(data);
    }

    private DataResult:GridDataResult = {
        data:[],
        total:0
    };



    public read() {
        if (this.DataResult.data.length) {
            return super.next(this.DataResult);

        }

        this.fetch()
            .subscribe(data => {
                super.next(data);
            });
    }

    private fetch(action: string = '', data?: any): Observable<GridDataResult> {
        return this.http
            .post(`http://localhost/Spark_Workspace/new-project/public/index.php/Histo`,this.state,HTTP_OPTION)
            .pipe(
                map(response => response),
                map(response => (<GridDataResult>{
                        data: response['Histo'],
                        total: response['Count']
                    })
                )
            );
    }



}
