import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-educateur-ui',
  templateUrl: './educateur-ui.component.html',
  styleUrls: ['./educateur-ui.component.css']
})
export class EducateurUIComponent implements OnInit {
  kid_id;
  constructor(private api: ApiService,private route: ActivatedRoute) { }

  ngOnInit() {
   this.kid_id= this.route.snapshot.paramMap.get('id');
   console.log(this.kid_id);
  }

  /*getSession{
    this.api.connectUser(this.connexion.value).subscribe( 
      data => {
        
      },
      error => {
        console.log(error);
      }
    )
  }*/
}
