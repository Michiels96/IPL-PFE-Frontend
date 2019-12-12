import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {
  sessions;
  id_kid;
  kid_nom;
  id_session=-1;
  session_choisie;
  isThereNotes=false;

  constructor(private api: ApiService,private route: ActivatedRoute, private sharedService: SharedService) { }

  ngOnInit() {

    this.id_kid = this.route.snapshot.paramMap.get('id');
    this.getSession(); 
  }
  
  getSession(){
    this.api.getSessionsById(this.id_kid).subscribe( 
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
      
     /* let c=0;
      for(let k=0;k< this.session_choisie.lenght;k++){
        if(this.session_choisie[k].habitude=='O'){
          console.log(this.session_choisie[k]);
          this.session_choisie[c]=this.session_choisie[k];
          c++;
        }
      }*/
      
    }
  }
}
