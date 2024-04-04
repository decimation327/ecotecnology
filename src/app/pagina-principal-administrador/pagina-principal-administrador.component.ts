import { Component, OnInit } from '@angular/core';
import { ContenidoPaginaPrincipalComponent } from '../contenido-pagina-principal/contenido-pagina-principal.component';

@Component({
  selector: 'app-pagina-principal-administrador',
  templateUrl: './pagina-principal-administrador.component.html',
  styleUrls: ['./pagina-principal-administrador.component.css']
})
export class PaginaPrincipalAdministradorComponent implements OnInit{
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
