import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from "../servicios/auth.service.service";
import { CloudinaryServiceService } from '../servicios/cloudinary-service.service';
import { Location } from '@angular/common'; 
import Swal from 'sweetalert2';

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

  constructor(private backendService: BackendServiceService, private authService: AuthService, private cloudinaryService:CloudinaryServiceService, private location: Location ) {
    this.calendarOptions = {
      plugins: [dayGridPlugin],
      initialView: 'dayGridMonth',
      weekends: false,
      events: this.events
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
          text: "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
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

}
