import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeconnexionElementComponent } from './deconnexion-element.component';

describe('DeconnexionElementComponent', () => {
  let component: DeconnexionElementComponent;
  let fixture: ComponentFixture<DeconnexionElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeconnexionElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeconnexionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
