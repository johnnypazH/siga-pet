import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pronturio } from './pronturio';

describe('Pronturio', () => {
  let component: Pronturio;
  let fixture: ComponentFixture<Pronturio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pronturio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pronturio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
