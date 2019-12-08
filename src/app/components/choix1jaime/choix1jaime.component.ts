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
  var_imagesByLibelle = [];
  // var_activitesEnregistres: JSON de choix1 ==> choix2
  var_activitesEnregistres = [];

  var_activiteCourante;
  var_pasComplet;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.var_pasComplet = false;
    this.var_activiteCourante = null;
  }
  
  ngOnInit() {
    //this.getAllImagesByLibelle("deplacements");
    this.getAllImagesByLibelle();
  }


   getAllImagesByLibelle = () => {
    this.api.getAllImages().subscribe(
      data => {
        var i = 1;
        for(var key in data){
          if(data[key].categorie_image == "deplacements"){
            data[key].description = data[key].description+".jpg";
            this.var_imagesByLibelle.push(data[key]); 
            if(i == 1){
              this.var_activiteCourante = data[key];
            }
            i++;
          }
        }
        //console.log("AFTER TRI "+JSON.stringify(this.var_imagesByLibelle));
      },
      error => {
        console.log(error);
      }
    )
  }
/*
  getAllImagesByLibelle = (libelle) => {
    this.api.getAllImagesByLibelle(libelle).subscribe(
      data => {
        var i = 1;
        for(var key in data){
          data[key].description = data[key].description+".jpg";
          this.var_imagesByLibelle.push(data[key]); 
          if(i == 1){
            this.var_activiteCourante = data[key];
          }
          i++;
        }
        console.log(JSON.stringify(this.var_imagesByLibelle));
      },
      error => {
        console.log(error);
      }
    )
  }
*/
  addImgToYes(activite){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_pasComplet = false;
      activite.aime = true;
      this.var_activitesEnregistres.push(activite);
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      this.question1Terminee();
    }
  }

  addImgToNo(activite){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_pasComplet = false;
      activite.aime = false;
      this.var_activitesEnregistres.push(activite);
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      this.question1Terminee();
    }
  }

  imgByPass(){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_pasComplet = false;
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      this.question1Terminee();
    }
  }

  question1Terminee(){
    if(this.var_activitesEnregistres.length == 0){
      this.var_pasComplet = true;
      this.var_activiteCourante = this.var_imagesByLibelle[1];
    }
    else{
      console.log("CHOIX 1 "+JSON.stringify(this.var_activitesEnregistres));
      this.var_pasComplet = false;
      this.sharedService.setDataChoix1(this.var_activitesEnregistres);
      this.router.navigate(['/choixAide']);
    }
  }
}
