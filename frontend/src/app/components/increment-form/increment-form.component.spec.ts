import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementFormComponent } from './increment-form.component';

describe('IncrementFormComponent', () => {
  let component: IncrementFormComponent;
  let fixture: ComponentFixture<IncrementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncrementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
