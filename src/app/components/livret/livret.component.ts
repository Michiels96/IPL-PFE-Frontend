import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  sessions_date_split = [];

  constructor(private api: ApiService,private route: ActivatedRoute, private sharedService: SharedService) {
   }

  ngOnInit() {
    this.kid_id = this.sharedService.getDataEnfantConnecte().enfant_id;
    this.kid_nom = this.sharedService.getDataEnfantConnecte().prenom + " " + this.sharedService.getDataEnfantConnecte().nom;
    console.log("kid_nom" + this.kid_nom);
    this.getSession();
  }


  getSession(){
    this.api.getSessionsById(this.kid_id).subscribe( 
      data => {
        console.log(data);
        this.sessions=data.session_enfant;
        for(let i = 0; i < this.sessions.length; i++){
          var session_split = this.sessions[i].date.substring(0, 19);
          this.sessions_date_split[i] = session_split;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  changerSession(event) {
    if(this.id_session != -1) {
      // for(let i = 0; i < this.sessions_date_split.length; i++) {
      //   if(this.sessions_date_split[i] == this.sessions[i].session_id) {
      //     this.session_choisie = this.sessions[i].question_session;
      //   }
      // }
      for(let i=0;i<this.sessions.length;i++){
        if(this.id_session==this.sessions[i].session_id){
          this.session_choisie=this.sessions[i].question_session;
        }
      }
    }
  }

}
