import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {
  sessions;
  id_kid;
  id_session=-1;
  session_choisie;
  isThereNotes=false;
  constructor(private api: ApiService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSession();
  }
  getSession(){
    this.api. getSessionsById(3).subscribe( 
      data => {
        console.log(data);
        this.sessions=data.session_enfant;
      },
      error => {
        console.log(error);
      }
    )
    
  }
  confirmerSession(){
    if(this.id_session!=-1){
      for(let i=0;i<this.sessions.length;i++){
        if(this.id_session==this.sessions[i].session_id){
          this.session_choisie=this.sessions[i].question_session;
          console.log(this.session_choisie);
        }
      }
    }
  }
}
