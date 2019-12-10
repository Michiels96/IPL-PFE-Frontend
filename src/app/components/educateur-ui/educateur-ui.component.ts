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
  
  notes = [];
  id = [];

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
          var note = {'question_id': q.question_id, 'note_aime': '', 'note_aide': '', 'note_satisfaction': '', 'professionnel_id': ''};
          q['note'] = note;
        }
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
    for(var i = 0; i < this.questions.length; i++){
      if(this.questions[i]['question_id'] == id){
        this.questions[i]['note'][note] = event;
      }
    }
    console.log(this.questions);
  }

  onSubmitMandat(){
    console.log(this.personne_mandataire);
  }

  terminer(){
    this.router.navigate(['/recap', {id:this.kid_id}]);
  }
}
