import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixCategorieComponent } from './choix-categorie.component';

describe('ChoixCategorieComponent', () => {
  let component: ChoixCategorieComponent;
  let fixture: ComponentFixture<ChoixCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
