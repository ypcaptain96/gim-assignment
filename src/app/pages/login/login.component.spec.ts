import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [LoginComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create login component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();
  });

  it('email should be invalid when wrong email entered', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue('ab1');
    expect(email.hasError('pattern')).toBeTruthy();
  });

  it('email should be valid when correct email entered', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();
    email.setValue('a@b.com');
    expect(email.hasError('pattern')).toBeFalsy();
  });

  it('password field validity', () => {
    const password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();
    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();
  });

  it('should set isSubmitted to true when onSubmit() is called', () => {
    component.onSubmit();
    expect(component.isSubmitted).toBeTruthy();
  });

  it(`should call onSubmit() on button click`, () => {
    spyOn(component, 'onSubmit');
    let loginBtn: DebugElement = fixture.debugElement.query(By.css('.submit-button'));
    loginBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('form should be valid', () => {
    component.loginForm.controls['email'].setValue('sadasd@asd.com');
    component.loginForm.controls['password'].setValue('abc');
    expect(component.loginForm.valid).toBeTruthy();
  });

});
