import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import Swal from 'sweetalert2';
import { CloudinaryServiceService } from '../servicios/cloudinary-service.service';
import { CorreoService } from '../servicios/correo.service'; // Importa el servicio de correo

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})

export class SuperAdminComponent {
  showMenu: boolean = false;
  registroData = {
    idRol: null,
    correo: '',
    contrasena: '',
    nombreCompleto: '',
    imagenPerfil: '',
    telefono: '' // Almacena la URL de la imagen
  };
  imageUrl: string = ''; 
  mostrarContrasena: boolean = false;
  urlImagenPerfil: any;
  isLoadingImage: boolean = false;
  isSendingEmail: boolean = false; // Variable para indicar si se está enviando el correo

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result; // Asignamos el valor a imageUrl
    };

    reader.readAsDataURL(file);
  }
      

  constructor(
    private backendService: BackendServiceService,
    private router: Router,
    private authService: AuthService,
    private cloudinaryService: CloudinaryServiceService,
    private correoService: CorreoService // Inyecta el servicio de correo
  ) {
    
  }

  registrarAdministrador(): void {
    if (this.registroData.idRol && this.registroData.correo && this.registroData.contrasena && this.registroData.nombreCompleto) {
      Swal.fire({
        title: 'Creando usuario...',
        html: 'Por favor, espera mientras se crea el usuario.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Muestra un loader
        }
      });
      
      // Lógica para registrar el administrador
      // Se omite la lógica relacionada con la imagen por brevedad

      // Lógica para enviar correo al administrador
      const datosCorreo = {
        to: this.registroData.correo,
        subject: '¡Bienvenido como administrador!',
        html: `<!DOCTYPE html>
        <html lang="es">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a Nuestra Plataforma</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .logo {
            display: block;
            margin: auto;
            width: 100px;
          }
          .message {
            text-align: center;
            margin-top: 20px;
          }
          .message h1 {
            color: #007bff; /* Color azul para el título */
          }
        </style>
        </head>
        <body>
        <div class="container">
          <img src="https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/Logo_yfgnqs.jpg" alt="Logo" class="logo">
          <div class="message">
            <h1>Bienvenido a Nuestra Plataforma</h1>
            <p>Hola ${this.registroData.nombreCompleto},</p>
            <p>Gracias por registrarte como administrador en nuestra plataforma. ¡Bienvenido!</p>
          </div>
        </div>
        </body>
        </html>
        `
      };

      this.isSendingEmail = true; // Indica que se está enviando el correo
      
      this.correoService.enviarCorreo(datosCorreo).subscribe(
        response => {
          console.log('Correo enviado al administrador:', response);
          this.isSendingEmail = false; // Indica que se ha enviado el correo
          
          // Se ha enviado el correo con éxito, ahora registramos al administrador
          this.backendService.crearUsuario(this.registroData).subscribe(
            response => {
              Swal.fire('¡Éxito!', `Usuario Administrador ${this.registroData.nombreCompleto} agregado exitosamente`, 'success')
              .then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  // Recargar la página después de que el usuario haga clic en "OK"
                  window.location.reload();
                }
              });
              console.log('Usuario administrador creado exitosamente:', response);
            },
            error => {
              Swal.fire('Error', 'No se pudo crear el usuario administrador', 'error')
              .then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                  // Recargar la página después de que el usuario haga clic en "OK"
                  window.location.reload();
                }
              });
              console.error('Error al crear usuario administrador:', error);
            }
          );
        },
        error => {
          console.error('Error al enviar correo al administrador:', error);
          this.isSendingEmail = false; // Indica que ha ocurrido un error al enviar el correo
          
          // Manejo de errores al enviar el correo
          Swal.fire('Error', 'No se pudo enviar el correo al administrador', 'error');
        }
      );
    } else {
      console.error('Por favor, complete todos los campos.');
    }
  }
  

  
  // Función para enviar correo al administrador registrado
  enviarCorreoAdministrador(correo: string, nombre: string): void {
    const datosCorreo = {
      to: correo,
      subject: '¡Bienvenido como administrador!',
      html: `<p>Hola ${nombre},\n\nGracias por registrarte como administrador en nuestra plataforma.\n\n¡Bienvenido!</p>`
    };

    this.isSendingEmail = true; // Indica que se está enviando el correo

    this.correoService.enviarCorreo(datosCorreo).subscribe(
      response => {
        console.log('Correo enviado al administrador:', response);
        this.isSendingEmail = false; // Indica que se ha enviado el correo
      },
      error => {
        console.error('Error al enviar correo al administrador:', error);
        this.isSendingEmail = false; // Indica que ha ocurrido un error al enviar el correo
      }
    );
  }

  cerrarSesion(): void {
    this.authService.logout();
    Swal.fire('¡Sesión cerrada!', 'Has cerrado sesión correctamente', 'success'); // Muestra una alerta de éxito
  }
  

  avisoRol: string = '';

  mostrarAvisoRol(): void {
    this.avisoRol = 'El número 1 es para un usuario, el número 2 es para un usuario Administrador.';
  }
  
  ocultarAvisoRol(): void {
    this.avisoRol = '';
  }

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  uploadImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoadingImage = true; // Indica que la carga ha iniciado
      const reader = new FileReader();
      reader.onload = (e) => {
        this.urlImagenPerfil = (e.target as FileReader).result;
        
        // Sube la imagen a Cloudinary
        this.cloudinaryService.uploadImage(file).then((response: any) => {
          console.log(response);
          this.registroData.imagenPerfil = response.url;
          this.isLoadingImage = false; // Indica que la carga ha finalizado
        }).catch((error: any) => {
          console.error(error);
          this.isLoadingImage = false; // Asegúrate de manejar el estado de carga incluso en caso de error
        });
      };
      reader.readAsDataURL(file);
    }
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
      case 'Eliminar Usuario Administrador':
        this.router.navigate(['/eliminarUsuarioAdministradorSpAd']);
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
