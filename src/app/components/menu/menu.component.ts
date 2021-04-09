import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  RedirectToEmploye(){
    this.router.navigate(['app/employe']);
  }
  RedirectToTechnician(){
    this.router.navigate(['app/technician']);
  }
  RedirectToNetwork(){
    this.router.navigate(['app/network']);
  }
  RedirectToServer(){
    this.router.navigate(['app/server']);
  }
  RedirectToMaterial(){
    this.router.navigate(['app/material']);
  }
  RedirectToSoftware(){
    this.router.navigate(['app/software']);
  }
  RedirectToIncident(){
    this.router.navigate(['app/incident']);
  }
  RedirectToConnexion(){
    this.router.navigate(['login']);
  }
}
