import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  enfants = [];
  handicap = [];

  constructor(private api: ApiService){
    this.getEnfants();
  }
  getEnfants = () => {
    this.api.getAllHandicaps().subscribe(
      data => {
        console.log(data);
        this.handicap = data;
      },
      error => {
        console.log(error);
      }
    )
    this.api.getAllEnfants().subscribe(
      data => {
        console.log(data);
        this.enfants = data;
      },
      error => {
        console.log(error);
      }
    )
  }
}
