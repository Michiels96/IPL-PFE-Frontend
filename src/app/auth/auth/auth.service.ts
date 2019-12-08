import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin = false;
  isKidLoggedin= false;

    login() {
        this.isLoggedin = true;
    }

    logout() {
        this.isLoggedin = false;
    }
    loginKid() {
      this.isKidLoggedin = true;
  }

    logoutKid() {
        this.isKidLoggedin = false;
    }
}
