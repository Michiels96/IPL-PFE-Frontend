import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix3content',
  templateUrl: './choix3content.component.html',
  styleUrls: ['./choix3content.component.css']
})
export class Choix3contentComponent implements OnInit {

  var_activitesAimees;
  var_activitesPasAimees;

  constructor(private api: ApiService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    if(this.sharedService.getDataChoix1().length == null){
      this.router.navigate(['/choixJaime']);
    }

    this.var_activitesAimees = this.sharedService.getDataChoix1()[0];
    this.var_activitesPasAimees = this.sharedService.getDataChoix1()[1];
  }

}
