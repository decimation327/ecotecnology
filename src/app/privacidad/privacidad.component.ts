import { Component } from '@angular/core';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.component.html',
  styleUrls: ['./privacidad.component.css']
})

export class PrivacidadComponent {


  constructor( private location: Location) {
    
  }

  goBack(): void {
    this.location.back();
  }
}
