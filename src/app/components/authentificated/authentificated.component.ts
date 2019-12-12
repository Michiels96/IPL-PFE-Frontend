import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms'
import { SharedService } from 'src/app/SharedService';

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

  error_select_enfant;
  error_select = false;

  success_inscrire;
  success_inscrire_personne = false;
  isInscrit;
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
    type: new FormControl('/'),
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
  constructor(private api: ApiService,private route: ActivatedRoute,private router:Router, private sharedService: SharedService) {}

  ngOnInit() {
    this.compteur=0;
    this.whoIsConnected=this.route.snapshot.paramMap.get('nom');
    this.getEnfants();
    this.error_inscription_msg="";
    this.error_inscription = false;
    this.error_select_enfant="";
    this.error_select = false; 
    this.success_inscrire = "";
    this.success_inscrire_personne = false;
    this.isInscrit=false;
  }
  getEnfants = () => {
   
    this.api.getLoggedEnfants().subscribe(
      data => {
        this.listeEnfants = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  confirmer(){
    if(this.kid_selected == null) {
      this.error_select_enfant = "Veuillez selectionner un enfant";
      this.error_select = true;
    }
    else {
      this.router.navigate(['/ui']);
      sessionStorage.setItem('kid_selected', JSON.stringify(this.kid_selected));
    }
    
  }
  inscrireEnfant(){
   this.api.postKid(this.inscriptionEnfant.value).subscribe( 
      data => {
        this.id_kid_just_subcribed=data.enfant_id;
        
        this.api.postInfosKid(this.inscriptionEnfant.value,this.id_kid_just_subcribed).subscribe(
          data => {
            this.inscriptionEnfant.reset();
            this.success_inscrire = "Inscription réussie";
            this.success_inscrire_personne = true;
            this.compteur=0;
            this.isInscrit=true;
          },
          error => {
            this.error_inscription_msg="Erreur lors de l'inscription de cet enfant, veuillez verifier tous les champs et recommencer";
            this.error_inscription = true;
            this.success_inscrire_personne = false;
          }
        )
      
      },
      error => {
        console.log(error);
        this.error_inscription_msg="Erreur lors de l'inscription de cet enfant, veuillez verifier tous les champs et recommencer";
        this.error_inscription = true;
      }
    )
    this.success_inscrire_personne = false;
  }
  sendInscription(){

    this.api.postUser(this.inscription.value).subscribe( 
      data => {
        this.api.postProf(this.inscription.value,data.id).subscribe( 
          data => {
            this.inscription.reset();
            this.success_inscrire = "Inscription réussie";
            this.success_inscrire_personne = true;
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
    this.success_inscrire_personne = false;
  }
  getAge(){
   
    let date=new Date(this.inscriptionEnfant.value.date_naissance);
    let timeDiff = Math.abs(Date.now() - date.getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    this.inscriptionEnfant.patchValue({age: age});    
  }
  inscriptionTuteur(){
    if(this.id_kid_just_subcribed==-1){
      this.error_inscription_msg="vous n'avez pas encore inscrit d'enfant";
      this.error_inscription = true;
      return;
    }
    if(this.compteur==3){
      this.error_inscription_msg="vous avez deja inscrit 3 personnes de contact pour cet enfant";
      this.error_inscription = true;
      return;
    }
    this.api.postContact(this.tuteur.value,this.id_kid_just_subcribed).subscribe( 
      data => {
        this.tuteur.reset();
        this.compteur+=1;
        this.success_inscrire = "Inscription réussie Personne de contact";
        this.success_inscrire_personne = true;
      },
      error => {
        console.log(error);
        this.error_inscription_msg="Erreur lors de l'inscription de cet personne, veuillez verifier tous les champs et recommencer";
        this.error_inscription = true;
      }
    )
    this.success_inscrire_personne = false;
  }
}
