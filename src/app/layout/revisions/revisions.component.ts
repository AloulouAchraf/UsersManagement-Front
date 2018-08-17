import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import {RevisionsService} from "../../shared/services/revisions.service";
import {routerTransition} from "../../router.animations";


@Component({
  selector: 'app-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.scss'],
    animations: [routerTransition()]
})

export class RevisionsComponent implements OnInit {


    public view: Observable<GridDataResult>;

    public gridState: State = {
        sort: [{dir: 'asc', field: 'timestamp',}],
        skip: 0,
        take: 5,
        filter: {
            logic: 'and',
            filters: [
            ]
        }
    };


    constructor(private editService: RevisionsService) {
        this.editService.myMethod(this.gridState);
    }

    public ngOnInit(): void {
        this.view = this.editService;
        this.editService.read();
    }

    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.myMethod(this.gridState);
        this.editService.read();
    }

}

