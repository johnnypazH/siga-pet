import { TestBed } from '@angular/core/testing';

import { ServicoPetService as ServicoPet } from './servico-pet';

describe('ServicoPet', () => {
  let service: ServicoPet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicoPet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
