import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix2aide',
  templateUrl: './choix2aide.component.html',
  styleUrls: ['./choix2aide.component.css']
})
export class Choix2aideComponent implements OnInit {
  // var_reponsesQ1: choix1 ==> choix2
  var_reponsesQ1 = [];

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
    if(this.sharedService.getDataChoix1().length == null){
      this.router.navigate(['/choixJaime']);
    }
    this.var_reponsesQ1 = this.sharedService.getDataChoix1();

    for(var activite of this.var_reponsesQ1){
      this.var_listeQ2.push(activite);
    }
    this.var_activiteCourante = this.var_reponsesQ1[0];
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
    console.log("terminé!");
    /*
    console.log("Aide demandee "+this.var_activitesBesoinDAide.length);
    console.log("AIDE "+JSON.stringify(this.var_activitesBesoinDAide));

    console.log("Aide Non demandee "+this.var_activitesPasBesoinDAide.length);
    console.log("AIDE PAS "+JSON.stringify(this.var_activitesPasBesoinDAide));
    */

    console.log("CHOIX 2 "+JSON.stringify(this.var_activitesDAideEnregistres));

    this.sharedService.setDataChoix2(this.var_activitesDAideEnregistres);
    this.router.navigate(['/choixContent']);
  }
}
