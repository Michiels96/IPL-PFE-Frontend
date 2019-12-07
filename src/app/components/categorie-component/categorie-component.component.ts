import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorie-component',
  templateUrl: './categorie-component.component.html',
  styleUrls: ['./categorie-component.component.css']
})
export class CategorieComponentComponent implements OnInit {
  
  var_images;
  libelle_categorie_selectionne;
  constructor(private api: ApiService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.libelle_categorie_selectionne=this.route.snapshot.paramMap.get('cat');
    this.getImages();
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

}
