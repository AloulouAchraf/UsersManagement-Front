


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import {Edit4Service} from "../../../shared/services/editRolesPermissions.service";


@Component({
  selector: 'app-roles-permissions',
  templateUrl: './roles-permissions.component.html',
  styleUrls: ['./roles-permissions.component.scss']
})
export class RolesPermissionsComponent implements OnInit {



    public view: Observable<GridDataResult>;

    public gridState: State = {
        sort: [{dir: 'asc', field: 'name'}],
        skip: 0,
        take: 3,
        filter: {
            logic: 'and',
            filters: [
                { field: 'name', operator: 'contains', value: '' },
            ]
        }
    };



    constructor(private editService: Edit4Service) {
        this.editService.myMethod(this.gridState);
    }

    public ngOnInit(): void {
        this.view = this.editService ;
        this.editService.read();
    }

    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.myMethod(this.gridState);
        this.editService.read();
    }

}













