import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { autoTable as AutoTable } from 'jspdf-autotable';

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
    this.getKidInfo();

    if(this.sharedService.getDataCategorie().length == undefined){
      sessionStorage.setItem('lastPage', 'choix-categorie');
      this.router.navigate(['/choix-categorie']);
    }
    if(sessionStorage.getItem('lastPage') != '' && sessionStorage.getItem('lastPage') != 'syntheseDesChoix'){
      this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
    }
    else{
      sessionStorage.setItem('lastPage', 'syntheseDesChoix');
    }
    this.var_reponsesQ3 = this.sharedService.getDataCategorie();
    for(var activite of this.var_reponsesQ3){
      activite['indice'] = this.var_numLigne;
      this.var_numLigne++;
    }
  }
 
  generatePDF(){
    var nomEnfant = this.sharedService.getDataEnfantConnecte().nom;
    nomEnfant = nomEnfant.charAt(0).toUpperCase()+nomEnfant.substr(1, nomEnfant.length);
    var prenomEnfant = this.sharedService.getDataEnfantConnecte().prenom;
    var dateSession = this.sharedService.getDataSession().date;
    var head = [['N°', 
    'Intitulé', 
    'Aime/N\'aime pas', 
    'Besoin d\'aide/Pas besoin d\'aide',
    'Satisfaction'
    ]];

    var data = [[]];
    for(var i = 0; i <  this.var_reponsesQ3.length; i++){
      data[i] = [];
    }
    for(var i = 0; i < this.var_reponsesQ3.length;i++){
      data[i][0] = this.var_reponsesQ3[i].indice;
      data[i][1] = this.var_reponsesQ3[i].description;
      if(this.var_reponsesQ3[i].aime){
        data[i][2] = 'aime';
      }
      else{
        data[i][2] = 'n\'aime pas';
      }
      if(this.var_reponsesQ3[i].aide){
        data[i][3] = 'a besoin d\'aide';
      }
      else{
        data[i][3] = 'n\'a pas besoin d\'aide';
      }
      if(this.var_reponsesQ3[i].content){
        data[i][4] = 'est satisfait';
      }
      else{
        data[i][4] = 'n\'est pas satisfait';
      }
    }
    const doc = new jsPDF();
    
    var nomComplet = prenomEnfant.toUpperCase()+" "+nomEnfant.toUpperCase();
    ((doc as any).autoTable as AutoTable)({
        head: head,
        body: data,
        didDrawCell: data => {},
    });
    //let finalY = doc.autoTable; // The y position on the page
    //var date = new Date();
    const date: Date = new Date(dateSession);

    doc.text("réponses du test de "+nomComplet+
    "\nle "+ (date.getUTCMonth()+1)+"-"+ date.getUTCDate()+"-"+date.getUTCFullYear()+
    " à "+ (date.getUTCHours()+2) + ":"+date.getUTCMinutes(),10, 285);
    var nomFichier = "resulat-"+prenomEnfant+nomEnfant+"_"+dateSession;
    doc.save(nomFichier+'.pdf');
  }

  getKidInfo(){
    if(sessionStorage.getItem('kid_connected') != ''){
      this.sharedService.setDataEnfantConnecte(JSON.parse(sessionStorage.getItem('kid_connected')));
      this.getKidSessionInfo();
    }
    if(JSON.stringify(this.sharedService.getDataEnfantConnecte()).length == 2){
      sessionStorage.setItem('lastPage', '');
      this.router.navigate(['/']);
    }
  }

  getKidSessionInfo(){
    if(sessionStorage.getItem('kid_session_info') != ''){
      this.sharedService.setDataSession(JSON.parse(sessionStorage.getItem('kid_session_info')));
      this.getDataCategorie();
    }
    else{
      sessionStorage.setItem('nb_choix_categorie', '');
      sessionStorage.setItem('kid_libelle_categorie', '');
      sessionStorage.setItem('kid_session_info', '');
      sessionStorage.setItem('dataCategorie', '');
      sessionStorage.setItem('lastPage', 'choix-categorie');
      this.sharedService.deleteAllData();
      this.router.navigate(['/choix-categorie']);
    }
  }

  getDataCategorie(){
    if(sessionStorage.getItem('dataCategorie') != ''){
      this.sharedService.setDataCategorie(JSON.parse(sessionStorage.getItem('dataCategorie')));
    }
    else{
      sessionStorage.setItem('nb_choix_categorie', '');
      sessionStorage.setItem('kid_libelle_categorie', '');
      sessionStorage.setItem('kid_session_info', '');
      sessionStorage.setItem('dataCategorie', '');
      sessionStorage.setItem('lastPage', 'choix-categorie');
      this.sharedService.deleteAllData();
      this.router.navigate(['/choix-categorie']);
    }
  }

  goToLivret(){
    sessionStorage.setItem('lastPage', 'livret');
    this.router.navigate(['/livret']);
  }

  deconnexion(){
    this.deconnecterEnfant((JSON.parse(sessionStorage.getItem('kid_connected'))));
    sessionStorage.setItem('lastPage', '');
    this.router.navigate(['/']);
  }

  @HostListener('window:beforeunload', ['$event'])
  ifExitApp(event) {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant( (JSON.parse(sessionStorage.getItem('kid_connected'))));
        
      }
    } 
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
