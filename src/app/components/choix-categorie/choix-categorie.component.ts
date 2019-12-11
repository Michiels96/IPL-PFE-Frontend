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
    this.getKidInfo();
    this.nomComplet_enfant = this.sharedService.getDataEnfantConnecte().prenom+" "+this.sharedService.getDataEnfantConnecte().nom;
    //console.log(JSON.stringify(this.sharedService.getDataEnfantConnecte()).length == 2);
    if(JSON.stringify(this.sharedService.getDataEnfantConnecte()).length == 2){
      sessionStorage.setItem('lastPage', '');
      this.router.navigate(['/']);
    }
    if(sessionStorage.getItem('lastPage') != '' && sessionStorage.getItem('lastPage') != 'choix-categorie'){
      this.router.navigate(['/'+sessionStorage.getItem('lastPage')]);
    }
    else{
      sessionStorage.setItem('lastPage', 'choix-categorie');
    }
    this.dataEnfantConnecte = this.sharedService.getDataEnfantConnecte();
    //console.log(this.sharedService.getDataEnfantConnecte());
    console.log(sessionStorage.getItem('nb_choix_categorie'));
    if(sessionStorage.getItem('nb_choix_categorie') != ''){
      this.var_nbActivites = +sessionStorage.getItem('nb_choix_categorie');
    }
    /*
    if(this.sharedService.getNbChoixCategorie() > 0){
      this.var_nbActivites = this.sharedService.getNbChoixCategorie();
    }
    */
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
    //création d'une session
    var id_enfant = this.dataEnfantConnecte.enfant_id;
    var date_session = new Date();
    var newSession = {};
    newSession['session_id'] = -1;
    newSession['enfant'] = id_enfant;
    newSession['date'] = date_session;
    this.api.createSession(newSession).subscribe(
      data => {
        //this.sharedService.setDataSession(data);
        sessionStorage.setItem('kid_session_info', JSON.stringify(data));
        sessionStorage.setItem('lastPage', 'choixJaime');
        this.router.navigate(['/choixJaime']);
      },
      error => {
        console.log(error);
      }
    )
  }

  getKidInfo(){
    console.log(sessionStorage.getItem('kid_connected'));
    if(sessionStorage.getItem('kid_connected') != ''){
      this.sharedService.setDataEnfantConnecte(JSON.parse(sessionStorage.getItem('kid_connected')));
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  ifExitApp(event) {
    if (sessionStorage.length > 0) {
      if(sessionStorage.getItem('kid_connected')!=''){
        this.deconnecterEnfant( (JSON.parse(sessionStorage.getItem('kid_connected'))));
        sessionStorage.setItem('kid_session_info', '');
        console.log("juste après avoir deco");
      }
    } 
      //event.preventDefault();
     //event.returnValue = false;
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
