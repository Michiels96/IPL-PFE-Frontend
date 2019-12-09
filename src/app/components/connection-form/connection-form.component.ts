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
  constructor(public authService: AuthService,private api: ApiService,private router:Router) { 
    
  }

  ngOnInit() {
    this.authService.logout();
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
