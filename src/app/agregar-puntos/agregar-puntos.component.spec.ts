import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPuntosComponent } from './agregar-puntos.component';

describe('AgregarPuntosComponent', () => {
  let component: AgregarPuntosComponent;
  let fixture: ComponentFixture<AgregarPuntosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarPuntosComponent]
    });
    fixture = TestBed.createComponent(AgregarPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
