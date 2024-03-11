import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tarjeta-credito-perfil',
  templateUrl: './tarjeta-credito-perfil.component.html',
  styleUrls: ['./tarjeta-credito-perfil.component.css']
})
export class TarjetaCreditoPerfilComponent implements OnInit {
  barrio: string = '';
  municipio: string = '';
  direccionCompleta: string = '';
  idCuenta: string | null = null;
  numDir: any;
  urlImagenPerfil: any;

  constructor(private backendService: BackendServiceService, private authService: AuthService, private location: Location) { }

  ngOnInit(): void {
    this.idCuenta = this.authService.getIdCuenta();
    if (this.idCuenta) {
      this.cargarInformacionDireccion();
    }
    const nombreCompleto = this.authService.getNombreUsuario(); // Asegúrate de que este método exista y devuelva el nombre de usuario
    if (nombreCompleto) {
      this.cargarInformacionUsuario(nombreCompleto);
    }
  }

  
  // ... código anterior

cargarInformacionDireccion(): void {
  if (this.idCuenta) {
    console.log('ID de cuenta:', this.idCuenta);

    const idCuentaNumero = parseInt(this.idCuenta);

    this.backendService.listarDireccionesPorCuenta(idCuentaNumero)
      .subscribe(
        (response) => {
          if (response && response.length > 0) {
            const primeraDireccion = response[0];

            // Asigna valores directamente a los campos
            this.numDir = primeraDireccion.numDir
            this.barrio = primeraDireccion.barrio || '';
            this.municipio = primeraDireccion.municipio || '';
            this.direccionCompleta = primeraDireccion.direccionCompleta || '';

            // Guarda los valores en localStorage
            localStorage.setItem('barrio', this.barrio);
            localStorage.setItem('municipio', this.municipio);
            localStorage.setItem('direccionCompleta', this.direccionCompleta);

            // Imprime los valores para verificar
            console.log('Valores cargados:', this.barrio, this.municipio, this.direccionCompleta, this.numDir);
          } else {
            Swal.fire('Info', 'No se encontró información de dirección para la cuenta actual. Puede que la cuenta no tenga una dirección asociada.', 'info');
          }
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            this.handleDireccionError(error);
          }
        }
      );
  }
}

// ... código posterior


  
  
actualizarDireccionExistente(): void {
  if (this.idCuenta) {
    const direccionActualizada = {
      numDir: this.numDir, // Asegúrate de que este campo se establezca correctamente antes de llamar a esta función
      barrio: this.barrio,
      municipio: this.municipio,
      direccionCompleta: this.direccionCompleta,
      idCuenta: parseInt(this.idCuenta)
    };

    console.log(direccionActualizada);
    

    // Verificar si todos los campos requeridos están presentes
    if (!direccionActualizada.barrio || !direccionActualizada.municipio || !direccionActualizada.direccionCompleta) {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos para la dirección.', 'error');
      return;
    }

    this.backendService.actualizarDireccion(direccionActualizada).subscribe(
      (response) => {
        // Asumiendo que tu API responde con un campo 'success' en caso de éxito
        if (response && response.success) {
          console.log('Dirección actualizada con éxito:', response);
          Swal.fire('Éxito', 'La dirección ha sido actualizada correctamente.', 'success');
          // Posiblemente quieras recargar la información de la dirección aquí
          this.cargarInformacionDireccion();
        } else {
          // Si tu API no responde con un campo 'success', ajusta esta lógica según sea necesario
          this.handleDireccionError(response);
        }
      },
      (error) => {
        this.handleDireccionError(error);
      }
    );
  } else {
    Swal.fire('Error', 'No se ha podido identificar la cuenta para actualizar la dirección.', 'error');
  }
}

  // ...
  goBack(): void {
    this.location.back();
  }
  guardarDireccion(): void {
    if (this.idCuenta) {
      const direccion = {
        barrio: this.barrio,
        municipio: this.municipio,
        direccionCompleta: this.direccionCompleta,
        idCuenta: parseInt(this.idCuenta)
      };
  
      if (!direccion.barrio || !direccion.municipio || !direccion.direccionCompleta) {
        Swal.fire('Error', 'Por favor, complete todos los campos de la dirección', 'error');
        return;
      }
  
      this.backendService.insertarDireccion(direccion).subscribe(
        (response) => {
          if (response || response.success) {
            console.log('Dirección insertada con éxito:', response);
            Swal.fire('Éxito', 'Dirección insertada correctamente', 'success');
  
            // Actualiza los valores después de la inserción
           
          } else {
            this.handleDireccionError(response);
          }
        },
        (error) => {
          this.handleDireccionError(error);
        }
      );
    }
  }
  
  
  
       


// ...

private handleDireccionError(error: any): void {
  console.error('Error al obtener o actualizar la dirección:', error);

  // Verifica si el mensaje de error es en realidad un mensaje de éxito
  if (typeof error === 'string' && error === 'Dirección actualizada exitosamente') {
    console.log('Dirección actualizada con éxito:', error);
    Swal.fire('Éxito', error, 'success');
    return; // Detiene la ejecución de la función aquí
  }

  // Manejo de errores basado en HttpErrorResponse
  if (error instanceof HttpErrorResponse) {
    // Aquí puedes manejar diferentes códigos de estado HTTP
    switch (error.status) {
      case 400:
        Swal.fire('Error', 'Solicitud incorrecta o datos inválidos.', 'error');
        break;
      case 404:
        Swal.fire('Error', 'El recurso solicitado no se encontró.', 'error');
        break;
      case 500:
        Swal.fire('Error', 'Error interno del servidor.', 'error');
        break;
      default:
        Swal.fire('Error', 'Error desconocido. Por favor, inténtalo de nuevo más tarde.', 'error');
    }
  } else if (typeof error === 'string') {
    // Si el error es simplemente un string, podrías mostrarlo directamente
    Swal.fire('Error', error, 'error');
  } else {
    // Manejo genérico para otros tipos de errores
    Swal.fire('Error', 'Hubo un problema al obtener o actualizar la dirección. Por favor, inténtalo de nuevo más tarde.', 'error');
  }
}
cargarInformacionUsuario(nombreCompleto: string): void {
  this.backendService.obtenerInformacionUsuarioPorNombre(nombreCompleto).subscribe({
    next: (usuario) => {
      this.urlImagenPerfil = usuario.imagenPerfil; // Asume que 'imagenPerfil' es el campo correcto
    },
    error: (error) => console.error(error)
  });
}

  
}