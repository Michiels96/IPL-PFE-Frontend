import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-authentificated',
  templateUrl: './authentificated.component.html',
  styleUrls: ['./authentificated.component.css'],
})
export class AuthentificatedComponent implements OnInit {
  compteur;
  id_kid_just_subcribed=-1;
  error_inscription_msg;
  error_inscription = false;
  whoIsConnected;
  idFromWhoIsConnected;
  listeEnfants;
  kid_selected;
  inscriptionEnfant=new FormGroup({
    id:new FormControl(-1),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    date_naissance: new FormControl(''),
    age: new FormControl(''),
    connecte: new FormControl(false),
    langue: new FormControl(''),
    dominance: new FormControl(''),
    scolarite: new FormControl(''),
    type: new FormControl(''),
    niveau: new FormControl(''),
    besoin_particulier: new FormControl(''),
    autre_besoin_particulier: new FormControl('/')
  });
  tuteur=new FormGroup({
    nom:new FormControl(''),
    prenom: new FormControl(''),
    email: new FormControl(''),
    tel: new FormControl(''),
    statut: new FormControl(''),
    autre: new FormControl('/')
  });
  inscription=new FormGroup({
    id:new FormControl(-1),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    telephone:new FormControl(''),
    profession: new FormControl(''),
    autre: new FormControl("/")
  });
  constructor(private api: ApiService,private route: ActivatedRoute,private router:Router) {}

  ngOnInit() {
    this.compteur=0;
    this.whoIsConnected=this.route.snapshot.paramMap.get('nom');
    this.idFromWhoIsConnected=this.route.snapshot.paramMap.get('id_prof');
    console.log("id prof:");
    console.log(this.idFromWhoIsConnected);
    this.getEnfants();
    this.error_inscription_msg="";
    this.error_inscription = false;
  }
  getEnfants = () => {
   
    //this.api.getAllEnfants().subscribe(
    this.api.getLoggedEnfants().subscribe(
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

    if(this.kid_selected == null) {
      console.log("enfant choisi vide");
    }
    else {
      this.router.navigate(['/ui',{id:this.kid_selected,id_prof:this.idFromWhoIsConnected}]);
    }
    
  }
  inscrireEnfant(){
    console.log(this.inscriptionEnfant.value);
   this.api.postKid(this.inscriptionEnfant.value).subscribe( 
      data => {
        console.log(data);
        this.id_kid_just_subcribed=data.id;
        this.inscriptionEnfant.reset();
      // this.enfants.push(data);
        this.error_inscription_msg="Inscription reussie";
        this.error_inscription_msg="";
        this.compteur=0;
      },
      error => {
        console.log(error);
        this.error_inscription_msg="Erreur lors de l'inscription de cet enfant, veuillez verifier tous les champs et recommencer";
        this.error_inscription = true;
      }
    )
  }
  sendInscription(){
    console.log("form recu 2 ! "); 
    console.log(this.inscription.value);
    this.api.postUser(this.inscription.value).subscribe( 
      data => {
        console.log("user renvoyé");
        console.log(data);
        this.api.postProf(this.inscription.value,data.id).subscribe( 
          data => {
            this.inscription.reset();
            console.log("prof renvoyé");
            console.log(data);
          },
          error => {
            console.log(error);
            this.error_inscription_msg="Inscription impossible, ce nom existe deja ou l'email n'est pas un email valide";
            this.error_inscription = true;
          }
        )
      },
      error => {
        console.log(error);
        this.error_inscription_msg="Inscription impossible, ce nom existe deja ou l'email n'est pas un email valide";
        this.error_inscription = true;
        
      }
    )
    this.error_inscription = false;
  }
  getAge(){
   
    let date=new Date(this.inscriptionEnfant.value.date_naissance);
    console.log(date.getTime());
    console.log( Date.now());
    let timeDiff = Math.abs(Date.now() - date.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    this.inscriptionEnfant.patchValue({age: age});
    console.log(age);
    
  }
  inscriptionTuteur(){
    if(this.id_kid_just_subcribed==-1){
      this.error_inscription_msg="vous n'avez pas encore inscrit d'enfant";
      return;
    }
    if(this.compteur==3){
      this.error_inscription_msg="vous avez deja inscrit 3 personnes de contact pour cet enfant";
      return;
    }
    this.api. postContact(this.tuteur.value,this.id_kid_just_subcribed).subscribe( 
      data => {
        console.log(data);
        
        this.tuteur.reset();
        this.compteur+=1;
        this.error_inscription_msg="Inscription reussie";
        this.error_inscription_msg="";
      },
      error => {
        console.log(error);
        this.error_inscription_msg="Erreur lors de l'inscription de cet personne, veuillez verifier tous les champs et recommencer";
        this.error_inscription = true;
      }
    )
  }
}
