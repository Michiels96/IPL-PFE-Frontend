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
  prof_id;
  q_id;
  questions;
  aime;
  aide;
  content;

  mandataire;
  personne_mandataire = {'mandataire': '','nom': '', 'prenom': '', 'spécialité': '', 'téléphone': '', 'email': '', 'date_demande': '', 'objet': '','autre_mandataire': ''};
  
  notes = [];
  id = [];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.kid_id = this.route.snapshot.paramMap.get('id');
    this.prof_id = this.route.snapshot.paramMap.get('prof_id');
    console.log(this.kid_id);
    console.log(this.prof_id);
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
        for(let q of this.questions){
          var note = {'question_id': q.question_id, 'note_aime': '', 'note_aide': '', 'note_satisfaction': '', 'professionnel_id': this.prof_id};
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
      this.personne_mandataire['autre_mandataire'] = event;
    }
    this.personne_mandataire['mandataire'] = event;
  }

  setMandataire(str, event){
    this.personne_mandataire[str] = event;
  }

  setNote(id, note, event){
    for(var i = 0; i < this.questions.length; i++){
      if(this.questions[i]['question_id'] == id){
        this.questions[i]['note'][note] = event;
      }
    }
  }

  onSubmitMandat(){
    console.log(this.personne_mandataire);

    this.api.postMandataire(this.personne_mandataire).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  terminer(){
    for(let q of this.questions){
      var note = q['note'];
      note['note_id'] = -1;
      console.log(note);

      this.api.postNote(note).subscribe(
        data => {
          console.log(data);
          //this.router.navigate(['/recap', {id:this.kid_id}]);
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
