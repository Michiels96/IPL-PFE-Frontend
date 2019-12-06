import { Component ,Input, Output} from '@angular/core';
import { ApiService } from './api.service';
import { FormGroup } from '@angular/forms';
import { tokenName } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  inscriptionForm: FormGroup;
  enfants = [];
  handicaps = [];
  kid_selected;
  //enfant_id;
  @Input() isTokenValid=false;
  token;
  nom;
  prenom;
  age;
  handicap;
  isShowedForm=true;
  isShowedChoixCat=true;

  constructor(private api: ApiService){
    this.getEnfants();
   this.kid_selected={age:-1,enfant_id:-1,handicap:-1,handicaps:'',nom:'',prenom:''};
  }
  getForm(form:FormGroup){
    if(form.contains("id")){
      this.inscriptionForm=form;
      console.log("form recu 2 ! "); 
      console.log(this.inscriptionForm.value);

      this.api.postUser(this.inscriptionForm.value).subscribe( 
        data => {
          console.log(data);
          
        // this.enfants.push(data);
        },
        error => {
          console.log(error);
        }
      )
    }
    else{
      this.api.connectUser(form.value).subscribe( 
        data => {
          console.log("token");
          console.log(data);
          
          this.token=data;
          if(/\d/.test(this.token)){
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
  }
  goToChoix(){
   this.isShowedChoixCat=false;
  }
  goToConnectForm(){
    this.isShowedForm=false;
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
