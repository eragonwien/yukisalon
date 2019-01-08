import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonCategoryModalComponent } from './edit-salon-category-modal.component';

describe('EditSalonCategoryModalComponent', () => {
  let component: EditSalonCategoryModalComponent;
  let fixture: ComponentFixture<EditSalonCategoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonCategoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
