import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css']
})
export class ConnectionFormComponent implements OnInit {
  @Input()
  isTokenForm=false;
  @Output()
  messageToEmit = new EventEmitter<FormGroup>();
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
  constructor(/*private formBuilder:FormBuilder*/) { 
    /*this.connexion=this.formBuilder.group({
      educateur:['']/* new FormControl(''),
      mdp: ['']/* new FormControl('')});*/
    //nom_enfant;
    //prenom_enfant; 
  }

  ngOnInit() {
   
  }
  tryToConnect() {
    console.log(this.connexion.value);
    this.messageToEmit.emit(this.connexion);
    
  }
  sendInscription(){
    console.log(this.inscription.value);
    this.messageToEmit.emit(this.inscription);
  }
}
