import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Choix3aideComponent } from './choix3aide.component';

describe('Choix3aideComponent', () => {
  let component: Choix3aideComponent;
  let fixture: ComponentFixture<Choix3aideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Choix3aideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Choix3aideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
