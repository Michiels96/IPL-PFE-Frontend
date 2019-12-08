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
  var_choix_images = [];

  
  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.libelle_categorie_selectionne = null;
  }
  

  ngOnInit() {
    this.libelle_categorie_selectionne = this.sharedService.getDataChoixCategorie()[0];
    if(this.libelle_categorie_selectionne == null){
      this.router.navigate(['/choix-categorie']);
    }

    this.initImages(this.libelle_categorie_selectionne);
  }

  initImages(categorie){
    this.api.getAllImages().subscribe(
      data => {
        for(var activite of data){
          if(activite.categorie_image == categorie){
            activite['choix'] = null;
            this.var_choix_images.push(activite);
          }
        }
        console.log("77 "+JSON.stringify(this.sharedService.getDataCategorie()));
        // si l'enfant reviens sur une catégorie, il faut rétablir ses choix
        if(JSON.stringify(this.sharedService.getDataCategorie()).length != 2){
          var choixImagesToChoix1 = this.sharedService.getDataCategorie();
          var i = 0;
          for(var activite of this.var_choix_images){
            for(var activiteSauvegardee of choixImagesToChoix1){
              if(activiteSauvegardee.image_id == activite.image_id){
                this.var_choix_images[i] = activiteSauvegardee;
              }
            }
            i++;
          }

        }
      },
      error => {
        console.log(error);
      }
    )

  }
  
  setChoix(i, value){
    this.var_choix_images[i]['choix'] = value;
    var choixImagesToChoix1 = [];
    if(JSON.stringify(this.sharedService.getDataCategorie()).length != 2){
      choixImagesToChoix1 = this.sharedService.getDataCategorie();
      for(var activite of this.var_choix_images){
        //retrouver les images deja ajoutées
        if(choixImagesToChoix1.includes(activite)){
          // et mettre à jour
          choixImagesToChoix1[choixImagesToChoix1.indexOf(activite)] = activite;
        }
        else{
          // et ajouter les nouvelles
          if(activite.choix == "oui"){
            choixImagesToChoix1.push(activite);
          }
        }
      }
    }
    else{
      for(var activite of this.var_choix_images){
        if(activite.choix == "oui"){
          choixImagesToChoix1.push(activite);
        }
      }
    }
    this.sharedService.setDataCategorie(choixImagesToChoix1);
    console.log(choixImagesToChoix1);
  }

  onSubmit() {
    console.log("Choix images : ", this.var_choix_images);
    this.router.navigate(['/choixJaime']);
  }

}
