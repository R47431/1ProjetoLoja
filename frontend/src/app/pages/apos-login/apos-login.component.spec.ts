import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AposLoginComponent } from './apos-login.component';

describe('AposLoginComponent', () => {
  let component: AposLoginComponent;
  let fixture: ComponentFixture<AposLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AposLoginComponent]
    });
    fixture = TestBed.createComponent(AposLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
