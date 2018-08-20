import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import {Edit3Service} from "../../../shared/services/editUsersRoles.service";


@Component({
  selector: 'app-users-roles-list',
  templateUrl: './users-roles-list.component.html',
  styleUrls: ['./users-roles-list.component.scss']
})
export class UsersRolesListComponent implements OnInit {



    public view: Observable<GridDataResult>;

    public gridState: State = {
        sort: [{dir: 'asc', field: 'username'}],
        skip: 0,
        take: 3,
        filter: {
            logic: 'and',
            filters: [
                { field: 'username', operator: 'contains', value: '' },
            ]
        }
    };



    constructor(private editService: Edit3Service) {
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













