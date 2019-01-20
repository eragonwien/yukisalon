import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonInfoGeneralComponent } from './edit-salon-info-general.component';

describe('EditSalonInfoGeneralComponent', () => {
  let component: EditSalonInfoGeneralComponent;
  let fixture: ComponentFixture<EditSalonInfoGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonInfoGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonInfoGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
