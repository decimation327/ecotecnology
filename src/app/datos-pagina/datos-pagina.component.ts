import { Component } from '@angular/core';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-datos-pagina',
  templateUrl: './datos-pagina.component.html',
  styleUrls: ['./datos-pagina.component.css']
})

export class DatosPaginaComponent {


  constructor( private location: Location) {
    
  }

  goBack(): void {
    this.location.back();
  }
}
