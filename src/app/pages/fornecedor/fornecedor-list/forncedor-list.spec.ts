import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForncedorList } from './forncedor-list';

describe('ForncedorList', () => {
  let component: ForncedorList;
  let fixture: ComponentFixture<ForncedorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForncedorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForncedorList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
