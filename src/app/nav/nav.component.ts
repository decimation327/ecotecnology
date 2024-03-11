import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerticalModalComponent } from '../vertical-modal/vertical-modal.component';
import { CarritoServiceService } from '../servicios/carrito-service.service';
import { BackendServiceService } from '../servicios/backend-service.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  productosEncontrados: any[] = [];
  terminoDeBusqueda: string = ''; 
  
  constructor(private dialog: MatDialog, private carritoService: CarritoServiceService, private BackendService:BackendServiceService ) { }
  cantidadProductosEnCarrito: Number = 0;
  openVerticalModal() {
    // Suponiendo que quieres buscar productos al abrir el modal y luego hacer algo con los resultados...
    this.dialog.open(VerticalModalComponent, {
      width: '800px',
      panelClass: 'vertical-modal-dialog-container'
    });

    // Puedes adaptar este fragmento para buscar cuando sea apropiado según tu lógica de aplicación
   
  }

  ngOnInit(): void {
    this.carritoService.cantidadTotal$.subscribe(cantidad => {
      this.cantidadProductosEnCarrito = cantidad;
    });
    
  }
  // En tu componente NavComponent
  buscarProductos(terminoDeBusqueda: string): void {
    if (terminoDeBusqueda.length === 0) {
      this.productosEncontrados = [];
      return;
    }
  
    this.BackendService.buscarProductos(terminoDeBusqueda).subscribe((productos: any[]) => {
      this.productosEncontrados = productos.slice(0, 3);;
      console.log(this.productosEncontrados);
      
    }, error => {
      console.error(error);
      // Aquí puedes manejar el error, por ejemplo, limpiando los productos encontrados o mostrando un mensaje.
      this.productosEncontrados = [];
    });
  }


}
