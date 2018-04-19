import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesMenuComponent } from './courses-menu.component';

describe('CoursesMenuComponent', () => {
  let component: CoursesMenuComponent;
  let fixture: ComponentFixture<CoursesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
