import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalModalComponent } from './vertical-modal.component';

describe('VerticalModalComponent', () => {
  let component: VerticalModalComponent;
  let fixture: ComponentFixture<VerticalModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalModalComponent]
    });
    fixture = TestBed.createComponent(VerticalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
