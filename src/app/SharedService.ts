import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    dataChoixCategorie;
    nbChoixCategorie;
    dataCategorie;
    
    constructor(){
        this.dataChoixCategorie = {};
        this.nbChoixCategorie = 0;
        this.dataCategorie = {};
    }

    /* 
    composants impliqués: 
    - choix-categorie ==> categorie-component
    */
    getDataChoixCategorie(){
        return this.dataChoixCategorie;
    }

    setDataChoixCategorie(val: object){
        this.dataChoixCategorie = val;
    }
    /*************************/

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

}