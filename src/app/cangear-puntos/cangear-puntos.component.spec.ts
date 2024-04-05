import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CangearPuntosComponent } from './cangear-puntos.component';

describe('CangearPuntosComponent', () => {
  let component: CangearPuntosComponent;
  let fixture: ComponentFixture<CangearPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CangearPuntosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CangearPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
