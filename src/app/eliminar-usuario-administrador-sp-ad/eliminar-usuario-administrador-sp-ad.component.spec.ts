import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarUsuarioAdministradorSpAdComponent } from './eliminar-usuario-administrador-sp-ad.component';

describe('EliminarUsuarioAdministradorSpAdComponent', () => {
  let component: EliminarUsuarioAdministradorSpAdComponent;
  let fixture: ComponentFixture<EliminarUsuarioAdministradorSpAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarUsuarioAdministradorSpAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarUsuarioAdministradorSpAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
