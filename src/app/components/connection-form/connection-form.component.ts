import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css']
})
export class ConnectionFormComponent implements OnInit {
  connexion=new FormGroup({
    educateur: new FormControl(''),
    mdp: new FormControl(''),
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
  callingFunction() {
    console.log(this.connexion.value);
  }
}
