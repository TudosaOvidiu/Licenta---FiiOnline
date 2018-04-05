import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLessonComponent } from './upload-lesson.component';

describe('UploadLessonComponent', () => {
  let component: UploadLessonComponent;
  let fixture: ComponentFixture<UploadLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
