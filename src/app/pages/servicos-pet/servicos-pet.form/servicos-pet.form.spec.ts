import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicoPetFormComponent as ServicosPetForm } from './servicos-pet.form';

describe('ServicosPetForm', () => {
  let component: ServicosPetForm;
  let fixture: ComponentFixture<ServicosPetForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicosPetForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosPetForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
