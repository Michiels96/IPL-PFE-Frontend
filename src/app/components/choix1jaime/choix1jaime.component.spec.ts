import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Choix1jaimeComponent } from './choix1jaime.component';

describe('Choix1jaimeComponent', () => {
  let component: Choix1jaimeComponent;
  let fixture: ComponentFixture<Choix1jaimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Choix1jaimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Choix1jaimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
