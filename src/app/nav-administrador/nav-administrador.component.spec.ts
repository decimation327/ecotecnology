import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAdministradorComponent } from './nav-administrador.component';

describe('NavAdministradorComponent', () => {
  let component: NavAdministradorComponent;
  let fixture: ComponentFixture<NavAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavAdministradorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
