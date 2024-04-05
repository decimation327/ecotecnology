
import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import { Location } from '@angular/common'; 


@Component({
  selector: 'app-perifericos',
  templateUrl: './perifericos.component.html',
  styleUrls: ['./perifericos.component.css']
})
export class PerifericosComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [
    { id: 1, nombre: "Chasis Atx Gamer", cantidad: 1, precio: 100, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838964/chasis1_ybimv5.jpg', categoria: 'Chasis' },
    { id: 2, nombre: "Chasis Gamer Gear", cantidad: 1, precio: 160, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838964/chasis2_wixexq.jpg', categoria: 'Chasis' },
    { id: 3, nombre: "Monitor gamer Asus", cantidad: 1, precio: 140, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/monitor3_sv8foi.jpg', categoria: 'Pantallas' },
    { id: 4, nombre: "Msi Optix Monitor", cantidad: 1, precio: 150, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/monitor2_kujrwp.jpg', categoria: 'Pantallas' },
    { id: 5, nombre: "SILLA V30 VERSUS", cantidad: 1, precio: 15, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/silla2_phpxnt.jpg', categoria: 'Sillas' },
    { id: 6, nombre: "SILLA V40 VERSUS", cantidad: 1, precio: 175, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/silla1_cmzlxf.jpg', categoria: 'Sillas' },
    { id: 7, nombre: "RTX 4090 GAMING", cantidad: 1, precio: 190, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838965/grafica1_mn47sh.jpg', categoria: 'Computadores' },
    { id: 8, nombre: "PREDATOR REDRAGON", cantidad: 1, precio: 90, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838966/mouse1_oyf64f.jpg', categoria: 'Perifericos' },
    { id: 9, nombre: "PREDATOR REDRAGON", cantidad: 1, precio: 950, img: 'https://res.cloudinary.com/dspugxtgr/image/upload/v1687838967/teclado1_vu9vrb.jpg', categoria: 'Perifericos' },
  ];;
  marcasUnicas: string[] = [];
  usuario: any
  rolUsuario: any;

  constructor(private backendService: BackendServiceService,private authService: AuthService, private location: Location) {}

  ngOnInit() {
    this.cargarProductosPerifericos();
    this.rolUsuario = this.authService.getrol();   
  }

  // Función para volver atrás
  goBack(): void {
    this.location.back();
  }


  cargarProductosPerifericos(): void {
    this.backendService.buscarProductosPerifericos().subscribe(
      (productos) => {
        this.productos = productos;
        this.productosFiltrados = [...productos]; // Inicializa productosFiltrados con todos los productos
        this.marcasUnicas = this.extraerMarcasUnicas(productos);
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  extraerMarcasUnicas(productos: any[]): string[] {
    const marcas = productos.map(producto => producto.marcaPro);
    return [...new Set(marcas)]; // Utiliza Set para eliminar duplicados
  }
  
  cargarProductosPorMarca(marca: string): void {
    if (marca) {
      this.productosFiltrados = this.productos.filter(producto => producto.marcaPro === marca);
    } else {
      this.productosFiltrados = [...this.productos];
    }
  }

}


