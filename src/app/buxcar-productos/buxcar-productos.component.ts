import { Component , OnInit , ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common'; 
import { BackendServiceService } from '../servicios/backend-service.service';


@Component({
  selector: 'app-buxcar-productos',
  templateUrl: './buxcar-productos.component.html',
  styleUrls: ['./buxcar-productos.component.css']
})

export class BuxcarProductosComponent implements OnInit{

  marcaSeleccionada: string = ''; // Valor inicial para el filtro de marcas
  categoriaSeleccionada: string = 'todos';
  tituloProductos: string = 'Todos los Productos';
  ordenSeleccionado: string = '';
  productos: any[] = []; 
  productosFiltrados: any[] = [];
marcasUnicas: string[] = [];

  constructor( private location: Location ,  private BackendService:BackendServiceService , private cdr: ChangeDetectorRef) {
    
  }
  ngOnInit(): void {
    this.cargarProductos();
  }
  

  goBack(): void {
    this.location.back();
  }

  actualizarTitulo() {
    if (this.categoriaSeleccionada === 'todos') {
      this.tituloProductos = 'Todos los Productos';
    } else {
      this.tituloProductos = `Productos para la categoría: ${this.categoriaSeleccionada}`;
    }
  }

  cargarProductos(): void {
    this.BackendService.verTodosLosProductos().subscribe(
      (productos: any[]) => {
        console.log('Productos recibidos:', productos);
        this.productos = productos;
        this.productosFiltrados = [...productos];
        this.marcasUnicas = this.extraerMarcasUnicas(productos);
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error al cargar los productos:', error);
      }
    );
  }

  actualizarTituloYFiltrado() {
    this.filtrarProductosPorCategoria();
    this.tituloProductos = this.categoriaSeleccionada !== 'todos' ?
      `Productos para la categoría: ${this.categoriaSeleccionada}` :
      'Todos los Productos';
  }

  
  filtrarProductosPorCategoria() {
    const categoriaSeleccionadaNormalizada = this.categoriaSeleccionada.toLowerCase(); // Normaliza la categoría seleccionada
  
    if (categoriaSeleccionadaNormalizada === 'todos') {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productos.filter(producto => producto.categoriaPro.toLowerCase() === categoriaSeleccionadaNormalizada);
    }
  
    console.log('Categoría seleccionada:', categoriaSeleccionadaNormalizada);
    console.log('Productos filtrados:', this.productosFiltrados);
    this.cdr.detectChanges();
  }
  

  extraerMarcasUnicas(productos: any[]): string[] {
    const marcas = productos.map(producto => producto.marcaPro);
    return [...new Set(marcas)]; // Utiliza Set para eliminar duplicados
  }

  filtrarPorMarca(): void {
    if (this.marcaSeleccionada && this.marcaSeleccionada !== 'todos') {
      this.productosFiltrados = this.productos.filter(producto => producto.marcaPro === this.marcaSeleccionada);
    } else {
      this.productosFiltrados = [...this.productos];
    }
    this.cdr.detectChanges();
  }




  ordenarProductos() {
    switch (this.ordenSeleccionado) {
      case 'menorPrecio':
        // Implementa la lógica para ordenar los productos por menor precio
        break;
      case 'mayorPrecio':
        // Implementa la lógica para ordenar los productos por mayor precio
        break;
      case 'masVendidos':
        // Implementa la lógica para ordenar los productos por más vendidos
        break;
      case 'mejoresCalificados':
        // Implementa la lógica para ordenar los productos por mejor calificados
        break;
      case 'a-Z':
        // Implementa la lógica para ordenar los productos de A a Z
        break;
      case 'z-A':
        // Implementa la lógica para ordenar los productos de Z a A
        break;
      default:
        // Implementa un caso por defecto si es necesario
        break;
    }
  }
  
}