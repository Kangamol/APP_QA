import { TestBed } from '@angular/core/testing';

import { QasalesService } from './qasales.service';

describe('QasalesService', () => {
  let service: QasalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QasalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
