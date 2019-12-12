import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/SharedService';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-livret',
  templateUrl: './livret.component.html',
  styleUrls: ['./livret.component.css']
})
export class LivretComponent implements OnInit {

  kid_id;
  kid_nom;
  sessions;
  session_choisie;
  id_session=-1;

  constructor(private api: ApiService,private route: ActivatedRoute, private router:Router, private sharedService: SharedService) {}

  ngOnInit() {
    this.getKidInfo();
    this.kid_id = this.sharedService.getDataEnfantConnecte().enfant_id;
    this.kid_nom = this.sharedService.getDataEnfantConnecte().prenom + " " + this.sharedService.getDataEnfantConnecte().nom;
    this.getSession();
  }

  newGame(){
    this.destroyUserCache();
    this.router.navigate(['/choix-categorie']);
  }

  destroyUserCache(){
    sessionStorage.setItem('nb_choix_categorie', '');
    sessionStorage.setItem('kid_libelle_categorie', '');
    sessionStorage.setItem('kid_session_info', '');
    sessionStorage.setItem('dataCategorie', '');
    this.sharedService.deleteAllData();
    sessionStorage.setItem('lastPage', 'choix-categorie');
  }

  getKidInfo(){
    if(sessionStorage.getItem('kid_connected') != ''){
      this.sharedService.setDataEnfantConnecte(JSON.parse(sessionStorage.getItem('kid_connected')));
      this.getKidSessionInfo();
    }
    if(JSON.stringify(this.sharedService.getDataEnfantConnecte()).length == 2){
      sessionStorage.setItem('lastPage', '');
      this.router.navigate(['/']);
    }
  }

  getKidSessionInfo(){
    if(sessionStorage.getItem('kid_session_info') != ''){
      this.sharedService.setDataSession(JSON.parse(sessionStorage.getItem('kid_session_info')));
      this.getDataCategorie();
    }
    else{
      this.destroyUserCache();
      this.router.navigate(['/choix-categorie']);
    }
  }

  getDataCategorie(){
    if(sessionStorage.getItem('dataCategorie') != ''){
      this.sharedService.setDataCategorie(JSON.parse(sessionStorage.getItem('dataCategorie')));
    }
    else{
      this.destroyUserCache();
      this.router.navigate(['/choix-categorie']);
    }
  }

  getSession(){
    this.api.getSessionsById(this.kid_id).subscribe( 
      data => {
        console.log(data);
        this.sessions=data.session_enfant;
      },
      error => {
        console.log(error);
      }
    )
  }

  deconnexion(){
    this.deconnecterEnfant((JSON.parse(sessionStorage.getItem('kid_connected'))));
    sessionStorage.setItem('lastPage', '');
    this.router.navigate(['/']);
  }

  changerSession(event) {
    if(this.id_session != -1) {
      for(let i=0;i<this.sessions.length;i++){
        if(this.id_session==this.sessions[i].session_id){
          this.session_choisie=this.sessions[i].question_session;
          this.triSession();
        }
      }
    }
  }


  triSession(){
    this.session_choisie = this.session_choisie.filter(function(value, index, arr){
      return value.aime != null;
    });
  }

  deconnecterEnfant(kid){
    this.api.updateKid(kid,false).subscribe(
      data => {
      },
      error => {
        console.log(error);
      }
    )
  }
}
