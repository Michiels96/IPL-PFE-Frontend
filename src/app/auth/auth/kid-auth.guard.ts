import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class KidAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):
     boolean
     {
      if (sessionStorage.getItem("guard")=="true") {
            
        return true;
        } else {
            this.router.navigate(['/']);
            return false;
        }
    }
  
}
