import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalonInfoWelcomeTextComponent } from './edit-salon-info-welcome-text.component';

describe('EditSalonInfoWelcomeTextComponent', () => {
  let component: EditSalonInfoWelcomeTextComponent;
  let fixture: ComponentFixture<EditSalonInfoWelcomeTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSalonInfoWelcomeTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSalonInfoWelcomeTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
