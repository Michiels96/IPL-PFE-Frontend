import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // connexion backend local
  // baseurl = "http://127.0.0.1:8000";
  // connexion backend en ligne (heroku)
  baseurl ="https://pfe-back-dev.herokuapp.com";
  httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private http: HttpClient) { }
  
  getAllCategories(): Observable<any>{
    return this.http.get(this.baseurl + '/images/categories/', {headers:this.httpHeaders});
  }

  getAllImages(): Observable<any>{
    return this.http.get(this.baseurl + '/images/images/', {headers:this.httpHeaders});
  }

  getAllImagesByLibelle(libelle): Observable<any>{
    return this.http.get(this.baseurl + '/images/repertoire/'+libelle+'/', {headers:this.httpHeaders});
  }
  
  getAllEnfants(): Observable<any>{
    return this.http.get(this.baseurl + '/enfant/enfants/', {headers:this.httpHeaders});
  }
  getLoggedEnfants(): Observable<any>{
    return this.http.get(this.baseurl + '/enfant/logged_enfant/', {headers:this.httpHeaders});
  }
  getUnloggedEnfants(): Observable<any>{
    return this.http.get(this.baseurl + '/enfant/non_logged_enfant/', {headers:this.httpHeaders});
  }
  getAllHandicaps(): Observable<any>{
    return this.http.get(this.baseurl + '/handicaps/', {headers:this.httpHeaders});
  }
  getOneKid(id): Observable<any>{
    return this.http.get(this.baseurl + '/enfant/enfants/'+ id +'/', {headers:this.httpHeaders});
  }
  updateKid(kid,bool): Observable<any>{
    let updateContent={age:kid.age,enfant_id:kid.enfant_id,nom:kid.nom,prenom:kid.prenom,connecte:bool};
    return this.http.put(this.baseurl + '/enfant/enfants/'+ kid.enfant_id +'/',updateContent, {headers:this.httpHeaders});
  }
  postKid(kid): Observable<any>{
    let postContent=JSON.stringify(kid);//{age:kid.age ,enfant_id:5,handicap:1,/*handicaps:kid.handicaps,*/nom:kid.nom,prenom:kid.prenom};
    return this.http.post(this.baseurl + '/enfant/enfants/',postContent, {headers:this.httpHeaders});
  }
  postUser(user): Observable<any>{
    let postContent=JSON.stringify(user);//{age:kid.age ,enfant_id:5,handicap:1,/*handicaps:kid.handicaps,*/nom:kid.nom,prenom:kid.prenom};
    return this.http.post(this.baseurl + '/prof/users/',postContent, {headers:this.httpHeaders});
  }
  delKid(id): Observable<any>{
    
    return this.http.delete(this.baseurl + '/enfant/enfants/'+id+'/',{headers:this.httpHeaders});
  }
  connectUser(user): Observable<any>{
    let postContent=JSON.stringify(user);//{age:kid.age ,enfant_id:5,handicap:1,/*handicaps:kid.handicaps,*/nom:kid.nom,prenom:kid.prenom};
    return this.http.post(this.baseurl + '/prof/login/',postContent, {headers:this.httpHeaders});
  }
}
