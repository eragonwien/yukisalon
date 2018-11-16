import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenanceIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: MaintenanceIndexComponent;
  let fixture: ComponentFixture<MaintenanceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintenanceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
