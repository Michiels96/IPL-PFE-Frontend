import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix1jaime',
  templateUrl: './choix1jaime.component.html',
  styleUrls: ['./choix1jaime.component.css']
})
export class Choix1jaimeComponent implements OnInit {
  var_imagesCategorieDemandees = [];
  var_activitesEnregistres = [];
  var_activiteCourante;
  var_i;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.var_activiteCourante = null;
    this.var_i = 0;
  }
  
  ngOnInit() {
    this.getKidInfo();
  
    if(this.sharedService.getDataCategorie().length == undefined){
      sessionStorage.setItem('lastPage', 'choix-categorie');
      this.router.navigate(['/choix-categorie']);
    }
    if(sessionStorage.getItem('lastPage') != '' && sessionStorage.getItem('lastPage') != 'choixJaime'){
      this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
    }
    else{
      sessionStorage.setItem('lastPage', 'choixJaime');
    }
    // filtrage des images avec le champ 'choix' à 'oui'
    for(var activite of this.sharedService.getDataCategorie()){
      if(activite.choix == "oui"){
        this.var_imagesCategorieDemandees.push(activite);
      }
    }
    this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];
  }

  addImgToYes(activite){
    if(this.var_i < this.var_imagesCategorieDemandees.length){
      activite.aime = true;
      this.var_activitesEnregistres.push(activite);
      this.var_i++;
      this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];
      if(this.var_i == this.var_imagesCategorieDemandees.length){  
        this.question1Terminee();
      }
    }
  }

  addImgToNo(activite){
    if(this.var_i <= this.var_imagesCategorieDemandees.length){
      activite.aime = false;
      this.var_activitesEnregistres.push(activite);
      this.var_i++;
      this.var_activiteCourante = this.var_imagesCategorieDemandees[this.var_i];  
      if(this.var_i == this.var_imagesCategorieDemandees.length){  
        this.question1Terminee();
      }
    }
  }

  backToChoixCategorie(){
    sessionStorage.setItem('lastPage', 'categories');
    this.router.navigate(['/categories']);
  }

  question1Terminee(){
    var imagesSelectionnes = this.sharedService.getDataCategorie();
    var i = 0;
    for(var activiteSharedService of imagesSelectionnes){
      for(var activite of this.var_activitesEnregistres){
        if(activite.image_id == activiteSharedService.image_id){
          imagesSelectionnes[i] = activite;
        }
      }
      i++;
    }

    sessionStorage.setItem('dataCategorie', JSON.stringify(imagesSelectionnes));
    this.sharedService.setDataCategorie(imagesSelectionnes);
    sessionStorage.setItem('lastPage', 'choixAide');
    this.router.navigate(['/choixAide']);
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
      this.router.navigate(['/choix-categorie']);
    }
  }

  deconnecterEnfant(kid){
    this.api.updateKid(kid,false).subscribe(
      data => {
      },
      error => {
      }
    )
  }
  @HostListener('window:beforeunload', ['$event'])
  ifExitApp(event) {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant( (JSON.parse(sessionStorage.getItem('kid_connected'))));
        
      }
    } 
  }
}
