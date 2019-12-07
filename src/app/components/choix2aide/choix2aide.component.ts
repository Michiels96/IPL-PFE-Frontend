import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/SharedService';

@Component({
  selector: 'app-choix2aide',
  templateUrl: './choix2aide.component.html',
  styleUrls: ['./choix2aide.component.css']
})
export class Choix2aideComponent implements OnInit {
  var_reponsesQ1;
  constructor(private api: ApiService,private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    if(this.sharedService.getData().length == null){
      this.router.navigate(['/choixJaime']);
    }
    this.var_reponsesQ1 = this.sharedService.getData();
    console.log(this.sharedService.getData());
    
  }

}
