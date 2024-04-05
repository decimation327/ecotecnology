import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendServiceService } from '../servicios/backend-service.service';
import { Usuario  } from "../model/usuario.model";
import { AuthService } from '../servicios/auth.service.service';
import { Router } from '@angular/router';
import { CloudinaryServiceService } from '../servicios/cloudinary-service.service';
import { CorreoService } from '../servicios/correo.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'; 


@Component({
  selector: 'app-registro-login',
  templateUrl: './registro-login.component.html',
  styleUrls: ['./registro-login.component.css']
})
export class RegistroLoginComponent implements OnInit {

  registroForm!: FormGroup;
  loginForm!: FormGroup;
  $signIn!: HTMLElement;
  $signUp!: HTMLElement;
  isSignInActive: boolean = false;
  registroData: Usuario = {  // Definimos un objeto para contener los datos del registro
    nombreCompleto: '',
    contrasena: '',
    correo: '',
    imagenPerfil: '',
    telefono: ''
  };
  mensajeRegistroExitoso: string = ''; // Variable para almacenar el mensaje de registro exitoso
  urlImagenPerfil: string | ArrayBuffer | null = null;
  isLoadingImage: boolean = false;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private backendService: BackendServiceService,
    private authService: AuthService, // Inyecta el servicio AuthService
    private elementRef: ElementRef,
    private cloudinaryService: CloudinaryServiceService,
    private CorreoService:CorreoService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }


  ngOnInit(): void {
    // Formulario de registro
    this.registroForm = this.formBuilder.group({
      nombreCompleto: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      imagenPerfil: ['']
      
    });

    // Formulario de inicio de sesión
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });

    // Obtener elementos del DOM para cambiar de pestaña
    this.$signIn = this.elementRef.nativeElement.querySelector('.sign-in');
    this.$signUp = this.elementRef.nativeElement.querySelector('.sign-up');

    this.showTokenInfo();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const btnSignIn = this.elementRef.nativeElement.querySelector('.sign-in-btn');
    const btnSignUp = this.elementRef.nativeElement.querySelector('.sign-up-btn');

    if (target === btnSignIn) {
      this.toggleSignInUp('signIn');
    } else if (target === btnSignUp) {
      this.toggleSignInUp('signUp');
    }
  }

  toggleSignInUp(formType: 'signIn' | 'signUp'): void {
    this.isSignInActive = formType === 'signIn';
  }

  showSignInForm(): void {
    this.isSignInActive = true;
    console.log('Mostrando formulario de inicio de sesión');
  }
  uploadImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoadingImage = true; // Indica que la carga ha iniciado
      const reader = new FileReader();
      reader.onload = (e) => this.urlImagenPerfil = (e.target as FileReader).result;
      reader.readAsDataURL(file);
    
      this.cloudinaryService.uploadImage(file).then((response: any) => {
        console.log(response);
        this.registroForm.patchValue({imagenPerfil: response.url});
        this.urlImagenPerfil = response.url;
        this.isLoadingImage = false; // Indica que la carga ha finalizado
      }).catch((error: any) => {
        console.error(error);
        this.isLoadingImage = false; // Asegúrate de manejar el estado de carga incluso en caso de error
      });
    }
  }
  
  

  
  
  
  registrarUsuario(): void {
    if (this.registroForm.valid) {

     Swal.fire({
    title: 'Creando usuario...',
    html: 'Por favor, espera mientras se crea el usuario.',
    allowOutsideClick: false,
    didOpen: () => {
    Swal.showLoading(); // Muestra un loader
    }
    });
      // Asignamos los valores del formulario al objeto de registroData
      this.registroData.nombreCompleto = this.registroForm.value.nombreCompleto;
      this.registroData.contrasena = this.registroForm.value.contrasena;
      this.registroData.correo = this.registroForm.value.correo;
      this.registroData.telefono = this.registroForm.value.telefono;
      this.registroData.imagenPerfil = this.registroForm.value.imagenPerfil;
  
      console.log(this.registroData);
  
      // Llamamos al servicio para crear el usuario
      this.backendService.crearUsuario(this.registroData).subscribe(
        response => {
          console.log('Usuario creado exitosamente:', response);
          console.log(this.registroData);
  
          // Preparar el HTML para el correo electrónico
          const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head>
      <title>Bienvenido a Nuestra Plataforma</title>
      <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
          .container { max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .logo { display: block; margin: auto; width: 100px; }
          .message { text-align: center; margin-top: 20px; }
      </style>
  </head>
  <body>
      <div class="container">
          <img src="https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/Logo_yfgnqs.jpg" alt="Logo" class="logo">
          <div class="message">
              <h1>Bienvenido a Nuestra Plataforma</h1>
              <p>Estamos muy contentos de tenerte con nosotros. ¡Explora y disfruta de nuestros servicios!</p>
          </div>
      </div>
  </body>
  </html>
  `;
  
          // Datos para el correo
          const datosCorreo = {
            to: this.registroData.correo, // Correo del usuario registrado
            subject: 'Bienvenido a Nuestra Plataforma',
            html: htmlContent // Aquí pasas el HTML
          };
  
          // Llamada al servicio de envío de correo
          this.CorreoService.enviarCorreo(datosCorreo).subscribe(
            respuestaCorreo => {
              console.log('Correo enviado exitosamente', respuestaCorreo);
              Swal.fire({
                title: '¡Éxito!',
                text: 'Usuario creado y notificado exitosamente',
                icon: 'success',
                confirmButtonText: 'Ok'
              }); // Mostrar alerta de éxito aquí
              this.showSignInForm(); // Alternar al formulario de inicio de sesión después de enviar el correo
            },
            errorCorreo => {
              console.error('Error al enviar correo', errorCorreo);
              // Considera manejar este error de forma que el usuario sepa que el registro fue exitoso pero el correo no se envió
              this.showSignInForm(); // Podrías querer mover esto fuera del error si quieres cambiar de forma incondicional
            }
          );
        },
        error => {
          Swal.fire('Error', 'No se pudo crear el usuario', 'error'); // Mostrar alerta de error
          console.error('Error al crear usuario:', error);
        }
      );
    } else {
      console.error('Formulario de registro inválido. Por favor, complete todos los campos correctamente.');
    }
  }
  
  
  

  iniciarSesion(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.backendService.login(credentials).subscribe(
        response => {
          console.log('Inicio de sesión exitoso. Token JWT:', response.token);
          this.authService.setToken(response.token); // Almacena el token en localStorage
          this.redirectUser(); // Redirige al usuario según su rol

          const nombreUsuario = this.authService.getNombreUsuario();
          // Mostrar mensaje de éxito con SweetAlert
          if (nombreUsuario) {
            // Mostrar mensaje de éxito con SweetAlert
            Swal.fire({
              icon: 'success',
              title: 'Inicio de sesión exitoso',
              text: `¡Bienvenido a Ecotecnology, ${nombreUsuario}!` // Mostrar el nombre de usuario en la alerta
            });
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
          // Manejo de errores
          // Mostrar mensaje de error con SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.'
          });
        }
      );
    } else {
      console.error('Formulario de inicio de sesión inválido. Por favor, complete todos los campos correctamente.');
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario de inicio de sesión inválido. Por favor, complete todos los campos correctamente.'
      });
    }
  }

  redirectUser(): void {
    const tokenPayload = this.authService.decodeToken(); // Decodificar el token para obtener la información
    console.log('Token decodificado:', tokenPayload); // Verificar la información del token
    
    const userType = tokenPayload?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; // Obtener el tipo de usuario del token
  
    if (userType) {
      switch (userType) {
        case 'Usuario':
          this.router.navigate(['/Usuario']); // Redirigir al componente de usuario
          break;
        case 'UsuarioAdministrador':
          this.router.navigate(['/Administrador']); // Redirigir al componente de administrador
          break;
        case 'SuperAdmin':
          this.router.navigate(['/super-admin']); // Redirigir al componente de super admin
          break;
        default:
          console.error('Tipo de usuario no reconocido');
          // Mostrar mensaje de error con SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Tipo de usuario no reconocido'
          });
          break;
      }
    } else {
      console.error('No se encontró un tipo de usuario en el token.');
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se encontró un tipo de usuario en el token'
      });
    }
  }
  mostrarContrasena: boolean = false;
  
  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  

  parseJwt(token: string | null): any {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  showTokenInfo(): void {
    const token = this.authService.getToken(); // Obtener el token del almacenamiento local
    console.log('Token JWT:', token); // Imprimir el token completo
    const tokenPayload = this.parseJwt(token); // Decodificar el token para obtener la información
    console.log('Información del token:', tokenPayload); // Verificar la información del token
  }

  private getUserRoleFromToken(token: string): string | null {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload?.role || null;
    } catch (error) {
      console.error('Error al obtener el rol del usuario del token:', error);
      return null;
    }
  }
  
  
  
  
}
