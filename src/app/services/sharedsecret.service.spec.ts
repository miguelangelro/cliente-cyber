import { TestBed } from '@angular/core/testing';

import { SharedsecretService } from './sharedsecret.service';

describe('SharedsecretService', () => {
  let service: SharedsecretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedsecretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
