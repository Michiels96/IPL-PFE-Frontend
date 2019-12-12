import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpBackend, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable} from 'rxjs';


Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        req = req.clone({
        withCredentials: true
      });
      
      return next.handle(req);
  }
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // connexion backend local
  // baseurl = "http://127.0.0.1:8000"; //locahost:4200
  // connexion backend en ligne (heroku)
  baseurl ="https://pfe-back-dev.herokuapp.com";
 // httpHeaders = new HttpHeaders().set(InterceptorSkipHeader, '');/*
 
 httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'
 /*,'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
'Access-Control-Allow-Headers': '*',/'withCredentials': 'true' */});
  private http: HttpClient;
  constructor(/*private http: HttpClient*/ handler: HttpBackend) {
    this.http = new HttpClient(handler);
   }
  
  getAllCategories(): Observable<any>{
    return this.http.get(this.baseurl + '/images/categories/', {headers:this.httpHeaders});
  }

  getAllImages(): Observable<any>{
    return this.http.get(this.baseurl + '/images/images/', {headers:this.httpHeaders});
  }

  getAllImagesByLibelle(libelle): Observable<any>{
    return this.http.get(this.baseurl + '/images/'+libelle+'/', {headers:this.httpHeaders});
  }
  getAllSessions(): Observable<any>{
    return this.http.get(this.baseurl + '/sessions/full_sessions/', {headers:this.httpHeaders});
  }
  getSessionsById(id): Observable<any>{
    return this.http.get(this.baseurl + '/sessions/enfant_full_sessions/'+ id +'/', {headers:this.httpHeaders});
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
    let postContent={enfant_id:kid.id,nom:kid.nom,prenom:kid.prenom,age:kid.age,connecte:false}//JSON.stringify(kid);
    return this.http.post(this.baseurl + '/enfant/enfants/', postContent, {headers:this.httpHeaders});
  }
  postInfosKid(kid,id): Observable<any>{
    let postContent={enfant:id,date_naissance:kid.date_naissance,langue:kid.langue,
      dominance:kid.dominance,scolarite:kid.scolarite,type_enseignement:kid.type, 
      niveau_scolaire:kid.niveau,besoin_particulier:kid.besoin_particulier, autre_besoin_particulier:kid.autre_besoin_particulier}//JSON.stringify(kid);
    return this.http.post(this.baseurl + '/enfant/info_supplementaire/', postContent, {headers:this.httpHeaders});
  }
  //date_naissance:kid.date_naissance,langue:kid.langue,dominance:kid.dominance,scolarite:kid.scolarite,type:kid.type, niveau:kid.niveau,besoin_particulier:kid.besoin_particulier, autre_besoin_particulier:kid.autre_besoin_particulier
  createSession(session): Observable<any>{
    let postContent = JSON.stringify(session);
    return this.http.post(this.baseurl + '/sessions/sessions/',postContent, {headers:this.httpHeaders});
  }
  createQuestion(question): Observable<any>{
    let postContent = JSON.stringify(question);
    return this.http.post(this.baseurl + '/sessions/questions/',postContent, {headers:this.httpHeaders});
  }
  getQuestionById(id): Observable<any>{
    return this.http.get(this.baseurl + '/sessions/questions/'+ id +'/', {headers:this.httpHeaders});
  }
  updateQuestion(question): Observable<any>{
    let updateContent={
      question_id:question.question_id,
      session:question.session,
      image_correspondante:question.image_correspondante,
      habitude:question.habitude,
      aime:question.aime,
      aide:question.aide,
      content:question.content
    };
    return this.http.put(this.baseurl + '/sessions/questions/'+ question.question_id +'/',updateContent, {headers:this.httpHeaders});
  }
  

  getUser(id): Observable<any>{
    return this.http.get(this.baseurl + '/prof/users/' + id +'/', {headers:this.httpHeaders});
  }
  postUser(user): Observable<any>{
    let postContent={id: user.id,username:user.email,password:user.password,email:user.email}//JSON.stringify(user);
    return this.http.post(this.baseurl + '/prof/users/',postContent, {headers:this.httpHeaders});
  }
  postProf(prof,id_user): Observable<any>{
    let postContent={nom:prof.nom,prenom:prof.prenom,profession:prof.profession,autre_profession:prof.autre,telephone:prof.telephone,user:id_user};
    return this.http.post(this.baseurl + '/prof/professionnels/',postContent, {headers:this.httpHeaders});
  }
  postContact(tuteur,id_enfant): Observable<any>{
    let postContent={personne_id:-1,prenom:tuteur.prenom,nom:tuteur.nom,email:tuteur.email,telephone:tuteur.tel,relation:tuteur.statut,enfant:id_enfant};
    return this.http.post(this.baseurl + '/enfant/personne_contact/',postContent, {headers:this.httpHeaders});
  }
  delKid(id): Observable<any>{
    return this.http.delete(this.baseurl + '/enfant/enfants/'+id+'/',{headers:this.httpHeaders});
  }
  connectUser(user): Observable<any>{
    let postContent=JSON.stringify(user);//{age:kid.age ,enfant_id:5,handicap:1,/*handicaps:kid.handicaps,*/nom:kid.nom,prenom:kid.prenom};
    return this.http.post(this.baseurl + '/prof/login/',postContent, {headers:this.httpHeaders});
  }
  getFullSessionById(id): Observable<any>{
    return this.http.get(this.baseurl + '/sessions/full_sessions/' + id + '/', {headers:this.httpHeaders});
  }
  postNote(note): Observable<any>{
    let postContent = JSON.stringify(note);
    return this.http.post(this.baseurl + '/sessions/notes/',postContent, {headers:this.httpHeaders});
  }
  postMandataire(mandataire): Observable<any>{
    let postContent = JSON.stringify(mandataire);
    return this.http.post(this.baseurl + '/sessions/mandataires/',postContent, {headers:this.httpHeaders});
  }
}
