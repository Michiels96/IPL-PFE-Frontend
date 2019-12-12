import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/SharedService';


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
  personne_mandataire = {'mandataire_id': -1, 'mandataire': null, 'autre_mandataire': 'aucun', 'nom': null, 'prenom': null, 'spécialité': null, 'téléphone': null, 'email': null, 'date_demande': null, 'objet': null};
  
  notes = [];
  id = [];

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router,private sharedService: SharedService) { }

  ngOnInit() {
    this.kid_id = JSON.parse(sessionStorage.getItem('kid_selected'));//this.route.snapshot.paramMap.get('id');
    this.prof_id = JSON.parse(sessionStorage.getItem('prof_id'))//this.sharedService.get_prof_id();//this.route.snapshot.paramMap.get('prof_id');
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
          var note = {'note_id': -1, 'professionnel_id': Number(this.prof_id), 'question_id': q.question_id, 'note_aime': null, 'note_aide': null, 'note_satisfaction': null};
          q['note'] = note;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  selectMandataire(event){
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
      this.api.postNote(q['note']).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
