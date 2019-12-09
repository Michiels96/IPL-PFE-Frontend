import { Component, OnInit, HostListener } from '@angular/core';
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
    this.ifExitApp();
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
  @HostListener('window:beforeunload', ['$event'])
  ifExitApp() {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant( (JSON.parse(sessionStorage.getItem('kid_connected'))));
        
      }
    } 
      //event.preventDefault();
     //event.returnValue = false;
  }
  deconnecterEnfant(kid){
    this.api.updateKid(kid,false).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}
