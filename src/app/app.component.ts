import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  enfants = [];
  handicaps = [];
  kid_selected;
  //enfant_id;
  nom;
  prenom;
  age;
  handicap;
  isShowed=true;

  constructor(private api: ApiService){
    this.getEnfants();
   this.kid_selected={age:-1,enfant_id:-1,handicap:-1,handicaps:'',nom:'',prenom:''};
  }
  goToConnectForm(){
    this.isShowed=false;
  }
  getEnfants = () => {
    this.api.getAllHandicaps().subscribe(
      data => {
        console.log(data);
        this.handicap = data;
      },
      error => {
        console.log(error);
      }
    )
    this.api.getAllEnfants().subscribe(
      data => {
        console.log(data);
        this.enfants = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  kidClicked=(enfant) =>{
    console.log(enfant.nom)
    this.api.getOneKid(enfant.enfant_id).subscribe( 
      data => {
        console.log(data);
        /*this.prenom = data.prenom;
        this.nom = data.nom;
        this.age = data.age;
        this.handicap = data.handicaps;*/
       this.kid_selected=data;
      },
      error => {
        console.log(error);
      }
    )
  }
  updateKid = () => {
    this.api.updateKid(this.kid_selected).subscribe( 
      data => {
        console.log(data);
        /*this.prenom = data.prenom;
        this.nom = data.nom;
        this.age = data.age;
        this.handicap = data.handicaps;*/
       this.kid_selected=data;
      },
      error => {
        console.log(error);
      }
    )
  }
  createKid = () => {
    this.api.postKid(this.kid_selected).subscribe( 
      data => {
        console.log(data);
        
       this.enfants.push(data);
      },
      error => {
        console.log(error);
      }
    )
  }
  deleteKid = () => {
    this.api.delKid(this.kid_selected.enfant_id).subscribe( 
      data => {
        console.log(data);
        
       this.getEnfants();
      },
      error => {
        console.log(error);
      }
    )
  }
    
}
