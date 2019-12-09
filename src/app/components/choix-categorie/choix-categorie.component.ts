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
  var_nbActivites;
  var_categories = [];
  var_images = [];

  constructor(private api: ApiService, private router:Router, private sharedService: SharedService) { 
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
      this.api.getAllImagesByLibelle(categorie.libelle).subscribe(
        data => {
          for(var activite of data){
            this.var_images.push(activite)
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
    var cast = [cat];
    this.sharedService.setDataChoixCategorie(cast);
    this.router.navigate(['/categories']);
  }

  onSubmit() {
    this.router.navigate(['/choixJaime']);
  }
}
