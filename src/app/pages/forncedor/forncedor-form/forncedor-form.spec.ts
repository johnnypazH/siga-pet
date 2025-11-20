import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForncedorFormComponent as ForncedorForm } from './forncedor-form';

describe('ForncedorForm', () => {
  let component: ForncedorForm;
  let fixture: ComponentFixture<ForncedorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForncedorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForncedorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
