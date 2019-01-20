import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonUserModalComponent } from './edit-salon-user-modal.component';

describe('EditSalonUserModalComponent', () => {
  let component: EditSalonUserModalComponent;
  let fixture: ComponentFixture<EditSalonUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
