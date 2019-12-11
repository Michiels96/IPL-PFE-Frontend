import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth/auth.service';
import { SharedService } from 'src/app/SharedService';
//import { Observable,interval, timer } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  kid_connected=null;
  listeEnfants;
  kid_selected;
  isNotConnected=true;
  kid_id;
  constructor(private api: ApiService,public authService: AuthService, private route: Router, private sharedService: SharedService) { }

  ngOnInit() {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant(JSON.parse(sessionStorage.getItem('kid_connected')));
      }
    } 
    sessionStorage.setItem('kid_connected', '');
      this.api.getUnloggedEnfants().subscribe(
        data => {
          //console.log(data);
          this.listeEnfants =data;//Array.of(data);
          console.log("enfant");
          console.log(this.listeEnfants);
        },
        error => {
          console.log(error);
        }
      )
  }
  connecterEnfant(){
    console.log("enfant a connecter");
    console.log(this.kid_selected.enfant_id);
    console.log(this.kid_selected.enfant_nom);

    this.api.updateKid(this.kid_selected,true).subscribe(
      data => {
        //console.log(data);
        this.kid_selected = data;
        console.log("Data kid_selected : ", this.kid_selected);
        // this.kid_nomComplet = data.nom + " " + data.prenom;
        this.kid_id = data.enfant_id;
        if(this.kid_selected.connecte==true){
          this.isNotConnected=false;
          this.authService.loginKid();
          console.log("connecté")
          sessionStorage.setItem('kid_connected', JSON.stringify(this.kid_selected));
          this.sharedService.setDataEnfantConnecte(this.kid_selected);
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  deconnecterEnfant(kid){
    this.api.updateKid(kid,false).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  jouer() {
    console.log("Nom Enfant : ", this.kid_selected.enfant_nom);
    this.route.navigate(['/choix-categorie', {id_enfant:this.kid_id}]);
  }
  @HostListener('window:beforeunload', ['$event'])
  ifExitApp(event) {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant( (JSON.parse(sessionStorage.getItem('kid_connected'))));
        
      }
    } 
      //event.preventDefault();
     //event.returnValue = false;
  }
}
