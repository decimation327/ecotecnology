import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-eliminar-administrador-sp-ad',
  templateUrl: './eliminar-administrador-sp-ad.component.html',
  styleUrls: ['./eliminar-administrador-sp-ad.component.css']
})
export class EliminarAdministradorSpAdComponent {
  showMenu: boolean = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  opcionSeleccionada(opcion: string) {
    console.log(`Opción seleccionada: ${opcion}`);

    switch (opcion) {
      case 'Ventas en el día':
        // Lógica para la opción "Ventas en el día"
        break;
      case 'Agregar Administrador':
        this.router.navigate(['/super-admin']);
        break;
      case 'Eliminar Usuario Administrador':
        this.router.navigate(['/eliminarUsuarioAdministradorSpAd']);
        break;
      case 'Eliminar Usuario':
        this.router.navigate(['/eliminarUsuarioSpAd']);
        break;
      case 'Cerrar Sesión':
        this.router.navigate(['/cerrar-sesion']);
        break;
      default:
        // En el caso de otras opciones, asumimos que son rutas y las navegamos
        this.router.navigate([opcion.toLowerCase().replace(' ', '-')]);
        break;
    }
  }
}
