import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-choix-categorie',
  templateUrl: './choix-categorie.component.html',
  styleUrls: ['./choix-categorie.component.css']
})
export class ChoixCategorieComponent implements OnInit {

  // Pour que le parent (app.component) transmet à l'enfant(choix_categorie.component)
  // Parent = AccueilComponent
  //@Input() categories_fils;

  var_categories;

  constructor(private api: ApiService) { }

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

  ngOnInit() {
    this.getCategories();
  }

}
