import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RevisionsComponent} from "./revisions.component";

const routes: Routes = [
    {
        path: '', component: RevisionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RevisionsRoutingModule {
}
