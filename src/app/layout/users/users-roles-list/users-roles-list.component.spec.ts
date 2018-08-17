import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRolesListComponent } from './users-roles-list.component';

describe('UsersRolesListComponent', () => {
  let component: UsersRolesListComponent;
  let fixture: ComponentFixture<UsersRolesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRolesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRolesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
