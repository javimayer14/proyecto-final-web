import { TestBed } from '@angular/core/testing';

import { ServerUrlService } from './server-url.service';

describe('ServerUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerUrlService = TestBed.get(ServerUrlService);
    expect(service).toBeTruthy();
  });
});
