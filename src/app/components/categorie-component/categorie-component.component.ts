import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-categorie-component',
  templateUrl: './categorie-component.component.html',
  styleUrls: ['./categorie-component.component.css']
})
export class CategorieComponentComponent implements OnInit {
  var_images;
  // libelle_categorie_selectionne: choix-categorie ==> categorie-component 
  libelle_categorie_selectionne;
  choix_images = [];

  
  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {}
  

  ngOnInit() {
    
    this.libelle_categorie_selectionne = this.sharedService.getDataChoixCategorie()[0];
    if(this.libelle_categorie_selectionne == null){
      this.sharedService.setDataCategorie(null);
      this.router.navigate(['/choix-categorie']);
    }
    console.log(this.sharedService.getDataCategorie());
    this.initImages(this.libelle_categorie_selectionne);
    // si l'enfant a deja selectionné des activités d'autre catégories
    
    if(this.sharedService.getDataCategorie().length != 1){
      this.choix_images = this.sharedService.getDataCategorie();
      console.log("selection recuperée !!! "+this.choix_images);
    }
  }

  initImages(image){
    this.api.getAllImages().subscribe(
      data => {
        this.var_images = data;
        for(let img of this.var_images){
          if(img.categorie_image == image){
            img['choix'] = null;
            this.choix_images.push(img);
          }
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  
  setChoix(i, value){
    this.choix_images[i]['choix'] = value;
  }

  onSubmit() {
    console.log("Choix images : ", this.choix_images);
    var choixImagesToChoix1 = [];
    for(var activite of this.choix_images){
      if(activite.choix == "oui"){
        choixImagesToChoix1.push(activite);
      }
    }
    this.sharedService.setDataCategorie(choixImagesToChoix1);
    this.router.navigate(['/choixJaime']);
  }

}
