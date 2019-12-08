import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';

@Component({
  selector: 'app-deconnexion-element',
  templateUrl: './deconnexion-element.component.html',
  styleUrls: ['./deconnexion-element.component.css']
})
export class DeconnexionElementComponent implements OnInit {

  constructor(public authService: AuthService,private router:Router) { }

  ngOnInit() {
  }
  deconnexion(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
  deconnexionKid(){
    this.authService.logoutKid();
    this.router.navigate(['/']);
  }
}
