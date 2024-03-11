import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPrincipalAdministradorComponent } from './pagina-principal-administrador.component';

describe('PaginaPrincipalAdministradorComponent', () => {
  let component: PaginaPrincipalAdministradorComponent;
  let fixture: ComponentFixture<PaginaPrincipalAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPrincipalAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaPrincipalAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
