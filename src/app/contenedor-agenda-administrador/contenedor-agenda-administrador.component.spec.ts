import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAgendaAdministradorComponent } from './contenedor-agenda-administrador.component';

describe('ContenedorAgendaAdministradorComponent', () => {
  let component: ContenedorAgendaAdministradorComponent;
  let fixture: ComponentFixture<ContenedorAgendaAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorAgendaAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorAgendaAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
