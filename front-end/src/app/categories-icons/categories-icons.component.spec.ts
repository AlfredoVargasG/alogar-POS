import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesIconsComponent } from './categories-icons.component';

describe('CategoriesIconsComponent', () => {
  let component: CategoriesIconsComponent;
  let fixture: ComponentFixture<CategoriesIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesIconsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
