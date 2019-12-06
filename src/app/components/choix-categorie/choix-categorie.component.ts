import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-choix-categorie',
  templateUrl: './choix-categorie.component.html',
  styleUrls: ['./choix-categorie.component.css']
})
export class ChoixCategorieComponent implements OnInit {

  // Pour que le parent (app.component) transmet à l'enfant(choix_categorie.component)
  @Input() categories_fils;
  constructor() { }

  ngOnInit() {
  }

}
