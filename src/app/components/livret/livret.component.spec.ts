import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivretComponent } from './livret.component';

describe('LivretComponent', () => {
  let component: LivretComponent;
  let fixture: ComponentFixture<LivretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
