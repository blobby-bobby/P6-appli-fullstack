import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigateBackArrowComponent } from './navigate-back-arrow.component';

describe('NavigateBackArrowComponent', () => {
  let component: NavigateBackArrowComponent;
  let fixture: ComponentFixture<NavigateBackArrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigateBackArrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavigateBackArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
