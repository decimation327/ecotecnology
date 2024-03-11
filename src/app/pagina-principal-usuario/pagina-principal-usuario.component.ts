import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { ChatBotService } from '../servicios/chat-bot.service';


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

  productos = [
    {id: 1, nombre: "Chasis Atx Gamer",  cantidad: 1, precio: 1100000, img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838964/chasis1_ybimv5.jpg'},
    {id: 2, nombre: "Chasis Gamer Gear",  cantidad: 1, precio: 160000, img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838964/chasis2_wixexq.jpg'},
    {id: 3, nombre: "Monitor gamer Asus",  cantidad: 1, precio: 140000,img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/monitor3_sv8foi.jpg'},
    {id: 4, nombre: "Msi Optix Monitor",  cantidad: 1, precio: 150000, img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/monitor2_kujrwp.jpg'},
    {id: 5, nombre: "SILLA V30 VERSUS",  cantidad: 1, precio: 15000, img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/silla2_phpxnt.jpg'},
    {id: 6, nombre: "SILLA V40 VERSUS",  cantidad: 1, precio: 17500, img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/silla1_cmzlxf.jpg'},
    {id: 7, nombre: "RTX 4090 GAMING",  cantidad: 1, precio: 190000,img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/grafica1_mn47sh.jpg'},
    {id: 8, nombre: "GAMER ULTRA",  cantidad: 1, precio: 9000, img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838966/mouse1_oyf64f.jpg'},
    {id: 9, nombre: "SILLA V40 ORION",  cantidad: 1, precio: 17500, img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/silla1_cmzlxf.jpg'},
    {id: 1, nombre: "PREDATOR REDRAGON",  cantidad: 1, precio: 9000, img:'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838966/mouse1_oyf64f.jpg'},

  ];

  constructor(private chatBotService: ChatBotService, private cdr: ChangeDetectorRef) { }
  
  ngOnInit() {
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
  

}

