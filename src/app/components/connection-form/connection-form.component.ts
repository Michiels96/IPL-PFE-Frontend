import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css']
})
export class ConnectionFormComponent implements OnInit {
 /* @Input()
  isTokenForm=false;
  @Output()
  messageToEmit = new EventEmitter<FormGroup>();*/
  isTokenValid=false;
  connexion=new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  inscription=new FormGroup({
    id:new FormControl(-1),
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl('')
  });
  constructor(private api: ApiService) { 
    
  }

  ngOnInit() {
   
  }

  deconnexion(){
    this.isTokenValid=false;
  }
  tryToConnect() {
    console.log(this.connexion.value);
    //this.messageToEmit.emit(this.connexion);
    this.api.connectUser(this.connexion.value).subscribe( 
      data => {
        console.log("token");
        console.log(data);
        let regex = /\d/;
        if(regex.test(data.token)){
          this.isTokenValid=true;
         
        }
        else{
          this.isTokenValid=false;
          
        }
      },
      error => {
        console.log(error);
      }
    )
    
  }
  sendInscription(){
    console.log(this.inscription.value);
    //this.messageToEmit.emit(this.inscription);
    
    console.log("form recu 2 ! "); 
    console.log(this.inscription.value);

    this.api.postUser(this.inscription.value).subscribe( 
      data => {
        console.log(data);
        
      // this.enfants.push(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  
}
