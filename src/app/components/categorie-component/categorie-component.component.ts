import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-categorie-component',
  templateUrl: './categorie-component.component.html',
  styleUrls: ['./categorie-component.component.css']
})
export class CategorieComponentComponent implements OnInit {
  libelle_categorie_selectionne;
  var_choix_images = [];
  rien_choisi;
  nbActivitesOui;
  dataEnfantConnecte;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.libelle_categorie_selectionne = null;
    this.rien_choisi = false;
    this.nbActivitesOui = 0;
    this.dataEnfantConnecte = null;
  }
  ngOnInit() {
    this.getKidInfo();
    
    if(sessionStorage.getItem('kid_libelle_categorie') != ''){
      this.sharedService.setDataChoixCategorie(sessionStorage.getItem('kid_libelle_categorie'));
    }
    this.libelle_categorie_selectionne = this.sharedService.getDataChoixCategorie();

    if(sessionStorage.getItem('nb_choix_categorie') != ''){
      this.sharedService.setNbChoixCategorie(+sessionStorage.getItem('nb_choix_categorie'));
    }
    this.nbActivitesOui = this.sharedService.getNbChoixCategorie();
    if(this.libelle_categorie_selectionne == null){
      sessionStorage.setItem('lastPage', 'choix-categorie');
      this.router.navigate(['/choix-categorie']);
    }
    else if(sessionStorage.getItem('lastPage') != '' && sessionStorage.getItem('lastPage') != 'categories'){
      this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
    }
    else{
      sessionStorage.setItem('lastPage', 'categories');
    }

    this.dataEnfantConnecte = this.sharedService.getDataEnfantConnecte();

    this.initImages(this.libelle_categorie_selectionne);
  }

  initImages(categorie){
    this.api.getAllImagesByLibelle(categorie).subscribe(
      data => {
        for(var activite of data){
          activite['choix'] = null;
          activite['nom_fichier'] = activite.description+".jpg";
          this.var_choix_images.push(activite);
        }
        if(sessionStorage.getItem('dataCategorie') != ''){
          this.sharedService.setDataCategorie(JSON.parse(sessionStorage.getItem('dataCategorie')));
          // si l'enfant reviens sur une catégorie, il faut rétablir ses choix
          if(JSON.stringify(this.sharedService.getDataCategorie()).length != 2){
            var choixImagesToChoix1 = this.sharedService.getDataCategorie();
            var i = 0;
            for(let activite of this.var_choix_images){
              for(let activiteSauvegardee of choixImagesToChoix1){
                if(activiteSauvegardee.image_id == activite.image_id){
                  this.var_choix_images[i] = activiteSauvegardee;
                }
              }
              i++;
            }
          }
        }
      },
      error => {
        console.log(error);
      }
    )
  }
  
  setChoix(i, value){
    this.var_choix_images[i]['choix'] = value;
    var choixImagesToChoix1 = [];
    if(sessionStorage.getItem('dataCategorie') != ''){
    
      this.sharedService.setDataCategorie(JSON.parse(sessionStorage.getItem('dataCategorie')));
      choixImagesToChoix1 = this.sharedService.getDataCategorie();
      var numPresents = [];
      // mettre a jour celles deja présentes
      for(let activite of this.var_choix_images){
        for(let activiteEnregistree of choixImagesToChoix1){
          if(activiteEnregistree.image_id == activite.image_id){
            choixImagesToChoix1[choixImagesToChoix1.indexOf(activiteEnregistree)] = activite;
            numPresents.push(activiteEnregistree.image_id);
          }
        }
      }
      // ajouter les nouvelles
      for(let activite of this.var_choix_images){
        if(numPresents.indexOf(activite.image_id) == -1){
          choixImagesToChoix1.push(activite);
        }
      }
      
    }
    else{
      for(let activite of this.var_choix_images){
        choixImagesToChoix1.push(activite);
      }
    }
    sessionStorage.setItem('dataCategorie', JSON.stringify(choixImagesToChoix1));
    this.sharedService.setDataCategorie(choixImagesToChoix1);



    this.nbActivitesOui = 0;
    for(let activite of this.sharedService.getDataCategorie()){
      if(activite.choix == "oui"){
        this.nbActivitesOui++;
      }
    }
    sessionStorage.setItem('nb_choix_categorie', JSON.stringify(this.nbActivitesOui));
    this.sharedService.setNbChoixCategorie(this.nbActivitesOui);
  }

  onSubmit() {
    if(this.nbActivitesOui >= 1) {
      //création d'une session en db
      var id_enfant = this.dataEnfantConnecte.enfant_id;
      var date_session = new Date();
      var newSession = {};
      newSession['session_id'] = -1;
      newSession['enfant'] = id_enfant;
      newSession['date'] = date_session;
      
      this.api.createSession(newSession).subscribe(
        data => {
          this.sharedService.setDataSession(data);
          this.rien_choisi = false;
          sessionStorage.setItem('kid_session_info', JSON.stringify(data));

          // création question en db
          var session_id = this.sharedService.getDataSession().session_id;
          var nbQuestions = this.sharedService.getDataCategorie().length;
          var i=0;
          for(let activite of this.sharedService.getDataCategorie()){
            var newQuestion = {};
            newQuestion['question_id'] = -1;
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
            
            this.api.createQuestion(newQuestion).subscribe(
              data => {
                i++;
                // ajouter l'id de la question venant de la db, pour l'update a la fin du choix3
                var activites = this.sharedService.getDataCategorie();
                for(let activite of activites){
                  if(activite.image_id == data.image_correspondante){
                    activite['question_id'] = data.question_id;
                  }
                }
                sessionStorage.setItem('dataCategorie', JSON.stringify(activites));
                this.sharedService.setDataCategorie(activites);
                // ne seulement passer au composant suivant si toutes les questions ont été enregistrées en db
                if(i == nbQuestions){
                  sessionStorage.setItem('lastPage', 'choixJaime');
                  this.router.navigate(['/choixJaime']);
                }
              },
              error => {
                console.log(error);
              }
            )
          }
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      sessionStorage.setItem('lastPage', 'categories');
      this.router.navigate(['/categories']);
      this.rien_choisi = true;
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
  }

  getDataCategorie(){
    if(sessionStorage.getItem('dataCategorie') != ''){
      this.sharedService.setDataCategorie(JSON.parse(sessionStorage.getItem('dataCategorie')));
    }
  }

  backToChoix(){
    sessionStorage.setItem('lastPage', 'choix-categorie');
    this.router.navigate(['/choix-categorie']);
  }

  deconnexion(){
    this.deconnecterEnfant((JSON.parse(sessionStorage.getItem('kid_connected'))));
    this.destroyUserCache();
    sessionStorage.setItem('lastPage', '');
    this.router.navigate(['/']);
  }

  destroyUserCache(){
    sessionStorage.setItem('kid_connected', '');
    sessionStorage.setItem('nb_choix_categorie', '');
    sessionStorage.setItem('kid_libelle_categorie', '');
    sessionStorage.setItem('kid_session_info', '');
    sessionStorage.setItem('dataCategorie', '');
    sessionStorage.setItem('lastPage', '');
    this.sharedService.deleteAllData();
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

  @HostListener('window:beforeunload', ['$event'])
  ifExitApp(event) {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant( (JSON.parse(sessionStorage.getItem('kid_connected'))));
      }
    } 
  }
}
