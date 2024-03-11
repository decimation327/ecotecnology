import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CloudinaryServiceService } from '../servicios/cloudinary-service.service';
import { BackendServiceService } from '../servicios/backend-service.service';
import { Usuario } from '../model/usuario.model';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthService } from '../servicios/auth.service.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit{
  @ViewChild('fileInput') fileInput: any;

  urlImagenPerfil: string | ArrayBuffer | null = null;
  isLoadingImage: boolean = false;
  contrasena: any;
  nombreCompleto: any;
  correo: any;
  telefono: any;
  formularioPerfil: FormGroup;
  nombreUsuario: any 
  infoUsuario: any = {};

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private cloudinaryService: CloudinaryServiceService,
    private backendService: BackendServiceService,
    private route: ActivatedRoute,
    private authService:AuthService,
  ) {
    this.formularioPerfil = this.formBuilder.group({
      nombreCompleto: [''],
      contrasena: [''],
      correo: [''],
      telefono: [''],
      imagenPerfil: ['']
    });

    this.route.params.subscribe(params => {
      const nombreCompleto = params['nombreCompleto'];
      if (nombreCompleto) {
        this.cargarInformacionUsuarioPorNombre(nombreCompleto);
      }
    });
  }
  ngOnInit() {
    this.nombreUsuario = this.authService.getNombreUsuario();
    if (this.nombreUsuario) {
      this.cargarInformacionUsuarioPorNombre(this.nombreUsuario);
    }
  } 
  
  goBack(): void {
    this.location.back();
  }
  uploadImage(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.isLoadingImage = true;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.urlImagenPerfil = (e.target as FileReader).result;
        this.isLoadingImage = false;
      };
      reader.readAsDataURL(file);

      this.cloudinaryService.uploadImage(file).then((response: any) => {
        console.log(response);
        this.urlImagenPerfil = response.url;
      }).catch((error: any) => {
        console.error(error);
        this.isLoadingImage = false;
      });
    }
  }

  editarPerfil(): void {
    const usuarioEditado: Usuario = {
      nombreCompleto: this.formularioPerfil.value.nombreCompleto,
      contrasena: this.formularioPerfil.value.contrasena,
      correo: this.formularioPerfil.value.correo,
      imagenPerfil: this.urlImagenPerfil as string,
      telefono: this.formularioPerfil.value.telefono
    };
  
    this.editarUsuario(usuarioEditado).subscribe(
      (response: any) => {
        console.log(response);
    
        if (response || response.message) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: response.message || 'Usuario editado correctamente',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        } else {
          console.error('Respuesta del servidor no válida', response);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al editar usuario. Respuesta del servidor no válida',
          });
        }
    
        this.cargarInformacionUsuarioPorNombre(usuarioEditado.nombreCompleto);
      },
      (error) => {
        console.error('Error al editar usuario', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al editar usuario. Consulta la consola para obtener más detalles',
        });
      }
    );
  }
  
  cargarInformacionUsuarioPorNombre(nombreUsuario: string): void {
    // Logica para obtener la información del usuario
    this.obtenerInformacionUsuarioPorNombre(nombreUsuario).subscribe(
      (usuario) => {
        this.infoUsuario = usuario; // Asegúrate de que 'usuario' es el objeto con la información que necesitas
        // Actualiza el formulario aquí si es necesario
        this.formularioPerfil.patchValue({
          nombreCompleto: usuario.nombre || '',
          correo: usuario.correo || '',
          telefono: usuario.telefono || '',
          contrasena: usuario.contraseña || ''        // No actualices la contraseña aquí por razones de seguridad
        });
        this.urlImagenPerfil = usuario.imagenPerfil; // Asume que 'imagenPerfil' es parte del objeto 'usuario'
      },
      (error) => {
        console.error("Error al cargar la información del usuario", error);
      }
    );
  }

  asignarValoresFormulario(response: any): void {
    console.log('Respuesta del servidor:', response);
  
    if (response && typeof response === 'object') {
      console.log('Estructura válida de la respuesta:', response);
  
      try {
        // Asignamos los valores al formulario campo por campo
        this.formularioPerfil.get('nombreCompleto')?.setValue(response.nombre || '');
        this.formularioPerfil.get('contrasena')?.setValue(response.contrasena || '');
        this.formularioPerfil.get('correo')?.setValue(response.correo || '');
        this.formularioPerfil.get('telefono')?.setValue(response.telefono || '');
        this.formularioPerfil.get('imagenPerfil')?.setValue(response.imagenPerfil || '');
  
        console.log('Valores cargados:', this.formularioPerfil.value);
        console.log('Información del usuario cargada correctamente.');
      } catch (error) {
        console.error('Error al asignar valores al formulario:', error);
        Swal.fire('Error', 'Error al asignar valores al formulario', 'error');
      }
    } else {
      console.warn('La respuesta del servidor no es un objeto válido:', response);
      Swal.fire('Error', 'La respuesta del servidor no es válida', 'error');
    }
  }
  
  handleUsuarioError(error: HttpErrorResponse): void {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al obtener la información del usuario',
    });
  }

  editarUsuario(usuario: any): Observable<any> {
    return this.backendService.editarUsuario(usuario);
  }

  obtenerInformacionUsuarioPorNombre(nombreCompleto: string): Observable<any> {
    return this.backendService.obtenerInformacionUsuarioPorNombre(nombreCompleto);
  }
  
}