import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonInfoComponent } from './edit-salon-info.component';

describe('EditSalonInfoComponent', () => {
  let component: EditSalonInfoComponent;
  let fixture: ComponentFixture<EditSalonInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
