import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Choix3contentComponent } from './choix3content.component';

describe('Choix3contentComponent', () => {
  let component: Choix3contentComponent;
  let fixture: ComponentFixture<Choix3contentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Choix3contentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Choix3contentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
