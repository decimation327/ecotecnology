import { Component } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'; 


@Component({
  selector: 'app-agregar-puntos',
  templateUrl: './agregar-puntos.component.html',
  styleUrls: ['./agregar-puntos.component.css']
})
export class AgregarPuntosComponent {

  formulario: FormGroup;

  

  constructor(private formBuilder: FormBuilder, private tuServicio: BackendServiceService, private location: Location) {
    this.formulario = this.formBuilder.group({
      totalPuntos: ['', Validators.required],
      nombreUsuario: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      const totalPuntos = this.formulario.value.totalPuntos;
      const nombreUsuario = this.formulario.value.nombreUsuario;
      
      console.log('Total de puntos a enviar:', totalPuntos); // Agregamos un console.log aquí
  
      const data = {
        Valor: totalPuntos,
        NomUsuario: nombreUsuario
      };
  
      console.log('Datos a enviar al servicio:', data); // Agregar un log para verificar los datos que se enviarán al servicio
  
      this.tuServicio.insertarPuntosReciclaje(data).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          // Puedes manejar la respuesta del servidor aquí según tus necesidades
          Swal.fire('Éxito', 'Puntos guardados correctamente', 'success');
        },
        error => {
          console.error('Error en la solicitud:', error);
          // Puedes manejar los errores aquí según tus necesidades
          Swal.fire('Error', 'Hubo un error al guardar los puntos', 'error');
        }
      );
    }
  }
  
  // Función para volver atrás
  goBack(): void {
    this.location.back();
  }
  
}