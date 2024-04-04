import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoServiceService {

  private cantidadTotalSource = new BehaviorSubject<number>(0);
  cantidadTotal$ = this.cantidadTotalSource.asObservable();

  constructor() { }
  
  actualizarCantidadTotal(cantidadTotal: number) {
    this.cantidadTotalSource.next(cantidadTotal);
  }
}
