import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-educateur-ui',
  templateUrl: './educateur-ui.component.html',
  styleUrls: ['./educateur-ui.component.css']
})
export class EducateurUIComponent implements OnInit {

  kid_id;
  //q_id;
  questions;
  aime;
  aide;
  content;
  
  note = {'question_id': '', 'aime': '', 'aide': '', 'content': '', 'professionnel_id': '1'};
  notes = [];
  question_id = [];

  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.kid_id = this.route.snapshot.paramMap.get('id');
    //this.q_id = this.route.snapshot.paramMap.get('');
    console.log(this.kid_id);
    this.getQuestion();
  }

  getQuestion = () => {
    this.api.getSessionById(1).subscribe(
      data => {
        this.questions = data.question_session;
        for(let q of this.questions){
          //this.note['question_id'] = q.question_id;
          //this.question_id.push(q.question_id);
          this.notes.push(q.note);
        }
        //this.initNotes();
        console.log(this.notes);
      },
      error => {
        console.log(error);
      }
    )
  }

  // initNotes(){
  //   for(var i = 0; i < this.notes.length; i++){
  //     this.notes[i]['question_id'] = this.question_id[i];
  //   }
  // }

  setNote(id, note, event){
    for(var i = 0; i < this.notes.length; i++){
      console.log(this.notes[i]);
      if(this.notes[i]['question_id'] == id){
        // this.notes[i]['note_aime'] = this.aime;
        // this.notes[i]['note_aide'] = this.aide;
        // this.notes[i]['note_satisfaction'] = this.content;
        this.notes[i][note] = event;
      }
    }
  }
}
