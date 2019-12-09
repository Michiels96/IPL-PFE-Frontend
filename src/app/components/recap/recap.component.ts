import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.css']
})
export class RecapComponent implements OnInit {
  session;
  constructor(private api: ApiService,private route: ActivatedRoute) { }

  ngOnInit() {
  }
  /*getSession{
    this.api.getAllSessions().subscribe( 
      data => {
        
      },
      error => {
        console.log(error);
      }
    )
    
}*/
}
