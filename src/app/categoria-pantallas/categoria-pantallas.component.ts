import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../servicios/backend-service.service';
import { AuthService } from '../servicios/auth.service.service';
import { Location } from '@angular/common'; 


@Component({
  selector: 'app-categoria-pantallas',
  templateUrl: './categoria-pantallas.component.html',
  styleUrls: ['./categoria-pantallas.component.css']
})

export class CategoriaPantallasComponent implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];
  marcasUnicas: string[] = [];
  usuario: any
  rolUsuario: any;

  constructor(private backendService: BackendServiceService,private authService: AuthService, private location: Location) {}

  ngOnInit() {
    this.buscarProductosPantallas();
    this.rolUsuario = this.authService.getrol();   
  }

  // Función para volver atrás
  goBack(): void {
    this.location.back();
  }


  buscarProductosPantallas(): void {
    this.backendService.buscarProductosPantallas().subscribe(
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