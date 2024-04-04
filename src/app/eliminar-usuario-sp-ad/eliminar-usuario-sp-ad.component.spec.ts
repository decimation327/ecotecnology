import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarUsuarioSpAdComponent } from './eliminar-usuario-sp-ad.component';

describe('EliminarUsuarioSpAdComponent', () => {
  let component: EliminarUsuarioSpAdComponent;
  let fixture: ComponentFixture<EliminarUsuarioSpAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarUsuarioSpAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarUsuarioSpAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
