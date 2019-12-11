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
    this.kid_id = this.sharedService.getDataEnfantConnecte().enfant_id;
    this.kid_nom = this.sharedService.getDataEnfantConnecte().prenom + " " + this.sharedService.getDataEnfantConnecte().nom;
    console.log("kid_nom" + this.kid_nom);
    this.getSession();
    console.log(this.sessions);
  }

  newGame(){
    this.destroyUserCache();
    this.router.navigate(['/choix-categorie']);
  }

  destroyUserCache(){
    sessionStorage.setItem('kid_connected', '');
    sessionStorage.setItem('nb_choix_categorie', '');
    sessionStorage.setItem('kid_libelle_categorie', '');
    sessionStorage.setItem('kid_session_info', '');
    sessionStorage.setItem('dataCategorie', '');
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

  changerSession(event) {
    if(this.id_session != -1) {
      for(let i=0;i<this.sessions.length;i++){
        if(this.id_session==this.sessions[i].session_id){
          this.session_choisie=this.sessions[i].question_session;
        }
      }
    }
  }

}
