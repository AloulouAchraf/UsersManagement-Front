import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import {Role} from "./Role";
import {Permission} from "./Permission";

import { Edit1Service } from '../../../shared/services/editRole.service';
import {Edit2Service} from '../../../shared/services/editPermission.service';



@Component({
  selector: 'app-roles-permissions-list',
  templateUrl: './roles-permissions-list.component.html',
  styleUrls: ['./roles-permissions-list.component.scss']
})

export class RolesPermissionsListComponent implements OnInit {


    public view: Observable<GridDataResult>;
    public view1: Observable<GridDataResult>;

    public gridState: State = {
        sort: [{dir: 'asc', field: 'name'}],
        skip: 0,
        take: 3,
        filter: {
            logic: 'and',
            filters: []
        }
    };

    public gridState1: State = {
        sort: [{dir: 'asc', field: 'name'}],
        skip: 0,
        take: 3,
        filter: {
            logic: 'and',
            filters: []
        }
    };

    public formGroup: FormGroup;
    private editedRowIndex: number;

    public formGroup1: FormGroup;
    private editedRowIndex1: number;

    constructor(private editService: Edit1Service, private editService1: Edit2Service) {
        this.editService.myMethod(this.gridState);
        this.editService1.myMethod(this.gridState1);
    }

    public ngOnInit(): void {
        this.view = this.editService;
        this.editService.read();
        this.view1 = this.editService1;
        this.editService1.read();
    }

    public onStateChange(state: State) {
        this.gridState = state;
        this.editService.myMethod(this.gridState);
        this.editService.read();
    }

    public onStateChange1(state: State){
        this.gridState1 = state;
        this.editService1.myMethod(this.gridState1);
        this.editService1.read();
    }

    public addHandler({sender}) {
        this.closeEditor(sender);

        this.formGroup = new FormGroup({
            'name': new FormControl("", Validators.required)
        });

        sender.addRow(this.formGroup);
    }

    public editHandler({sender, rowIndex, dataItem}) {
        this.closeEditor(sender);

        this.formGroup = new FormGroup({
            'id': new FormControl(dataItem.id),
            'name': new FormControl(dataItem.name)
        });

        this.editedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({sender, rowIndex, formGroup, isNew}) {
        const role: Role = formGroup.value;

        this.editService.save(role, isNew);

        sender.closeRow(rowIndex);
    }

    public removeHandler({dataItem}) {
        this.editService.remove(dataItem);
    }

    private closeEditor(grid, rowIndex = this.editedRowIndex) {
        grid.closeRow(rowIndex);
        this.editedRowIndex = undefined;
        this.formGroup = undefined;
    }





    public addHandler1({sender}) {
        this.closeEditor1(sender);

        this.formGroup1 = new FormGroup({
            'name': new FormControl("", Validators.required)
        });

        sender.addRow(this.formGroup1);
    }

    public editHandler1({sender, rowIndex, dataItem}) {
        this.closeEditor1(sender);

        this.formGroup1 = new FormGroup({
            'id': new FormControl(dataItem.id),
            'name': new FormControl(dataItem.name)
        });

        this.editedRowIndex1 = rowIndex;

        sender.editRow(rowIndex, this.formGroup1);
    }

    public cancelHandler1({sender, rowIndex}) {
        this.closeEditor1(sender, rowIndex);
    }

    public saveHandler1({sender, rowIndex, formGroup, isNew}) {
        const permission: Permission = formGroup.value;

        this.editService1.save(permission, isNew);

        sender.closeRow(rowIndex);
    }

    public removeHandler1({dataItem}) {
        this.editService1.remove(dataItem);
    }

    private closeEditor1(grid, rowIndex = this.editedRowIndex1) {
        grid.closeRow(rowIndex);
        this.editedRowIndex1 = undefined;
        this.formGroup1 = undefined;
    }
}


