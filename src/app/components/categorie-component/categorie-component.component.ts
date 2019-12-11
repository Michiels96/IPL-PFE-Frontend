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
  // libelle_categorie_selectionne: choix-categorie ==> categorie-component 
  libelle_categorie_selectionne;
  var_choix_images = [];
  rien_choisi;
  nbActivitesOui;
  dataEnfantConnecte;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) {
    this.libelle_categorie_selectionne = null;
    this.rien_choisi = false;
    this.nbActivitesOui = 0;
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
    if(sessionStorage.getItem('lastPage') != '' && sessionStorage.getItem('lastPage') != 'categories'){
      this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
    }
    else{
      sessionStorage.setItem('lastPage', 'categories');
    }
    this.dataEnfantConnecte = this.sharedService.getDataEnfantConnecte();
    console.log("SHAREDSERVICE - DATA-ENFANTCONNECTE  "+JSON.stringify(this.dataEnfantConnecte));
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
        //console.log("77 "+JSON.stringify(this.sharedService.getDataCategorie()));
        if(sessionStorage.getItem('dataCategorie') != ''){
          this.sharedService.setDataCategorie(JSON.parse(sessionStorage.getItem('dataCategorie')));
        }
        // si l'enfant reviens sur une catégorie, il faut rétablir ses choix
        if(JSON.stringify(this.sharedService.getDataCategorie()).length != 2){
          var choixImagesToChoix1 = this.sharedService.getDataCategorie();
          var i = 0;
          for(var activite of this.var_choix_images){
            for(var activiteSauvegardee of choixImagesToChoix1){
              if(activiteSauvegardee.image_id == activite.image_id){
                this.var_choix_images[i] = activiteSauvegardee;
              }
            }
            i++;
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
    if(JSON.stringify(this.sharedService.getDataCategorie()).length != 2){
     
      choixImagesToChoix1 = this.sharedService.getDataCategorie();
      for(var activite of this.var_choix_images){
        //retrouver les images deja ajoutées
        if(choixImagesToChoix1.includes(activite)){
          // et mettre à jour
          choixImagesToChoix1[choixImagesToChoix1.indexOf(activite)] = activite;
        }
        else{
          // et ajouter les nouvelles
          choixImagesToChoix1.push(activite);
        }
      }
    }
    else{
      for(var activite of this.var_choix_images){
        choixImagesToChoix1.push(activite);
      }
    }
    sessionStorage.setItem('dataCategorie', JSON.stringify(choixImagesToChoix1));
    console.log(JSON.stringify(choixImagesToChoix1));
    this.sharedService.setDataCategorie(choixImagesToChoix1);
    this.nbActivitesOui = 0;
    for(var activite of this.sharedService.getDataCategorie()){
      if(activite.choix == "oui"){
        this.nbActivitesOui++;
      }
    }
    //console.log("nb oui : ", this.nbActivitesOui);
    sessionStorage.setItem('nb_choix_categorie', JSON.stringify(this.nbActivitesOui));
    this.sharedService.setNbChoixCategorie(this.nbActivitesOui);
  }

  onSubmit() {
    //console.log("Choix images : ", this.var_choix_images);
    if(this.nbActivitesOui >= 1) {
      //création d'une session
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
          sessionStorage.setItem('lastPage', 'choixJaime');
          this.router.navigate(['/choixJaime']);
        },
        error => {
          console.log(error);
        }
      )
    }
    else{
      this.router.navigate(['/categories']);
      this.rien_choisi = true;
    }
  }

  getKidInfo(){
    console.log(sessionStorage.getItem('kid_connected'));
    if(sessionStorage.getItem('kid_connected') != ''){
      this.sharedService.setDataEnfantConnecte(JSON.parse(sessionStorage.getItem('kid_connected')));
    }
    if(JSON.stringify(this.sharedService.getDataEnfantConnecte()).length == 2){
      sessionStorage.setItem('lastPage', '');
      this.router.navigate(['/']);
    }
  }

  backToChoix(){
    sessionStorage.setItem('lastPage', 'choix-categorie');
    this.router.navigate(['/choix-categorie']);
  }

  deconnexion(){
    sessionStorage.setItem('lastPage', '');
    this.router.navigate(['/']);
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
      //event.preventDefault();
     //event.returnValue = false;
  }
}
