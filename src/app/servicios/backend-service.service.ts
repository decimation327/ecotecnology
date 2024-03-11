import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaVentaModel  } from "../model/FacturaVentaModel";
import { Producto } from '../model/ProductoLogica';

@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  private backendUrl = 'https://backendecotecnology.azurewebsites.net/api';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/Usuario/login`, credentials);
  }

  crearUsuario(data: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.backendUrl}/Usuario/crearUsuario`, data, { headers, responseType: 'text' as 'json' });
  }

 
  editarUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${this.backendUrl}/Usuario/editarUsuario`, usuario, { headers, responseType: 'text' as 'json' });
  }
  eliminarUsuario(nomComplet_User: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers,
      responseType: 'text' as 'json'
    };

    return this.http.delete<any>(`${this.backendUrl}/Usuario/eliminarUsuario/${nomComplet_User}`, options);
}


 
  
  eliminarUsuarioPorNombre(nombreUsuario: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.backendUrl}/Usuario/eliminarUsuarioPorNombre`, `"${nombreUsuario}"`, { headers, responseType: 'text' as 'json' });
  }

  mostrarUsuariosAdmin(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/Usuario/mostrarUsuariosAdmin`);
  }

  mostrarUsuarios(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/Usuario/mostrarUsuarios`);
  }

   
   buscarUsuariosAdminPorNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/Usuario/buscarUsuariosAdminPorNombre?nombre=${nombre}`);
  }

  
  buscarUsuariosPorNombre(nombre: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/Usuario/BuscarUsuariosPorNombre?nombre=${nombre}`);
  }

  
  obtenerInformacionUsuarioPorNombre(nombreCompleto: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/Usuario/informacion-usuario/${nombreCompleto}`);
  }

  insertarTransaccion(data: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.backendUrl}/Transacciones/insertarTransaccion`, data, { headers, responseType: 'text' as 'json' });
  }

  insertarTransaccionSinTarjeta(data: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.backendUrl}/Transacciones/insertarTransaccionSinTarjeta`, data, { headers, responseType: 'text' as 'json' });
  }

  obtenerTransaccionesPorUsuario(idCuen: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Transacciones/obtenerTransaccionesPorUsuario/${idCuen}`);
  }
  almacenarProducto(producto: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.backendUrl}/Producto/almacenarProducto`, producto, { headers, responseType: 'text' as 'json' });
  }

  listarProductosActivos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/listarProductosActivos`);
  }

  buscarProductosMouse(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/buscarProductosMouse`);
  }

  buscarProductosTeclados(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/buscarProductosTeclados`);
  }

  buscarProductosPantallas(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/buscarProductosPantallas`);
  }

  buscarProductosChasis(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/buscarProductosChasis`);
  }

  buscarProductosPerifericos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/buscarProductosPerifericos`);
  }

  buscarProductosSillas(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/buscarProductosSillas`);
  }

  verTodosLosProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/verTodosLosProductos`);
  }

  comprarProducto(nombreProducto: string, cantidadComprada: number): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/Producto/comprarProducto`, { nombre_producto: nombreProducto, cantidad_comprada: cantidadComprada });
  }

  eliminarProductoPorNombre(nombreProducto: string): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/Producto/eliminarProductoPorNombre`, { nombre_producto: nombreProducto });
  }

  filtrarProductosPorMarca(marcaProducto: string): Observable<Producto[]> {
    return this.http.post<Producto[]>(`${this.backendUrl}/Producto/filtrarProductosPorMarca?marcaProducto=${marcaProducto}`, null);
  }

  
  buscarProductos(terminoBusqueda: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.backendUrl}/Producto/buscarProductos?terminoBusqueda=${terminoBusqueda}`);
  }
  cambiarCantidadPorNombreProducto(nombreProducto: string, nuevaCantidad: number): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/cambiarCantidadPorNombreProducto`, { NombreProducto: nombreProducto, NuevaCantidad: nuevaCantidad });
  }

  cambiarPrecioPorNombreProducto(nombreProducto: string, nuevoPrecio: number): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/cambiarPrecioPorNombreProducto`, { NombreProducto: nombreProducto, NuevoPrecio: nuevoPrecio });
  }

  insertarTarjetaCredito(data: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log(data);
    

    return this.http.post<string>(`${this.backendUrl}/TarjetasCredito/insertarTarjetaCredito`, data, { headers, responseType: 'text' as 'json' });
  }

  actualizarTarjetaCredito(data: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<string>(`${this.backendUrl}/TarjetasCredito/actualizarTarjetaCredito`, data, { headers, responseType: 'text' as 'json' });
  }

  eliminarTarjetasCreditoPorCuenta(idCuenta: number): Observable<string> {
    return this.http.delete<string>(`${this.backendUrl}/TarjetasCredito/eliminarTarjetasCreditoPorCuenta/${idCuenta}`);
  }

  obtenerTarjetasCreditoPorUsuario(idCuenta: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/TarjetasCredito/obtenerTarjetasCreditoPorUsuario/${idCuenta}`);
  }
  insertarPuntosReciclaje(data: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.backendUrl}/PuntosReciclaje/insertarPuntosReciclaje`, data, { headers, responseType: 'text' as 'json' });
  }

  actualizarPuntosReciclaje(data: any): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.backendUrl}/PuntosReciclaje/actualizarPuntosReciclaje`, data, { headers, responseType: 'text' as 'json' });
  }
  canjearPuntosReciclaje(model: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<string>(`${this.backendUrl}/PuntosReciclaje/canjearPuntosReciclaje`, model, { headers, responseType: 'text' as 'json' });
  }

  eliminarPuntosPorUsuario(nombreUsuario: string): Observable<string> {
    return this.http.delete<string>(`${this.backendUrl}/PuntosReciclaje/eliminarPuntosPorUsuario/${nombreUsuario}`);
  }

  obtenerTotalPuntosPorCuenta(idCuenta: number): Observable<number> {
    return this.http.get<number>(`${this.backendUrl}/PuntosReciclaje/obtenerTotalPuntosPorCuenta/${idCuenta}`);
  }

   // Método para insertar una factura de venta
   insertarFacturaVenta(facturaVenta: FacturaVentaModel): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.backendUrl}/InsertarFacturaVenta`, facturaVenta, { headers, responseType: 'text' as 'json' });
  }

  // Método para obtener todas las facturas de venta
  listarFacturasVenta(): Observable<FacturaVentaModel[]> {
    return this.http.get<FacturaVentaModel[]>(`${this.backendUrl}/ListarFacturasVenta`);
  }

  // Método para obtener una factura de venta por su número
  obtenerFacturaVenta(numero: number): Observable<FacturaVentaModel> {
    return this.http.get<FacturaVentaModel>(`${this.backendUrl}/ObtenerFacturaVenta/${numero}`);
  }

  // Método para actualizar una factura de venta
  actualizarFacturaVenta(facturaVenta: FacturaVentaModel): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<string>(`${this.backendUrl}/ActualizarFacturaVenta`, facturaVenta, { headers, responseType: 'text' as 'json' });
  }

  // Método para eliminar una factura de venta por su número
  eliminarFacturaVenta(numero: number): Observable<string> {
    return this.http.delete<string>(`${this.backendUrl}/EliminarFacturaVenta/${numero}`);
  }
  crearFacturaCompra(model: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.backendUrl}/FacturaCompra/crearFacturaCompra`, model, { headers });
  }

  obtenerFacturaCompra(numFc: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/FacturaCompra/obtenerFacturaCompra/${numFc}`);
  }

  actualizarFacturaCompra(model: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.backendUrl}/FacturaCompra/actualizarFacturaCompra`, model, { headers });
  }

  eliminarFacturaCompra(numFc: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/FacturaCompra/eliminarFacturaCompra/${numFc}`);
  }

  listarTodasFacturasCompra(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/FacturaCompra/listarTodasFacturasCompra`);
  }
  insertarDireccion(direccion: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.backendUrl}/Direccion/insertarDireccion`, direccion, { headers, responseType: 'text' as 'json'  });
  }

  obtenerInformacionDireccion(numDir: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/Direccion/obtenerInformacionDireccion?numDir=${numDir}`);
  }

  actualizarDireccion(direccion: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.backendUrl}/Direccion/actualizarDireccion`, direccion, { headers, responseType: 'text' as 'json' });
  }

  eliminarDireccion(numDir: number): Observable<any> {
    return this.http.post<any>(`${this.backendUrl}/Direccion/eliminarDireccion`, { numDir });
  }

  listarDireccionesPorCuenta(idCuenta: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Direccion/listarDireccionesPorCuenta?idCuenta=${idCuenta}`);
  }
  insertarDetalleFactura(detalleFactura: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.backendUrl}/DetalleFactura/InsertarDetalleFactura`, detalleFactura, { headers });
  }

  actualizarDetalleFactura(detalleFactura: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.backendUrl}/DetalleFactura/ActualizarDetalleFactura`, detalleFactura, { headers });
  }

  eliminarDetalleFactura(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/DetalleFactura/EliminarDetalleFactura/${id}`);
  }

  obtenerDetallesPorNumeroFactura(num_fv: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/DetalleFactura/ObtenerDetallesPorNumeroFactura/${num_fv}`);
  }

  obtenerDetallesPorProducto(id_pro: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/DetalleFactura/ObtenerDetallesPorProducto/${id_pro}`);
  }
  insertarCita(cita: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.backendUrl}/Citas/insertarCita`, cita, { headers, responseType: 'text' as 'json' });
  }

  listarCitas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Citas/listarCitas`);
  }

  listarCitasConInfo(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Citas/listarCitasConInfo`);
  }

  actualizarDisponibilidadCita(cita: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(`${this.backendUrl}/Citas/actualizarDisponibilidadCita`, cita, { headers, responseType: 'text' as 'json'  });
  }

  obtenerUltimaCitaPorUsuario(nomComplet_User: string): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/Citas/obtenerUltimaCita?nomComplet_User=${nomComplet_User}`);
  }

  obtenerCitasPorComponente(nomComponente: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Citas/obtenerCitasPorComponente?nomComponente=${nomComponente}`);
  }


  listarCitasPendientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Citas/listarCitasPendientes`);
  }

  listarCitasCanceladas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Citas/listarCitasCanceladas`);
  }
  
  listarCitasDisponible(): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Citas/listarCitasDisponible`);
  }
  

 
  
  
  listarCitasPorFecha(fecha: Date): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/Citas/listarCitasPorFecha?fecha=${fecha.toISOString()}`);
  }
  
  listarCitasPorNombreUsuario(nombreUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.backendUrl}/listarCitasPorNombreUsuario?nombreUsuario=${nombreUsuario}`);
  }
  
}
