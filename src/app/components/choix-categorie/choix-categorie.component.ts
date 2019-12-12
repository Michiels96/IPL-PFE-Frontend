import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { SharedService } from 'src/app/SharedService';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-choix-categorie',
  templateUrl: './choix-categorie.component.html',
  styleUrls: ['./choix-categorie.component.css']
})
export class ChoixCategorieComponent implements OnInit {
  var_nbActivites;
  var_categories = [];
  var_images = [];
  nomComplet_enfant;
  dataEnfantConnecte;


  constructor(private api: ApiService, private router:Router, private sharedService: SharedService, private route: ActivatedRoute) { 
    this.var_nbActivites = 0;
  }

  ngOnInit() {
    if(sessionStorage.getItem('lastPage') != '' && sessionStorage.getItem('lastPage') != 'choix-categorie'){
      this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
    }
    else{
      sessionStorage.setItem('lastPage', 'choix-categorie');
    }
    this.getKidInfo();
    this.nomComplet_enfant = this.sharedService.getDataEnfantConnecte().prenom+" "+this.sharedService.getDataEnfantConnecte().nom;
    this.dataEnfantConnecte = this.sharedService.getDataEnfantConnecte();

    if(sessionStorage.getItem('nb_choix_categorie') != ''){
      this.var_nbActivites = +sessionStorage.getItem('nb_choix_categorie');
    }
    this.getCategories();
  }

  getImages(){
    for(var categorie of this.var_categories){
      this.api.getAllImagesByLibelle(categorie.libelle).subscribe(
        data => {
          for(var activite of data){
            this.var_images.push(activite)
            // uniquement 1ere image nécessaire
            break;
          }
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  getCategories = () => {
    this.api.getAllCategories().subscribe(
      data => {
        this.var_categories = data;
        this.getImages();
      },
      error => {
        console.log(error);
      }
    )
  }

  getCat(cat){
    this.sharedService.setDataChoixCategorie(cat);
    sessionStorage.setItem('kid_libelle_categorie', cat);
    sessionStorage.setItem('lastPage', 'categories');
    this.router.navigate(['/categories']);
  }

  onSubmit() {
    //création d'une session en db
    var id_enfant = this.dataEnfantConnecte.enfant_id;
    var date_session = new Date();
    var newSession = {};
    newSession['session_id'] = -1;
    newSession['enfant'] = id_enfant;
    newSession['date'] = date_session;
    this.api.createSession(newSession).subscribe(
      data => {
        sessionStorage.setItem('kid_session_info', JSON.stringify(data));
        this.sharedService.setDataSession(data);


        // création question en db
        var session_id = this.sharedService.getDataSession().session_id;
        var nbQuestions = this.sharedService.getDataCategorie().length;
        var i=0;
        for(var activite of this.sharedService.getDataCategorie()){
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
              for(var activite of activites){
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
    )
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

  @HostListener('window:beforeunload', ['$event'])
  ifExitApp(event) {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant( (JSON.parse(sessionStorage.getItem('kid_connected'))));
        sessionStorage.setItem('kid_session_info', '');
      }
    } 
  }
  deconnecterEnfant(kid){
    this.api.updateKid(kid,false).subscribe(
      data => {
        console.log("encore deconnecté");
      },
      error => {
        console.log(error);
      }
    )
  }
}
