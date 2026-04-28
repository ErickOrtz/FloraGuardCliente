import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleArbolPage } from './detalle-arbol.page';

describe('DetalleArbolPage', () => {
  let component: DetalleArbolPage;
  let fixture: ComponentFixture<DetalleArbolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleArbolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
