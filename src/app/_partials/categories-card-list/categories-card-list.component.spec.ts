import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesCardListComponent } from './categories-card-list.component';

describe('CategoriesCardListComponent', () => {
  let component: CategoriesCardListComponent;
  let fixture: ComponentFixture<CategoriesCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
