import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-eliminar-usuario-administrador-sp-ad',
  templateUrl: './eliminar-usuario-administrador-sp-ad.component.html',
  styleUrls: ['./eliminar-usuario-administrador-sp-ad.component.css']
})


export class EliminarUsuarioAdministradorSpAdComponent {
  showMenu: boolean = false;
  filtroNombre: string = ''; // Variable para filtrar por nombre
  usuariosEncontrados: any[] = [];
  usuarios: any[] = []; // Lista completa de usuarios


  usuarioSeleccionado: any = null; // Usuario seleccionado
  
  
  constructor(
    private backendService: BackendServiceService,
    private router: Router,
    private authService: AuthService
  ) {}


  ngOnInit(): void {
    this.cargarUsuariosAdmin();
  }
  
  cargarUsuariosAdmin(): void {
    this.backendService.mostrarUsuariosAdmin().subscribe(
      (response) => {
        this.usuariosEncontrados = response; 
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }
  
  limpiarTabla(): void {
    // Limpiar el filtro de búsqueda
    this.filtroNombre = '';
  
    // Volver a cargar la lista de usuarios (en este caso, vacía)
    this.usuarios = [];
  }
  

  filtrarUsuarios(): void {
    const valor = this.filtroNombre.toLowerCase();
    // Realizar búsqueda mientras se escribe
    this.usuariosEncontrados = this.usuarios.filter((usuario: any) =>
      usuario.nombreCompleto.toLowerCase().includes(valor)
    );
  }
  

  buscarUsuarioCompleto(): void {
    const nombreCompleto = this.filtroNombre.toLowerCase();
    if (nombreCompleto === '') {
      this.usuariosEncontrados = []; // Reinicia la lista si no se proporciona un nombre de búsqueda
      return;
    }
    this.backendService.buscarUsuariosAdminPorNombre(nombreCompleto).subscribe(
      (response) => {
        this.usuariosEncontrados = response; // Asigna la lista de usuarios encontrados
      },
      (error) => {
        console.error('Error al buscar usuarios:', error);
      }
    );
  }

  seleccionarUsuario(usuario: any): void {
    // Asignar el usuario seleccionado
    this.usuarioSeleccionado = usuario;

    // Iterar sobre todos los usuarios y establecer isSelected en falso, excepto para el usuario seleccionado
    this.usuariosEncontrados.forEach(u => u.isSelected = (u === usuario));

}


  

  eliminarUsuario(nomComplet_User: string): void {
    this.backendService.eliminarUsuario(nomComplet_User).subscribe(
      () => {
        Swal.fire('¡Éxito!', `Usuario ${nomComplet_User} eliminado exitosamente`, 'success');
        this.cargarUsuariosAdmin(); // Volver a cargar la lista de usuarios después de eliminar uno
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
        Swal.fire('Error', 'Hubo un error al eliminar el usuario', 'error');
      }
    );
  }
  


  cerrarSesion(): void {
    this.authService.logout();
    Swal.fire('¡Sesión cerrada!', 'Has cerrado sesión correctamente', 'success'); // Muestra una alerta de éxito
  }



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
      case 'Eliminar Usuario':
        this.router.navigate(['/eliminarUsuarioSpAd']);
        break;
      case 'Agregar Usuario Administrador':
        this.router.navigate(['/super-admin']);
        break;
      case 'Cerrar Sesión':
        this.router.navigate(['/home']);
        break;
      default:
        // En el caso de otras opciones, asumimos que son rutas y las navegamos
        this.router.navigate([opcion.toLowerCase().replace(' ', '-')]);
        break;
    }
  }
}
