import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenedor-principal',
  templateUrl: './contenedor-principal.component.html',
  styleUrls: ['./contenedor-principal.component.css']
})
export class ContenedorPrincipalComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    window.addEventListener("load", function () {
      const loader = document.getElementById("loader");
      if (loader) {
        loader.classList.toggle("loader2");
      }
    });
  }

}
