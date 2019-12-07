import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Choix2aideComponent } from './choix2aide.component';

describe('Choix2aideComponent', () => {
  let component: Choix2aideComponent;
  let fixture: ComponentFixture<Choix2aideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Choix2aideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Choix2aideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
