import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import {User} from "./User";
import { EditService } from '../../../shared/services/edit.service';




@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


    public view: Observable<GridDataResult>;

    public gridState: State = {
        sort: [{dir: 'asc', field: 'username',}],
        skip: 0,
        take: 6,
        filter: {
            logic: 'and',
            filters: []
        }
    };

    public formGroup: FormGroup;
    private editedRowIndex: number;

    constructor(private editService: EditService) {
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

    public addHandler({sender}) {
        this.closeEditor(sender);

        this.formGroup = new FormGroup({
            'username': new FormControl("", Validators.required),
            'email': new FormControl("", Validators.required),
            'password': new FormControl("")
        });

        sender.addRow(this.formGroup);
    }

    public editHandler({sender, rowIndex, dataItem}) {
        this.closeEditor(sender);

        this.formGroup = new FormGroup({
            'id': new FormControl(dataItem.id),
            'username': new FormControl(dataItem.username),
            'email': new FormControl(dataItem.email, Validators.required),
            'password': new FormControl(dataItem.password)
        });

        this.editedRowIndex = rowIndex;

        sender.editRow(rowIndex, this.formGroup);
    }

    public cancelHandler({sender, rowIndex}) {
        this.closeEditor(sender, rowIndex);
    }

    public saveHandler({sender, rowIndex, formGroup, isNew}) {
        const user: User = formGroup.value;

        this.editService.save(user, isNew);

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

}
