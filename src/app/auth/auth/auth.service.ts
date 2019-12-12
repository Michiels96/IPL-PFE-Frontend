import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin = false;
  isKidLoggedin= false;

    login() {

        this.isLoggedin = true;
        sessionStorage.setItem('guard', "true");
    }

    logout() {
        this.isLoggedin = false;
        sessionStorage.setItem('guard', "false;");
    }
    loginKid() {
      sessionStorage.setItem('guard', "true");
      this.isKidLoggedin = true;
     
  }

    logoutKid() {
        this.isKidLoggedin = false;
        sessionStorage.setItem('guard', "false");
    }
}
