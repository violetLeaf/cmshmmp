import { TestBed } from '@angular/core/testing';

import { TourservicesService } from './tourservices.service';

describe('TourservicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TourservicesService = TestBed.get(TourservicesService);
    expect(service).toBeTruthy();
  });
});
