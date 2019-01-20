import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MaintenanceBaseFormComponent } from "./maintenance-base-form.component";

describe("MaintenanceBaseEditFormComponent", () => {
  let component: MaintenanceBaseFormComponent;
  let fixture: ComponentFixture<MaintenanceBaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenanceBaseFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintenanceBaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
