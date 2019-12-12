import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    dataChoixCategorie;
    nbChoixCategorie;
    dataCategorie;
    dataEnfantConnecte;
    dataSession;
    id_enfant_session;
    id_prof_session;
    
    constructor(){
        this.dataChoixCategorie = "";
        this.nbChoixCategorie = 0;
        this.dataCategorie = {};
        this.dataEnfantConnecte = {};
        this.dataSession = {};
    }

    /* 
    composants impliqués: 
    - choix-categorie ==> categorie-component
    */
    getDataChoixCategorie(){
        return this.dataChoixCategorie;
    }

    setDataChoixCategorie(val: string){
        this.dataChoixCategorie = val;
    }
    /*************************/
    get_enfant_id(){
        return this.id_enfant_session;
    }
    set_enfant_id(nb){
        this.id_enfant_session=nb;
    }
    get_prof_id(){
        return this.id_prof_session;
    }
    set_prof_id(nb){
        this.id_prof_session=nb;
    } 
    /* 
    composants impliqués: 
    - choix-categorie <== categorie-component
    */
    getNbChoixCategorie(){
        return this.nbChoixCategorie;
    }

    setNbChoixCategorie(val: Number){
        this.nbChoixCategorie = val;
    }
    /*************************/

    /* 
    composants impliqués: 
    - categorie-component ==> choix1jaime
    - choix1jaime ==> choix2aide
    - choix2aide ==> choix3content
    */
    getDataCategorie(){
        return this.dataCategorie;
    }
    setDataCategorie(val: object){
        this.dataCategorie = val;
    }
    /*************************/

    /* 
    composants impliqués: 
    - accueil ==> categorie-component
    */
    getDataEnfantConnecte(){
        return this.dataEnfantConnecte;
    }

    setDataEnfantConnecte(val: object){
        this.dataEnfantConnecte = val;
    }
    /*************************/

    /* 
    composants impliqués: 
    - categorie-component ==> choix3content
    */
    getDataSession(){
        return this.dataSession;
    }

    setDataSession(val: object){
        this.dataSession = val;
    }
    /*************************/



    deleteAllData(){
        this.dataChoixCategorie = "";
        this.nbChoixCategorie = 0;
        this.dataCategorie = {};
        this.dataEnfantConnecte = {};
        this.dataSession = {};
    }

}