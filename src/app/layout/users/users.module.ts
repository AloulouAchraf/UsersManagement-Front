import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';

import {UsersComponent} from './users.component';
import { PageHeaderModule } from './../../shared';
import { GridModule } from '@progress/kendo-angular-grid';
import { UsersListComponent } from './users-list/users-list.component';
import {EditService} from "../../shared/services/edit.service";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {roleService} from "../../shared/services/role.service";
import {AddUsersRolesComponent} from "./add-users-roles/add-users-roles.component";
import {FormsModule} from "@angular/forms";
import { RolesPermissionsListComponent } from './roles-permissions-list/roles-permissions-list.component';
import {Edit1Service} from "../../shared/services/editRole.service";
import {Edit2Service} from "../../shared/services/editPermission.service";
import { UsersRolesListComponent } from './users-roles-list/users-roles-list.component';
import {Edit3Service} from "../../shared/services/editUsersRoles.service";
import { AddRolesPermissionsComponent } from './add-roles-permissions/add-roles-permissions.component';
import {permissionService} from "../../shared/services/permission.service";
import { RolesPermissionsComponent } from './roles-permissions/roles-permissions.component';
import {Edit4Service} from "../../shared/services/editRolesPermissions.service";




@NgModule({
    declarations: [UsersComponent, UsersListComponent, AddUsersRolesComponent, RolesPermissionsListComponent, UsersRolesListComponent, AddRolesPermissionsComponent, RolesPermissionsComponent],

    providers: [
        EditService,
        roleService,
        Edit1Service,
        Edit2Service,
        Edit3Service,
        permissionService,
        Edit4Service
    ],
    imports: [
        NgMultiSelectDropDownModule.forRoot(),
        CommonModule,
        UsersRoutingModule,
        PageHeaderModule,
        GridModule,
        FormsModule
    ]



})
export class UsersModule {}
