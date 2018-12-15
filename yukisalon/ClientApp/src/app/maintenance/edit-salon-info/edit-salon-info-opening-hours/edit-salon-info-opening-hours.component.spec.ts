import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonInfoOpeningHoursComponent } from './edit-salon-info-opening-hours.component';

describe('EditSalonInfoOpeningHoursComponent', () => {
  let component: EditSalonInfoOpeningHoursComponent;
  let fixture: ComponentFixture<EditSalonInfoOpeningHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonInfoOpeningHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonInfoOpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
