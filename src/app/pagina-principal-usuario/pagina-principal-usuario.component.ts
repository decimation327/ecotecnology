import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ChatBotService } from '../servicios/chat-bot.service';
import { BackendServiceService } from '../servicios/backend-service.service';
import { CarritoServiceService } from '../servicios/carrito-service.service';
import { Producto } from '../model/Producto';
import { ItemCarrito } from '../model/ItemCarrito';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagina-principal-usuario',
  templateUrl: './pagina-principal-usuario.component.html',
  styleUrls: ['./pagina-principal-usuario.component.css']
})
export class PaginaPrincipalUsuarioComponent implements OnInit {

  pregunta: string = '';
  historial: any[] = [];
  showChatbot: boolean = false;
  respuestaServidor: any = {};
  productos: any[] = []; 

  constructor(private chatBotService: ChatBotService, private cdr: ChangeDetectorRef, private BackendService:BackendServiceService, private carritoService:CarritoServiceService) { }
  
  ngOnInit() {
    this.cargarProductos();
  }
 
  cargarProductos(): void {
    this.BackendService.verTodosLosProductos().subscribe(
      (productos: any[]) => {
        console.log(productos); // Verifica los datos recibidos
        console.log(typeof productos, Array.isArray(productos)); // Verifica el tipo
  
        // Limita los productos a los primeros 16
        this.productos = productos.slice(0, 15);
  
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }
  toggleChatbot(): void {
    console.log('Hiciste clic en el icono del chatbot');
    this.showChatbot = !this.showChatbot;
  }
  
  
  
  
  enviarPregunta(): void {
    // Preguntar al usuario y almacenar la pregunta en una variable
    const preguntaUsuario = this.pregunta
  
    // Verificar si el usuario ingresó una pregunta
    if (preguntaUsuario) {
      // Crear un historial vacío para enviar al servicio
      const history: any[] = [];
  
      // Llamar al servicio y pasar la pregunta del usuario y el historial
      this.chatBotService.enviarPregunta(preguntaUsuario, history).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          // Aquí puedes procesar la respuesta del servidor según sea necesario
          this.respuestaServidor = response;
        },
        error => {
          console.error('Error al enviar la pregunta:', error);
          // Maneja el error aquí si es necesario
        }
      );
    } else {
      console.log('El usuario no ingresó ninguna pregunta.');
    }
  }
  onInput(event: any) {
    const value = event?.target?.value ?? ''; // Usa el valor del input si existe, de lo contrario, usa una cadena vacía
    this.pregunta = value.trim(); // Asigna la pregunta al valor del input
    // Detecta cambios manualmente
    this.cdr.detectChanges();
  }
  //logica del carrito desde la vista del catalogo
  agregarCarrito(item: any){
    console.log(item);
    let iCarrito: ItemCarrito = {
      id: item.idPro, // Asegúrate de usar 'idPro' aquí
      nombre: item.nombrePro, // Asumiendo que quieres usar 'nombrePro'
      precio: item.precioPro, // Asumiendo que quieres usar 'precioPro'
      cantidad: 1
    };
    if(localStorage.getItem("carrito") === null){
      let carrito: ItemCarrito[] = [];
      carrito.push(iCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    else{
      let carritoStorage = localStorage.getItem("carrito") as string;
      let carrito = JSON.parse(carritoStorage);
      let index = -1 
      for(let i = 0; i<carrito.length; i++){
        let itemC: ItemCarrito = carrito[i];
        if(iCarrito.id === itemC.id){
          index = i;
          break;
        }
      }
      if(index === -1){
        carrito.push(iCarrito);
      }
      else{
        let itemCarrito: ItemCarrito = carrito[index];
        itemCarrito.cantidad!++;
        carrito[index] = itemCarrito;
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    // Llama al método para actualizar la cantidad total después de realizar cambios en el carrito
    this.actualizarCantidadTotalCarrito();
  }
  
  private actualizarCantidadTotalCarrito() {
    let carritoStorage = localStorage.getItem("carrito");
    if (carritoStorage) {
      let carrito = JSON.parse(carritoStorage);
      let cantidadTotal = carrito.reduce((total: number, item: ItemCarrito) => total + (item.cantidad || 0), 0);
      this.carritoService.actualizarCantidadTotal(cantidadTotal);
    }
  
    
      }

      //mostrar alerta al añadir
      showAlert(){
        Swal.fire({
          title: "Carrito de compras",
          text: "Tu producto fue agregado al carrito exitosamente",
          icon: "success"
        })
      }


}

