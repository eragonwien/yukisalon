import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonInfoContactComponent } from './edit-salon-info-contact.component';

describe('EditSalonInfoContactComponent', () => {
  let component: EditSalonInfoContactComponent;
  let fixture: ComponentFixture<EditSalonInfoContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonInfoContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonInfoContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
