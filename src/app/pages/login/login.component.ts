import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AppService } from '../../shared/services/app.service';
import { LoginResponse } from '../../shared/interfaces/login.interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>();
  loginForm: FormGroup = this.formBuilder.group({
    'email': ['', [Validators.pattern('^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+.[a-z]{2,4}$'), Validators.required]],
    'password': ['', Validators.required]
  });
  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private appService: AppService,
    private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  onSubmit() {
    console.log(this.loginForm.valid);
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.isSubmitted = false;
      let email = this.loginForm.get('email')?.value.toLowerCase();
      let password = this.loginForm.get('password')?.value;
      this.appService.loginUser(email, password).pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (response: LoginResponse) => {
            this.authService.setTokenInSession(response.data.token);
            this.router.navigate(['/home']);
          },
          error: (err) => console.error(err)
        });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
