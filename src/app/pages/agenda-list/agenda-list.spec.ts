import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaList } from './agenda-list';

describe('AgendaList', () => {
  let component: AgendaList;
  let fixture: ComponentFixture<AgendaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgendaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
