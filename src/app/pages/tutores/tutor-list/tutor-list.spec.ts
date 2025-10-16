import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorListComponent} from './tutor-list';

describe('TutorList', () => {
  let component: TutorListComponent;
  let fixture: ComponentFixture<TutorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
