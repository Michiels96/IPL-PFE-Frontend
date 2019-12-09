import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix3content',
  templateUrl: './choix3content.component.html',
  styleUrls: ['./choix3content.component.css']
})
export class Choix3contentComponent implements OnInit {
  // var_reponsesQ2: choix2 ==> choix3 
  var_reponsesQ2 = [];

  var_listeQ3 = [];

  // var_activitesContentEnregistres: choix3 ==> ...
  var_activitesContentEnregistres = [];
  
  
  var_i;
  imgBack;
  var_activiteCourante;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.var_i = 0;
    this.imgBack = false;
    this.var_activiteCourante = null;
   }

  ngOnInit() {
    this.ifExitApp();
    if(this.sharedService.getDataCategorie().length == undefined){
      this.router.navigate(['/categories']);
    }
    this.var_reponsesQ2 = this.sharedService.getDataCategorie();

    for(var activite of this.var_reponsesQ2){
      this.var_listeQ3.push(activite);
    }
    this.var_activiteCourante = this.var_reponsesQ2[0];
  }


  addImgToYes(activite){
    this.imgBack = true;
    this.var_i++;
 
    activite.content = true;
    this.var_activitesContentEnregistres.push(activite);
    this.var_activiteCourante = this.var_listeQ3[this.var_i];

    if(this.var_i == this.var_listeQ3.length){
      this.question3Terminee();
    }
  }

  addImgToNo(activite){
    this.imgBack = true;
    this.var_i++;
 
    activite.content = false;
    this.var_activitesContentEnregistres.push(activite);
    this.var_activiteCourante = this.var_listeQ3[this.var_i];

    if(this.var_i == this.var_listeQ3.length){
      this.question3Terminee();
    }
  }

  goImgBack(){
    if(this.var_i > 0){
      this.var_i--;

      if(this.var_i == 0){
        this.imgBack = false;
      }
      this.var_activitesContentEnregistres.pop();
      this.var_activiteCourante = this.var_listeQ3[this.var_i];
    }
  }

  backToChoix2(){
    //alert('Attention tes réponses à la question 2 et 3 vont être perdues!');
    var demande = prompt('Attention tes réponses à la question 2 et 3 vont être perdues! Est tu sur? (oui/non)');
    if(demande == "o" || demande == "oui" || demande == "O" || demande == "Oui" || demande == "OUI" || demande == ""){
      this.router.navigate(['/choixAide']);
    }
  }

  question3Terminee(){
    console.log("terminé!");
    var imagesSelectionnes = this.sharedService.getDataCategorie();
    var i = 0;
    for(var activite of this.var_activitesContentEnregistres){
      for(var activiteSharedService of imagesSelectionnes){
        if(activiteSharedService.image_id == activite.image_id){
          this.var_activitesContentEnregistres[i] = activiteSharedService;
        }
      }
      i++;
    }
    this.sharedService.setDataCategorie(this.var_activitesContentEnregistres);
    console.log("CHOIX 3 "+JSON.stringify(this.sharedService.getDataCategorie()));
    this.router.navigate(['/syntheseDesChoix']);
  }
  @HostListener('window:beforeunload', [])
  ifExitApp() {
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
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
