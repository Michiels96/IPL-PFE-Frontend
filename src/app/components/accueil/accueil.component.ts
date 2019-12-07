import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  listeEnfants;
  kid_selected;
  isNotConnected=true;
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getAllEnfants().subscribe(
      data => {
        //console.log(data);
        this.listeEnfants =data;//Array.of(data);
        console.log("enfant");
        console.log(this.listeEnfants);
      },
      error => {
        console.log(error);
      }
    )
  }
  connecterEnfant(){

    console.log("enfant a connecter");
    console.log(this.kid_selected.enfant_id);
    this.api.updateKid(this.kid_selected,true).subscribe(
      data => {
        //console.log(data);
        this.kid_selected = data;
        if(this.kid_selected.connecte==true){
          this.isNotConnected=false;
          console.log("connecté")
        }
        
      },
      error => {
        console.log(error);
      }
    )
    
  }

}
