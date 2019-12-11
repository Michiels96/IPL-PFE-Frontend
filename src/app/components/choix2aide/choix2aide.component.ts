import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix2aide',
  templateUrl: './choix2aide.component.html',
  styleUrls: ['./choix2aide.component.css']
})
export class Choix2aideComponent implements OnInit {
  var_listeQ2 = [];

  // var_activitesDAideEnregistres: JSON de choix2 ==> choix3
  var_activitesDAideEnregistres = [];

  var_i;
  imgBack;
  var_activiteCourante;
  
  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) { 
    this.var_i = 0;
    this.imgBack = false;
    this.var_activiteCourante = null;
  }

  ngOnInit() {
    this.getKidInfo();
  
    if(this.sharedService.getDataCategorie().length == undefined){
      this.router.navigate(['/categories']);
    }
    // filtrage des images avec le champ 'choix' à 'oui'
    for(var activite of this.sharedService.getDataCategorie()){
      if(activite.choix == "oui"){
        this.var_listeQ2.push(activite);
      }
    }
    this.var_activiteCourante = this.var_listeQ2[0];
  }

  addImgToYes(activite){
    this.imgBack = true;
    this.var_i++;
 
    activite.aide = true;
    this.var_activitesDAideEnregistres.push(activite);
    this.var_activiteCourante = this.var_listeQ2[this.var_i];

    if(this.var_i == this.var_listeQ2.length){
      this.question2Terminee();
    }
  }

  addImgToNo(activite){
    this.imgBack = true;
    this.var_i++;
 
    activite.aide = false;
    this.var_activitesDAideEnregistres.push(activite);
    this.var_activiteCourante = this.var_listeQ2[this.var_i];

    if(this.var_i == this.var_listeQ2.length){
      this.question2Terminee();
    }
  }

  goImgBack(){
    if(this.var_i > 0){
      this.var_i--;

      if(this.var_i == 0){
        this.imgBack = false;
      }
      this.var_activitesDAideEnregistres.pop();
      this.var_activiteCourante = this.var_listeQ2[this.var_i];
    }
  }

  backToChoix1(){
    //alert('Attention tes réponses à la question 1 et 2 vont être perdues!');
    var demande = prompt('Attention tes réponses à la question 1 et 2 vont être perdues! Est tu sur? (oui/non)');
    if(demande == "o" || demande == "oui" || demande == "O" || demande == "Oui" || demande == "OUI" || demande == ""){
      this.router.navigate(['/choixJaime']);
    }
  }

  question2Terminee(){
    //console.log("terminé!");
    var imagesSelectionnes = this.sharedService.getDataCategorie();
    var i = 0;
    for(var activiteSharedService of imagesSelectionnes){
      for(var activite of this.var_activitesDAideEnregistres){
        if(activite.image_id == activiteSharedService.image_id){
          imagesSelectionnes[i] = activite;
        }
      }
      i++;
    }
    sessionStorage.setItem('dataCategorie', JSON.stringify(imagesSelectionnes));
    this.sharedService.setDataCategorie(imagesSelectionnes);
    console.log("CHOIX 2 "+JSON.stringify(this.sharedService.getDataCategorie()));
    this.router.navigate(['/choixContent']);
  }

  getKidInfo(){
    console.log(sessionStorage.getItem('kid_connected'));
    if(sessionStorage.getItem('kid_connected') != ''){
      this.sharedService.setDataEnfantConnecte(JSON.parse(sessionStorage.getItem('kid_connected')));
      this.getKidSessionInfo();
    }
    if(JSON.stringify(this.sharedService.getDataEnfantConnecte()).length == 2){
      this.router.navigate(['/']);
    }
  }

  getKidSessionInfo(){
    if(sessionStorage.getItem('kid_session_info') != ''){
      this.sharedService.setDataSession(JSON.parse(sessionStorage.getItem('kid_session_info')));
      this.getDataCategorie();
    }
    else{
      sessionStorage.setItem('nb_choix_categorie', '');
      sessionStorage.setItem('kid_libelle_categorie', '');
      sessionStorage.setItem('kid_session_info', '');
      sessionStorage.setItem('dataCategorie', '');
      this.router.navigate(['/choix-categorie']);
    }
  }

  getDataCategorie(){
    if(sessionStorage.getItem('dataCategorie') != ''){
      this.sharedService.setDataCategorie(JSON.parse(sessionStorage.getItem('dataCategorie')));
    }
    else{
      sessionStorage.setItem('nb_choix_categorie', '');
      sessionStorage.setItem('kid_libelle_categorie', '');
      sessionStorage.setItem('kid_session_info', '');
      sessionStorage.setItem('dataCategorie', '');
      this.router.navigate(['/choix-categorie']);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  ifExitApp(event) {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant( (JSON.parse(sessionStorage.getItem('kid_connected'))));
        
      }
    } 
    //event.preventDefault();
    //event.returnValue = false;
  }
  deconnecterEnfant(kid){
    this.api.updateKid(kid,false).subscribe(
      data => {
        //console.log(data);
      },
      error => {
        //console.log(error);
      }
    )
  }
}
