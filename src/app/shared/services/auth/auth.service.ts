import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private session_token_key = 'gim-token';

  constructor(private router: Router) { }

  getTokenFromSession() {
    return sessionStorage.getItem(this.session_token_key);
  }

  setTokenInSession(token: string) {
    sessionStorage.setItem(this.session_token_key, token);
  }

  logoutUser() {
    sessionStorage.removeItem(this.session_token_key);
    this.router.navigate(['']);
  }
}
