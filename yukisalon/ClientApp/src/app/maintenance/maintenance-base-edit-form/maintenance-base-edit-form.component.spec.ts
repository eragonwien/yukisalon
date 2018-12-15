import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceBaseEditFormComponent } from './maintenance-base-edit-form.component';

describe('MaintenanceBaseEditFormComponent', () => {
  let component: MaintenanceBaseEditFormComponent;
  let fixture: ComponentFixture<MaintenanceBaseEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceBaseEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceBaseEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
