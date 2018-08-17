import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {RevisionsRoutingModule} from "./revisions-routing.module";
import {RevisionsComponent} from "./revisions.component";
import { PageHeaderModule } from './../../shared';
import {GridModule} from "@progress/kendo-angular-grid";

@NgModule({
    imports: [CommonModule, RevisionsRoutingModule, PageHeaderModule, GridModule,],
    declarations: [RevisionsComponent]
})
export class RevisionsModule {}
