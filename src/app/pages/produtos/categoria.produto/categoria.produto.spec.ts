import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaProduto } from './categoria.produto';

describe('CategoriaProduto', () => {
  let component: CategoriaProduto;
  let fixture: ComponentFixture<CategoriaProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaProduto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaProduto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
