import { TestBed } from '@angular/core/testing';

import { ExaminarMuestrasService } from './examinar-muestras.service';

describe('ExaminarMuestrasService', () => {
  let service: ExaminarMuestrasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminarMuestrasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
