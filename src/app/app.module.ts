import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import {environment} from '../environments/environment'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConnectionFormComponent } from './components/connection-form/connection-form.component';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ChoixCategorieComponent } from './components/choix-categorie/choix-categorie.component';
import { CategorieComponentComponent } from './components/categorie-component/categorie-component.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EducateurUIComponent } from './components/educateur-ui/educateur-ui.component';
import { AuthGuard } from './auth/auth/auth.guard';
import { Choix1jaimeComponent } from './components/choix1jaime/choix1jaime.component';
import { Choix2aideComponent } from './components/choix2aide/choix2aide.component';
import { Choix3contentComponent } from './components/choix3content/choix3content.component';
import { SharedService } from './SharedService';

@NgModule({
  declarations: [
    AppComponent,
    ChoixCategorieComponent,
    ConnectionFormComponent,
    NavbarComponent,
    CategorieComponentComponent,
    AccueilComponent,
    EducateurUIComponent,
    Choix1jaimeComponent,
    Choix2aideComponent,
    Choix3contentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    //ServiceWorkerModule.register('ngsw-worker.js',{ enabled: environment.production}),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,

    // Permet de faire les differents routerLink 
    RouterModule.forRoot ([
      { path: '', component: AccueilComponent },
      { path: 'choix-categorie', component: ChoixCategorieComponent },
      { path: 'categories', component: CategorieComponentComponent },
      { path: 'connexion', component: ConnectionFormComponent },
      { path: 'ui', component: EducateurUIComponent },
      { path: 'choixJaime', component: Choix1jaimeComponent },
      { path: 'choixAide', component: Choix2aideComponent },
      { path: 'choixContent', component: Choix3contentComponent },
    ])
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
