import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieComponentComponent } from './categorie-component.component';

describe('CategorieComponentComponent', () => {
  let component: CategorieComponentComponent;
  let fixture: ComponentFixture<CategorieComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
