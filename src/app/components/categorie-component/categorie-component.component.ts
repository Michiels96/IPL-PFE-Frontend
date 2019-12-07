import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorie-component',
  templateUrl: './categorie-component.component.html',
  styleUrls: ['./categorie-component.component.css']
})
export class CategorieComponentComponent implements OnInit {

  images;
  libelle_categorie_selectionne;
 

  constructor(private api: ApiService,private route: ActivatedRoute) { }

  /*getLibelleCategorie = () => {
    console.log("Cat : " + this.categorie_libelle_selectionne);
    this.api.getCategorieByLibelle(this.categorie_libelle_selectionne).subscribe(
      data => {
        console.log(data);
        this.libelle_categorie_selectionne = data;
        console.log("Cat : " + this.categorie_libelle_selectionne);
      },
      error => {
        console.log("Error " + error);
      }
    )
  }*/

  ngOnInit() {
    //this.getLibelleCategorie();
    this.libelle_categorie_selectionne=this.route.snapshot.paramMap.get('cat');
    console.log("CAT");
    console.log(this.libelle_categorie_selectionne);
  }

}
