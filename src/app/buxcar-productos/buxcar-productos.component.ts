import { Component } from '@angular/core';
import { Location } from '@angular/common'; 


@Component({
  selector: 'app-buxcar-productos',
  templateUrl: './buxcar-productos.component.html',
  styleUrls: ['./buxcar-productos.component.css']
})

export class BuxcarProductosComponent {

  marcaSeleccionada: string = ''; // Valor inicial para el filtro de marcas
  categoriaSeleccionada: string = 'todos';
  tituloProductos: string = 'Todos los Productos';
  ordenSeleccionado: string = '';

  constructor( private location: Location) {
    
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



  filtrarPorMarca() {
    // Aquí implementarías la lógica para filtrar los productos por la marca seleccionada
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