import { Component, OnInit, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix3content',
  templateUrl: './choix3content.component.html',
  styleUrls: ['./choix3content.component.css']
})
export class Choix3contentComponent implements OnInit {
  var_listeQ3 = [];
  var_activitesContentEnregistres = [];
  
  var_i;
  imgBack;
  var_activiteCourante;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.var_i = 0;
    this.imgBack = false;
    this.var_activiteCourante = null;
   }

  ngOnInit() {
    this.getKidInfo();
  
    if(this.sharedService.getDataCategorie().length == undefined){
      sessionStorage.setItem('lastPage', 'choix-categorie');
      this.router.navigate(['/choix-categorie']);
    }
    if(sessionStorage.getItem('lastPage') != '' && sessionStorage.getItem('lastPage') != 'choixContent'){
      this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
    }
    else{
      sessionStorage.setItem('lastPage', 'choixContent');
    }
    // filtrage des images avec le champ 'choix' à 'oui'
    for(var activite of this.sharedService.getDataCategorie()){
      if(activite.choix == "oui"){
        this.var_listeQ3.push(activite);
      }
    }
    this.var_activiteCourante = this.var_listeQ3[0];
  }


  addImgToYes(activite){
    this.imgBack = true;
    this.var_i++;
 
    activite.content = true;
    this.var_activitesContentEnregistres.push(activite);
    this.var_activiteCourante = this.var_listeQ3[this.var_i];

    if(this.var_i == this.var_listeQ3.length){
      this.question3Terminee();
    }
  }

  addImgToNo(activite){
    this.imgBack = true;
    this.var_i++;
 
    activite.content = false;
    this.var_activitesContentEnregistres.push(activite);
    this.var_activiteCourante = this.var_listeQ3[this.var_i];

    if(this.var_i == this.var_listeQ3.length){
      this.question3Terminee();
    }
  }

  goImgBack(){
    if(this.var_i > 0){
      this.var_i--;

      if(this.var_i == 0){
        this.imgBack = false;
      }
      this.var_activitesContentEnregistres.pop();
      this.var_activiteCourante = this.var_listeQ3[this.var_i];
    }
  }

  backToChoix2(){
    var demande = prompt('Attention tes réponses à la question 2 et 3 vont être perdues! Est tu sur? (oui/non)');
    if(demande == "o" || demande == "oui" || demande == "O" || demande == "Oui" || demande == "OUI" || demande == ""){
      sessionStorage.setItem('lastPage', 'choixAide');
      this.router.navigate(['/choixAide']);
    }
  }

  question3Terminee(){
    var imagesSelectionnes = this.sharedService.getDataCategorie();
    var i = 0;
    for(var activite of this.var_activitesContentEnregistres){
      for(var activiteSharedService of imagesSelectionnes){
        if(activiteSharedService.image_id == activite.image_id){
          this.var_activitesContentEnregistres[i] = activiteSharedService;
        }
      }
      i++;
    }
    sessionStorage.setItem('dataCategorie', JSON.stringify(activitesSelectionnes));
    this.sharedService.setDataCategorie(this.var_activitesContentEnregistres);
    // filtrage des images avec le champ 'choix' à 'oui'
    var activitesSelectionnes = [];
    for(var activite of this.sharedService.getDataCategorie()){
      if(activite.choix == "oui"){
        activitesSelectionnes.push(activite);
      }
    }
    sessionStorage.setItem('dataCategorie', JSON.stringify(activitesSelectionnes));
    this.sharedService.setDataCategorie(activitesSelectionnes);

    // upgrade question en db
    var session_id = this.sharedService.getDataSession().session_id;
    var nbQuestions = this.sharedService.getDataCategorie().length;
    var i=0;
    for(var activite of this.sharedService.getDataCategorie()){
      var newQuestion = {};
      newQuestion['question_id'] = activite.question_id;

      newQuestion['session'] = session_id;
      newQuestion['image_correspondante'] = activite.image_id;
      if(activite.choix == "oui"){
        newQuestion['habitude'] = 'O';
      }
      else if(activite.choix == "non"){
        newQuestion['habitude'] = 'N';
      }
      else if(activite.choix == "je voudrais le faire"){
        newQuestion['habitude'] = 'V';
      }




      if(activite.aime == true){
        newQuestion['aime'] = 'O';
      }
      else{
        newQuestion['aime'] = 'N';
      }
      if(activite.aide == true){
        newQuestion['aide'] = 'O';
      }
      else{
        newQuestion['aide'] = 'N';
      }
      if(activite.content == true){
        newQuestion['content'] = 'O';
      }
      else{
        newQuestion['content'] = 'N';
      }
      this.api.updateQuestion(newQuestion).subscribe(
        data => {
          i++;
          // ne seulement passer au composant suivant si toutes les questions ont été enregistrées en db
          if(i == nbQuestions){
            sessionStorage.setItem('lastPage', 'syntheseDesChoix');
            this.router.navigate(['/syntheseDesChoix']);
          }
        },
        error => {
          console.log(error);
        }
      )
    }
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
      },
      error => {
      }
    )
  }
}
