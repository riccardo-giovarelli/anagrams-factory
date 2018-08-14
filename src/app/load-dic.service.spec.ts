import { TestBed, inject } from '@angular/core/testing';

import { LoadDicService } from './load-dic.service';

describe('LoadDicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadDicService]
    });
  });

  it('should be created', inject([LoadDicService], (service: LoadDicService) => {
    expect(service).toBeTruthy();
  }));
});
