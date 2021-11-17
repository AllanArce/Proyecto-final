import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Redir1Component } from './redir1.component';

describe('Redir1Component', () => {
  let component: Redir1Component;
  let fixture: ComponentFixture<Redir1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Redir1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Redir1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
