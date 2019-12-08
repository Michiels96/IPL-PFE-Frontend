import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth/auth.guard';
import {AuthentificatedComponent} from './components/authentificated/authentificated.component';
import {EducateurUIComponent} from './components/educateur-ui/educateur-ui.component';
const routes: Routes = [];
/*const routes: Routes = [
  {
    path: 'authentificated',
    component: AuthentificatedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'ui', component: EducateurUIComponent },
        ],
      }
    ]
  }
];*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
