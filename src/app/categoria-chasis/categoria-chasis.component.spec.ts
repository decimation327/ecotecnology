import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaChasisComponent } from './categoria-chasis.component';

describe('CategoriaChasisComponent', () => {
  let component: CategoriaChasisComponent;
  let fixture: ComponentFixture<CategoriaChasisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaChasisComponent]
    });
    fixture = TestBed.createComponent(CategoriaChasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
