import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorie-component',
  templateUrl: './categorie-component.component.html',
  styleUrls: ['./categorie-component.component.css']
})
export class CategorieComponentComponent implements OnInit {

  var_images;
  var_libelle_categorie_selectionne;

  categories_all;

  @Input() categorie_libelle_selectionne;

  constructor(private api: ApiService,
    private route: ActivatedRoute) { }

  getLibelleCategorie = () => {
    this.api.getCategorieByLibelle(this.categorie_libelle_selectionne).subscribe(
      data => {
        console.log("Data : " + data);
        this.var_libelle_categorie_selectionne = data;
        console.log("Cat : " + this.categorie_libelle_selectionne);
      },
      error => {
        console.log("Error " + error);
      }
    )
  }

  getCategories = () => {
    this.api.getAllCategories().subscribe(
      data => {
        console.log(data);
        this.categories_all = data;
        console.log("categ all 1: " + this.categories_all);
      },
      error => {
        console.log(error);
      }
    )
  }
  ngOnInit() {
   // this.getLibelleCategorie();
    //console.log("categorie_libelle_selectionne : " + this.categorie_libelle_selectionne);
    // this.route.paramMap.subscribe(params => {
    //   this.var_libelle_categorie_selectionne = this.categories_all[+params.get("libelle")];
    // });
    // this.getCategories();
   //this.getLibelleCategorie();
  }

}
