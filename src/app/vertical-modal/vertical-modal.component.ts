import { Component, OnInit } from '@angular/core';
import { ItemCarrito } from '../model/ItemCarrito';
import { CarritoServiceService } from '../servicios/carrito-service.service';

@Component({
  selector: 'app-vertical-modal',
  templateUrl: './vertical-modal.component.html',
  styleUrls: ['./vertical-modal.component.css']
})
export class VerticalModalComponent {
  listaItemsCarrito: ItemCarrito[] | undefined;

  constructor(private carritoService: CarritoServiceService) { }

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    const carritoStorage = localStorage.getItem("carrito");
    if (carritoStorage) {
      this.listaItemsCarrito = JSON.parse(carritoStorage);
    }
    this.actualizarCantidadTotal();
    this.actualizarCantidadTotal();
  }

    aumentarCantidad(item: ItemCarrito) {
      item.cantidad!++;
      this.actualizarCarrito();
      this.actualizarCantidadTotal();
    }

  disminuirCantidad(item: ItemCarrito) {
    if (item.cantidad! > 1) {
      item.cantidad!--;
      this.actualizarCarrito();
      this.actualizarCantidadTotal();
    }
  }

  eliminarItem(index: number) {
    this.listaItemsCarrito!.splice(index, 1);
    this.actualizarCarrito();
    this.actualizarCantidadTotal();
  }

  vaciarCarrito() {
    localStorage.removeItem("carrito");
    this.listaItemsCarrito = [];
    this.actualizarCantidadTotal();
  }

  actualizarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(this.listaItemsCarrito));
  }
  actualizarCantidadTotal() {
    const cantidadTotal = this.listaItemsCarrito!.reduce((total, item) => total + item.cantidad!, 0);
    this.carritoService.actualizarCantidadTotal(cantidadTotal); 
  }
}