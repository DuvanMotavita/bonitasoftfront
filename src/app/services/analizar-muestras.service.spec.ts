import { TestBed } from '@angular/core/testing';

import { AnalizarMuestrasService } from './analizar-muestras.service';

describe('AnalizarMuestrasService', () => {
  let service: AnalizarMuestrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalizarMuestrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
