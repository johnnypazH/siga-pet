import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoList } from './produto-list';

describe('ProdutoList', () => {
  let component: ProdutoList;
  let fixture: ComponentFixture<ProdutoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
