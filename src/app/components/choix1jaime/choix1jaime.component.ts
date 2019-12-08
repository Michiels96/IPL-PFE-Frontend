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
  var_imagesAimees = [];
  var_imagesPasAimees = [];
  // var_activitesEnregistres: JSON de choix1 ==> choix2
  var_activitesEnregistres = [this.var_imagesAimees, this.var_imagesPasAimees];
  var_activiteCourante;
  var_pasComplet;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.var_pasComplet = false;
    this.var_activiteCourante = null;
  }
  
  ngOnInit() {
    this.getAllImagesByLibelle("deplacements");
  }


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

  addImgToYes(activite){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_pasComplet = false;
      this.var_activitesEnregistres[this.var_imagesAimees.push(activite)];
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      this.question1Terminee();
    }
  }

  addImgToNo(activite){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_pasComplet = false;
      this.var_activitesEnregistres[this.var_imagesPasAimees.push(activite)];
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      this.question1Terminee();
    }
  }

  imgBypass(){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_pasComplet = false;
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      this.question1Terminee();
    }
  }

  question1Terminee(){
    if(this.var_imagesAimees.length == 0 && this.var_imagesPasAimees.length == 0){
      this.var_pasComplet = true;
      this.var_activiteCourante = this.var_imagesByLibelle[1];
    }
    else{
      this.var_pasComplet = false;
      this.sharedService.setDataChoix1(this.var_activitesEnregistres);
      this.router.navigate(['/choixAide']);
    }
  }
}
