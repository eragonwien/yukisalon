import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategorySectionComponent } from './sub-category-section.component';

describe('SubCategorySectionComponent', () => {
  let component: SubCategorySectionComponent;
  let fixture: ComponentFixture<SubCategorySectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCategorySectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCategorySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
