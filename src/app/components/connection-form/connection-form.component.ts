import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth/auth.service';



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
  //isTokenValid=false;
  userToConnect;
  error_connect_msg;
  error_connect = false;
  error_inscription_msg;
  error_inscription = false;

  connexion=new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  inscription=new FormGroup({
    id:new FormControl(-1),
    username: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    telephone:new FormControl(''),
    profession: new FormControl('') 
  });
  constructor(public authService: AuthService,private api: ApiService,private router:Router) { 
    
  }

  ngOnInit() {
    this.authService.logout();
    this.error_connect_msg="";
    this.error_inscription_msg=""
    this.error_connect = false;
    this.error_inscription = false;
  }

 
  tryToConnect() {
    console.log(this.connexion.value);
    //this.messageToEmit.emit(this.connexion);
    this.api.connectUser(this.connexion.value).subscribe( 
      data => {
        console.log("token");
        console.log(data);
        this.error_connect_msg="";
        this.error_inscription_msg=""
        let regex = /\d/;
        if(regex.test(data.token)){
          
          this.authService.login();
          //this.isTokenValid=true;
          this.inscription.reset();
          this.router.navigate(['/auth',{nom:this.connexion.controls["username"].value}]);
          this.connexion.reset();
        }
        else{
          //this.isTokenValid=false;
          this.inscription.reset();
          this.connexion.reset();
          this.router.navigate(['/connexion']);
        }
      },
      error => {
        //console.log(error);
        this.error_connect_msg="Mot de passe ou nom incorrect";
        this.error_connect = true;
      }
    )
    this.error_connect = false;
  }
  sendInscription(){
    console.log(this.inscription.value);
    //this.messageToEmit.emit(this.inscription);
    
    console.log("form recu 2 ! "); 
    console.log(this.inscription.value);
    this.api.postUser(this.inscription.value).subscribe( 
      data => {
        console.log("user renvoyé");
        console.log(data);
        this.api.postProf(this.inscription.value,data.id).subscribe( 
          data => {
            console.log("prof renvoyé");
            console.log(data);
          },
          error => {
            console.log(error);
            this.error_inscription_msg="Inscription impossible, ce nom existe deja ou l'email n'est pas un email valide";
            this.error_inscription = true;
          }
        )
        /*this.userToConnect=this.inscription.value
        this.connexion.setValue({
          username: this.userToConnect.username, 
          password: this.userToConnect.password
        });
        console.log( this.connexion.value);
        this.error_connect_msg="";
        this.error_inscription_msg=""
        this.tryToConnect();*/
      // this.enfants.push(data);
      },
      error => {
        console.log(error);
        this.error_inscription_msg="Inscription impossible, ce nom existe deja ou l'email n'est pas un email valide";
        this.error_inscription = true;
      }
    )
    this.error_inscription = false;
  }

}
