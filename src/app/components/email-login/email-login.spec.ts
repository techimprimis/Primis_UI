import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

import { EmailLoginComponent } from './email-login';

describe('EmailLoginComponent', () => {
  let component: EmailLoginComponent;
  let fixture: ComponentFixture<EmailLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailLoginComponent, ReactiveFormsModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
