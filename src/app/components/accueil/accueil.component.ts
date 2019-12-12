import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth/auth.service';
import { SharedService } from 'src/app/SharedService';

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
  kidChecked;

  constructor(private api: ApiService, private router: Router, public authService: AuthService, private sharedService: SharedService) {
    this.kidChecked = true;
   }

  ngOnInit() {
    this.authService.logout();
    this.authService.logoutKid();
  
    if(sessionStorage.length > 0){
      if(sessionStorage.getItem('lastPage') != ''){
        this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
      }
      else{
        this.destroyUserCache();
      }
    }
    this.api.getUnloggedEnfants().subscribe(
      data => {
        this.listeEnfants = data;//Array.of(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  connecterEnfant(){
    this.destroyUserCache();
    this.api.updateKid(this.kid_selected, true).subscribe(
      data => {
        this.kid_selected = data;
        this.kid_id = data.enfant_id;
        if(this.kid_selected.connecte==true){
          this.isNotConnected=false;
          this.authService.loginKid();
          sessionStorage.setItem('kid_connected', JSON.stringify(this.kid_selected));
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  jouer(){
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
    this.sharedService.deleteAllData();
  }


  switchToOtherProfile(){
    this.kidChecked = !this.kidChecked;
  }

  loginProfessionnel(){
    this.router.navigate(['/connexion']);
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
  }
  connect(){
    this.authService.login();
    
  }
}
