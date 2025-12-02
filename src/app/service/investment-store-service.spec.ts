import { TestBed } from '@angular/core/testing';

import { InvestmentStoreService } from './investment-store-service';

describe('InvestmentStoreService', () => {
  let service: InvestmentStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
