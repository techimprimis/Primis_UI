import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate email field', () => {
    const email = component.emailControl;
    email?.setValue('invalid');
    expect(email?.errors?.['email']).toBeTruthy();

    email?.setValue('test@example.com');
    expect(email?.errors).toBeNull();
  });

  it('should validate password minimum length', () => {
    const password = component.passwordControl;
    password?.setValue('123');
    expect(password?.errors?.['minlength']).toBeTruthy();

    password?.setValue('123456');
    expect(password?.errors).toBeNull();
  });
});
