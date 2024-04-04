import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAdministradorSpAdComponent } from './eliminar-administrador-sp-ad.component';

describe('EliminarAdministradorSpAdComponent', () => {
  let component: EliminarAdministradorSpAdComponent;
  let fixture: ComponentFixture<EliminarAdministradorSpAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAdministradorSpAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarAdministradorSpAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
