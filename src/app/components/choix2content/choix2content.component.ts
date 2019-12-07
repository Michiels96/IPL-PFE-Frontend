import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choix2content',
  templateUrl: './choix2content.component.html',
  styleUrls: ['./choix2content.component.css']
})
export class Choix2contentComponent implements OnInit {

  constructor(private api: ApiService,private router:Router) { }

  ngOnInit() {
  }

}
