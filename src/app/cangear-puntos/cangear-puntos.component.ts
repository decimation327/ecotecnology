import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from "../servicios/auth.service.service";
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CorreoService } from '../servicios/correo.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common'; 


@Component({
  selector: 'app-cangear-puntos',
  templateUrl: './cangear-puntos.component.html',
  styleUrls: ['./cangear-puntos.component.css']
})
export class CangearPuntosComponent implements OnInit {
  @Output() filtroSeleccionado = new EventEmitter<string>;

  opcionesFiltro = ['Computadores', 'Pantallas', 'Chasis', 'Perifericos', 'Sillas'];
  filtroActual: string = '';
  mostrarOpciones: boolean = false;
  filtroBusqueda: string = '';
  productos: any[]; // Definir el tipo de datos para el array
  totalPuntos: number = 0;  // Variable para almacenar los puntos
  productosFiltrados: any[] = [];
  idCuenta: any;
  valor: any;
  NombreUsuario!: string | null;

  constructor(private backenService: BackendServiceService, private authService: AuthService, private CorreoService: CorreoService, private location: Location) {
    this.productos = [
      { id: 1, nombre: "Chasis Atx Gamer", cantidad: 1, precio: 100, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838964/chasis1_ybimv5.jpg', categoria: 'Chasis' },
      { id: 2, nombre: "Chasis Gamer Gear", cantidad: 1, precio: 160, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838964/chasis2_wixexq.jpg', categoria: 'Chasis' },
      { id: 3, nombre: "Monitor gamer Asus", cantidad: 1, precio: 140, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/monitor3_sv8foi.jpg', categoria: 'Pantallas' },
      { id: 4, nombre: "Msi Optix Monitor", cantidad: 1, precio: 150, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/monitor2_kujrwp.jpg', categoria: 'Pantallas' },
      { id: 5, nombre: "SILLA V30 VERSUS", cantidad: 1, precio: 15, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/silla2_phpxnt.jpg', categoria: 'Sillas' },
      { id: 6, nombre: "SILLA V40 VERSUS", cantidad: 1, precio: 175, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/silla1_cmzlxf.jpg', categoria: 'Sillas' },
      { id: 7, nombre: "RTX 4090 GAMING", cantidad: 1, precio: 190, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/grafica1_mn47sh.jpg', categoria: 'Computadores' },
      { id: 8, nombre: "PREDATOR REDRAGON", cantidad: 1, precio: 90, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838966/mouse1_oyf64f.jpg', categoria: 'Perifericos' },
      { id: 9, nombre: "PREDATOR REDRAGON", cantidad: 1, precio: 950, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/teclado1_vu9vrb.jpg', categoria: 'Perifericos' },
    ];

    this.productosFiltrados = [...this.productos];
  }


  goBack(): void {
    this.location.back();
  }


  ngOnInit(): void {
    console.log('Iniciando componente cangear-puntos...');

    // Obtén el idCuenta del servicio de autenticación
    this.idCuenta = this.authService.getIdCuenta();
    this.NombreUsuario = this.authService.getNombreUsuario();

    // Imprimir el token en la consola para verificar su contenido
    console.log('Token JWT:', this.authService.getToken());

    // Si necesitas hacer algo con el idCuenta, puedes hacerlo aquí
    if (this.idCuenta) {
      console.log('El id de cuenta del usuario es:', this.idCuenta);

      // Llama a la función para obtener los puntos si idCuenta es válido
      this.obtenerPuntos();

    }
  }

  seleccionarFiltro(opcion: string): void {
    this.filtroActual = opcion;
    this.filtroSeleccionado.emit(opcion);
    this.mostrarOpciones = false;
    this.aplicarFiltro();
  }

  toggleOpcionesFiltro(): void {
    this.mostrarOpciones = !this.mostrarOpciones;
  }

  realizarBusqueda(): void {
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    let productosFiltradosNombre = this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
    );

    if (this.filtroActual) {
      this.productosFiltrados = productosFiltradosNombre.filter(producto =>
        producto.categoria === this.filtroActual
      );
    } else {
      this.productosFiltrados = [...productosFiltradosNombre];
    }
  }

  obtenerPuntos() {
    console.log('Enviando solicitud para obtener puntos...');
    console.log('ID de cuenta actual:', this.idCuenta);

    this.backenService.obtenerTotalPuntosPorCuenta(Number(this.idCuenta))
      .subscribe(
        puntos => {
          this.totalPuntos = puntos;
          console.log('Puntos obtenidos con éxito:', puntos);
        },
        error => {
          console.error('Error al obtener puntos:', error);

          // Manejar el error y mostrar un mensaje en la consola o realizar acciones adicionales según sea necesario
          if (error.status === 401) {
            console.error('El token no es válido o ha expirado.');
          } else {
            console.error('Otro error al obtener puntos. Detalles:', error);
          }
        }
      );
  }

 
  productoSeleccionado: any

  capturarProductoSeleccionado(producto: any): void {
    this.productoSeleccionado = producto;
    console.log(this.productoSeleccionado);
    
  }

  canjeodePuntos(): void {
    // Verificar si se ha seleccionado un producto
    if (this.productoSeleccionado) {
      // Mostrar un cuadro de diálogo de confirmación
      Swal.fire({
        title: 'Confirmar acción',
        text: `¿Estás seguro que deseas canjear los puntos por ${this.productoSeleccionado.nombre}? Recuerda haber llenado el campo de dirección antes de canjear.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, canjear puntos',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar el canje de puntos
          const data = {
            nomUsuario: this.NombreUsuario,
            valor: this.productoSeleccionado.precio
          };

          Swal.fire({
            title: 'Por favor espera',
            html: 'Esperando la confirmación...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          const nombreUsuario = this.NombreUsuario as string;
          this.obtenerCorreoYEnviar(nombreUsuario, this.productoSeleccionado);
          this.backenService.canjearPuntosReciclaje(data).subscribe(
            (response: string) => {
              console.log('Puntos de reciclaje canjeados con éxito:', response);
           
            },  // Recargar la página  
            (error: HttpErrorResponse) => {
              console.error('Error al canjear los puntos de reciclaje:', error);
              // Mostrar mensaje de error
              Swal.fire('¡Error!', 'Hubo un problema al canjear los puntos de reciclaje', 'error');
            }
          );
        }
      });
    } else {
      console.error('No se ha seleccionado ningún producto');
    }
  }

  obtenerCorreoYEnviar(nombreUsuario: string, productoSeleccionado: any) {
    this.backenService.obtenerInformacionUsuarioPorNombre(nombreUsuario).subscribe({
      next: (infoUsuario) => {
        const correoDestino = infoUsuario.correo;
        const nombreEnvio = infoUsuario.nombre 
        console.log(infoUsuario);
        // Asumiendo que la respuesta tiene un campo 'correo'
        this.enviarCorreoCanje(correoDestino, productoSeleccionado, nombreEnvio);
      },
      error: (error) => {
        console.error('Error al obtener la información del usuario:', error);
        Swal.fire('Error', 'No se pudo obtener la información del usuario para enviar el correo.', 'error');
      },
    });
  }
  enviarCorreoCanje(correoDestino: string, producto: any, nombreEnvio: string): void {

    const asunto = 'Confirmación de Canjeo de Puntos';
    const cuerpoCorreo = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; }
            .producto-info {
              margin-bottom: 20px;
            }
            .producto-info img {
              max-width: 200px;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <h1>Confirmación de Canjeo de Puntos</h1>
          <div class="producto-info">
            <p>Hola ${nombreEnvio},  has canjeado tus puntos por el siguiente producto:</p>
            <p><strong>Producto:</strong> ${producto.nombre}</p>
            <p><strong>Puntos canjeados:</strong> ${producto.precio}</p>
            <img src="${producto.img}" alt="Imagen del producto">
          </div>
          <p>¡Gracias por participar en nuestro programa de reciclaje!</p>
        </body>
      </html>
    `;
  
    // La estructura del objeto data para enviar el correo
    const dataCorreo = {
      to: correoDestino,
      subject: asunto,
      html: cuerpoCorreo
    };
  
    // Utilizar el servicio CorreoService para enviar el correo
    this.CorreoService.enviarCorreo(dataCorreo).subscribe({
      next: (response) => {
        console.log('Correo enviado con éxito:', response);
        Swal.fire('¡Canjeo realizado!', 'El correo de confirmación ha sido enviado.', 'success').then(() => {
          // Recargar la página
          location.reload();
      });
       
      },
      error: (error) => {
        console.error('Error al enviar correo:', error);
        Swal.fire('Error', 'No se pudo enviar el correo de confirmación.', 'error');
      }
    });
  }
  
}