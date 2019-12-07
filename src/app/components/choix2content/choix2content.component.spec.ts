import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Choix2contentComponent } from './choix2content.component';

describe('Choix2contentComponent', () => {
  let component: Choix2contentComponent;
  let fixture: ComponentFixture<Choix2contentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Choix2contentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Choix2contentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
