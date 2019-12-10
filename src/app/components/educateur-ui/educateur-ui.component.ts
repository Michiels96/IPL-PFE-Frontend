import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-educateur-ui',
  templateUrl: './educateur-ui.component.html',
  styleUrls: ['./educateur-ui.component.css']
})
export class EducateurUIComponent implements OnInit {

  kid_id;
  q_id;
  questions;
  aime;
  aide;
  content;

  mandataire;
  personne_mandataire = {'mandataire': '','nom': '', 'prenom': '', 'specialite': '', 'telephone': '', 'email': '', 'date': '', 'objet': '','autre': ''};
  
  note = {'question_id': '', 'aime': '', 'aide': '', 'content': '', 'professionnel_id': ''};
  notes = [];
  question = [];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.kid_id = this.route.snapshot.paramMap.get('id');
    console.log(this.kid_id);
    this.getSession();
  }

  getSession = () => {
    this.api.getSessionsById(this.kid_id).subscribe(
      data => {
        this.q_id = data.session_enfant[data.session_enfant.length-1].session_id;
        this.getQuestion();
      },
      error => {
        console.log(error);
      }
    )
  }

  getQuestion = () => {
    this.api.getFullSessionById(this.q_id).subscribe(
      data => {
        this.questions = data.question_session;
        console.log(this.questions);
        for(let q of this.questions){
          console.log(q);
          //this.notes.push(q.note);
          q['note'] = this.note;
        }
        console.log(this.questions);
        console.log(this.notes);
      },
      error => {
        console.log(error);
      }
    )
  }

  selectMandataire(event){
    if(event === 'Autre'){
      this.personne_mandataire['autre'] = event;
    }
    this.personne_mandataire['mandataire'] = event;
    console.log(this.personne_mandataire);
  }

  setMandataire(str, event){
    this.personne_mandataire[str] = event;
    console.log(this.personne_mandataire);
  }

  setNote(id, note, event){
    console.log(id, note, event);
    for(var i = 0; i < this.notes.length; i++){
      console.log(this.notes[i]);
      if(this.notes[i]['question_id'] == id){
        this.notes[i][note] = event;
      }
    }
  }

  onSubmitMandat(){
    console.log(this.personne_mandataire);
  }

  terminer(){
    this.router.navigate(['/recap', {id:this.kid_id}]);
  }
}
