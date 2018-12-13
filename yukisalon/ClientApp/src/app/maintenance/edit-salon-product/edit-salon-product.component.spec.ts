import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonProductComponent } from './edit-salon-product.component';

describe('EditSalonProductComponent', () => {
  let component: EditSalonProductComponent;
  let fixture: ComponentFixture<EditSalonProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
