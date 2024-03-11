import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-categoria-chasis',
  templateUrl: './categoria-chasis.component.html',
  styleUrls: ['./categoria-chasis.component.css']
})

export class CategoriaChasisComponent implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];
  marcasUnicas: string[] = [];
  usuario: any
  rolUsuario: any;

  constructor(private backendService: BackendServiceService,private authService: AuthService, private location: Location) {}

  ngOnInit() {
    this.buscarProductosChasis();
    this.rolUsuario = this.authService.getrol();   
  }

  // Función para volver atrás
  goBack(): void {
    this.location.back();
  }


  buscarProductosChasis(): void {
    this.backendService.buscarProductosChasis().subscribe(
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