import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth/auth.service';

@Component({
  selector: 'app-authentificated',
  templateUrl: './authentificated.component.html',
  styleUrls: ['./authentificated.component.css']
})
export class AuthentificatedComponent implements OnInit {
  whoIsConnected;
  listeEnfants;
  kid_selected;
  constructor(private api: ApiService,private route: ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.whoIsConnected=this.route.snapshot.paramMap.get('nom');
    this.getEnfants();
  }
  getEnfants = () => {
   
    this.api.getAllEnfants().subscribe(
      data => {
        //console.log(data);
        this.listeEnfants = data;
        console.log("enfant");
        console.log(this.listeEnfants);
      },
      error => {
        console.log(error);
      }
    )
  }
  confirmer(){
    console.log("enfant choisi");
    console.log(this.kid_selected);
    
    this.router.navigate(['/ui',{id:this.kid_selected}]);
    
    
  }
  /*deconnexion(){
    this.authService.logout();
    this.router.navigate(['/']);
  }*/
}
