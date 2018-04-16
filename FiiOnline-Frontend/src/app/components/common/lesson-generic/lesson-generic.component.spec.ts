import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonGenericComponent } from './lesson-generic.component';

describe('LessonGenericComponent', () => {
  let component: LessonGenericComponent;
  let fixture: ComponentFixture<LessonGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessonGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
