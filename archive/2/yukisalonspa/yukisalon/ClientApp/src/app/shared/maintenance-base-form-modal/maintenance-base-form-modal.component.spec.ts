import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceBaseFormModalComponent } from './maintenance-base-form-modal.component';

describe('MaintenanceBaseFormModalComponent', () => {
  let component: MaintenanceBaseFormModalComponent;
  let fixture: ComponentFixture<MaintenanceBaseFormModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceBaseFormModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceBaseFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
