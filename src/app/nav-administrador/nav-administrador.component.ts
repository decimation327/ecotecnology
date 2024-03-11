import { Component, OnInit } from '@angular/core';
import { AuthService } from '../servicios/auth.service.service';
import { MatDialog } from '@angular/material/dialog';
import { CarritoServiceService } from '../servicios/carrito-service.service';
import { Router } from '@angular/router'; // Importar Router
import Swal from 'sweetalert2';
import { VerticalModalComponent } from '../vertical-modal/vertical-modal.component';
import { BackendServiceService } from '../servicios/backend-service.service';


@Component({
  selector: 'app-nav-administrador',
  templateUrl: './nav-administrador.component.html',
  styleUrls: ['./nav-administrador.component.css']
})
export class NavAdministradorComponent implements OnInit{
  productosEncontrados: any[] = [];
  terminoDeBusqueda: string = ''; 
  usuario: any
  constructor(private authService: AuthService, private dialog: MatDialog, private carritoService: CarritoServiceService, private router: Router, private BackendService:BackendServiceService) {}

  cantidadProductosEnCarrito: Number = 0;
  

  openVerticalModal() {
    const dialogRef = this.dialog.open(VerticalModalComponent, {
      width: '800px',
      panelClass: 'vertical-modal-dialog-container'
    });    
  }


  ngOnInit(): void {
    this.carritoService.cantidadTotal$.subscribe(cantidad => {
      this.cantidadProductosEnCarrito = cantidad; 
    });
    const nombreUsuario = this.authService.getNombreUsuario();
  if (nombreUsuario) {
    this.cargarInformacionUsuario(nombreUsuario);
  } else {
    console.log('No se pudo obtener el nombre del usuario');
    // Manejar el caso en el que no se pueda obtener el nombre del usuario, si es necesario.
  }
  }

  cerrarSesion(): void {
    this.authService.logout();
    Swal.fire('¡Sesión cerrada!', 'Has cerrado sesión correctamente', 'success'); // Muestra una alerta de éxito
  }
  buscarProductos(terminoDeBusqueda: string): void {
    if (terminoDeBusqueda.length === 0) {
      this.productosEncontrados = [];
      return;
    }
  
    this.BackendService.buscarProductos(terminoDeBusqueda).subscribe((productos: any[]) => {
      this.productosEncontrados = productos.slice(0, 3);;
      console.log(this.productosEncontrados);
      
    }, error => {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, limpiando los productos encontrados o mostrando un mensaje.
      this.productosEncontrados = [];
    });
  }


  confirmarCerrarSesion(): void {
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      text: 'Se cerrará tu sesión actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, cerrar sesión y redirigir al home
        this.cerrarSesion();
        this.router.navigate(['/home']);
      }
    });
  }
  cargarInformacionUsuario(nombreCompleto: string): void {
    this.BackendService.obtenerInformacionUsuarioPorNombre(nombreCompleto).subscribe(
      (informacionUsuario) => {
        this.usuario = informacionUsuario;
        console.log(this.usuario); // Para propósitos de depuración
      },
      (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
  }
}
