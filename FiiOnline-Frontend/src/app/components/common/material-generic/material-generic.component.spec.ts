import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGenericComponent } from './material-generic.component';

describe('MaterialGenericComponent', () => {
  let component: MaterialGenericComponent;
  let fixture: ComponentFixture<MaterialGenericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialGenericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
