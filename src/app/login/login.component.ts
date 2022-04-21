import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '../shared/services/app.service';
import { LoginResponse } from '../shared/interfaces/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    'email': ['', Validators.required],
    'password': ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private loginService: AppService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.get('email')?.value.toLowerCase();
      let password = this.loginForm.get('password')?.value;
      this.loginService.loginUser(email, password).subscribe((response: LoginResponse) => {
        console.log(response);
        sessionStorage.setItem('gim-token', response.data.token);
        this.router.navigate(['/home']);
      });
    }
  }

}
