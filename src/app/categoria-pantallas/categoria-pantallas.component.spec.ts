import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaPantallasComponent } from './categoria-pantallas.component';

describe('CategoriaPantallasComponent', () => {
  let component: CategoriaPantallasComponent;
  let fixture: ComponentFixture<CategoriaPantallasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaPantallasComponent]
    });
    fixture = TestBed.createComponent(CategoriaPantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
