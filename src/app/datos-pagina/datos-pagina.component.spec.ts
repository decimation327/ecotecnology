import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPaginaComponent } from './datos-pagina.component';

describe('DatosPaginaComponent', () => {
  let component: DatosPaginaComponent;
  let fixture: ComponentFixture<DatosPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatosPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
