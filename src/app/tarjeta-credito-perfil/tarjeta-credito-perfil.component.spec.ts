import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCreditoPerfilComponent } from './tarjeta-credito-perfil.component';

describe('TarjetaCreditoPerfilComponent', () => {
  let component: TarjetaCreditoPerfilComponent;
  let fixture: ComponentFixture<TarjetaCreditoPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TarjetaCreditoPerfilComponent]
    });
    fixture = TestBed.createComponent(TarjetaCreditoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
