import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactOpenHoursComponent } from './contact-open-hours.component';

describe('ContactOpenHoursComponent', () => {
  let component: ContactOpenHoursComponent;
  let fixture: ComponentFixture<ContactOpenHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactOpenHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactOpenHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
