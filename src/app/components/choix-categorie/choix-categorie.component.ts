import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/SharedService';
import { Router } from '@angular/router';


@Component({
  selector: 'app-choix-categorie',
  templateUrl: './choix-categorie.component.html',
  styleUrls: ['./choix-categorie.component.css']
})
export class ChoixCategorieComponent implements OnInit {

  
  var_images;
  cpt;
  cat_libelle;
  var_nbActivites;

  var_categories = [];
  var_choix_images = [];

  constructor(private api: ApiService, private router:Router, private sharedService: SharedService) { 
    this.cpt = 0;
    this.cat_libelle = "";
    this.var_nbActivites = 0;
  }

  ngOnInit() {
    if(this.sharedService.getNbChoixCategorie() > 0){
      this.var_nbActivites = this.sharedService.getNbChoixCategorie();
    }
    this.getCategories();
  }

  getImages(){
    
    for(var categorie of this.var_categories){
      // A CORRIGER PAR CEUX DU BACKEND!!!
      if(categorie.libelle == "soinspersonnels"){
        categorie.libelle = "soinspersonnnels"
      }
      this.api.getAllImagesByLibelle(categorie.libelle).subscribe(
        data => {
          for(var activite of data){
            this.var_choix_images.push(activite)
            // uniquement 1ere image nécessaire
            break;
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  getCategories = () => {
    this.api.getAllCategories().subscribe(
      data => {
        this.var_categories = data;
        this.getImages();
      },
      error => {
        console.log(error);
      }
      
    )
  }

  getCat(cat){
    this.cat_libelle = cat.libelle;
    var cast = [this.cat_libelle];
    this.sharedService.setDataChoixCategorie(cast);
    this.router.navigate(['/categories']);
  }

  onSubmit() {
    this.router.navigate(['/choixJaime']);
  }
}
