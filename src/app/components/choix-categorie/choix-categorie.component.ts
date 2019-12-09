import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/SharedService';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-choix-categorie',
  templateUrl: './choix-categorie.component.html',
  styleUrls: ['./choix-categorie.component.css']
})
export class ChoixCategorieComponent implements OnInit {
  kid_nomComplet;

  var_categories;
  var_images;
  cpt;
  cat_libelle;
  var_nbActivites;

  constructor(private api: ApiService, private router:Router, private sharedService: SharedService, private route: ActivatedRoute) { 
    this.cpt = 0;
    this.cat_libelle = "";
    this.var_nbActivites = 0;
  }

  getCategories = () => {
    this.api.getAllCategories().subscribe(
      data => {
        this.var_categories = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  getImages = () => {
    this.api.getAllImages().subscribe(
      data => {
        this.var_images = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmit() {
    this.router.navigate(['/choixJaime']);
  }

  ngOnInit() {
    this.kid_nomComplet= this.route.snapshot.paramMap.get('nom_enfant');
    if(this.sharedService.getNbChoixCategorie() > 0){
      this.var_nbActivites = this.sharedService.getNbChoixCategorie();
    }
    this.getCategories();
    this.getImages();
    this.compteurPlus();
    this.compteurReset();
  }

  getCat(cat){
    this.cat_libelle=cat.libelle;
    var cast = [this.cat_libelle];
    this.sharedService.setDataChoixCategorie(cast);
    this.router.navigate(['/categories']);
  }

  compteurPlus() {
    this.cpt++;
  }

  compteurReset() {
    this.cpt = 0;
  }
}
