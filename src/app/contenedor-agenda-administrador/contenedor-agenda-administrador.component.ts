import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { Location } from '@angular/common'; 
import { HttpErrorResponse } from '@angular/common/http'; // Importa HttpErrorResponse
import { CorreoService } from '../servicios/correo.service'; 
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contenedor-agenda-administrador',
  templateUrl: './contenedor-agenda-administrador.component.html',
  styleUrls: ['./contenedor-agenda-administrador.component.css']
})
export class ContenedorAgendaAdministradorComponent implements OnInit {
  citas: any[] = [];
  fechaBusqueda: Date = new Date();
  seleccionadas: any[] = []; // Propiedad seleccionadas
  estados: string[] = ['Disponible', 'Cancelado', 'Pendiente'];
  estadoSeleccionado: string = ''; // Propiedad para almacenar el estado seleccionado
  busquedaTexto: string = '';
  nombres: string[] = ['Juan'];
  terminoBusqueda: string = '';

  selectedState: string = 'Todos'; // Inicialmente se muestra todos los eventos

  allButtons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]; // Ejemplo de una lista de 20 botones

  weeks: (number | null)[][] = [];

  // Índices del primer y último botón visible
  firstVisibleIndex: number = 0;
  lastVisibleIndex: number = 9;

  @ViewChild('modalEditarCita') modalEditarCitaRef: ElementRef;
  @ViewChild('modalAdvertencia') modalAdvertenciaRef: ElementRef;
  @ViewChild('modalCalendario') modalCalendarioRef: ElementRef;
  @ViewChild('botonesContainer') botonesContainer!: ElementRef;


  // Propiedades para el calendario
  daysInMonth: number[] = [];
  currentMonth: number;
  currentYear: number;
  currentPageIndex: number = 0; // Inicializar currentPageIndex
  totalPages: number = 0; // Inicializar totalPages

  constructor(private backendService: BackendServiceService, private location: Location, private correoService: CorreoService,) {
    this.fechaBusqueda = new Date();
    this.fechaBusqueda = new Date();
    this.modalEditarCitaRef = new ElementRef(null);
    this.modalAdvertenciaRef = new ElementRef(null);
    this.modalCalendarioRef = new ElementRef(null); // Inicializar modalCalendarioRef
    this.currentMonth = new Date().getMonth();
    this.currentYear = new Date().getFullYear();
    this.totalPages = Math.ceil(this.daysInMonth.length / 10);
  }
  
  goBack(): void {
    this.location.back();
  }

  // Función para obtener los días en el mes actual
  getDaysInMonth(year: number, month: number): number[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }
  
  ngOnInit(): void {
    this.filtrarPorEstado();
    const currentDate = new Date();
    this.currentMonth = currentDate.getMonth();
    this.currentYear = currentDate.getFullYear();
    this.daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
    this.generateCalendar();
    this.listarCitas(); // Llama al método para listar citas al inicializar el componente

  }

  // Función para avanzar al mes siguiente
  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentYear++;
      this.currentMonth = 0;
    } else {
      this.currentMonth++;
    }
    this.daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
  }


  // Función para retroceder al mes anterior
  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentYear--;
      this.currentMonth = 11;
    } else {
      this.currentMonth--;
    }
    this.daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
  }

  // Función para seleccionar un día del mes
  // Método para seleccionar un día del mes y realizar la búsqueda
  selectDay(day: number): void {
    const fechaSeleccionada = new Date(this.currentYear, this.currentMonth, day);
    this.backendService.listarCitasPorFecha(fechaSeleccionada).subscribe(
      (response) => {
        // Actualizar la lista de citas con las coincidencias encontradas
        this.citas = response;
        // Cerrar el modal después de la búsqueda
        this.closeCalendarModal();
      },
      (error: HttpErrorResponse) => { // Maneja el error con HttpErrorResponse
        console.error('Error al buscar citas por fecha:', error);
      }
    );
  }

  // Función para abrir el modal del calendario
  openCalendarModal(): void {
    if (this.modalCalendarioRef) {
      this.modalCalendarioRef.nativeElement.style.display = 'block';
    }
  }

  // Función para cerrar el modal del calendario
  closeCalendarModal(): void {
    if (this.modalCalendarioRef) {
      this.modalCalendarioRef.nativeElement.style.display = 'none';
    }
  }


  next10Days() {
    if (this.currentPageIndex < this.totalPages - 1) {
      this.currentPageIndex++;
    }
  }

  previous10Days() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }

  getDisplayedDays(): number[] {
    const startIndex = this.currentPageIndex * 10;
    return this.daysInMonth.slice(startIndex, startIndex + 10);
  }

  listarCitas(): void {
    this.backendService.listarCitasConInfo().subscribe(
      (data) => {
        this.citas = data;
        console.log(this.citas);
      },
      (error) => {
        console.error('Error al obtener citas:', error);
      }
    );
  }



  buscarCitasPorFecha(): void {
    if (this.fechaBusqueda) {
      // Convertir la fecha a un objeto Date
      const fechaFormateada = new Date(this.fechaBusqueda);
  
      this.backendService.listarCitasPorFecha(fechaFormateada).subscribe(
        (response) => {
          // Actualizar la lista de citas con las coincidencias encontradas
          this.citas = response;
          // Cerrar el modal después de la búsqueda
          this.closeCalendarModal();
        },
        (error: HttpErrorResponse) => { // Maneja el error con HttpErrorResponse
          console.error('Error al buscar citas por fecha:', error);

        }
      );
    } else {
      // Si no se proporciona una fecha, simplemente listar todas las citas
      this.listarCitas();
    }
  }
  
  


  filtrarPorEstado(): void {
    if (this.selectedState !== '') {
      if (this.selectedState === 'Pendiente') {
        this.listarCitasPendientes(); 
      }else if (this.selectedState === 'Cancelado'){
        this.listarCitasCanceladas();
      }else if (this.selectedState === 'Disponible') {
        this.listarCitasDisponible();
      } else {
        console.error('El estado seleccionado no es válido:', this.selectedState);
      }
    } else {
      this.listarCitas(); // Si no se selecciona ningún estado, se muestran todas las citas
    }
  }
  
   
  


  listarCitasPendientes(): void {
    this.backendService.listarCitasPendientes().subscribe(
      (datos: any[]) => {
        this.citas = datos;
        console.log(this.citas);
        
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener citas pendientes:', error);
      }
    );
  }
  listarCitasDisponible(): void {
    this.backendService.listarCitasDisponible().subscribe(
      (datos: any[]) => {
        this.citas = datos;
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener citas pendientes:', error);
      }
    );
  }
  listarCitasCanceladas(): void {
    this.backendService.listarCitasCanceladas().subscribe(
      (datos: any[]) => {
        this.citas = datos;
      },
      (error: HttpErrorResponse) => {
        console.error('Error al obtener citas pendientes:', error);
      }
    );
  }
 

  
  


  toggleSeleccion(cita: any): void {
    const index = this.seleccionadas.indexOf(cita);
    if (index === -1) {
      this.seleccionadas.push(cita);
    } else {
      this.seleccionadas.splice(index, 1);
    }
  }

  eliminarCitasSeleccionadas(): void {
    // Filtrar las citas que no están seleccionadas
    this.citas = this.citas.filter(cita => !this.seleccionadas.includes(cita));
    // Limpiar la lista de citas seleccionadas
    this.seleccionadas = [];
  }
  

  buscar(): void {
    if (this.busquedaTexto.trim() !== '') {
      if (this.busquedaTexto.includes('@')) {
        this.buscarUltimaCitaPorUsuario(this.busquedaTexto);
      } else {
        this.buscarCitasPorComponente(this.busquedaTexto);
      }
    } else {
      this.listarCitas();
    }
  }


  limpiarBusqueda(): void {
    this.busquedaTexto = ''; // Limpiar el término de búsqueda
    this.buscar(); // Llamar al método para actualizar la lista de citas según el término de búsqueda
  }
  

  buscarUltimaCitaPorUsuario(usuario: string): void {
    this.backendService.obtenerUltimaCitaPorUsuario(usuario).subscribe(
      (data) => {
        // Actualizar la lista de citas con los resultados de la búsqueda
        this.citas = [data];
      },
      (error: HttpErrorResponse) => {
        console.error('Error al buscar la última cita por usuario:', error);
      }
    );
  }

  buscarCitasPorComponente(componente: string): void {
    this.backendService.obtenerCitasPorComponente(componente).subscribe(
      (data) => {
        // Actualizar la lista de citas con los resultados de la búsqueda
        this.citas = data;
        console.log(this.citas);
        
      },
      (error: HttpErrorResponse) => {
        console.error('Error al buscar citas por componente:', error);
      }
    );
  }


  openModal(): void {
    if (this.seleccionadas.length === 1) {
      console.log('Abriendo modal para editar una cita');
      const modal = document.getElementById('modalEditarCita');
      if (modal) {
        modal.style.display = 'block';
        // Obtener el estado actual de la cita seleccionada y asignarlo a selectedState
        this.selectedState = this.seleccionadas[0].estado;
        // Otros códigos para asignar otros valores si es necesario
      }
    } else if (this.seleccionadas.length > 1) {
      alert(`Seleccionaste ${this.seleccionadas.length} citas. Por favor, selecciona solo una cita para editar.`);
    } else {
      console.log('No hay citas seleccionadas para editar');
    }
  }
  
  
  
  
  

  closeModal(): void {
    const modal = document.getElementById('modalEditarCita');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  guardarCambiosEstado(selectedState: string): void {
    if (this.seleccionadas.length === 1) {
        const citaSeleccionada = this.seleccionadas[0];
        // Asumiendo que citaSeleccionada tiene una propiedad 'nombreUsuario' para obtener el nombre del usuario
        const nombreUsuario = citaSeleccionada.nombreUsuario;
        Swal.fire({
          title: 'Por favor espera...',
          html: 'Actualizando estado de la cita y enviando correo.',
          allowOutsideClick: false,
          didOpen: () => {
              Swal.showLoading();
          },
      });

        // Primero, obtén la información del usuario por su nombre
        this.backendService.obtenerInformacionUsuarioPorNombre(nombreUsuario).subscribe({
            next: (infoUsuario) => {
                // Continúa con la actualización del estado de la cita como antes
                // Asumiendo que infoUsuario contiene la dirección de correo en la propiedad 'correo'
                const correoUsuario = infoUsuario.correo;
                
                // Mapear los valores seleccionados a los valores deseados en la base de datos
                switch(selectedState) {
                    case 'Aceptado':
                        citaSeleccionada.disponible = 'Aceptado';
                        break;
                    case 'Cancelado':
                        citaSeleccionada.disponible = 'Cancelado';
                        break;
                    case 'Pendiente':
                        citaSeleccionada.disponible = 'Pendiente';
                        break;
                    default:
                        citaSeleccionada.disponible = ''; // Manejar caso no definido
                        break;
                }

                // Llamar al servicio para actualizar el estado en el backend
                this.backendService.actualizarDisponibilidadCita(citaSeleccionada).subscribe({
                    next: (response) => {
                        // Enviar correo después de actualizar el estado
                        const datosCorreo = {
                          to: correoUsuario,
                          subject: 'Actualización de Estado de Cita',
                          html: `
                          <!DOCTYPE html>
                          <html>
                          <head>
                          <style>
                            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
                            .container { background-color: #f8f8f8; border: 1px solid #ddd; padding: 20px; border-radius: 10px; }
                            .header { color: #444; margin-bottom: 20px; text-align: center; }
                            .content { margin-bottom: 20px; }
                            .footer { margin-top: 20px; font-size: 12px; text-align: center; color: #999; }
                            img { max-width: 100%; height: auto; }
                          </style>
                          </head>
                          <body>
                            <div class="container">
                              <div class="header">
                                <img src="https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/Logo_yfgnqs.jpg" alt="Logo Empresa" />
                                <h2>Actualización de Estado de Cita</h2>
                              </div>
                              <div class="content">
                                <p>Hola,</p>
                                <p>Queremos informarte que el estado de tu cita ha sido actualizado a <strong>${selectedState}</strong>.</p>
                                <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
                              </div>
                              <div class="footer">
                                Saludos cordiales,<br>
                                Ecotecnology
                              </div>
                            </div>
                          </body>
                          </html>
                          `,
                      };
                      
                      
                        this.correoService.enviarCorreo(datosCorreo).subscribe({
                            next: (respuestaCorreo) => {
                                console.log('Correo enviado satisfactoriamente', respuestaCorreo);
                                Swal.fire({
                                  title: 'Éxito',
                                  text: 'Cita cambiada y correo enviado satisfactoriamente.',
                                  icon: 'success',
                              }).then((result) => {
                                  if (result.isConfirmed) {
                                      window.location.reload();
                                  }
                              });
                              
                                this.closeModal();
                            },
                            error: (errorCorreo) => console.error('Error al enviar el correo', errorCorreo)
                        });

                        // Actualizar solo la cita seleccionada en la lista de citas localmente
                        this.citas = this.citas.map(cita => cita.id === citaSeleccionada.id ? citaSeleccionada : cita);
                        this.listarCitas();
                    },
                    error: (error: HttpErrorResponse) => console.error('Error al actualizar el estado de la cita:', error)
                });
            },
            error: (error) => console.error('Error al obtener información del usuario:', error)
        });
    }
}

  
  
  
  

  openAdvertenciaModal(): void {
    if (this.modalAdvertenciaRef) {
      this.modalAdvertenciaRef.nativeElement.style.display = 'block';
    }
  }
    
  closeAdvertenciaModal(): void {
      if (this.modalAdvertenciaRef) {
        this.modalAdvertenciaRef.nativeElement.style.display = 'none';
      }
    }
    
    
    scrollIzquierda() {
      this.botonesContainer.nativeElement.scrollLeft -= 100; // Desplazar hacia la izquierda
  }
  
  scrollDerecha() {
      this.botonesContainer.nativeElement.scrollLeft += 100; // Desplazar hacia la derecha
  }
  
  
  showNextButtons() {
    if (this.lastVisibleIndex < this.allButtons.length - 1) {
      this.firstVisibleIndex += 1;
      this.lastVisibleIndex += 1;
    }
  }
  
  // Función para mostrar los botones anteriores
  showPreviousButtons() {
    if (this.firstVisibleIndex > 0) {
      this.firstVisibleIndex -= 1;
      this.lastVisibleIndex -= 1;
    }
  }
  
  selectButton(button: number): void {
    console.log(`Botón ${button} seleccionado.`);
  }
  
  // Función para obtener el nombre del mes
  getMonthName(monthIndex: number): string {
    const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return monthNames[monthIndex];
  }


  generateCalendar(): void {
    this.weeks = [];
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstWeekday = firstDayOfMonth.getDay(); // Domingo: 0, Lunes: 1, ..., Sábado: 6

    let currentDay = 1;
    for (let i = 0; i < 6; i++) { // 6 filas máximas en un mes
        const week: (number | null)[] = []; // Cambio aquí
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstWeekday) || currentDay > numDaysInMonth) {
                week.push(null);
            } else {
                week.push(currentDay);
                currentDay++;
            }
        }
        this.weeks.push(week);
        if (currentDay > numDaysInMonth) {
            break;
        }
    }
  }


  mostrarImagen = false;
  urlImagenActual = '{{cita.urlimagen}}';

  mostrarPopup(url: string): void {
    this.urlImagenActual = url;
    this.mostrarImagen = true;
  }



}