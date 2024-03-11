import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenidoPaginaPrincipalComponent } from './contenido-pagina-principal.component';

describe('ContenidoPaginaPrincipalComponent', () => {
  let component: ContenidoPaginaPrincipalComponent;
  let fixture: ComponentFixture<ContenidoPaginaPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenidoPaginaPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContenidoPaginaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
