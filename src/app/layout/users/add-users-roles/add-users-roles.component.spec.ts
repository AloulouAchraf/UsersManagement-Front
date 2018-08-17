import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersRolesComponent } from './add-users-roles.component';

describe('AddUsersRolesComponent', () => {
  let component: AddUsersRolesComponent;
  let fixture: ComponentFixture<AddUsersRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUsersRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUsersRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
