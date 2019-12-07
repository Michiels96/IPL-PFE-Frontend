import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choix1jaime',
  templateUrl: './choix1jaime.component.html',
  styleUrls: ['./choix1jaime.component.css']
})
export class Choix1jaimeComponent implements OnInit {
  var_imagesByLibelle = [];
  var_imagesAimees = [];
  var_imagesPasAimees = [];
  var_imagesEnregistrees = [this.var_imagesAimees, this.var_imagesPasAimees];
  var_activiteCourante;
  constructor(private api: ApiService,private router:Router) {}
  
  ngOnInit() {
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
        console.log("AFTER TRI "+JSON.stringify(this.var_imagesByLibelle));
      },
      error => {
        console.log(error);
      }
    )
  }

  addImgToYes(activite){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_imagesEnregistrees[this.var_imagesAimees.push(activite)];
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      console.log("trop loin oui")
    }
    
  }

  addImgToNo(activite){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_imagesEnregistrees[this.var_imagesPasAimees.push(activite)];
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      console.log("trop loin non")
    }
  }

  imgBypass(){
    if(this.var_activiteCourante.image_id < this.var_imagesByLibelle.length){
      this.var_activiteCourante = this.var_imagesByLibelle[this.var_activiteCourante.image_id];  
    }
    else{
      console.log("trop loin bypass")
    }
  }

}
