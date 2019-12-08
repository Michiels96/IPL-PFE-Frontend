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
  var_activitesAimees = [];
  var_activitesPasAimees = [];

  var_listeQ2 = [];


  var_activitesBesoinDAide = [];
  var_activitesPasBesoinDAide = [];

  // var_activitesDAideEnregistres: JSON de choix2 ==> choix3
  var_activitesDAideEnregistres = [this.var_activitesBesoinDAide, this.var_activitesPasBesoinDAide];

  imgBack;
  var_activiteCourante = null;
  var_questionsAimeesPass;
  var_indexPremiereQuestionsPasAimee = 0;
  var_i;
  // savoir si l'activité à été ajouté dans le tableau où l'aide est demandé
  var_addYes;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) { 
    this.imgBack = false;
    this.var_questionsAimeesPass = false;
    this.var_addYes = false;
  }


  ngOnInit() {
    if(this.sharedService.getDataChoix1().length == null){
      this.router.navigate(['/choixJaime']);
    }

    this.var_activitesAimees = this.sharedService.getDataChoix1()[0];
    this.var_activitesPasAimees = this.sharedService.getDataChoix1()[1];

    this.var_i = 0;
    for(var activite of this.var_activitesAimees){
      this.var_listeQ2[this.var_i] = activite;
      this.var_i++;
    }
    this.var_indexPremiereQuestionsPasAimee = this.var_i;
    for(var activite of this.var_activitesPasAimees){
      this.var_listeQ2[this.var_i] = activite;
      this.var_i++;
    }
    this.var_activiteCourante = this.var_activitesAimees[0];
    this.var_i = 0;
  }



  addImgToYes(){
    this.var_addYes = true;
    console.log("AIME "+JSON.stringify(this.var_listeQ2[this.var_i]));
    this.imgBack = true;
    this.var_i++;
    if(this.var_i >= this.var_indexPremiereQuestionsPasAimee){
      this.var_questionsAimeesPass = true;
    }
    if(this.var_questionsAimeesPass == false){
      this.var_activitesBesoinDAide.push(this.var_listeQ2[this.var_i-1]);
      this.var_activiteCourante = this.var_listeQ2[this.var_i];
    }
    else{
      this.var_activitesBesoinDAide.push(this.var_listeQ2[this.var_i-1]);
      this.var_activiteCourante = this.var_listeQ2[this.var_i];
    }
    console.log("var i "+this.var_i);
    console.log("calcul "+(this.var_indexPremiereQuestionsPasAimee+this.var_activitesPasAimees.length));
    if(this.var_i == (this.var_indexPremiereQuestionsPasAimee+ this.var_activitesPasAimees.length)){
      this.question2Terminee();
    }
  }


  addImgToNo(){
    this.var_addYes = false;
    console.log("AIME PAS "+JSON.stringify(this.var_listeQ2[this.var_i]));
    this.imgBack = true;
    this.var_i++;
    if(this.var_i >= this.var_indexPremiereQuestionsPasAimee){
      this.var_questionsAimeesPass = true;
    }
    if(this.var_questionsAimeesPass == false){
      this.var_activitesPasBesoinDAide.push(this.var_listeQ2[this.var_i-1]);
      this.var_activiteCourante = this.var_listeQ2[this.var_i];
    }
    else{
      this.var_activitesPasBesoinDAide.push(this.var_listeQ2[this.var_i-1]);
      this.var_activiteCourante = this.var_listeQ2[this.var_i];
    }
    if(this.var_i == (this.var_indexPremiereQuestionsPasAimee+ this.var_activitesPasAimees.length)){
      this.question2Terminee();
    }
  }





  goImgBack(){
    if(this.var_i > 0){
      this.var_i--;
      if(this.var_i < this.var_indexPremiereQuestionsPasAimee){
        this.var_questionsAimeesPass = false;
      }
      if(this.var_i == 0){
        this.imgBack = false;
      }

      //savoir ou il faut retirer le dernier élement
      if(this.var_addYes){
        this.var_activitesBesoinDAide.pop();
      }
      else{
        this.var_activitesPasBesoinDAide.pop();
      }
      this.var_activiteCourante = this.var_listeQ2[this.var_i];
    }
  }

  question2Terminee(){
    console.log("terminé!");
    console.log("Aide demandee "+this.var_activitesBesoinDAide.length);
    console.log("AIDE "+JSON.stringify(this.var_activitesBesoinDAide));

    console.log("Aide Non demandee "+this.var_activitesPasBesoinDAide.length);
    console.log("AIDE PAS "+JSON.stringify(this.var_activitesPasBesoinDAide));

    this.var_activitesDAideEnregistres.push(this.var_activitesBesoinDAide);
    this.var_activitesDAideEnregistres.push(this.var_activitesPasBesoinDAide);

    this.sharedService.setDataChoix2(this.var_activitesDAideEnregistres);
    this.router.navigate(['/choixContent']);
  }
}
