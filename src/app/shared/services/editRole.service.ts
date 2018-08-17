import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import {GridDataResult} from "@progress/kendo-angular-grid";
import {Subject} from "rxjs/Rx";


const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

const HTTP_OPTION = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('access_token')
    })
};




@Injectable()
export class Edit1Service extends BehaviorSubject<GridDataResult> {


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

    private DataResult:GridDataResult;

    DataResult = {
        data: [],
        total: 0
    };


    public read() {
        if (this.DataResult.data.length) {
            return super.next(this.DataResult.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.DataResult.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch(action, data)
            .subscribe(() => this.read(), () => this.read());
    }



    public remove(data: any) {
        this.reset();

        this.fetch(REMOVE_ACTION, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.DataResult.data.find(item => item.id === dataItem.id);

        // revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.DataResult.data);
    }

    private reset() {
        this.DataResult.data = [];
    }



    private fetch(action: string = '', data?: any): Observable<GridDataResult> {

        switch (action) {

            case "create": {

                return this.http
                    .post(`http://localhost/Spark_Workspace/new-project/public/index.php/roles`,this.serializeModels1(data),HTTP_OPTION)
                    .pipe(
                        map(response => response),
                        map(response => (<GridDataResult>{
                                data: response['Role'],
                                total: response['Count']
                            })
                        )
                    );
            }
            case "update": {
                return this.http
                    .put(`http://localhost/Spark_Workspace/new-project/public/index.php/roles?${this.serializeModels(data)}`,this.serializeModels1(data),HTTP_OPTION)
                    .pipe(
                        map(response => response),
                        map(response => (<GridDataResult>{
                                data: response['Role'],
                                total: response['Count']
                            })
                        )
                    );
            }
            case "destroy": {
                return this.http
                    .delete(`http://localhost/Spark_Workspace/new-project/public/index.php/roles?${this.serializeModels(data)}`,HTTP_OPTION)
                    .pipe(
                        map(response => response),
                        map(response => (<GridDataResult>{
                                data: response['Role'],
                                total: response['Count']
                            })
                        )
                    );
            }
            default: {
                return this.http
                    .post(`http://localhost/Spark_Workspace/new-project/public/index.php/GridStateRole`,this.state,HTTP_OPTION)
                    .pipe(
                        map(response => response),
                        map(response => (<GridDataResult>{
                                data: response['Role'],
                                total: response['Count']
                            })
                        )
                    );
            }
        }

    }

    private serializeModels(data?: any): string {
        var obj = JSON.stringify([data]);
        var stringify = JSON.parse(obj);
        return data ? `id=${stringify[0]['id']}` : '';
    }

    private serializeModels1(data?: any): string {
        var obj = JSON.stringify([data]);
        var res = obj.replace("[", "");
        var res = res.replace("]", "");
        return res;
    }

}
