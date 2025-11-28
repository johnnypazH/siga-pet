import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetInfo } from './pet-info';

describe('PetInfo', () => {
  let component: PetInfo;
  let fixture: ComponentFixture<PetInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
