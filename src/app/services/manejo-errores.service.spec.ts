import { TestBed } from '@angular/core/testing';

import { ManejoErroresService } from './manejo-errores.service';

describe('ManejoErroresService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManejoErroresService = TestBed.get(ManejoErroresService);
    expect(service).toBeTruthy();
  });
});
