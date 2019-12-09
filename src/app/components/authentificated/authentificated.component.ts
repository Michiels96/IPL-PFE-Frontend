import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-authentificated',
  templateUrl: './authentificated.component.html',
  styleUrls: ['./authentificated.component.css']
})
export class AuthentificatedComponent implements OnInit {
  error_inscription_msg;
  error_inscription = false;
  whoIsConnected;
  listeEnfants;
  kid_selected;
  inscriptionEnfant=new FormGroup({
    id:new FormControl(-1),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    age: new FormControl(''),
    connecte: new FormControl(false)
  });
  constructor(private api: ApiService,private route: ActivatedRoute,private router:Router) {}

  ngOnInit() {
    this.whoIsConnected=this.route.snapshot.paramMap.get('nom');
    this.getEnfants();
    this.error_inscription_msg="";
    this.error_inscription = false;
  }
  getEnfants = () => {
   
    this.api.getAllEnfants().subscribe(
      data => {
        //console.log(data);
        this.listeEnfants = data;
        console.log("enfant");
        console.log(this.listeEnfants);
      },
      error => {
        console.log(error);
      }
    )
  }
  confirmer(){
    console.log("enfant choisi");
    console.log(this.kid_selected);
    
    this.router.navigate(['/ui',{id:this.kid_selected}]);
  }
  inscrireEnfant(){
    console.log(this.inscriptionEnfant.value);
    this.api.postKid(this.inscriptionEnfant.value).subscribe( 
      data => {
        console.log(data);
        this.inscriptionEnfant.reset();
      // this.enfants.push(data);
      },
      error => {
        console.log(error);
        this.error_inscription_msg="Erreur lors de l'inscription de cet enfant, veuillez verifier tous les champs et recommencer";
        this.error_inscription = true;
      }
    )
  }
  /*deconnexion(){
    this.authService.logout();
    this.router.navigate(['/']);
  }*/
}
