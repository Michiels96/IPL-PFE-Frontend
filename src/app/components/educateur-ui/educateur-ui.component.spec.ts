import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducateurUIComponent } from './educateur-ui.component';

describe('EducateurUIComponent', () => {
  let component: EducateurUIComponent;
  let fixture: ComponentFixture<EducateurUIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducateurUIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducateurUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
