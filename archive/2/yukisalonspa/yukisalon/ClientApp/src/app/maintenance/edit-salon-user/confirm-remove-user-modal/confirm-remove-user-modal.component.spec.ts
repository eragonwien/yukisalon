import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRemoveUserModalComponent } from './confirm-remove-user-modal.component';

describe('ConfirmRemoveUserModalComponent', () => {
  let component: ConfirmRemoveUserModalComponent;
  let fixture: ComponentFixture<ConfirmRemoveUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRemoveUserModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRemoveUserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
