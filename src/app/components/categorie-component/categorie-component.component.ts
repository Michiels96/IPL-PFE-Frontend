import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-categorie-component',
  templateUrl: './categorie-component.component.html',
  styleUrls: ['./categorie-component.component.css']
})
export class CategorieComponentComponent implements OnInit {

  var_images;
  var_libelle_categorie_selectionne;
  @Input() categorie_libelle_selectionne

  constructor(private api: ApiService) { }

  getLibelleCategorie = () => {
    this.api.getCategorieByLibelle(this.categorie_libelle_selectionne).subscribe(
      data => {
        console.log(data);
        this.var_libelle_categorie_selectionne = data;
        console.log("Libelle : " + this.var_libelle_categorie_selectionne);
      },
      error => {
        console.log("Error " + error);
      }
    )
  }

  ngOnInit() {
    this.getLibelleCategorie();
  }

}
