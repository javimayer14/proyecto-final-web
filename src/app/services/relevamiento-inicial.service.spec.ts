import { TestBed } from '@angular/core/testing';

import { RelevamientoInicialService } from './relevamiento-inicial.service';

describe('RelevamientoInicialService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RelevamientoInicialService = TestBed.get(RelevamientoInicialService);
    expect(service).toBeTruthy();
  });
});
