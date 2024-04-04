import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorAgendaUsuarioComponent } from './contenedor-agenda-usuario.component';

describe('ContenedorAgendaUsuarioComponent', () => {
  let component: ContenedorAgendaUsuarioComponent;
  let fixture: ComponentFixture<ContenedorAgendaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorAgendaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenedorAgendaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
