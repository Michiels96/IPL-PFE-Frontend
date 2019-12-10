import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';


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
    for(var activite of this.var_reponsesQ3){
      activite['indice'] = this.var_numLigne;
      this.var_numLigne++;
    }
    console.log(this.var_reponsesQ3);
  }
 
  generatePDF(){
    /*
    var nomEnfant = this.sharedService.getDataEnfantConnecte().nom;
    nomEnfant = nomEnfant.charAt(0).toUpperCase()+nomEnfant.substr(1, nomEnfant.length);
    var prenomEnfant = this.sharedService.getDataEnfantConnecte().prenom;
    var dateSession = this.sharedService.getDataSession().date;

    if(document.getElementById('tableauDeSynthese')){
      html2canvas(document.getElementById('tableauDeSynthese')).then(function(canvas) {
        var img = canvas.toDataURL("image/png");
        const doc = new jsPDF();
        doc.addImage(img,'PNG',5,20);
        var nomFichier = "resulat-"+prenomEnfant+nomEnfant+"_"+dateSession;
        doc.save(nomFichier+'.pdf');
      });
    }
    */
  }

  @HostListener('window:beforeunload', ['$event'])
  ifExitApp(event) {
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
