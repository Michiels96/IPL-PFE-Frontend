import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix3content',
  templateUrl: './choix3content.component.html',
  styleUrls: ['./choix3content.component.css']
})
export class Choix3contentComponent implements OnInit {
  var_reponsesQ2 = [];

  var_listeQ3 = [];

  // var_activitesContentEnregistres: JSON de choix3 ==> ...
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
    if(this.sharedService.getDataChoix2().length == null){
      this.router.navigate(['/choixAide']);
    }
    this.var_reponsesQ2 = this.sharedService.getDataChoix2();

    for(var activite of this.var_reponsesQ2){
      this.var_listeQ3.push(activite);
    }
    this.var_activiteCourante = this.var_reponsesQ2[0];
  }


  addImgToYes(activite){
    console.log("CONTENT "+JSON.stringify(activite));
    this.imgBack = true;
    this.var_i++;
 
    activite.content = true;
    this.var_activitesContentEnregistres.push(activite);
    this.var_activiteCourante = this.var_listeQ3[this.var_i];
    
    console.log("var i "+this.var_i);
    console.log("calcul "+this.var_activitesContentEnregistres.length);

    if(this.var_i == this.var_listeQ3.length){
      this.question3Terminee();
    }
  }

  addImgToNo(activite){
    console.log("PAS CONTENT "+JSON.stringify(activite));
    this.imgBack = true;
    this.var_i++;
 
    activite.content = false;
    this.var_activitesContentEnregistres.push(activite);
    this.var_activiteCourante = this.var_listeQ3[this.var_i];
    
    console.log("var i "+this.var_i);
    console.log("calcul "+this.var_activitesContentEnregistres.length);

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
    console.log(this.var_activitesContentEnregistres);
  }

}
