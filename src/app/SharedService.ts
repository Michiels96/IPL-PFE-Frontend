import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    dataChoixCategorie;
    nbChoixCategorie;
    dataCategorie;
    dataChoix1;
    dataChoix2;
    

    constructor(){
        this.dataChoixCategorie = {};
        this.nbChoixCategorie = 0;
        this.dataCategorie = {};
        this.dataChoix1 = {};
        this.dataChoix2 = {};
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
    - choix-categorie <==> categorie-component
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
    - choix1jaime ==> choix2aide
    */
    getDataChoix1(){
        return this.dataChoix1;
    }

    setDataChoix1(val: object){
        this.dataChoix1 = val;
    }
    /*************************/

    /* 
    composants impliqués: 
    - choix2aide ==> choix3content
    */
    getDataChoix2(){
        return this.dataChoix2;
    }

    setDataChoix2(val: object){
        this.dataChoix2 = val;
    }
    /*************************/
}