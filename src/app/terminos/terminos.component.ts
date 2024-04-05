import { Component } from '@angular/core';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})

export class TerminosComponent {


  constructor( private location: Location) {
    
  }

  goBack(): void {
    this.location.back();
  }
}
