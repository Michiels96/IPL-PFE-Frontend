import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';


@Component({
  selector: 'app-synthese-des-choix',
  templateUrl: './synthese-des-choix.component.html',
  styleUrls: ['./synthese-des-choix.component.css']
})
export class SyntheseDesChoixComponent implements OnInit {
  var_reponsesQ3 = [];
  var_numLigne;


  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.var_numLigne = 1;
  }

  ngOnInit() {
    if(this.sharedService.getDataCategorie().length == undefined){
      this.router.navigate(['/categories']);
    }
    this.var_reponsesQ3 = this.sharedService.getDataCategorie();
    console.log(this.var_reponsesQ3);
  }


  numLignePlus(){
    this.var_numLigne++;
  }

  numLigneMoins(){
    this.var_numLigne--;
  }

}
