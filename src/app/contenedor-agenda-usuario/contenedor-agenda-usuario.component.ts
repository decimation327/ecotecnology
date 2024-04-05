import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from "../servicios/auth.service.service";
import { CloudinaryServiceService } from '../servicios/cloudinary-service.service';
import { Location } from '@angular/common'; 
import Swal from 'sweetalert2';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-contenedor-agenda-usuario',
  templateUrl: './contenedor-agenda-usuario.component.html',
  styleUrls: ['./contenedor-agenda-usuario.component.css']
})
export class ContenedorAgendaUsuarioComponent implements OnInit {
  calendarOptions: CalendarOptions;
  events: EventInput[] = [];
  idCuenta: string | null = null;
  selectedDate: string = '';
  selectedTime: string = '';
  componentName: string = '';
  EstadoComponente: string = '';
  Cantidad: any = '';
  Urlimagen : any = '';
  cloudinaryImageUrl: string | null = null;
  citasUsuario: any[] = [];

  constructor(private backendService: BackendServiceService, private authService: AuthService, private cloudinaryService:CloudinaryServiceService, private location: Location ) {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      events: this.events,
      locale: esLocale
    };
  }


  goBack(): void {
    this.location.back();
  }


  ngOnInit(): void {
    // Obtener el idCuenta del token JWT
    this.idCuenta = this.authService.getIdCuenta();

    console.log("hola");
    console.log('Eventos:', this.events);
    const nombreUsuario = this.authService.getNombreUsuario(); // Asegúrate de implementar esta función en AuthService si no existe

    if (nombreUsuario) {
      this.cargarCitasUsuario(nombreUsuario);
    } else {
      console.error('No se pudo obtener el nombre de usuario.');
    }

    // Imprimir el token en la consola para verificar su contenido
    console.log('Token JWT:', this.authService.getToken());

    // Si necesitas hacer algo con el idCuenta, puedes hacerlo aquí
    if (this.idCuenta) {
      console.log('El id de cuenta del usuario es:', this.idCuenta);
      // Aquí puedes usar el idCuenta para cualquier propósito, como registrar una cita
    } else {
      console.error('No se pudo obtener el id de cuenta del token. hola');
      // Manejar el caso donde no se puede obtener el idCuenta
    }
  }

  onUnderstoodClick() {
  // Verificar si se ha seleccionado una fecha y hora
  if (!this.selectedDate || !this.selectedTime) {
    alert("Por favor selecciona una fecha y hora.");
    return;
  }

  // Obtener la fecha y hora seleccionadas
  const startDate: Date = new Date(`${this.selectedDate}T${this.selectedTime}`);

  // Formatear la hora en un formato válido (por ejemplo, "HH:mm:ss")
  const formattedTime: string = startDate.toTimeString().split(' ')[0]; // Extraer solo la parte de la hora

  // Crear el objeto de cita con la hora formateada
  const cita = {
    NomComponet: this.componentName,
    FechaCita: this.selectedDate,
    HoraCita: formattedTime, // Usar la hora formateada aquí
    IdCuenta: this.idCuenta,
    EstadoComponente: this.EstadoComponente,
    Cantidad: this.Cantidad,
    UrlImagen: this.cloudinaryImageUrl
  };

  // Llamar al servicio para insertar la cita en el backend
  this.backendService.insertarCita(cita).subscribe(
    (response) => {
      console.log('Cita insertada en el backend:', response);
      console.log(cita);

      // Agregar el nuevo evento al arreglo 'events'
      const newEvent = {
        title: `${cita.NomComponet} - Estado: ${cita.EstadoComponente} - Cantidad: ${cita.Cantidad}`,
        start: `${cita.FechaCita}T${cita.HoraCita}`
      };
      this.events.push(newEvent);

      // Actualizar las opciones del calendario para reflejar los nuevos eventos
      this.calendarOptions = { ...this.calendarOptions, events: this.events };

      // Mostrar alerta de éxito con SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'Cita exitosa',
        text: 'La cita se ha insertado correctamente.'
      });

      // Limpiar los campos después de agregar el evento y confirmar la inserción
      this.selectedDate = '';
      this.selectedTime = '';
      this.componentName = '';
      this.EstadoComponente = '';
      this.Cantidad = '';
      this.cloudinaryImageUrl = '';

      const closeButton: HTMLElement | null = document.querySelector('#staticBackdrop .btn-close');
      closeButton?.click(); // Esto simula un clic en el botón de cierre del modal.

    },
    (error) => {
      console.error('Error al insertar la cita:', error);
      // Podrías mostrar una alerta u otra acción si la inserción falla

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  );
}


    // Llamar al servicio para insertar la cita en el backend
    this.backendService.insertarCita(cita).subscribe(
      (response) => {
        console.log('Cita insertada en el backend:', response);
        console.log(cita);
        

        const newEvent = {
          title: `${cita.NomComponet} - Estado: ${cita.EstadoComponente} - Cantidad: ${cita.Cantidad}`,
          start: `${cita.FechaCita}T${cita.HoraCita}`
        };
        this.events.push(newEvent);
        
        // Mostrar alerta de éxito con SweetAlert
        Swal.fire({
          icon: 'success',
          title: 'Cita exitosa',
          text: 'La cita se ha insertado correctamente.'
        }).then((result) => {
          if (result.isConfirmed) {
            // Actualizar la página
            location.reload();
          }
        });
        console.log('Eventos después de insertar:', this.events);

        // Limpiar los campos después de agregar el evento y confirmar la inserción
        this.selectedDate = '';
        this.selectedTime = '';
        this.componentName = '';
        this.EstadoComponente ='';
        this.Cantidad = '';
        this.Urlimagen = ''


        const closeButton: HTMLElement | null = document.querySelector('#staticBackdrop .btn-close');
        closeButton?.click(); // Esto simula un clic en el botón de cierre del modal.

      },
      (error) => {
        console.error('Error al insertar la cita:', error);
        // Podrías mostrar una alerta u otra acción si la inserción falla

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al insertar la cita",
        });
      }
    );
  }
  
  imageSrc: string | ArrayBuffer | null = null;
isLoadingImage: boolean = false;

handleFileInput(event: any): void {
  const file = event.target.files[0];
  if (file) {
    // Muestra una vista previa local de la imagen
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imageSrc = (e.target as FileReader).result; // Vista previa local
    };
    reader.readAsDataURL(file);

    // Inicia la carga de la imagen a Cloudinary
    this.isLoadingImage = true;
    this.cloudinaryService.uploadImage(file).then((response: any) => {
      console.log(response);
      // Guarda la URL de Cloudinary
      this.cloudinaryImageUrl = response.url; // Asume que 'url' es la propiedad de la respuesta con la URL de la imagen
      this.isLoadingImage = false;
    }).catch((error: any) => {
      console.error(error);
      this.isLoadingImage = false;
    });
  }
} 
cargarCitasUsuario(nombreUsuario: string): void {
  this.backendService.listarCitasPorNombreUsuario(nombreUsuario).subscribe({
    next: (citas) => {
      this.citasUsuario = citas; // Guardar las citas en el array
      console.log(this.citasUsuario);
      

      // Convertir las citas a eventos y actualizar los eventos del calendario
      this.events = this.citasUsuario.map(cita => ({
        title: `${cita.NomComponet} - Estado: ${cita.EstadoComponente} - Cantidad: ${cita.Cantidad}`,
        start: `${cita.FechaCita}T${cita.HoraCita}`,
        // Aquí puedes agregar más propiedades según necesites
      }));

      // Actualizar las opciones del calendario para reflejar los nuevos eventos
      this.calendarOptions = { ...this.calendarOptions, events: this.events };
    },
    error: (error) => {
      console.error('Error al cargar las citas del usuario:', error);
    }
  });
}


}
