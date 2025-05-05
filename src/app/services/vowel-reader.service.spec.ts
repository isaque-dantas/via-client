import { TestBed } from '@angular/core/testing';

import { VowelReaderService } from './vowel-reader.service';

describe('VowelReaderService', () => {
  let service: VowelReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VowelReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
