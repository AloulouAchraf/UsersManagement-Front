import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import {UsersListComponent} from "./users-list/users-list.component";
import {AddUsersRolesComponent} from "./add-users-roles/add-users-roles.component";
import {RolesPermissionsListComponent} from "./roles-permissions-list/roles-permissions-list.component";
import {UsersRolesListComponent} from "./users-roles-list/users-roles-list.component";
import {AddRolesPermissionsComponent} from "./add-roles-permissions/add-roles-permissions.component";
import {RolesPermissionsComponent} from "./roles-permissions/roles-permissions.component";
// import {PermissionsListComponent} from "./permissions-list/permissions-list.component";



const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            { path: '', redirectTo: 'UserList', pathMatch: 'prefix' },
            { path: 'UserList', component:UsersListComponent },
            { path: 'AddUserRole', component:AddUsersRolesComponent },
            { path: 'RolesPermissionsList', component:RolesPermissionsListComponent },
            { path: 'UsersRolesList', component:UsersRolesListComponent },
            { path: 'AddRolesPermissions', component:AddRolesPermissionsComponent},
            { path: 'RolesPermissions', component:RolesPermissionsComponent}
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {
}
