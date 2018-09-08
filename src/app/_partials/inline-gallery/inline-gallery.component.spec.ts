import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineGalleryComponent } from './inline-gallery.component';

describe('InlineGalleryComponent', () => {
  let component: InlineGalleryComponent;
  let fixture: ComponentFixture<InlineGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
