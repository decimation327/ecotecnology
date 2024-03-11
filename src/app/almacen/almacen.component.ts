import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BackendServiceService } from '../servicios/backend-service.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CloudinaryServiceService } from '../servicios/cloudinary-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent {

  mostrarBotonVolver: boolean = true;
  mostrarModal: boolean = false;
  urlImagen: string | null = null;

  formProducto: FormGroup;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private backendService: BackendServiceService,
    private http: HttpClient,
    private cloudinaryService: CloudinaryServiceService
  ) {
    this.formProducto = this.fb.group({
      nombreProducto: ['', [Validators.required]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      marca: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      activo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      urlImagen: [''] // URL de imagen como opcional
    });
  }

  goBack(): void {
    this.location.back();
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Subir imagen a Cloudinary
      this.cloudinaryService.uploadImage(file).then((response: any) => {
        console.log('Imagen subida a Cloudinary:', response);
        // Asignar la URL de la imagen al campo urlImagen en el formulario
        this.formProducto.patchValue({ urlImagen: response.url });
      }).catch((error: any) => {
        console.error('Error al subir la imagen a Cloudinary:', error);
        Swal.fire('Error', 'Error al subir la imagen a Cloudinary. Por favor, inténtalo de nuevo.', 'error');
      });
    }
  }
  
  

  agregarProducto(): void {
    if (this.formProducto.valid) {
      this.backendService.almacenarProducto(this.formProducto.value).subscribe({
        next: (response) => {
          console.log('Producto almacenado exitosamente:', response);
          Swal.fire('Éxito', 'Producto almacenado exitosamente.', 'success');
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error al guardar el producto:', error);
          Swal.fire('Error', 'Error al guardar el producto. Por favor, inténtalo de nuevo más tarde.', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos correctamente.', 'error');
    }
  }
}
