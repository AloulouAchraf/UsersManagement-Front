import { Component, OnInit , ViewChild} from '@angular/core';



import {IRole} from "../add-users-roles/Role";
import {NgForm} from "@angular/forms";
import {HttpHeaders,HttpClient} from "@angular/common/http";
import {permissionService} from "../../../shared/services/permission.service";



const HTTP_OPTION = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json'
    })
};


@Component({
  selector: 'app-add-roles-permissions',
  templateUrl: './add-roles-permissions.component.html',
  styleUrls: ['./add-roles-permissions.component.scss']
})
export class AddRolesPermissionsComponent implements OnInit {


    @ViewChild ('f') name:NgForm;

    selectedItems = [];
    selectedItemsRole = [];
    dropdown_S_Settings = {};
    dropdown_M_Settings = {};

    public disable: boolean = true;
    public disableBtn:boolean = true;


    public dataRoles:IRole[];
    public dataPermissions:IRole[];






    @ViewChild ('f1') name1:NgForm;

    selectedItems1 = [];
    selectedItemsRole1 = [];


    public disable1: boolean = true;
    public disableBtn1:boolean = true;


    public dataRoles1:IRole[];
    public dataPermissions1:IRole[];



    constructor(private service: permissionService,private http: HttpClient) {
    }

    ngOnInit(): void {

        if (typeof (this.name.value.role) == "undefined")
        {
            this.disable=true;
        }

        if (typeof (this.name1.value.role1) == "undefined")
        {
            this.disable1=true;
        }


        this.service.getRoles()
            .subscribe(res => {
                this.dataRoles = res;
            });


        this.service.getRoles()
            .subscribe(res => {
                this.dataRoles1 = res;
            });


        this.dropdown_M_Settings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 5,
            allowSearchFilter: true,
            maxHeight: 150
        };

        this.dropdown_S_Settings = {
            singleSelection: true,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };



    }
    onSelectRoleId (item:any) {
        this.service.getPermissions(item.item_id)
            .subscribe(res => {
                this.dataPermissions = res;
            });

        this.disable=false;
    }

    onDeSelect(item:any){
        this.disable=true;
        this.disableBtn=true;
        this.selectedItems=[];
    }

    onSelectPermissionsId (item:any) {
        this.disableBtn=false;
    }

    onDeSelectPermission(item:any){
        if(this.selectedItems.length==0){
            this.disableBtn=true;
        }
    }








    onSelectRoleId1 (item:any) {
        this.service.getPermissions2(item.item_id)
            .subscribe(res => {
                this.dataPermissions1 = res;
            });

        this.disable1=false;
    }

    onDeSelect1(item:any){
        this.disable1=true;
        this.disableBtn1=true;
        this.selectedItems1=[];
    }

    onSelectPermissionsId1 (item:any) {
        this.disableBtn1=false;
    }

    onDeSelectPermission1(item:any){
        if(this.selectedItems1.length==0){
            this.disableBtn1=true;
        }
    }




    onSubmit() {
        for(var i = 0;i<this.name.value.permissions.length;i++) {
            this.http
                .post(`http://localhost/Spark_Workspace/new-project/public/index.php/RolePermissions`,
                    JSON.stringify({"role":""+this.name.value.role[0].item_id, "permission": ""+this.name.value.permissions[i].item_id}),
                    HTTP_OPTION)
                .subscribe();
        }
        this.disable=true;
        this.disableBtn=true;
        this.selectedItems=[];
        this.selectedItemsRole=[];
    }


    onSubmit1() {
        for(var i = 0;i<this.name1.value.permissions1.length;i++) {
            this.http
                .post(`http://localhost/Spark_Workspace/new-project/public/index.php/RolePermissions2`,
                    JSON.stringify({role:""+this.name1.value.role1[0].item_id, permission: ""+this.name1.value.permissions1[i].item_id}),
                    HTTP_OPTION)
                .subscribe();
        }
        this.disable1=true;
        this.disableBtn1=true;
        this.selectedItems1=[];
        this.selectedItemsRole1=[];
    }


}








