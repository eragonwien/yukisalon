import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonUserComponent } from './edit-salon-user.component';

describe('EditSalonUserComponent', () => {
  let component: EditSalonUserComponent;
  let fixture: ComponentFixture<EditSalonUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
