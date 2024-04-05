import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSillasComponent } from './categoria-sillas.component';

describe('CategoriaSillasComponent', () => {
  let component: CategoriaSillasComponent;
  let fixture: ComponentFixture<CategoriaSillasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaSillasComponent]
    });
    fixture = TestBed.createComponent(CategoriaSillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
