import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choix1jaime',
  templateUrl: './choix1jaime.component.html',
  styleUrls: ['./choix1jaime.component.css']
})
export class Choix1jaimeComponent implements OnInit {
  var_imagesByLibelle = [];
  constructor(private api: ApiService,private router:Router) { }

  getAllImagesByLibelle = () => {
    this.api.getAllImages().subscribe(
      data => {
        console.log("BEFORE TRI "+data);
        for(var key in data){
          //console.log(data[key].categorie_image);
          if(data[key].categorie_image == "deplacements"){
            data[key].description = data[key].description+".jpg";
            this.var_imagesByLibelle.push(data[key]); 
          }
        }
        console.log("AFTER TRI "+JSON.stringify(this.var_imagesByLibelle));
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit() {
    this.getAllImagesByLibelle();
  }

}
