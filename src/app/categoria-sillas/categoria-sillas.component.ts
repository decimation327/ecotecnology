import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-categoria-sillas',
  templateUrl: './categoria-sillas.component.html',
  styleUrls: ['./categoria-sillas.component.css']
})

export class CategoriaSillasComponent implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];
  marcasUnicas: string[] = [];
  usuario: any
  rolUsuario: any;

  constructor(private backendService: BackendServiceService,private authService: AuthService, private location: Location) {}

  ngOnInit() {
    this.buscarProductosSillas();
    this.rolUsuario = this.authService.getrol();   
  }

  // Función para volver atrás
  goBack(): void {
    this.location.back();
  }


  buscarProductosSillas(): void {
    this.backendService.buscarProductosSillas().subscribe(
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