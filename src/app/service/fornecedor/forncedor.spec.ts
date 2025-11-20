import { TestBed } from '@angular/core/testing';

import { Forncedor } from './forncedor';

describe('Forncedor', () => {
  let service: Forncedor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Forncedor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
