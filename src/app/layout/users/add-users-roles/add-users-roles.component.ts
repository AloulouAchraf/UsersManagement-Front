import { Component, OnInit , ViewChild} from '@angular/core';
import {roleService} from "../../../shared/services/role.service";
import {IRole} from "./Role";
import {IClient} from "./Client";
import {NgForm} from "@angular/forms";
import {HttpHeaders,HttpClient} from "@angular/common/http";


const HTTP_OPTION = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};




@Component({
  selector: 'app-add-users-roles',
  templateUrl: './add-users-roles.component.html',
  styleUrls: ['./add-users-roles.component.css']
})


export class AddUsersRolesComponent implements OnInit {

  @ViewChild ('f') name:NgForm;

  selectedItems = [];
  selectedItemsUser = [];
  dropdown_S_Settings = {};
  dropdown_M_Settings = {};

  public disable: boolean = true;
  public disableBtn:boolean = true;


  public dataRoles:IRole[];
  public dataUsers:IClient[];



    @ViewChild ('f1') name1:NgForm;

    selectedItems1 = [];
    selectedItemsUser1 = [];


    public disable1: boolean = true;
    public disableBtn1:boolean = true;


    public dataRoles1:IRole[];
    public dataUsers1:IClient[];

  constructor(private service: roleService,private http: HttpClient) {
  }

  ngOnInit(): void {

      if (typeof (this.name.value.username) == "undefined")
      {
          this.disable=true;
      }

      if (typeof (this.name1.value.username1) == "undefined")
      {
          this.disable1=true;
      }

    this.service.getUsers()
      .subscribe(res => {
        this.dataUsers = res;
      });

  this.service.getUsers()
      .subscribe(res => {
          this.dataUsers1 = res;
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
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };



}
    onSelectUserId (item:any) {
        this.service.getRoles(item.id)
            .subscribe(res => {
                this.dataRoles = res;
            });

        this.disable=false;
    }

    onDeSelect(item:any){
        this.disable=true;
        this.disableBtn=true;
        this.selectedItems=[];
    }

    onSelectRolesId (item:any) {
        this.disableBtn=false;
    }

    onDeSelectRole(item:any){
        if(this.selectedItems.length==0){
            this.disableBtn=true;
        }
    }




    onSelectUserId1 (item:any) {
        this.service.getRoles2(item.id)
            .subscribe(res => {
                this.dataRoles1 = res;
            });

        this.disable1=false;
    }

    onDeSelect1(item:any){
        this.disable1=true;
        this.disableBtn1=true;
        this.selectedItems1=[];
    }

    onSelectRolesId1 (item:any) {
        this.disableBtn1=false;
    }

    onDeSelectRole1(item:any){
        if(this.selectedItems1.length==0){
            this.disableBtn1=true;
        }
    }



  UserRole={
    username:"",
    role:""
  };



  onSubmit() {
    for(var i = 0;i<this.name.value.roles.length;i++) {
      this.http
        .post(`http://localhost/Spark_Workspace/new-project/public/index.php/UserRoles`,
          JSON.stringify({"user":""+this.name.value.username[0].id, "role": ""+this.name.value.roles[i].item_id}),
          HTTP_OPTION)
        .subscribe();
    }
      this.disable=true;
      this.disableBtn=true;
      this.selectedItems=[];
      this.selectedItemsUser=[];
  }

    onSubmit1() {
        for(var i = 0;i<this.name1.value.roles1.length;i++) {
            this.http
                .post(`http://localhost/Spark_Workspace/new-project/public/index.php/UserRoles2`,
                    JSON.stringify({user:""+this.name1.value.username1[0].id, role: ""+this.name1.value.roles1[i].item_id}),
                    HTTP_OPTION)
                .subscribe();
        }
        this.disable1=true;
        this.disableBtn1=true;
        this.selectedItems1=[];
        this.selectedItemsUser1=[];
    }
}








