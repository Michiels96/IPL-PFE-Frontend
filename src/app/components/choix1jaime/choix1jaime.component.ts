import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix1jaime',
  templateUrl: './choix1jaime.component.html',
  styleUrls: ['./choix1jaime.component.css']
})
export class Choix1jaimeComponent implements OnInit {
  // var_imagesCategorieDemandees: categorie-component ==> choix1
  var_imagesCategorieDemandees = [];
  // var_activitesEnregistres: JSON de choix1 ==> choix2
  var_activitesEnregistres = [];

  var_activiteCourante;
  var_pasComplet;

  var_i;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.var_pasComplet = false;
    this.var_activiteCourante = null;
    this.var_i = 0;
  }
  
  ngOnInit() {
    this.ifExitApp();
    if(this.sharedService.getDataCategorie().length == undefined){
      this.router.navigate(['/categories']);
    }
    // filtrage des images avec le champ 'choix' à 'oui'
    for(var activite of this.sharedService.getDataCategorie()){
      if(activite.choix == "oui"){
        this.var_imagesCategorieDemandees.push(activite);
      }
    }
    //console.log(this.var_imagesCategorieDemandees);
    this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];
  }

  addImgToYes(activite){
    if(this.var_i < this.var_imagesCategorieDemandees.length){
      this.var_pasComplet = false;
      activite.aime = true;
      this.var_activitesEnregistres.push(activite);
      this.var_i++;
      this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];
      if(this.var_i == this.var_imagesCategorieDemandees.length){  
        this.question1Terminee();
      }
    }
  }

  addImgToNo(activite){
    if(this.var_i <= this.var_imagesCategorieDemandees.length){
      this.var_pasComplet = false;
      activite.aime = false;
      this.var_activitesEnregistres.push(activite);
      this.var_i++;
      this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];  
      if(this.var_i == this.var_imagesCategorieDemandees.length){  
        this.question1Terminee();
      }
    }
  }

  backToChoixCategorie(){
    this.router.navigate(['/categories']);
  }

  question1Terminee(){
    if(this.var_activitesEnregistres.length == 0){
      this.var_pasComplet = true;
      this.var_i = 0;
      this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];
    }
    else{
      
      this.var_pasComplet = false;
      var imagesSelectionnes = this.sharedService.getDataCategorie();
      var i = 0;
      for(var activite of this.var_activitesEnregistres){
        for(var activiteSharedService of imagesSelectionnes){
          if(activiteSharedService.image_id == activite.image_id){
            this.var_activitesEnregistres[i] = activiteSharedService;
          }
        }
        i++;
      }
      this.sharedService.setDataCategorie(this.var_activitesEnregistres);
      console.log("CHOIX 1 "+JSON.stringify(this.sharedService.getDataCategorie()));
      this.router.navigate(['/choixAide']);
    }
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
}
