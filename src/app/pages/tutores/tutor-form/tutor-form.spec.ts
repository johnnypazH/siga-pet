import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorFormComponent as TutorForm} from './tutor-form';

describe('TutorForm', () => {
  let component: TutorForm;
  let fixture: ComponentFixture<TutorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
