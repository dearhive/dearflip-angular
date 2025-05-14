import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DearflipViewerComponent } from './dearflip-viewer.component';

describe('DearflipViewerComponent', () => {
  let component: DearflipViewerComponent;
  let fixture: ComponentFixture<DearflipViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DearflipViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DearflipViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
