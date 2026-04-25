import { TestBed } from '@angular/core/testing';

import { Arbol } from './arbol';

describe('Arbol', () => {
  let service: Arbol;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arbol);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
