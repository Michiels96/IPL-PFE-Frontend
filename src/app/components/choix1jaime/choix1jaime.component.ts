import { Component, OnInit } from '@angular/core';
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
    if(this.sharedService.getDataCategorie().length == undefined){
      this.router.navigate(['/categories']);
    }
    this.var_imagesCategorieDemandees = this.sharedService.getDataCategorie();
    console.log(this.var_imagesCategorieDemandees);
    this.renameDescriptionForUrl();
    this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];
    //this.getAllImagesByLibelle("deplacements");
    //this.getAllImagesByLibelle();
  }

    
  renameDescriptionForUrl = () => {
    for(var key in this.var_imagesCategorieDemandees){
      this.var_imagesCategorieDemandees[key].description = this.var_imagesCategorieDemandees[key].description+".jpg";
    }
  }
/*
  getAllImagesByLibelle = (libelle) => {
    this.api.getAllImagesByLibelle(libelle).subscribe(
      data => {
        var i = 1;
        for(var key in data){
          data[key].description = data[key].description+".jpg";
          this.var_imagesCategorieDemandees.push(data[key]); 
          if(i == 1){
            this.var_activiteCourante = data[key];
          }
          i++;
        }
        console.log(JSON.stringify(this.var_imagesCategorieDemandees));
      },
      error => {
        console.log(error);
      }
    )
  }
*/
  addImgToYes(activite){
    console.log(this.var_imagesCategorieDemandees[this.var_i]);
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

  imgByPass(){
    if(this.var_i < this.var_imagesCategorieDemandees.length){
      this.var_pasComplet = false;
      this.var_i++;
      this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];  
    }
    else{
      this.question1Terminee();
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
      console.log("CHOIX 1 "+JSON.stringify(this.var_activitesEnregistres));
      this.var_pasComplet = false;
      this.sharedService.setDataChoix1(this.var_activitesEnregistres);
      this.router.navigate(['/choixAide']);
    }
  }
}
