import { TestBed } from '@angular/core/testing';

import { CategoriaProdutoService as CategoriaProduto } from './categoria.produto';

describe('CategoriaProduto', () => {
  let service: CategoriaProduto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaProduto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
