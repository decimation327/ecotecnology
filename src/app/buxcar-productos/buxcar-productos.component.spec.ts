import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuxcarProductosComponent } from './buxcar-productos.component';

describe('BuxcarProductosComponent', () => {
  let component: BuxcarProductosComponent;
  let fixture: ComponentFixture<BuxcarProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuxcarProductosComponent]
    });
    fixture = TestBed.createComponent(BuxcarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
