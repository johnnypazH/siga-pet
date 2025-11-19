import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProdutos } from './card-produtos';

describe('CardProdutos', () => {
  let component: CardProdutos;
  let fixture: ComponentFixture<CardProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardProdutos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProdutos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
