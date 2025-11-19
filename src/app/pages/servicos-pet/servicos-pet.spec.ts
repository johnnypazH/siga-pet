import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosPet } from './servicos-pet';

describe('ServicosPet', () => {
  let component: ServicosPet;
  let fixture: ComponentFixture<ServicosPet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicosPet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosPet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
