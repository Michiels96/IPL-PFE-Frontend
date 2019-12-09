import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheseDesChoixComponent } from './synthese-des-choix.component';

describe('SyntheseDesChoixComponent', () => {
  let component: SyntheseDesChoixComponent;
  let fixture: ComponentFixture<SyntheseDesChoixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyntheseDesChoixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntheseDesChoixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
