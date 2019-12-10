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
 

  connexion=new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(public authService: AuthService,private api: ApiService,private router:Router) { 
    
  }

  ngOnInit() {
    this.authService.logout();
    this.error_connect_msg="";
    this.error_connect = false;
  }

 
  tryToConnect() {
    console.log(this.connexion.value);
    //this.messageToEmit.emit(this.connexion);
    this.api.connectUser(this.connexion.value).subscribe( 
      data => {
        console.log("token");
        console.log(data);
        this.error_connect_msg="";
        let regex = /\d/;
        if(regex.test(data.token)){
         
          this.authService.login();
          //this.isTokenValid=true;
          this.router.navigate(['/auth',{nom:this.connexion.controls["username"].value,id_prof:data.id}]);
          this.connexion.reset();
        }
        else{
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

}
