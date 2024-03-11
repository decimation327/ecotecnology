import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorDetalleProductoComponent } from './contenedor-detalle-producto.component';

describe('ContenedorDetalleProductoComponent', () => {
  let component: ContenedorDetalleProductoComponent;
  let fixture: ComponentFixture<ContenedorDetalleProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorDetalleProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorDetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
