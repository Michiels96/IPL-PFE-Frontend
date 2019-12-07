import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-choix-categorie',
  templateUrl: './choix-categorie.component.html',
  styleUrls: ['./choix-categorie.component.css']
})
export class ChoixCategorieComponent implements OnInit {

  var_categories;
  var_images;

  cat_libelle="";
  constructor(private api: ApiService,private router:Router) { }

  getCategories = () => {
    this.api.getAllCategories().subscribe(
      data => {
        console.log(data);
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
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
    this.getCategories();
    this.getImages();
  }

  getCat(cat){
    this.cat_libelle=cat.libelle;
    console.log("libelle:");
    console.log(this.cat_libelle);
    this.router.navigate(['/categories',{cat:this.cat_libelle}]);
  }
}
