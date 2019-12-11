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
  constructor(private api: ApiService, private router: Router, public authService: AuthService, private sharedService: SharedService) { }

  ngOnInit() {
    if(sessionStorage.length > 0){
      // si enfant deja connecté et revient à l'accueil, alors on le déconnecte en db
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant(JSON.parse(sessionStorage.getItem('kid_connected')));
      }
    } 
    if(sessionStorage.getItem('lastPage') != ''){
      this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
    }
    // on détruit les données en cache
    this.destroyUserCache();
    
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
    console.log(this.kid_selected.nom);

    this.api.updateKid(this.kid_selected, true).subscribe(
      data => {
        //console.log(data);
        this.kid_selected = data;
        //console.log("Data kid_selected : ", this.kid_selected);
        this.kid_id = data.enfant_id;
        if(this.kid_selected.connecte==true){
          this.isNotConnected=false;
          this.authService.loginKid();
          console.log("connecté")
          sessionStorage.setItem('kid_connected', JSON.stringify(this.kid_selected));
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  jouer() {
    console.log("Nom Enfant : ", this.kid_selected.nom);
    sessionStorage.setItem('lastPage', 'choix-categorie');
    this.router.navigate(['/choix-categorie']);
  }


  destroyUserCache(){
    sessionStorage.setItem('kid_connected', '');
    sessionStorage.setItem('nb_choix_categorie', '');
    sessionStorage.setItem('kid_libelle_categorie', '');
    sessionStorage.setItem('kid_session_info', '');
    sessionStorage.setItem('dataCategorie', '');
    sessionStorage.setItem('lastPage', '');
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
